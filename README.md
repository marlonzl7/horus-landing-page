# Horus Guardian — Landing Page

> Landing page do **Horus Guardian**, app de localização familiar em tempo real.
> Atividade 01 — Técnicas de Programação WEB FrontEnd (SPTech, 2026/2).

## Integrantes

- Marlon (individual)

> Depoimentos, números de uso e valores exibidos na página são **fictícios**, criados apenas para este protótipo acadêmico.

## Sobre o produto

O Horus Guardian é um app mobile que mostra, em tempo real, onde cada membro da família está, sem que ninguém precise perguntar. Ele ataca a "fricção silenciosa" do dia a dia: o ciclo de mensagens e ligações do tipo *"chegou?"*, *"onde você está?"*, *"tá tudo bem?"*.

**Perguntas que o app responde sozinho:** meu filho chegou na faculdade? Meu pai chegou no trabalho? Minha mãe ainda está no mercado?

**Público:** famílias brasileiras com filhos adultos ou adolescentes. Personas centrais: pai/mãe (cria a família e convida), cônjuge (consulta e é consultado) e filhos (usam de forma passiva, com o app em segundo plano).

**Proposta de valor:** localização atualizada a cada 30 segundos, mesmo com o app fechado, convite por e-mail, plano por família (e não por usuário) e foco em privacidade (LGPD).

| Plano | Preço | Destaques |
|---|---|---|
| Free | R$ 0 | Até 4 membros, atualização a cada 5 min, sem histórico |
| Família | R$ 24,90/mês por família | Tempo real (30s), histórico de 30 dias |
| Fundador | R$ 9,90/mês para sempre | Para quem entrar antes do lançamento |

O Horus é um projeto pessoal (backend em Java/Spring Boot, app em React Native/Expo). Nesta atividade, a landing page funciona como o material de divulgação do produto, e a captação de interessados é simulada por uma lista de espera.

## Jornada de construção

### Trajetória do projeto

O Horus não começou com esta atividade. A landing page é o último passo de um processo que segui desde o início do projeto:

1. **Criação do projeto.** Defini a ideia, o repositório e o escopo do MVP (app mobile + backend), com prazo e limites claros de tempo e de orçamento.
2. **Criação dos artefatos mais importantes.** Antes de codar, escrevi o contexto, o problema, o objetivo, a justificativa, os stakeholders, as histórias de usuário, os requisitos funcionais e não funcionais, os wireframes e a arquitetura (visão geral, pacotes e modelo de dados). Em seguida, a estratégia de testes e o plano de sprints. Também decidi o que *não* entra no MVP.
3. **Criação de arquivos de contexto para a IA.** Reuni esses artefatos em arquivos de contexto (resumo do projeto, documento consolidado, documentação da API, lista de pendências, estrutura e código atual) e os coloquei no projeto da IA. Assim, cada conversa começa já sabendo o que é o Horus, o que foi decidido e o que falta fazer, sem eu precisar reexplicar tudo.
4. **Planejamento da implementação.** Com o contexto carregado, planejei a implementação antes de escrever código. Para esta atividade isso significou: ler o enunciado, montar um checklist de requisitos, escolher a arquitetura, definir as seções da página e dividir o trabalho em partes.
5. **Implementação em módulos, com validação humana (human-in-the-loop).** Cada parte foi gerada com apoio da IA, e eu validei antes de seguir: rodava o projeto localmente, testava no navegador em uma largura de celular (360 × 800, a tela do meu aparelho), apontava problemas e só então fazia o commit e liberava a próxima parte. Foram sete partes: setup, header e hero, benefícios e como funciona, prova social e preços, FAQ e lista de espera, acessibilidade e responsividade, e por fim este README e a entrega.

Esse mesmo ciclo (contexto, planejamento, módulo, validação) foi o que usei no backend e no app do Horus, e a atividade serviu para aplicá-lo ao front-end web.

### Ideia inicial

