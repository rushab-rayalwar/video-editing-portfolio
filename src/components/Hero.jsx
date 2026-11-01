import portrait from '../assets/rushabh.webp'
import './Hero.css'

function Hero() {
  return (
    <section id="intro" className="hero container" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__eyebrow">Video editor · Photographer · Sound</p>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__line hero__line--1">Hey, I&rsquo;m Rushab.</span>
          <span className="hero__line hero__line--2">I know when to cut.</span>
          {/* The pause before this line is the joke: the edit holds the shot */}
          <span className="hero__line hero__line--3">And when not to.</span>
        </h1>

        {/* <p className="hero__lede">
          Music videos, brand films and reels, cut with rhythm and restraint.
        </p> */}

        <div className="hero__actions">
          <a href="#work" className="btn btn--primary">
            View my work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero__media">
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
