# Auditoria da landing page — Horus Guardian

- **URL:** http://localhost:5173
- **Data:** 28/10/2026
- **Navegador:** Chromium 155.0.8059.12 (Chrome for Testing) via Playwright MCP
- **Escopo:** responsividade, navegação, CTAs/formulário, FAQ, acessibilidade e console/rede
- **Regra desta etapa:** nenhum arquivo de código foi alterado; apenas observação e evidências.
- **Método:** medições reais no DOM (`getBoundingClientRect`, `scrollWidth`/`clientWidth`, `getComputedStyle`, árvore de acessibilidade) e interações via Playwright. Para fidelidade das larguras, a barra de rolagem vertical foi ocultada por CSS injetado em runtime (overlay scrollbar, como em mobile); nenhum estilo do projeto foi modificado.

**Resumo:** 17/17 testes executados com resultado **OK**, 0 falhas bloqueantes. Foram encontrados 1 problema de gravidade **média** e 5 de gravidade **baixa** (detalhados ao final).

## Resultados

| ID | Teste | Resultado (OK / FALHA) | Evidência (arquivo) | Observação |
|---|---|---|---|---|
| R1 | Screenshots full page em 320x640, 360x800, 768x1024 e 1280x800 | OK | `docs/evidencias/antes/R1-320.png`, `R1-360.png`, `R1-768.png`, `R1-1280.png` | Alturas das páginas: 10.955 px (320), 10.345 px (360), 8.126 px (768) e 6.054 px (1280). Layout empilha corretamente no mobile e usa grid no desktop. |
| R2 | Rolagem horizontal e elementos que ultrapassam/cortam a tela em cada largura | OK | `docs/evidencias/antes/R2-320.json`, `R2-360.json`, `R2-768.json`, `R2-1280.json` | `scrollWidth == clientWidth` nas 4 larguras (320, 360, 768, 1280): **não há rolagem horizontal**. 320/360: apenas elementos internos do SVG decorativo do mockup de celular ficam fora da viewport (recortados pelo próprio SVG, sem impacto no layout). Nenhum texto ou card cortado. |
| N1 | Clique nos 4 links do menu e verificação de scroll + título sob o header fixo | OK | `docs/evidencias/antes/N1-beneficios.png`, `N1-como-funciona.png`, `N1-precos.png`, `N1-faq.png` | Hash correto nos 4 casos. Seção termina em `top = 72 px` e header tem 74 px de altura (2 px de sobreposição), mas o `h2` fica em ~204 px, sempre visível. Títulos nunca escondidos. |
| N2 | Menu hambúrguer em 360 px: abrir, clicar em link (fecha), reabrir e fechar com Esc | OK | `docs/evidencias/antes/N2-menu-aberto.png` | Abre com `aria-expanded="true"` e label "Fechar menu"; clicar em "Preços" fecha o menu, atualiza `aria-expanded="false"` e rola até `#precos`; reabre; Esc fecha e o foco permanece no botão. |
| N3 | Link "Pular para o conteúdo" via Tab | OK | `docs/evidencias/antes/N3-skip-link-foco.png` | É o 1º Tab stop, fica visível (`top = 8 px`, outline 3 px) e Enter leva a `#conteudo`. O `activeElement` vira `BODY` (main sem `tabindex="-1"`), porém o Tab seguinte já cai no CTA do hero, ou seja, o header é realmente pulado. |
| C1 | Abertura do modal pelos 7 CTAs (header, hero, "Como funciona", 3 planos e CTA final) | OK | `docs/evidencias/antes/C2-modal-plano-fundador.png`, `C1-modal-320.png` | 7/7 abrem o diálogo "Lista de espera". Fechamento por Esc funciona em todos e o foco retorna ao botão que abriu em todos os casos. Modal também cabe em 320x640 (16–304 px de largura, 106–534 px de altura). |
| C2 | "Quero ser fundador" mostra o plano escolhido | OK | `docs/evidencias/antes/C2-modal-plano-fundador.png` | Texto: "Plano de interesse: Fundador (R$ 9,90 /mês, para sempre)." |
| C3 | Submit vazio exibe erros de nome e e-mail | OK | `docs/evidencias/antes/C3-erros-vazio.png` | Dois `role="alert"`: "Informe seu nome." e "Informe um e-mail válido."; ambos os inputs com `aria-invalid="true"` e `aria-describedby` apontando para o erro. |
| C4 | E-mail inválido "abc@" exibe erro de e-mail | OK | `docs/evidencias/antes/C4-erro-email.png` | Apenas o erro de e-mail aparece; nome permanece válido (`aria-invalid="false"`). |
| C5 | Dados válidos exibem tela de sucesso | OK | `docs/evidencias/antes/C5-sucesso.png` | Após ~700 ms: "Pronto, Maria! Você está na lista." e confirmação do e-mail informado; botão "Fechar" presente. |
| C6 | Fechar e reabrir o modal deixa o formulário limpo | OK | `docs/evidencias/antes/C6-modal-limpo.png` | Reaberto com inputs vazios, `aria-invalid="false"` e nenhum alerta. Estado é descartado ao desmontar o formulário. |
| C7 | Esc fecha, foco volta ao opener e Tab fica preso no modal | OK | `docs/evidencias/antes/C7-foco-modal.png` | Esc fecha; foco volta ao botão de origem nos 7 CTAs. Tab cicla Fechar → Nome → E-mail → Enviar → Fechar, sem escapar; Shift+Tab no primeiro item vai para o último. |
| F1 | Clique em cada pergunta do FAQ: abre uma por vez | OK | `docs/evidencias/antes/F1-faq.png` | No máximo 1 painel aberto. Clicar na pergunta aberta fecha todas; clicar em outra fecha a anterior e abre a nova. Altura do painel fechado = 0, aberto = 65–89 px. |
| F2 | FAQ por teclado (Tab + Enter e Tab + Espaço) | OK | `docs/evidencias/antes/F2-faq-foco-teclado.png` | 14 Tabs do topo até a 1ª pergunta. Enter fecha a que estava aberta, Espaço reabre, Tab vai para a próxima e Enter a abre (mantendo uma única aberta). Outline visível de 3 px. |
| A1 | Snapshot de acessibilidade: títulos, landmarks, nomes acessíveis e labels | OK | `docs/evidencias/antes/A1-snapshot.yml` | Checklist atendido: 1 `h1`, 6 `h2` e 18 `h3` em ordem lógica; landmarks `banner`, `navigation` ("Seções da página"), `main`, `contentinfo` e `navigation` ("Links do rodapé"); 0 botões/links sem nome acessível; 0 campos sem label. **Ressalva:** respostas fechadas do FAQ continuam expostas na árvore (ver problema M1). |
| A2 | Navegação somente com Tab: ordem, foco visível e clicáveis inalcançáveis | OK | `docs/evidencias/antes/A2-foco-visivel.png` | 24 paradas na ordem lógica: skip → logo → 4 links → CTA do header → CTAs do hero → "Como funciona" → 3 planos → 6 perguntas do FAQ → CTA final → 4 links do rodapé. Todas com outline `solid 3px #047857`; nenhum `tabindex` positivo; nenhum elemento com `cursor:pointer` fora da ordem de foco. |
| T1 | Erros e avisos do console | OK | `docs/evidencias/antes/T1-console.txt` | 0 erros e 0 warnings no load e durante as interações. Apenas 2 mensagens `debug` do Vite ("connecting/connected") e 1 `info` do React DevTools. Nenhum `pageerror`. |
| T2 | Requisições de rede que falharam | OK | `docs/evidencias/antes/T2-network.txt` | Nenhuma requisição falhou e nenhuma resposta >= 400. Todos os assets locais e o CSS do Google Fonts responderam 200. |

