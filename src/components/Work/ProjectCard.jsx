import { useEffect, useState } from 'react'
import { fetchVimeoThumbnail, parseVimeo } from '../../data/vimeo.js'
import styles from './ProjectCard.module.css'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}

// A single piece of work. Plays in the full-screen player when it has a Vimeo link;
// otherwise shows a quiet "Coming soon" frame.
function ProjectCard({ project, onPlay }) {
  const video = parseVimeo(project.vimeo)
  const isPortrait = project.orientation !== 'landscape'

  // A `poster` set in projects.js wins; otherwise use the thumbnail chosen on Vimeo
  const [vimeoPoster, setVimeoPoster] = useState(null)
  const [posterLoaded, setPosterLoaded] = useState(false)
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

  const frame = (
    <div className={`${styles.frame} ${isPortrait ? styles.portrait : styles.landscape}`}>
      {poster && (
        <img
          className={`${styles.poster} ${posterLoaded ? styles.posterLoaded : ''}`}
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setPosterLoaded(true)}
          onError={() => setVimeoPoster(null)}
        />
      )}
      <span className={styles.play}>
        <PlayIcon />
      </span>
      {!video && <span className={styles.soon}>Coming soon</span>}
      {project.tag && <span className={styles.tag}>{project.tag}</span>}
    </div>
  )

  const caption = (
    <div className={styles.caption}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.meta}>{project.meta}</p>
    </div>
  )

  if (!video) {
    return (
      <article className={`${styles.card} ${styles.disabled}`}>
        {frame}
        {caption}
      </article>
    )
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => onPlay({ ...project, video })}
        aria-label={`Play ${project.title}`}
      >
        {frame}
      </button>
      {caption}
    </article>
  )
}

export default ProjectCard
