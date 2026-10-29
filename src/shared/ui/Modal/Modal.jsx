import { useEffect, useId, useRef } from 'react'
import styles from './Modal.module.css'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ isOpen, onClose, title, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Isola o conteúdo de fundo: aplica inert aos irmãos do overlay.
    // O diálogo fica dentro do overlay, portanto não é afetado.
    const overlay = dialogRef.current?.parentElement
    const background = []
    if (overlay?.parentElement) {
      for (const element of overlay.parentElement.children) {
        if (element === overlay) continue
        background.push({ element, wasInert: element.inert })
        element.inert = true
      }
    }

    // Move o foco para dentro do diálogo e prende o Tab nele
    dialogRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((el) => !el.disabled)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      for (const { element, wasInert } of background) {
        element.inert = wasInert
      }
      previouslyFocused?.focus?.()
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleOverlayMouseDown(event) {
    // Evita que o foco padrão do mousedown vá para o body depois do cleanup.
    event.preventDefault()
    onClose()
  }

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          ✕
        </button>
        <h3 id={titleId} className={styles.title}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}
