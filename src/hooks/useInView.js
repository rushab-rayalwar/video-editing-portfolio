import { useEffect, useRef, useState } from 'react'

/*
 * Tells you when an element has scrolled into view, using the browser's
 * Intersection Observer (no scroll listeners, no animation library).
 *
 * With `once: true` (the default) it stops watching after the first time,
 * so anything triggered by it happens only once per page visit.
 *
 * Usage:
 *   const [ref, inView] = useInView()
 *   <div ref={ref} className={inView ? 'shown' : ''} />
 */
// threshold 0.25: fires once a quarter of the element is inside the viewport
export function useInView({ threshold = 0.25, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  // Very old browsers without Intersection Observer just show everything
  const [inView, setInView] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