O Horus nasceu de um problema vivido em casa: a família trocava mensagens o tempo todo só para saber se alguém tinha chegado. A ideia foi tirar essa pergunta da conversa e deixar a informação disponível de forma passiva.

Para a landing page, considerei duas alternativas:

- **Inventar um produto fictício** só para a atividade. Descartei, porque conheço o Horus a fundo (problema, público, preço, limitações) e isso permite uma página mais coerente e um README com decisões reais.
- **Usar o Horus como produto**, tratando a página como protótipo de marketing com dados mockados e avisos claros de que são fictícios. Escolhido.

Alternativas de CTA consideradas: botão de download falso, formulário de cadastro e **lista de espera com modal**. Escolhi a lista de espera porque combina com o plano Fundador (preço travado para quem entra antes do lançamento) e permite exercitar validação de formulário e estados de tela.

### Pesquisa e referências

- **Concorrentes:** Google Family Sharing e Life360. No planejamento do Horus, a leitura foi que são apps em inglês, pesados ou com UX pouco amigável para o público brasileiro. Isso guiou o tom da página: português claro, acolhedor e direto.
- **Estrutura da página:** padrão clássico de landing page de produto (hero, benefícios, como funciona, prova social, preço, FAQ, CTA final).
- **Identidade visual:** reaproveitada do app: azul-marinho `#010440` / `#0B1130` como cor primária, fundo claro `#F0F1F2` e verde como acento dos CTAs (o mesmo verde que marca "você" no mapa do app).
- **Conteúdo:** vem dos documentos do projeto: problema, personas, intervalo de 30 s, localização em segundo plano, convite válido por 48 h, consentimento e LGPD, e as decisões de plano (free sem histórico, plano por família).

### Ferramentas utilizadas

- React 18 com Vite (JavaScript)
- CSS Modules e variáveis CSS (design tokens)
- Arquitetura **FSD (Feature-Sliced Design)**
- VS Code, Git e GitHub
- Claude (Anthropic), para planejamento e geração das partes
- Mockup do celular e do mapa feitos em CSS/SVG, ícones em SVG próprio, sem imagens externas nem bibliotecas de ícones ou animação

### Uso de IA

**Modelo utilizado:** Claude (Anthropic), em um projeto com os arquivos de contexto do Horus carregados.

**Para que usei:**

- Planejamento: leitura do enunciado, checklist de requisitos, riscos e plano em partes.
- Proposta da arquitetura FSD e da estrutura de pastas.
- Geração do código de cada parte, que eu revisei e testei antes de avançar.
- Revisão de acessibilidade (cálculo de contraste, foco, navegação por teclado).
- Rascunho do README, que revisei e ajustei.

**O que mantive das sugestões da IA:**

- FSD em vez de MVVM. A justificativa me convenceu: uma landing page é feita de blocos de apresentação independentes (hero, benefícios, preço, FAQ), que viram *widgets*, e quase não tem estado ou lógica de dados, que é onde o MVVM ajudaria. Também combina com a organização por feature que já uso no backend.
- Vite com JavaScript, para ser mais rápido e não depender de algo que a turma ainda não viu (TypeScript).
- Mockups em CSS/SVG em vez de imagens, por serem leves, rápidos de fazer e coerentes com a identidade do app.
- Depoimentos fictícios baseados nas personas reais (mãe, pai, universitária e uma avó, que representa o usuário não técnico) junto com uma faixa de números mockados e aviso de que são ilustrativos.

**O que decidi eu, sem ser sugestão da IA:** usar o Horus como produto, fazer individualmente, aprovar o FSD, manter a identidade de cores do app com liberdade para ajustá-la, e o nome do repositório.

**O que foi alterado ou descartado:**

- A seção de "Dor/Problema" que estava no plano inicial foi descartada, porque o hero já comunica o problema.
- O menu hambúrguer foi adiado na Parte 2 (no celular o menu sumia) e só entrou na Parte 6.
- O verde do app foi escurecido na landing por causa de contraste (detalhes em "Evolução da solução").

**Onde o resultado não foi satisfatório de primeira:**

