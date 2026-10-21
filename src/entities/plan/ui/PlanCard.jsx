import { Button } from '@/shared/ui'
import styles from './PlanCard.module.css'

export function PlanCard({ plan, onSelect }) {
  return (
    <article className={`${styles.card} ${plan.highlight ? styles.highlight : ''}`}>
      {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
      <h3 className={styles.name}>{plan.name}</h3>
      <p className={styles.description}>{plan.description}</p>

      <p className={styles.priceRow}>
        {plan.originalPrice && <s className={styles.original}>{plan.originalPrice}</s>}
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.period}>{plan.period}</span>
      </p>

      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <Button
        variant={plan.highlight ? 'primary' : 'secondary'}
        fullWidth
        onClick={() => onSelect(plan.id)}
      >
        {plan.cta}
      </Button>
    </article>
  )
}
