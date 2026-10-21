import { Section } from '@/shared/ui'
import { FaqAccordion } from '@/features/faq-accordion'

const FAQ_ITEMS = [
  { question: 'O app gasta muita bateria?', answer: 'O Horus usa o recurso nativo de localização em segundo plano do celular, com atualização a cada 30 segundos. Ele foi pensado para evitar consumo anormal, e isso é um dos critérios de sucesso do projeto.' },
  { question: 'Quem consegue ver a minha localização?', answer: 'Somente os membros da família da qual você faz parte. O app pede seu consentimento explícito antes de coletar a localização e explica como os dados são usados.' },
  { question: 'Funciona em iPhone e Android?', answer: 'Sim, o app foi criado para as duas plataformas (Android 8+ e iOS 13+). Os primeiros testes com famílias estão sendo feitos em celulares Android.' },
  { question: 'Como convido alguém da família?', answer: 'O administrador informa o e-mail do familiar no app. Ele recebe um convite válido por 48 horas e, ao aceitar, já aparece no mapa.' },
  { question: 'Posso sair da família ou apagar minha conta?', answer: 'Pode. Dentro do app, em Configurações, você sai da família ou exclui a conta e os seus dados quando quiser.' },
  { question: 'Quando o app será lançado?', answer: 'O Horus está em fase de testes com famílias. Entre na lista de espera para ser avisado do lançamento e garantir o plano Fundador.' },
]

export function Faq() {
  return (
    <Section
      id="faq"
      tone="light"
      eyebrow="Dúvidas"
      title="Perguntas frequentes"
      subtitle="Ironicamente, aqui você pode perguntar à vontade."
    >
      <FaqAccordion items={FAQ_ITEMS} />
    </Section>
  )
}
