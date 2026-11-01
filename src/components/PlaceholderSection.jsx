import './PlaceholderSection.css'

// An empty, clearly marked slot for a section we haven't designed yet.
function PlaceholderSection({ id, label, index }) {
  return (
    <section id={id} className="placeholder container" aria-label={label}>
      <div className="placeholder__frame">
        <span className="placeholder__index">{String(index).padStart(2, '0')}</span>
        <h2 className="placeholder__title">{label}</h2>
        <p className="placeholder__note">Coming soon</p>
      </div>
    </section>
  )
}

export default PlaceholderSection
