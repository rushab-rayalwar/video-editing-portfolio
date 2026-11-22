import ProjectCard from './ProjectCard.jsx'
import RecDot from '../RecDot/RecDot.jsx'
import styles from './WorkSection.module.css'

// One category of work: a heading, wide frames for landscape pieces,
// and a row of "phone" frames for portrait reels.
function WorkSection({ category, index, onPlay }) {
  const landscape = category.projects.filter((p) => p.orientation === 'landscape')
  const portrait = category.projects.filter((p) => p.orientation !== 'landscape')
  const headingId = `${category.id}-title`

  return (
    <section id={category.id} className={`container ${styles.section}`} aria-labelledby={headingId}>
      <header className={styles.header}>
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <h2 id={headingId} className={styles.title}>
          <RecDot />
          {category.title}
        </h2>
        <p className={styles.description}>{category.description}</p>
      </header>

      {portrait.length > 0 && (
        <ul
          className={styles.reels}
          style={{
            // as many columns as there are reels (up to 4), so a row is never left half empty
            '--cols': Math.min(portrait.length, 4),
            '--cols-md': portrait.length === 4 ? 2 : Math.min(portrait.length, 3),
          }}
        >
          {portrait.map((project, i) => (
            <li key={project.title}>
              <ProjectCard project={project} onPlay={onPlay} revealOrder={i} />
            </li>
          ))}
        </ul>
      )}

      {landscape.length > 0 && (
        <ul className={styles.wide}>
          {landscape.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} onPlay={onPlay} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkSection
