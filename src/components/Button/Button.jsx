import styles from './Button.module.css'

// A pill-shaped button. Renders a link when given `href`, otherwise a <button>.
// variant: 'primary' (solid white) or 'ghost' (outlined)
function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
