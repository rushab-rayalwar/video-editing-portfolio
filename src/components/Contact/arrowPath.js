// Works out the shape of the hand-drawn arrow in the Contact section:
// one smooth curve that swings out to the right and comes back in to the email.
// All numbers are in pixels, measured from the top-left of the Contact block.

// S = start (just below the end of the headline), E = arrow tip (just right of the email)
// room = how far right of the start/email the curve may swing
// `down`: on narrow screens there's no room beside the email, so the arrow
// drops onto the top of the box instead of coming in from the right.
export function arrowPath(S, E, room, down = false) {
  const w = Math.max(40, Math.min(120, room))
  // base curve: bows out to the right, then comes back in to the email from the right
  let c1 = { x: Math.max(S.x, E.x) + w * 1.1, y: S.y + 4 }
  let c2 = { x: E.x + w * 0.9, y: E.y }
  if (down) {
    const drop = E.y - S.y
    c1 = { x: S.x + Math.max(0, room) * 0.9, y: S.y + drop * 0.15 }
    c2 = { x: E.x + 6, y: E.y - drop * 0.55 }
  }
  const bez = (t, a, b, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d
  const base = (t) => ({ x: bez(t, S.x, c1.x, c2.x, E.x), y: bez(t, S.y, c1.y, c2.y, E.y) })
  const pts = []
  const N = 60
  for (let i = 0; i <= N; i++) pts.push(base(i / N))
  const d = 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')
  // arrowhead along the final direction
  const ang = Math.atan2(E.y - c2.y, E.x - c2.x)
  const h = 11, spread = 0.5
  const p1 = { x: E.x - h * Math.cos(ang - spread), y: E.y - h * Math.sin(ang - spread) }
  const p2 = { x: E.x - h * Math.cos(ang + spread), y: E.y - h * Math.sin(ang + spread) }
  const head = `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L${E.x} ${E.y} L${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  return { d, head }
}
