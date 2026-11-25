import RecDot from '../RecDot/RecDot.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import ToolIcon from './ToolIcon.jsx'
import { useInView } from '../../hooks/useInView.js'
import { about } from '../../data/about.js'
import styles from './About.module.css'

// About: a short statement, the tools I use (plus, optionally, what I do), and a quiet sign-off line.
function About({ index }) {
  // Same heading behaviour as the work categories: number, then heading, once fully in view
  const [headingRef, headingVisible] = useInView({ threshold: 1, clearOfTimeline: true })
  const hasServices = about.services?.length > 0

  return (
    <section id="about" className={`container ${styles.section}`} aria-labelledby="about-title">
      <header className={`${styles.header} ${headingVisible ? styles.headerRevealed : ''}`}>
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <h2 ref={headingRef} id="about-title" className={styles.title}>
          <RecDot />
          <span className={styles.titleText}>About</span>
        </h2>
      </header>

      {/* Statement on the left, tools on the right (stacked on smaller screens) */}
      <div className={styles.body}>
        <Reveal as="p" className={styles.bio} threshold={0.5}>
          {about.bio}
        </Reveal>

        <div className={`${styles.details} ${hasServices ? '' : styles.single}`}>
          {/* "What I can do for you" shows only if services are listed in data/about.js */}
          {hasServices && (
            <Reveal className={styles.block}>
              <h3 className={styles.label}>What I can do for you</h3>
              <ul className={styles.services}>
                {about.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal className={styles.block} delay={hasServices ? 0.12 : 0}>
            <h3 className={styles.label}>Tools</h3>
            <dl className={styles.tools}>
              {about.tools.map(({ group, icon, items }) => (
                <div key={group} className={styles.toolRow}>
                  <dt>
                    <ToolIcon name={icon} className={styles.toolIcon} />
                    {group}
                  </dt>
                  <dd>{items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {about.signoff && (
        <Reveal as="p" className={styles.signoff} threshold={1}>
          {about.signoff}
        </Reveal>
      )}
    </section>
  )
}

export default About
