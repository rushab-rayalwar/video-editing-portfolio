import styles from './Navbar.module.css'

const links = ['Work', 'Photography', 'Sound', 'About', 'Contact']

function Navbar() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          Rushab<span className={styles.dot} aria-hidden="true">.</span>
        </a>
        <nav aria-label="Main">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
