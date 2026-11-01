import './Navbar.css'

const links = ['Work', 'Photography', 'Sound', 'About', 'Contact']

function Navbar() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="/" className="nav__logo">
          Rushabh<span className="nav__dot" aria-hidden="true">.</span>
        </a>
        <nav aria-label="Main">
          <ul className="nav__links">
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
