import styles from './TopLinks.module.css'

const links = [
  { label: 'About Me', target: 'about' },
  { label: 'Contact', target: 'contact' },
]

// Two quiet text links in the top-right corner of the page
function TopLinks() {
  const goTo = (e, id) => {
    const section = document.getElementById(id)
    if (!section) return
    e.preventDefault()
    section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.topLinks} aria-label="About and contact">
      <div className={`container ${styles.inner}`}>
        {links.map((link) => (
          <a key={link.target} href={`#${link.target}`} className={styles.link} onClick={(e) => goTo(e, link.target)}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default TopLinks
