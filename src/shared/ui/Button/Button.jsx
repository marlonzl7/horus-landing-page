import styles from './Button.module.css'

export function Button({
  children,
  variant = 'primary', // primary | secondary | outline | ghost
  size = 'md', // md | lg
  fullWidth = false,
  as: Tag = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    className,
  ].join(' ')

  const extra = Tag === 'button' ? { type: rest.type ?? 'button' } : {}

  return (
    <Tag className={classes} {...extra} {...rest}>
      {children}
    </Tag>
  )
}
