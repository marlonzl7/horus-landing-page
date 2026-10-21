# Horus Guardian — Landing Page

> Landing page do **Horus Guardian**, app de localização familiar em tempo real.
> Atividade 01 — Técnicas de Programação WEB FrontEnd (SPTech, 2026/2).

## Integrantes

- Marlon (individual)

> Os depoimentos, números e avaliações exibidos na página são **fictícios**, criados apenas para este protótipo acadêmico.

## Sobre o produto

O Horus Guardian é um app mobile que mostra, em tempo real, onde cada membro da família está, sem que ninguém precise perguntar. Ele ataca a "fricção silenciosa" do dia a dia: o ciclo de mensagens e ligações do tipo *"chegou?"*, *"onde você está?"*, *"tá tudo bem?"*.

**Perguntas que o app responde sozinho:**

- Meu filho chegou na faculdade?
- Meu pai chegou no trabalho?
- Minha mãe ainda está no mercado?

**Público:** famílias brasileiras com filhos adultos ou adolescentes. Os personagens centrais são o pai/mãe (cria a família e convida), o cônjuge (consulta e é consultado) e os filhos (usam de forma passiva, com o app em segundo plano).

**Proposta de valor:** localização atualizada a cada 30 segundos, mesmo com o app fechado, com convite por e-mail, plano por família (e não por usuário) e foco em privacidade (LGPD).

**Modelo de oferta usado na landing:**

| Plano | Preço | Destaques |
|---|---|---|
| Free | R$ 0 | Até 4 membros, atualização a cada 5 min, sem histórico |
| Família | R$ 24,90/mês por família | Tempo real (30s), histórico de 30 dias |
| Fundador | R$ 9,90/mês para sempre | Para quem entrar antes do lançamento |

O Horus é um projeto pessoal real (backend em Java/Spring Boot, app em React Native/Expo). Para esta atividade, a landing page funciona como o material de divulgação do produto, com a captação de interessados simulada por uma lista de espera.

## Jornada de construção

### Ideia inicial

O Horus nasceu de um problema vivido em casa: a família trocava mensagens o tempo todo só para saber se alguém tinha chegado. A ideia foi tirar essa pergunta da conversa e deixar a informação disponível de forma passiva.

Para a landing page, as alternativas consideradas foram:

- **Inventar um produto novo e fictício** só para a atividade. Descartado: eu conheço o Horus a fundo (problema, público, preço, limitações), o que permite uma página mais coerente e um README com decisões reais.
- **Usar o Horus como produto**, tratando a página como protótipo de marketing com dados mockados. Escolhido.

Alternativas de CTA consideradas: botão de download falso, formulário de cadastro e **lista de espera com modal**. Fiquei com a lista de espera, porque combina com o plano Fundador (preço travado para quem entra antes do lançamento).

### Pesquisa e referências

- **Concorrentes:** Google Family Sharing e Life360. No planejamento do Horus, a leitura foi que são produtos em inglês, pesados ou com UX pouco amigável para o público brasileiro. Isso guiou o tom da landing: português claro, acolhedor e direto, com foco em simplicidade.
- **Referências de estrutura:** padrão clássico de landing page de produto (hero, problema, benefícios, como funciona, prova social, preço, FAQ, CTA final).
- **Identidade visual:** reaproveitada do próprio app: azul-marinho `#010440` / `#0B1130` como cor primária, fundo claro `#F0F1F2` e verde `#059669` (a cor do pin "você" no mapa) como acento dos CTAs. Na landing, tenho liberdade para ajustar tons e tipografia.
- **Conteúdo das seções:** vem da documentação do projeto (problema, personas, requisitos como atualização a cada 30s, localização em segundo plano, consentimento e LGPD).

### Ferramentas utilizadas

- React com Vite
- CSS Modules
- Arquitetura **FSD (Feature-Sliced Design)**
- VS Code
- Git e GitHub
- Claude (planejamento e apoio no código)
- Mockups do celular e do mapa feitos em CSS/SVG, sem imagens externas

**Por que FSD e não MVVM:** uma landing page é dividida em blocos independentes (hero, benefícios, preço, FAQ), que se encaixam naturalmente em *widgets* e *features*. MVVM é mais útil quando há muito estado e lógica de dados, e aqui quase tudo é apresentação. Além disso, no backend do Horus eu já organizo o código por feature/agregado (`family/`, `realtime/`, `auth/`), então o modelo mental é o mesmo.

### Uso de IA

**Modelo utilizado:** Claude.

**Onde ajudou até agora:**

- Planejamento da atividade: leitura do enunciado, checklist de requisitos e riscos (prazo, regra do produto fictício, README).
- Proposta de arquitetura FSD, estrutura de pastas e divisão da página em seções.
- Plano de desenvolvimento em partes com estimativa de tempo.

## Arquitetura (FSD)

```
src/
├── app/          # entrada da aplicação e estilos globais
├── pages/        # composição da landing page
├── widgets/      # header, hero, benefits, how-it-works, testimonials, pricing, faq, footer
├── features/     # waitlist-form, faq-accordion
├── entities/     # plan (dados e card de plano)
└── shared/       # ui (Button, Modal, Input, Section), lib, assets
```

Regra seguida: cada camada só importa das camadas abaixo dela.

## Como rodar

```bash
npm install
npm run dev
```