## Problemas encontrados (por gravidade)

> Nenhum problema de gravidade **alta** foi encontrado.

### MÉDIA

**M1. FAQ: respostas fechadas continuam na árvore de acessibilidade**
- **O que acontece:** os 6 painéis (`role="region"`) são sempre renderizados. O fechamento é apenas visual (`grid-template-rows: 0fr`), sem `hidden`, `aria-hidden` ou `visibility:hidden`. No snapshot de acessibilidade, todas as respostas aparecem/ são anunciadas mesmo com a pergunta fechada, o que confunde usuários de leitor de tela.
- **Tela/largura:** seção FAQ, em todas as larguras (320 a 1280).
- **Causa provável:** `src/features/faq-accordion/FaqAccordion.jsx` (linha 30, painel sempre no DOM) + `src/features/faq-accordion/FaqAccordion.module.css` (linhas 22–24, apenas `grid-template-rows`).
- **Evidência:** `A1-snapshot.yml` (regiões fechadas ainda listadas).

### BAIXA

**B1. Header quebra entre 769 px e 798 px**
- **O que acontece:** logo "Horus Guardian" e o CTA "Entrar na lista" quebram em duas linhas e o header salta de 74 px para 98 px de altura. Em 768 px (ou menos) o menu hambúrguer assume e o layout volta ao normal; a partir de ~799 px também normaliza.
- **Tela/largura:** 769–798 px (ex.: janela de desktop redimensionada).
- **Causa provável:** `src/widgets/header/Header.module.css` (`.inner`/`.nav` sem `flex-wrap` e com gaps fixos; breakpoint só em `max-width: 768px`) + `src/shared/ui/Logo/Logo.module.css` (`.logo` sem `white-space: nowrap`) + `src/shared/ui/Button/Button.module.css` (texto do botão sem `nowrap`).
- **Evidência:** `R2-extra-769.png`.

