import { useEffect, useState } from 'react'
import styles from './ScrollHint.module.css'

// Shows up once the intro has settled
const APPEAR_AFTER = 2600

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3v9.5M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/*
 * "See my work": a small hint that sits just above the timeline when the page
 * first loads, telling visitors there's more below. It appears after the intro,
 * its arrow drifts gently downwards, clicking it scrolls to the first category,
 * and it slides away into the timeline on the first scroll, for good.
 */
function ScrollHint({ targetId }) {
  // waiting → shown → leaving → gone
  const [phase, setPhase] = useState('waiting')

  useEffect(() => {
    // Only for visitors who land at the very top of the page
    if (window.scrollY > 4) return

    const timer = setTimeout(() => {
      // Check again: the page may have jumped down meanwhile (a link to a section, a restored position)
      const stillAtTop = window.scrollY <= 4 && !window.location.hash
      setPhase((p) => (p === 'waiting' ? (stillAtTop ? 'shown' : 'gone') : p))
    }, APPEAR_AFTER)

    const onScroll = () => {
      if (window.scrollY <= 4) return
      clearTimeout(timer)
      setPhase((p) => (p === 'shown' ? 'leaving' : 'gone'))
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (phase === 'waiting' || phase === 'gone') return null

  const goToWork = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`${styles.hint} ${phase === 'leaving' ? styles.leaving : ''}`}
      onClick={goToWork}
      onAnimationEnd={(e) => {
        if (phase === 'leaving' && e.animationName.includes('hintOut')) setPhase('gone')
      }}
    >
      See my work
      <span className={styles.arrow}>
        <ArrowDown />
      </span>
    </button>
  )
}

export default ScrollHint
