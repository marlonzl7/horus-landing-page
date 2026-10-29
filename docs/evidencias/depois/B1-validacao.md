# B1 — Correção da quebra do header entre 769 e 798 px

- **Data:** 28/10/2026
- **URL:** http://localhost:5173
- **Navegador:** Chromium via Playwright MCP
- **Escopo:** somente o problema B1. A auditoria completa não foi repetida.
- **Resultado:** **corrigido e validado** nas 8 larguras solicitadas, sem rolagem horizontal e com menu/CTA funcionando.

## 1. Causa confirmada

O header desktop precisa de aproximadamente **783 px de largura útil**. Entre 769 e 798 px de viewport, com a barra de rolagem de 15 px, sobravam apenas **754 a 783 px**. O flexbox comprimia os filhos e quebrava o texto:

- logo “Horus Guardian” em **2 linhas**;
- link “Como funciona” em **2 linhas**;
- CTA “Entrar na lista” em **2 linhas**;
- altura do header de **74 para 98 px**.

Em 799 px o layout original já cabia, mas com apenas **1 px de folga** — um limite frágil. O breakpoint mobile existente só valia até 768 px.

## 2. Correção aplicada

**Arquivo alterado:** `src/widgets/header/Header.module.css` (único arquivo de código).

```diff
+/* Desktop estreito: gaps menores evitam a quebra do logo, da navegação e do CTA. */
+@media (min-width: 769px) and (max-width: 820px) {
+  .inner { gap: var(--space-4); }
+  .nav { gap: var(--space-4); }
+}
+
 @media (max-width: 768px) {
```

- O gap de `.inner` cai de 24 px para 16 px e o de `.nav` de 32 px para 16 px **somente entre 769 e 820 px**.
- Até 768 px o layout mobile (hambúrguer e menu) permanece **inalterado**.
- A partir de 821 px o layout desktop original volta **inalterado** (gaps de 24/32 px).
- Nenhum JSX, comportamento de menu ou CTA foi alterado.

## 3. Validação por largura

Medições feitas com a barra de rolagem real do navegador. Por isso `clientWidth` fica 15 px menor que a largura pedida.

| Largura | clientWidth | Header antes | Header depois | Logo | Navegação | CTA | Rolagem horizontal | Status |
|---:|---:|---:|---:|---|---|---|---|---|
| 320 | 305 | 61 | **61** | 1 linha | oculta (burger) | oculto no header | não | OK |
| 360 | 345 | 61 | **61** | 1 linha | oculta (burger) | oculto no header | não | OK |
| 768 | 753 | 61 | **61** | 1 linha | oculta (burger) | oculto no header | não | OK |
| 769 | 754 | 98 | **74** | 1 linha | 4 links, 1 linha cada | 1 linha | não | OK |
| 780 | 765 | 98 | **74** | 1 linha | 4 links, 1 linha cada | 1 linha | não | OK |
| 798 | 783 | 98 | **74** | 1 linha | 4 links, 1 linha cada | 1 linha | não | OK |
| 799 | 784 | 74 | **74** | 1 linha | 4 links, 1 linha cada | 1 linha | não | OK |
| 1280 | 1265 | 74 | **74** | 1 linha | 4 links, 1 linha cada | 1 linha | não | OK |

**Fronteira da correção:** 820 px usa os gaps compactos (16/16) e 821 px volta aos gaps originais (24/32). Ambas mantêm header de **74 px**, textos em **1 linha** e nenhuma rolagem horizontal.

Depois da correção, a folga em 769 px é de ~35 px e em 799 px é de ~65 px (antes era 1 px).

## 4. Funcionalidade preservada

| Largura | Menu | CTA | Link de navegação |
|---:|---|---|---|
| 320 | abre com `aria-expanded="true"` e 4 links | CTA do menu abre o modal; Esc fecha | — |
| 360 | abre e fecha | CTA abre o modal; Esc fecha | “Benefícios” → `#beneficios`, menu fecha, scrollY 1295 |
| 768 | abre e fecha (volta a `aria-expanded="false"`) | CTA abre o modal; Esc fecha | — |
| 769 | oculto (desktop) | abre o modal; Esc fecha; header continua 74 px | “FAQ” → `#faq`, scrollY 6403 |
| 780 | oculto (desktop) | abre o modal; Esc fecha | “FAQ” → `#faq`, scrollY 6363 |
| 798 | oculto (desktop) | abre o modal; Esc fecha | “FAQ” → `#faq`, scrollY 6354 |
| 799 | oculto (desktop) | abre o modal; Esc fecha | “FAQ” → `#faq`, scrollY 6358 |
| 1280 | oculto (desktop) | abre o modal; Esc fecha | “FAQ” → `#faq`, scrollY 4419 |

Em todos os casos o header permaneceu com a altura esperada e **não houve rolagem horizontal** após abrir menu ou modal.

## 5. Console, rede e build

- **Console:** 0 erros, 0 avisos e 0 `pageerror`.
  - 16 mensagens `info` do React DevTools foram registradas e **não** tratadas como erro.
- **Rede:** 0 requisições falhas e 0 respostas 4xx/5xx.
- **Build de produção:** `vite build` concluído em **1,17 s**, 90 módulos, CSS de 19,40 kB e JS de 167,25 kB.

## 6. Evidências novas (`docs/evidencias/depois/`)

- `B1-header-320.png`, `B1-header-360.png`, `B1-header-768.png`
- `B1-header-769.png`, `B1-header-780.png`, `B1-header-798.png`, `B1-header-799.png`
- `B1-header-1280.png`
- `B1-header-820.png` e `B1-header-821.png` (fronteira da media query)
- `B1-menu-360.png` (menu mobile aberto)
- `B1-cta-360.png`, `B1-cta-769.png`, `B1-cta-1280.png` (modal aberto pelo CTA)
- `B1-validacao.json` (resultados estruturados)
- `B1-validacao.md` (este relatório)

## 7. Preservação das evidências anteriores

- `docs/evidencias/antes/` **não foi alterado**.
- Verificação: `find docs/evidencias/antes -type f -newer src/widgets/header/Header.module.css` não retornou arquivos, e `git status --short -- docs/evidencias/antes` ficou vazio.

## 8. Comandos para revisar

```bash
git diff -- src/widgets/header/Header.module.css
git status --short
npm run build
```

## 9. Limitações

- Validação feita no Chromium headless via Playwright MCP; não houve teste em dispositivo físico ou leitor de tela (não é necessário para o B1).
- As larguras são do viewport, com barra de rolagem de 15 px no Chromium; por isso o `clientWidth` medido é menor.
- Nenhum commit foi feito, nenhum outro problema foi corrigido e a auditoria completa não foi repetida.
