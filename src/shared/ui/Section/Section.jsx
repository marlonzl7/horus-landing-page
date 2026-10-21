import styles from './Section.module.css'

export function Section({
  id,
  tone = 'light', // light | white | dark
  eyebrow,
  title,
  subtitle,
  children,
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`}>
      <div className={styles.container}>
        {(eyebrow || title || subtitle) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
