import RecDot from './RecDot/RecDot.jsx'
import styles from './PlaceholderSection.module.css'

// An empty, clearly marked slot for a section we haven't designed yet.
function PlaceholderSection({ id, label, index }) {
  return (
    <section id={id} className={`container ${styles.placeholder}`} aria-label={label}>
      <div className={styles.frame}>
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <h2 className={styles.title}>
          <RecDot />
          {label}
        </h2>
        <p className={styles.note}>Coming soon</p>
      </div>
    </section>
  )
}

export default PlaceholderSection
