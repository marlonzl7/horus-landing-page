# Validação da correção — M1 (FAQ na árvore de acessibilidade)

- **Problema:** M1 — respostas fechadas do FAQ continuavam presentes na árvore de acessibilidade.
- **Data:** 28/10/2026
- **URL testada:** http://localhost:5173
- **Navegador:** Chromium via Playwright MCP
- **Arquivo alterado:** `src/features/faq-accordion/FaqAccordion.jsx` (1 arquivo, 5 linhas adicionadas/reformatadas)

## Causa confirmada

O painel de resposta era sempre renderizado e o fechamento era apenas visual (`grid-template-rows: 0fr` em `FaqAccordion.module.css`). Sem `hidden`, `aria-hidden` ou `visibility: hidden`, os 6 `role="region"` permaneciam na árvore de acessibilidade mesmo com as perguntas fechadas — confirmado no snapshot `docs/evidencias/antes/A1-snapshot.yml`.

## Solução aplicada

Adicionado `aria-hidden={!isOpen}` ao painel em `FaqAccordion.jsx`:

```jsx
<div
  id={panelId}
  role="region"
  aria-labelledby={buttonId}
  aria-hidden={!isOpen}
  className={styles.panel}
>
```

- Menor alteração possível: remove o painel fechado da árvore de acessibilidade sem mudar o DOM, o CSS, a animação de 0,25 s ou o comportamento de abrir/fechar.
- O painel aberto continua exposto normalmente (`aria-hidden="false"`).
- Nenhum outro problema foi corrigido e nenhuma refatoração foi feita.

## Testes executados e resultados

| Teste | O que foi verificado | Resultado |
|---|---|---|
| M1 — estado inicial | 1 pergunta aberta e 5 fechadas; os 5 painéis fechados com `aria-hidden="true"`; 0 painéis fechados expostos | **OK** |
| M1 — todas fechadas | `aria-expanded="false"` e `aria-hidden="true"` nos 6; **0 `region`** na árvore de acessibilidade | **OK** |
| M1 — uma aberta | Exatamente **1 `region`** na árvore, com a resposta correta exposta e `aria-hidden="false"` | **OK** |
| F1 — clique em cada pergunta | 6 cliques; no máximo 1 painel aberto; 0 painéis fechados sem `aria-hidden`; clicar na aberta fecha todas | **OK** |
| F2 — teclado | 14 Tabs do topo até a 1ª pergunta; Enter fecha; Espaço abre; Tab + Enter na 2ª abre mantendo uma só; outline de 3 px visível | **OK** |
| Regressão mobile 360 px | Abre (162 px) e fecha (0 px) corretamente; `aria-hidden` alterna | **OK** |
| Regressão de estrutura | Títulos inalterados: 1 `h1`, 6 `h2`, 18 `h3` | **OK** |
| Console | 0 erros, 0 avisos, 0 `pageerror` durante as interações | **OK** |
| Rede | 0 requisições falhas e 0 respostas 4xx/5xx | **OK** |

## Comparativo antes/depois na árvore de acessibilidade

- **Antes** (`docs/evidencias/antes/A1-snapshot.yml`): todos os 6 `region` com as respectivas respostas apareciam, inclusive com as perguntas fechadas.
- **Depois, todas fechadas** (`M1-snapshot-faq-fechado.yml`): nenhum `region` e nenhuma resposta na árvore; apenas os 6 botões das perguntas.
- **Depois, uma aberta** (`M1-snapshot-faq-aberto.yml`): apenas 1 `region`, com a resposta da pergunta aberta.

## Evidências geradas (`docs/evidencias/depois/`)

- `M1-snapshot-faq-aberto.yml` — árvore de acessibilidade com uma pergunta aberta
- `M1-snapshot-faq-fechado.yml` — árvore com todas as perguntas fechadas
- `M1-faq-aberto.png` — FAQ aberto no desktop
- `M1-faq-fechado.png` — FAQ todo fechado no desktop
- `M1-faq-360.png` — FAQ aberto em 360 px
- `F1-faq.png` — regressão do clique (uma pergunta aberta)
- `F2-faq-foco-teclado.png` — foco de teclado na pergunta do FAQ
- `M1-validacao.json` — medições estruturadas

## Comandos para revisar

```bash
git diff -- src/features/faq-accordion/FaqAccordion.jsx
git status --short
```

## Limitações

- A validação foi feita via DOM/computed styles e árvore de acessibilidade do Chromium no Playwright MCP. Não foi usado um leitor de tela real (NVDA/VoiceOver); a evidência de exposição/ocultação vem da árvore de acessibilidade do navegador.
- A barra de rolagem foi ocultada por CSS injetado em runtime apenas para fidelidade das medições de largura; nenhum estilo do projeto foi alterado.
