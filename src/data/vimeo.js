// Turns a Vimeo link into the pieces the embed needs.
// Accepts 'vimeo.com/123456789', 'vimeo.com/123456789/abc123def'
// or 'player.vimeo.com/video/123456789?h=abc123def'.
export function parseVimeo(link) {
  if (!link) return null
  const match = link.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/)
  if (!match) return null
  const hash = match[2] ?? new URL(link, 'https://vimeo.com').searchParams.get('h')
  return { id: match[1], hash: hash || null }
}

// The player address, with Vimeo's own title, name and avatar hidden and tracking off
export function vimeoEmbedUrl({ id, hash }, { autoplay = true } = {}) {
  const params = new URLSearchParams({
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
    autoplay: autoplay ? '1' : '0',
  })
  if (hash) params.set('h', hash)
  return `https://player.vimeo.com/video/${id}?${params}`
}
