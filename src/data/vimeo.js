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

/*
 * Thumbnails
 * Vimeo's oEmbed service returns each video's thumbnail. Unlisted videos need the
 * full link including the privacy hash, otherwise Vimeo answers "not found".
 * Results are cached so each thumbnail is only looked up once per visit.
 */
const thumbnailCache = new Map()

export function fetchVimeoThumbnail({ id, hash }, width = 960) {
  const key = `${id}:${width}`
  if (thumbnailCache.has(key)) return thumbnailCache.get(key)

  const link = hash ? `https://vimeo.com/${id}/${hash}` : `https://vimeo.com/${id}`
  const request = fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(link)}&width=${width}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Vimeo ${res.status}`))))
    .then((data) => {
      if (!data.thumbnail_url) return null
      // Ask Vimeo's image server for a sharper size than the small default
      return data.thumbnail_url.replace(/_\d+(x\d+)?(?=$|\?)/, `_${width}`)
    })
    .catch(() => {
      thumbnailCache.delete(key) // let a later visit try again
      return null
    })

  thumbnailCache.set(key, request)
  return request
}
