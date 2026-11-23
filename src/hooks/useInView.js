import { useEffect, useRef, useState } from 'react'

/*
 * Tells you when an element has scrolled into view, using the browser's
 * Intersection Observer (no scroll listeners, no animation library).
 *
 * Options:
 *   threshold        how much of the element must be visible, from 0 to 1
 *                    (0.25 = a quarter, 1 = all of it)
 *   clearOfTimeline  treat the strip behind the floating timeline dock at the
 *                    bottom of the screen as not visible
 *   once             stop watching after the first time (default), so anything
 *                    triggered by it happens only once per page visit
 *
 * Usage:
 *   const [ref, inView, inViewAt] = useInView()
 *   (inViewAt is the moment it first came into view, from performance.now())
 *   <div ref={ref} className={inView ? 'shown' : ''} />
 */
export function useInView({ threshold = 0.25, rootMargin = '0px', clearOfTimeline = false, once = true } = {}) {
  const ref = useRef(null)
  // Very old browsers without Intersection Observer just show everything
  const [inView, setInView] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const [inViewAt, setInViewAt] = useState(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return

    let margin = rootMargin
    if (clearOfTimeline) {
      // Shrink the visible area by the height of the timeline dock (plus a little breathing room)
      const dock = document.querySelector('nav[aria-label="Page timeline"]')
      const dockHeight = dock ? dock.offsetHeight : 0
      margin = `0px 0px -${dockHeight + 8}px 0px`
    }

    // Treat "nearly all" as all, since browsers can report 0.999 for a fully visible element
    const needed = Math.max(0, threshold - 0.01)

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The browser also reports the starting position right away, so check the actual amount visible
        if (entry.isIntersecting && entry.intersectionRatio >= needed) {
          setInView(true)
          setInViewAt((at) => at ?? performance.now())
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin: margin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, clearOfTimeline, once])

  return [ref, inView, inViewAt]
}
