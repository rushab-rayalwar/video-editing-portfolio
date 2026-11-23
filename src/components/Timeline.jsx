import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollHint from './ScrollHint/ScrollHint.jsx'
import styles from './Timeline.module.css'

const FPS = 25
const TOTAL_SECONDS = 120 // the whole page plays as a two-minute "edit"

// Turns a 0–1 progress value into editor-style timecode, HH:MM:SS:FF
function toTimecode(progress) {
  const totalFrames = Math.round(progress * TOTAL_SECONDS * FPS)
  const frames = totalFrames % FPS
  const seconds = Math.floor(totalFrames / FPS)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}:${pad(frames)}`
}

/*
 * How scrolling maps to the playhead:
 * We follow a "read line" that slides from the top of the screen (at the very top
 * of the page) to the bottom of the screen (at the very end). Its position in the
 * document, divided by the document height, gives a 0–1 progress that lines up
 * exactly with clip widths, which are each section's share of the page height.
 */
function getProgress() {
  const doc = document.documentElement
  const total = doc.scrollHeight
  const scrollable = total - window.innerHeight
  if (scrollable <= 0) return 0
  const scrollRatio = window.scrollY / scrollable
  const readLine = window.scrollY + scrollRatio * window.innerHeight
  return Math.min(1, Math.max(0, readLine / total))
}

// The inverse: which scroll position puts the playhead at a given progress
function scrollYForProgress(progress) {
  const total = document.documentElement.scrollHeight
  const scrollable = total - window.innerHeight
  return (progress * total * scrollable) / total
}

function Timeline({ sections }) {
  const [clips, setClips] = useState([])
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const trackRef = useRef(null)
  const playheadRef = useRef(null)
  const timecodeRef = useRef(null)
  const clipsRef = useRef([])
  const draggingRef = useRef(false)

  // Measure each section so clip widths match how much of the page it takes up
  const measure = useCallback(() => {
    const total = document.documentElement.scrollHeight
    const measured = sections
      .map((section) => {
        const el = document.getElementById(section.id)
        if (!el) return null
        const top = el.getBoundingClientRect().top + window.scrollY
        return { ...section, start: top / total, end: (top + el.offsetHeight) / total }
      })
      .filter(Boolean)
    // Stretch the last clip to the end so trailing padding doesn't leave a gap
    if (measured.length) measured[measured.length - 1].end = 1
    if (measured.length) measured[0].start = 0
    clipsRef.current = measured
    setClips(measured)
  }, [sections])

  // Move the playhead directly (no React re-render per frame) for smooth scrolling
  const update = useCallback(() => {
    const progress = getProgress()
    if (playheadRef.current) {
      playheadRef.current.style.left = `${progress * 100}%`
    }
    if (timecodeRef.current) {
      timecodeRef.current.textContent = toTimecode(progress)
    }
    const current = clipsRef.current.find((c) => progress >= c.start && progress < c.end)
    const last = clipsRef.current[clipsRef.current.length - 1]
    const id = current?.id ?? (progress >= 1 ? last?.id : undefined)
    if (id) setActiveId((prev) => (prev === id ? prev : id))
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Re-measure if sections change height (images loading, fonts swapping in, etc.)
    const observer = new ResizeObserver(onResize)
    observer.observe(document.body)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [measure, update])

  // Scrub: click or drag anywhere on the dock (except the timecode), or grab the
  // playhead itself, to move through the page. The horizontal position is read
  // against the clip track, so a click above or below the clips lands at that spot.
  const scrubTo = (clientX, smooth) => {
    const rect = trackRef.current.getBoundingClientRect()
    const progress = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    window.scrollTo({ top: scrollYForProgress(progress), behavior: smooth ? 'smooth' : 'instant' })
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    // The timecode area on the left stays unclickable
    if (e.target.closest(`.${styles.meta}`)) return
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    trackRef.current.classList.add(styles.isScrubbing)
    scrubTo(e.clientX, false)
  }
  const onPointerMove = (e) => {
    if (draggingRef.current) scrubTo(e.clientX, false)
  }
  const onPointerUp = () => {
    draggingRef.current = false
    trackRef.current?.classList.remove(styles.isScrubbing)
  }

  // Keyboard users: clips are buttons that jump to their section
  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.timeline} aria-label="Page timeline">
      {/* "See my work" hint, sitting just above the dock until the first scroll */}
      <ScrollHint targetId={sections[1]?.id} />

      <div
        className={styles.inner}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.meta}>
          <span className={styles.rec} aria-hidden="true" />
          <span className={styles.timecode} ref={timecodeRef}>
            00:00:00:00
          </span>
          {/* Shown on phones, where the clips are too narrow for labels */}
          <span className={styles.current}>{clips.find((c) => c.id === activeId)?.label}</span>
        </div>

        <div className={styles.track} ref={trackRef}>
          <div className={styles.clips}>
            {clips.map((clip) => (
              <button
                key={clip.id}
                type="button"
                className={`${styles.clip} ${clip.id === activeId ? styles.isActive : ''}`}
                style={{ left: `${clip.start * 100}%`, width: `${(clip.end - clip.start) * 100}%` }}
                onClick={(e) => {
                  // Pointer clicks are already handled by scrubbing; this covers keyboard
                  if (e.detail === 0) goToSection(clip.id)
                }}
                aria-current={clip.id === activeId ? 'location' : undefined}
              >
                <span className={styles.clipLabel}>{clip.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.playhead} ref={playheadRef} aria-hidden="true">
            <span className={styles.playheadCap} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Timeline
