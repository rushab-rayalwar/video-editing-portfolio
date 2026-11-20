import portrait from '../assets/rushabh.webp'
import Button from './Button/Button.jsx'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="intro" className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Video editor · Photographer · Sound</p>

        <h1 id="hero-title" className={styles.title}>
          <span className={`${styles.line} ${styles.lineName}`}>Hey, I&rsquo;m Rushab.</span>
          <span className={`${styles.line} ${styles.lineSetup}`}>I know when to cut.</span>
          {/* The pause before this line is the joke: the edit holds the shot */}
          <span className={`${styles.line} ${styles.linePunch}`}>And when not to.</span>
        </h1>

        {/* <p className={styles.lede}>
          Music videos, brand films and reels, cut with rhythm and restraint.
        </p> */}

        <div className={styles.actions}>
          <Button href="#work">View my work</Button>
          <Button href="#contact" variant="ghost">
            Get in touch
          </Button>
        </div>
      </div>

      <div className={styles.media}>
        <img
          src={portrait}
          alt="Rushab smiling, wearing glasses and a white shirt"
          width="1080"
          height="1350"
          fetchPriority="high"
        />
      </div>
    </section>
  )
}

export default Hero
