import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import RecDot from '../RecDot/RecDot.jsx'
import { useInView } from '../../hooks/useInView.js'
import styles from './WorkSection.module.css'

const PHONE = '(max-width: 640px)'

// True on phone-sized screens, where rows of reels become a sideways swipe row
function useIsPhone() {
  const [isPhone, setIsPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(PHONE).matches)
  useEffect(() => {
    const query = window.matchMedia(PHONE)
    const onChange = () => setIsPhone(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return isPhone
}

// One category of work: a heading, wide frames for landscape pieces,
// and a row of "phone" frames for portrait reels.
function WorkSection({ category, index, onPlay }) {
  const landscape = category.projects.filter((p) => p.orientation === 'landscape')
  const portrait = category.projects.filter((p) => p.orientation !== 'landscape')
  const headingId = `${category.id}-title`

  // Number, heading and description blur into view (in that order) once the whole
  // heading is on screen and clear of the timeline dock. Happens once.
  const [headingRef, headingVisible] = useInView({ threshold: 1, clearOfTimeline: true })

  // Phones: the row of reels reveals as a whole (thumbnails once a third of the row is
  // on screen, captions once nearly all of it is), with the usual stagger
  const isPhone = useIsPhone()
  const [rowRef, rowInView] = useInView({ threshold: 0.3 })
  const [rowCaptionsRef, rowCaptions, rowCaptionsAt] = useInView({ threshold: 0.85, clearOfTimeline: true })
  const row = isPhone ? { inView: rowInView, captions: rowCaptions, captionsAt: rowCaptionsAt } : null

  return (
    <section
      id={category.id}
      className={`container ${styles.section} ${index === 1 ? styles.first : ''}`}
      aria-labelledby={headingId}
    >
      <header className={`${styles.header} ${headingVisible ? styles.headerRevealed : ''}`}>
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <h2 ref={headingRef} id={headingId} className={styles.title}>
          {/* the dot is always visible; only the text blurs into view */}
          <RecDot />
          <span className={styles.titleText}>{category.title}</span>
        </h2>
        <p className={styles.description}>{category.description}</p>
      </header>

      {portrait.length > 0 && (
        <ul
          ref={(el) => {
            rowRef.current = el
            rowCaptionsRef.current = el
          }}
          // TRIAL: rows of three reels fill the width, so the reels are taller
          className={`${styles.reels} ${portrait.length === 3 ? styles.reelsThree : ''}`}
          style={{
            // as many columns as there are reels (up to 4), so a row is never left half empty
            '--cols': Math.min(portrait.length, 4),
            '--cols-md': portrait.length === 4 ? 2 : Math.min(portrait.length, 3),
          }}
        >
          {portrait.map((project, i) => (
            <li key={project.title}>
              <ProjectCard project={project} onPlay={onPlay} revealOrder={i} row={row} />
            </li>
          ))}
        </ul>
      )}

      {landscape.length > 0 && (
        <ul
          className={styles.wide}
          // two landscape videos sit side by side; a single one keeps the full width
          style={{ '--wide-cols': Math.min(landscape.length, 2) }}
        >
          {landscape.map((project, i) => (
            <li key={project.title}>
              <ProjectCard project={project} onPlay={onPlay} revealOrder={i} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkSection
