import { useLayoutEffect, useRef, useState } from 'react'
import arrowStyles from '../Contact/PointerArrow.module.css'
import styles from './ToolsArrow.module.css'

// TRIAL: a crimson hand-drawn arrow from the end of the "What I do" statement to the
// tools list, with a short label written partway along it. Same look and draw-in
// animation as the arrow in Contact. Remove <ToolsArrow /> from About.jsx to take it out.

const bez = (t, a, b, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d

function shape(S, E, c1, c2) {
  const pt = (t) => ({ x: bez(t, S.x, c1.x, c2.x, E.x), y: bez(t, S.y, c1.y, c2.y, E.y) })
  const pts = Array.from({ length: 61 }, (_, i) => pt(i / 60))
  const d = 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')
  const ang = Math.atan2(E.y - c2.y, E.x - c2.x)
  const h = 11
  const spread = 0.5
  const p1 = { x: E.x - h * Math.cos(ang - spread), y: E.y - h * Math.sin(ang - spread) }
  const p2 = { x: E.x - h * Math.cos(ang + spread), y: E.y - h * Math.sin(ang + spread) }
  const head = `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L${E.x} ${E.y} L${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  return { d, head, mid: pt(0.5) }
}

function ToolsArrow({ drawn, label }) {
  const svgRef = useRef(null)
  const [arrow, setArrow] = useState(null)

  useLayoutEffect(() => {
    const container = svgRef.current?.parentElement
    if (!container) return

    const measure = () => {
      const from = container.querySelector('[data-arrow-from]')
      const to = container.querySelector('[data-arrow-to]')
      if (!from || !to) return
      const box = container.getBoundingClientRect()
      const fromRects = from.getClientRects()
      const a = fromRects[fromRects.length - 1] // last line of the statement
      const b = to.getBoundingClientRect() // the first row of tools
      if (!a || !b) return

      const S = { x: a.right - box.left + 12, y: a.top - box.top + a.height * 0.6 }
      if (b.left - box.left > S.x + 80) {
        // side by side: sweep across the gap and arrive at the tools from the left
        const E = { x: b.left - box.left - 12, y: b.top - box.top + b.height / 2 }
        const dx = E.x - S.x
        setArrow(shape(S, E, { x: S.x + dx * 0.35, y: S.y + 46 }, { x: E.x - dx * 0.4, y: E.y }))
      } else {
        // stacked: curve out to the right and come back down onto the tools
        const E = { x: b.left - box.left + Math.min(170, b.width * 0.45), y: b.top - box.top - 4 }
        const edge = window.innerWidth - 16 - box.left
        const swing = Math.max(30, Math.min(90, edge - Math.max(S.x, E.x)))
        setArrow(shape(S, E, { x: Math.max(S.x, E.x) + swing, y: S.y + 10 }, { x: E.x + swing * 0.9, y: E.y - 30 }))
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    window.addEventListener('resize', measure)
    // the blocks slide up slightly as they appear, so measure again once they settle
    container.addEventListener('transitionend', measure)
    document.fonts?.ready.then(measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      container.removeEventListener('transitionend', measure)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`${arrowStyles.arrow} ${drawn ? `${arrowStyles.drawn} ${styles.drawn}` : ''}`}
      aria-hidden="true"
    >
      {arrow && (
        <>
          <path className={arrowStyles.line} d={arrow.d} pathLength="1" />
          <path className={arrowStyles.head} d={arrow.head} pathLength="1" />
          {/* the label sits on the line; its dark outline "cuts" the line around the words */}
          <text className={styles.label} x={arrow.mid.x} y={arrow.mid.y} textAnchor="middle" dominantBaseline="central">
            {label}
          </text>
        </>
      )}
    </svg>
  )
}

export default ToolsArrow
