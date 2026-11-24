import { useEffect, useRef, useState } from 'react'
import RecDot from '../RecDot/RecDot.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import { useInView } from '../../hooks/useInView.js'
import { contact } from '../../data/contact.js'
import styles from './Contact.module.css'

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
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

// Contact: a closing line, the email front and centre, WhatsApp, and a small copyright line.
function Contact({ index }) {
  const [headingRef, headingVisible] = useInView({ threshold: 1, clearOfTimeline: true })
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef(null)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked: the email is still a link they can click or select
    }
  }

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

      <Reveal as="p" className={styles.headline} threshold={0.6}>
        {contact.headline}
      </Reveal>
      {contact.subline && (
        <Reveal as="p" className={styles.subline} delay={0.1} threshold={1}>
          {contact.subline}
        </Reveal>
      )}

      <Reveal className={styles.actions} delay={0.15} threshold={0.5}>
        <a className={styles.email} href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <div className={styles.buttons}>
          <button type="button" className={styles.pill} onClick={copyEmail}>
            <CopyIcon />
            <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy email'}</span>
          </button>
          {whatsappUrl && (
            <a className={styles.pill} href={whatsappUrl} target="_blank" rel="noreferrer">
              <ChatIcon />
              Message on WhatsApp
            </a>
          )}
        </div>
      </Reveal>

      <Reveal as="footer" className={styles.footer} threshold={1}>
        <span>© {new Date().getFullYear()} Rushab</span>
      </Reveal>
    </section>
  )
}

export default Contact
