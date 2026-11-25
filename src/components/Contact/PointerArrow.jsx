import { useLayoutEffect, useRef, useState } from 'react'
import { arrowPath } from './arrowPath.js'
import styles from './PointerArrow.module.css'

// A crimson, hand-drawn arrow from the end of the headline to the email.
// Place it inside the block that holds both (marked data-arrow-from / data-arrow-to).
// It measures them on the page (and again whenever the layout changes),
// then draws itself once `drawn` turns true.
function PointerArrow({ drawn }) {
  const svgRef = useRef(null)
  const [shape, setShape] = useState(null)

  useLayoutEffect(() => {
    const container = svgRef.current?.parentElement
    if (!container) return

    const measure = () => {
      const from = container.querySelector('[data-arrow-from]')
      const to = container.querySelector('[data-arrow-to]')
      if (!from || !to) return
      const box = container.getBoundingClientRect()
      const fromRects = from.getClientRects()
      const toRects = to.getClientRects()
      const a = fromRects[fromRects.length - 1] // last line of the headline
      const b = toRects[toRects.length - 1] // last line of the email
      if (!a || !b) return

      const S = { x: a.right - box.left + 10, y: a.top - box.top + a.height * 0.62 }
      // how far right the curve may swing before it would leave the screen
      const edge = window.innerWidth - 14 - box.left
      const beside = { x: b.right - box.left + 14, y: b.top - box.top + b.height * 0.55 }
      if (edge - beside.x >= 56) {
        // enough space: come in to the email from the right
        setShape(arrowPath(S, beside, edge - Math.max(S.x, beside.x)))
      } else {
        // narrow screen: drop onto the top edge of the email box, near its right end
        const onTop = { x: b.right - box.left - 34, y: b.top - box.top - 7 }
        setShape(arrowPath(S, onTop, edge - S.x, true))
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    window.addEventListener('resize', measure)
    // the headline and email slide up slightly as they appear, so measure again once they settle
    container.addEventListener('transitionend', measure)
    document.fonts?.ready.then(measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      container.removeEventListener('transitionend', measure)
    }
  }, [])

  return (
    <svg ref={svgRef} className={`${styles.arrow} ${drawn ? styles.drawn : ''}`} aria-hidden="true">
      {shape && (
        <>
          <path className={styles.line} d={shape.d} pathLength="1" />
          <path className={styles.head} d={shape.head} pathLength="1" />
        </>
      )}
    </svg>
  )
}

export default PointerArrow
