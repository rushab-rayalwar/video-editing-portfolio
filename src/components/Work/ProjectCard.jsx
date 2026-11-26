import { useEffect, useId, useState } from 'react'
import { fetchVimeoThumbnail, parseVimeo, resizeVimeoThumbnail } from '../../data/vimeo.js'
import { useInView } from '../../hooks/useInView.js'
import styles from './ProjectCard.module.css'

// How long to wait for a thumbnail before showing the card without one
const THUMBNAIL_TIMEOUT = 2000
// Gap between cards in the same row, so they cascade in
const STAGGER = 90

// A small circled "i", for "information"
function InfoIcon() {
  return (
    <svg className={styles.infoIcon} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="5.1" r="0.95" fill="currentColor" />
      <path d="M8 7.4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}

/*
 * A single piece of work.
 *
 * Nothing is shown until a quarter of the card is on screen and its thumbnail has
 * loaded (a blinking "● REC" and a faint sweep of light show while it loads). Then
 * the thumbnail animates into place (fade, unblur, settle). The title animates in
 * once it is fully on screen (clear of the timeline): straight away if its thumbnail
 * has already loaded, otherwise 0.5s after the thumbnail loads. The description
 * follows just after. It all happens once per visit.
 * Hovering a playable card lights up a soft glow made from a blurred copy of its thumbnail.
 *
 * `revealOrder` is the card's position in its row, used to stagger the cascade.
 * `row` (phones only): when the row itself is on screen, so the whole row reveals together.
 * `phone`: on phones, the title and credits follow the card's own reveal instead of
 *   waiting for the title to be fully on screen.
 */
function ProjectCard({ project, onPlay, revealOrder = 0, row = null, phone = false }) {
  const video = parseVimeo(project.vimeo)
  const isPortrait = project.orientation !== 'landscape'

  // A `poster` set in projects.js wins; otherwise use the thumbnail chosen on Vimeo
  const [vimeoPoster, setVimeoPoster] = useState(null)
  const [posterLoaded, setPosterLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  // When the thumbnail became ready (loaded, or the fallback gave up waiting)
  const [readyAt, setReadyAt] = useState(null)
  const markReady = () => setReadyAt((at) => at ?? performance.now())
  const videoId = video?.id
  const videoHash = video?.hash

  useEffect(() => {
    if (project.poster || !videoId) return
    let cancelled = false
    fetchVimeoThumbnail({ id: videoId, hash: videoHash }, isPortrait ? 720 : 1280).then((url) => {
      if (!cancelled) setVimeoPoster(url)
    })
    return () => {
      cancelled = true
    }
  }, [project.poster, videoId, videoHash, isPortrait])

  const poster = project.poster || vimeoPoster

  const [cardRef, cardInView] = useInView()
  // In a phone's sideways-swipe row, the whole row reveals together (cards off to the
  // right included), instead of each card waiting until it's swiped into view
  const inView = cardInView || Boolean(row?.inView)

  // If the thumbnail is slow or missing, show the card anyway after a short wait
  useEffect(() => {
    if (!inView || posterLoaded) return
    const timer = setTimeout(() => {
      setTimedOut(true)
      setReadyAt((at) => at ?? performance.now())
    }, THUMBNAIL_TIMEOUT)
    return () => clearTimeout(timer)
  }, [inView, posterLoaded])

  // The thumbnail appears once the card is on screen and its image is ready
  const revealed = inView && (posterLoaded || timedOut || !video)
  // While the card is on screen but its thumbnail is still on its way, "● REC" and the shimmer show
  const loading = inView && !revealed

  // The title animates once the whole title is on screen (clear of the timeline dock)
  // and its thumbnail is ready:
  //   - thumbnail already loaded when the title comes into view: straight away
  //   - title in view first: 0.5s after the thumbnail loads (or the fallback gives up)
  // so a fast scroll never leaves names lagging behind.
  const [titleRef, ownTitleVisible, ownTitleSeenAt] = useInView({ threshold: 1, clearOfTimeline: true })
  // Phones: the title and credits come in right behind the card's own reveal (0.5s after
  // its thumbnail, with the same stagger), without waiting for the text to be on screen
  const titleVisible = phone ? inView : ownTitleVisible
  const titleSeenAt = phone ? null : ownTitleSeenAt
  const thumbnailReady = posterLoaded || timedOut || !video
  const captionShown = titleVisible && thumbnailReady
  const thumbnailReadyAt = video ? readyAt : 0
  const captionInstant =
    captionShown && thumbnailReadyAt !== null && titleSeenAt !== null && thumbnailReadyAt <= titleSeenAt
  const noteId = useId()
  const hasNote = Boolean(project.tag && project.tagNote)
  const delay = `${Math.min(revealOrder, 5) * STAGGER}ms`

  const frame = (
    <div className={`${styles.frameWrap} ${isPortrait ? styles.portrait : styles.landscape}`}>
      {/* While the thumbnail loads, a faint band of light sweeps across the space it will fill */}
      {video && <span className={styles.shimmer} aria-hidden="true" />}

      {/* Shown while the thumbnail loads: a blinking "● REC", like a camera's viewfinder */}
      {video && (
        <span className={styles.loader} aria-hidden="true">
          <span className={styles.loaderDot} />
          REC
        </span>
      )}

      {/* Hover glow: a small, heavily blurred copy of the thumbnail behind the card */}
      {video && poster && posterLoaded && (
        <img className={styles.glow} src={resizeVimeoThumbnail(poster, 240)} alt="" aria-hidden="true" />
      )}

      <div className={styles.frame}>
        {poster && (
          <img
            className={styles.poster}
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => {
              setPosterLoaded(true)
              markReady()
            }}
            onError={() => setVimeoPoster(null)}
          />
        )}
        <span className={styles.play}>
          <PlayIcon />
        </span>
        {!video && <span className={styles.soon}>Coming soon</span>}
      </div>

      {/* Small "AI" badge, top right, for work made with generative AI */}
      {project.ai && (
        <span className={styles.aiTag} aria-label="Made with generative AI">
          AI
          <span role="tooltip" aria-hidden="true" className={styles.tooltip}>
            Made with generative AI.
          </span>
        </span>
      )}

      {/* Sits outside the frame so its explanation box isn't cut off at the card's edge */}
      {project.tag && (
        <span className={styles.tag}>
          <InfoIcon />
          {project.tag}
          {hasNote && (
            <span id={noteId} role="tooltip" className={styles.tooltip}>
              {project.tagNote}
            </span>
          )}
        </span>
      )}
    </div>
  )

  const caption = (
    <div
      className={[styles.caption, captionShown ? styles.captionShown : '', captionInstant ? styles.captionInstant : '']
        .join(' ')
        .trim()}
    >
      <h3 ref={titleRef} className={styles.title}>
        {project.title}
      </h3>
      {project.client && <p className={styles.client}>{project.client}</p>}
      <p className={styles.meta}>{project.meta}</p>
    </div>
  )

  const cardClass = [
    styles.card,
    revealed ? styles.revealed : '',
    loading ? styles.loading : '',
    video ? '' : styles.disabled,
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!video) {
    return (
      <article ref={cardRef} className={cardClass} style={{ '--reveal-delay': delay }}>
        {frame}
        {caption}
      </article>
    )
  }

  return (
    <article ref={cardRef} className={cardClass} style={{ '--reveal-delay': delay }}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => onPlay({ ...project, video })}
        aria-label={`Play ${project.title}`}
        aria-describedby={hasNote ? noteId : undefined}
      >
        {frame}
      </button>
      {caption}
    </article>
  )
}

export default ProjectCard
