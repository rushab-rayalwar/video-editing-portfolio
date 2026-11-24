import { useInView } from '../../hooks/useInView.js'
import styles from './Reveal.module.css'

// A block that blurs into view once, when enough of it is on screen.
// `delay` (in seconds) staggers blocks that appear together.
function Reveal({ as: Tag = 'div', className = '', delay = 0, threshold = 0.3, children, ...rest }) {
  const [ref, inView] = useInView({ threshold, clearOfTimeline: true })
  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.revealed : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