- Na Parte 1, a IA gerou um comando para criar as pastas que não funcionou no shell usado (a expansão de chaves não foi interpretada). Faltaram os arquivos dos componentes e o build quebrou. A IA percebeu pela falha do build, recriou os arquivos e revalidou antes de me entregar. Foi um bom lembrete de que a saída da IA precisa ser testada, e por isso mantive o ciclo de rodar e validar a cada parte.
- Na Parte 2, notei que o botão "outline" de teste não fazia nada. Era só um placeholder da Parte 1, e passou a ser um link funcional ("Ver como funciona").

### Evolução da solução

- **Cores:** comecei com a paleta do app. Ao verificar o contraste de forma numérica, o texto branco sobre o verde `#059669` dava **3,77:1**, abaixo dos 4,5:1 recomendados. Escureci o verde para `#047857` (**5,48:1**) e, nas seções escuras, uso um verde mais claro para o texto de destaque (**9,6:1**).
- **CTA:** começou como um botão que só abria um modal vazio. Na Parte 5 virou um formulário real com validação, estado de envio simulado e tela de sucesso. Os botões de cada plano agora passam o plano escolhido, e o modal mostra "Plano de interesse: Fundador".
- **Navegação:** o menu desaparecia no celular (Parte 2). Na Parte 6 ganhou menu hambúrguer, link "Pular para o conteúdo" e foco gerenciado no modal.
- **Estrutura:** o componente `WaitlistModal` ficou em `features` (e não em `shared`) por ter lógica de negócio própria, e usa `entities/plan` para mostrar o plano escolhido, respeitando a regra de importar apenas de camadas abaixo.
- **Texto:** mantive o título "Chega de perguntar *chegou?*" por traduzir a dor real que originou o produto, e mantive frases do tipo "sem a complexidade dos apps gringos" para a página não soar engessada.

### Resultado final

Considero o resultado uma landing page completa, que cobre todos os itens pedidos: identidade visual, proposta, hero, benefícios e diferenciais, representações do produto, como funciona, prova social, preço, FAQ e um CTA funcional (a lista de espera). Ela é responsiva, navegável por teclado e 100% client-side.

O ponto mais forte foi o processo: ter os artefatos e o contexto prontos fez com que o planejamento fosse rápido e que as partes saíssem coerentes com o produto real. O ponto mais fraco é que os mockups são ilustrações em SVG, e não capturas reais do app.

**Próximos passos:**

- Trocar os mockups por capturas reais do app e adicionar uma seção de "Dor/Problema".
- Animações de entrada nas seções (respeitando `prefers-reduced-motion`).
- Ligar a lista de espera a um backend real, o que também permitiria medir conversão.
- Testes automatizados dos componentes (formulário e acordeão).
- Versão em inglês.

## Seções da página

Header → Hero → Benefícios → Como funciona → Depoimentos → Preços → FAQ → CTA final → Footer.

## Arquitetura (FSD)

```
src/
├── app/          # entrada da aplicação e estilos globais (tokens)
├── pages/        # landing: composição dos widgets
├── widgets/      # header, hero, benefits, how-it-works, testimonials, pricing, faq, final-cta, footer
├── features/     # waitlist-form (CTA), faq-accordion
├── entities/     # plan (dados e card de plano)
└── shared/       # ui: Button, Section, Modal, Input, Logo, Icon
```

Regra seguida: cada camada só importa das camadas abaixo (`app → pages → widgets → features → entities → shared`). Cada slice expõe uma API pública por `index.js`, e todos os componentes usam CSS Modules.

## Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`) e hierarquia de títulos.
- Link "Pular para o conteúdo" e foco visível.
- Modal com foco preso, retorno do foco ao fechar e fechamento por Esc.
- Acordeão com `aria-expanded` e `aria-controls`; formulário com labels e erros anunciados.
- Contraste verificado numericamente e suporte a `prefers-reduced-motion`.

## Como rodar

```bash
npm install
npm run dev
```

Para gerar a versão de produção: `npm run build`.
