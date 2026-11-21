import { useEffect, useRef } from 'react'
import { vimeoEmbedUrl } from '../../data/vimeo.js'
import styles from './VideoModal.module.css'

// Full-screen player. Opens over the page, plays the Vimeo video with sound,
// and closes with the close button, the Escape key or a click on the backdrop.
function VideoModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()

    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null
  const isPortrait = project.orientation !== 'landscape'

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close video">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <figure className={styles.figure}>
        <div className={`${styles.player} ${isPortrait ? styles.portrait : styles.landscape}`}>
          <iframe
            src={vimeoEmbedUrl(project.video)}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <figcaption className={styles.caption}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.meta}>{project.meta}</span>
        </figcaption>
      </figure>
    </div>
  )
}

export default VideoModal
