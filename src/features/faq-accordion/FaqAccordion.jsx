import { useId, useState } from 'react'
import styles from './FaqAccordion.module.css'

export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.question} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className={styles.icon} aria-hidden="true">+</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={styles.panel}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
