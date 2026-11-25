import RecDot from '../RecDot/RecDot.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import PointerArrow from './PointerArrow.jsx'
import { useInView } from '../../hooks/useInView.js'
import { contact } from '../../data/contact.js'
import styles from './Contact.module.css'

// Splits the headline around the accent word, so that word can be coloured
function withAccent(text, word, className) {
  const at = word ? text.indexOf(word) : -1
  if (at === -1) return text
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{word}</span>
      {text.slice(at + word.length)}
    </>
  )
}

// small up-right arrow: "this opens something"
function OpenIcon() {
  return (
    <svg className={styles.openIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5 11 11 5M6 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// envelope, for the email box
function MailIcon() {
  return (
    <svg className={styles.boxIcon} viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.75" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="m2.5 4.5 5.5 4.25 5.5-4.25" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

// speech bubble, for the WhatsApp box (a plain chat icon, not WhatsApp's logo)
function ChatIcon() {
  return (
    <svg className={styles.boxIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2a6 6 0 0 0-5.2 9l-.8 3 3.1-.8A6 6 0 1 0 8 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Contact: a closing line with a hand-drawn arrow to the email, WhatsApp as the alternative,
// and a small thank-you and copyright at the very end.
function Contact({ index }) {
  const [headingRef, headingVisible] = useInView({ threshold: 1, clearOfTimeline: true })
  // the arrow draws once the email is fully on screen
  const [emailRef, emailVisible] = useInView({ threshold: 1, clearOfTimeline: true })
  const whatsappUrl = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
    : ''

  return (
    <section id="contact" className={`container ${styles.section}`} aria-labelledby="contact-title">
      <header className={`${styles.header} ${headingVisible ? styles.headerRevealed : ''}`}>
        <span className={styles.index}>{String(index).padStart(2, '0')}</span>
        <h2 ref={headingRef} id="contact-title" className={styles.title}>
          <RecDot />
          <span className={styles.titleText}>Contact</span>
        </h2>
      </header>

      {/* Headline, email and buttons; the arrow is drawn over this block */}
      <div className={styles.pitch}>
        <Reveal as="p" className={styles.headline} threshold={0.6}>
          <span data-arrow-from>{withAccent(contact.headline, contact.headlineAccent, styles.accent)}</span>
        </Reveal>
        {contact.subline && (
          <Reveal as="p" className={styles.subline} delay={0.1} threshold={1}>
            {contact.subline}
          </Reveal>
        )}

        {/* Email and WhatsApp as two matching boxes, with a quiet "or" between them */}
        <Reveal className={styles.actions} delay={0.15} threshold={0.5}>
          <a ref={emailRef} data-arrow-to className={styles.box} href={`mailto:${contact.email}`}>
            <MailIcon />
            <span className={styles.boxText}>{contact.email}</span>
            <OpenIcon />
          </a>
          {whatsappUrl && (
            <>
              <p className={styles.or}>or</p>
              <a className={styles.box} href={whatsappUrl} target="_blank" rel="noreferrer">
                <ChatIcon />
                <span className={styles.boxText}>Message on WhatsApp</span>
                <OpenIcon />
              </a>
            </>
          )}
        </Reveal>
        <PointerArrow drawn={emailVisible} />
      </div>

      <Reveal as="footer" className={styles.footer} threshold={1}>
        {contact.thanks && <p className={styles.thanks}>{contact.thanks}</p>}
        <span>© {new Date().getFullYear()} Rushab</span>
      </Reveal>
    </section>
  )
}

export default Contact
