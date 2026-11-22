import styles from './RecDot.module.css'

// The small glowing red "recording" dot. It scales with the text it sits in,
// so it works beside a small label or a huge heading.
function RecDot({ className = '' }) {
  return <span className={`${styles.dot} ${className}`.trim()} aria-hidden="true" />
}

export default RecDot
