import { Section } from '@/shared/ui'
import { PLANS, PlanCard } from '@/entities/plan'
import styles from './Pricing.module.css'

export function Pricing({ onSelectPlan }) {
  return (
    <Section
      id="precos"
      tone="dark"
      eyebrow="Preços"
      title="Um valor para a família inteira"
      subtitle="Comece de graça. Quem entra na lista antes do lançamento garante o preço de fundador para sempre."
    >
      <div className={styles.grid}>
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
        ))}
      </div>
      <p className={styles.note}>Valores ilustrativos deste protótipo acadêmico. Nenhuma cobrança é realizada.</p>
    </Section>
  )
}