**B2. Modal não isola o conteúdo de fundo para leitores de tela**
- **O que acontece:** com o modal aberto, `header`, `main` e `footer` continuam expostos na árvore de acessibilidade. Há `aria-modal="true"` e focus trap de teclado, mas o fundo não recebe `inert`/`aria-hidden`, então alguns leitores de tela ainda conseguem navegar pelo conteúdo atrás do diálogo.
- **Tela/largura:** modal em qualquer largura.
- **Causa provável:** `src/shared/ui/Modal/Modal.jsx` (linhas 12–64; bloqueia scroll e foco, mas não isola o restante da página).
- **Evidência:** `A1-snapshot-modal-aberto.yml` (`banner`, `main` e `contentinfo` presentes junto do `dialog`).

**B3. Skip link move a rolagem, mas não move o foco para o main**
- **O que acontece:** após ativar "Pular para o conteúdo", `document.activeElement` é `BODY`. O Tab seguinte já entra no conteúdo (o atalho funciona), porém o foco não é posicionado no `main`, então leitores de tela podem não anunciar a mudança de contexto.
- **Tela/largura:** todas.
- **Causa provável:** `src/widgets/header/Header.jsx` (linha 31) + `src/pages/landing/LandingPage.jsx` (linha 26, `main#conteudo` sem `tabindex="-1"`).
- **Evidência:** medição do teste N3 (`N3-skip-link-foco.png` mostra o link focado).

**B4. Campos do formulário sem `required`/`aria-required` e sem `name`**
- **O que acontece:** Nome e E-mail só são marcados como inválidos depois do submit; a obrigatoriedade não é anunciada antes e os inputs não têm atributo `name` (ruim para autofill/submit real).
- **Tela/largura:** modal, qualquer largura.
- **Causa provável:** `src/features/waitlist-form/WaitlistModal.jsx` (linhas 58–59) e `src/shared/ui/Input/Input.jsx` (linhas 14–20).
- **Evidência:** `C3-erros-vazio.png`.

**B5. `scroll-margin-top` 2 px menor que o header e ausente no CTA final**
- **O que acontece:** `Section` usa `scroll-margin-top: 72px`, mas o header mede 74 px; a seção ancora 2 px atrás do header (os títulos não são cobertos, pois o `h2` fica ~130 px abaixo). A seção `#lista-de-espera` não define `scroll-margin`, então um link direto para ela esconderia o topo.
- **Tela/largura:** âncoras de navegação em todas as larguras.
- **Causa provável:** `src/shared/ui/Section/Section.module.css` (linha 1) e `src/widgets/final-cta/FinalCta.module.css` (`.section` sem `scroll-margin-top`).
- **Evidência:** medições do teste N1 (`N1-precos.png`).

## Inventário de evidências

- **R1:** `R1-320.png`, `R1-360.png`, `R1-768.png`, `R1-1280.png`
- **R2:** `R2-320.json`, `R2-360.json`, `R2-768.json`, `R2-1280.json`, `R2-extra-769.png`
- **N1:** `N1-beneficios.png`, `N1-como-funciona.png`, `N1-precos.png`, `N1-faq.png`
- **N2/N3:** `N2-menu-aberto.png`, `N3-skip-link-foco.png`
- **C1–C7:** `C1-modal-320.png`, `C2-modal-plano-fundador.png`, `C3-erros-vazio.png`, `C4-erro-email.png`, `C5-sucesso.png`, `C6-modal-limpo.png`, `C7-foco-modal.png`
- **F1/F2:** `F1-faq.png`, `F2-faq-foco-teclado.png`
- **A1/A2:** `A1-snapshot.yml`, `A1-snapshot-modal-aberto.yml`, `A2-foco-visivel.png`
- **T1/T2:** `T1-console.txt`, `T2-network.txt`
