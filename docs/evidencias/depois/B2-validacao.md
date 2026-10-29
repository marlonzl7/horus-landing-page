# B2 — Validação do isolamento e do complemento de foco do modal

**Data:** 2026-10-29
**Escopo:** somente B2 — conteúdo de fundo acessível com o modal aberto.
**Aplicação:** `http://localhost:5173/`
**Navegador:** Chromium via Playwright MCP
**Viewports:** 1280×900 e 360×800
**HEAD durante a validação:** `f021874`
**Implementação validada:** `src/shared/ui/Modal/Modal.jsx` (diff já existente; nenhuma alteração de código foi feita nesta etapa)

> **Atualização:** este documento preserva primeiro a validação anterior, feita antes do complemento de foco. O item 7 daquela seção registra a falha antiga no overlay e no mobile. A validação do complemento de foco, com os dois arquivos atuais (`Modal.jsx` e `Header.jsx`), está na seção **“Complemento de foco — validação separada”**, ao final.

## Método

- Testes reais com Playwright MCP no Chromium.
- Para a árvore de acessibilidade, usei `CDP Accessibility.getFullAXTree` com `ignored=false`, via Playwright MCP. Essa é a árvore AX do Chromium usada pelas tecnologias assistivas.
- O `browser_snapshot` do MCP usa `ariaSnapshot` baseado no DOM e **inclui nós com `inert`**. Por isso ele não serve como prova de ausência do fundo neste caso; os arquivos desse tipo foram mantidos com o prefixo `B2-mcp-ariaSnapshot-*` e estão identificados como limitação da ferramenta.
- Também foram verificados DOM (`inert`, `body.style.overflow`), foco real (`document.activeElement`), sequência de Tab/Shift+Tab, console e rede.

## Resultado por critério — etapa anterior (isolamento)

| # | Critério | Resultado | Observação |
|---|---|---|---|
| 1 | Fechado: header, main e footer acessíveis | **Passou** | Árvore AX com `banner`, `main` e `contentinfo`; `inert=false` nos três. |
| 2 | Aberto: diálogo presente e acessível | **Passou** | `role="dialog"`, nome “Lista de espera”, `aria-modal="true"`, título, campos e botões na árvore AX. |
| 3 | Aberto: fundo isolado de tecnologias assistivas | **Passou** | `header`, `main` e `footer` com `inert=true`; árvore AX sem `banner`, `main` ou `contentinfo`; foco programático no fundo bloqueado. |
| 4 | Tab/Shift+Tab presos no diálogo | **Passou** | Todos os passos permaneceram dentro do diálogo, incluindo os wraps de ida e volta. |
| 5 | Escape fecha | **Passou** | Diálogo removido, scroll restaurado, `inert=false` e foco de volta ao CTA do header. |
| 6 | Depois de fechar, fundo acessível novamente | **Passou** | Landmarks de volta na árvore AX; foco programático no `main` funcionou. |
| 7 | Foco volta ao acionador | **Parcial** | Passou em Escape, X do diálogo, botão “Fechar” do sucesso e CTA do hero. **Falhou no clique no overlay**; no mobile o acionador é removido e o foco fica em `BODY`. |
| 8 | Console, rede e regressões evidentes | **Passou, com ressalvas de foco** | 0 erros, 0 warnings, 0 falhas de rede; sem scroll horizontal; clique dentro não fecha e clique no overlay fecha. |

## Evidências principais

### Aberto no desktop

- `dialogCount`: 1
- `inert`: `{ header: true, main: true, footer: true }`
- `body.style.overflow`: `hidden`
- Foco inicial no próprio diálogo (`DIV` com `tabIndex=-1`)
- Tentativa de focar o link “Pular para o conteúdo” no header: bloqueada; o foco permaneceu no diálogo.
- Árvore AX (CDP), somente nós não ignorados:

```text
dialog "Lista de espera"
button "Fechar"
heading "Lista de espera"
textbox "Nome"
textbox "E-mail"
button "Entrar na lista de espera"
```

Nenhum `banner`, `main`, `contentinfo` ou heading do fundo apareceu na árvore AX.

### Fechado no desktop

Árvore AX com `banner`, `main`, `contentinfo`, navegação, CTAs e conteúdo das seções. `dialogCount=0`, `inert=false` nos três landmarks e `body.style.overflow=""`.

### Foco com Tab/Shift+Tab

Sequência observada, começando com o foco no diálogo:

```text
inicial        DIV (o próprio diálogo)
Shift+Tab      BUTTON "Entrar na lista de espera"   (último)
Tab            BUTTON "Fechar"                      (primeiro)
Shift+Tab      BUTTON "Entrar na lista de espera"   (wrap para trás)
Tab            BUTTON "Fechar"
Tab            INPUT (Nome)
Tab            INPUT (E-mail)
Tab            BUTTON "Entrar na lista de espera"
Tab            BUTTON "Fechar"                      (wrap para frente)
Tab            INPUT (Nome)
```

Todos os elementos estavam dentro de `[role="dialog"]`.

### Repetições

- Desktop: 3 ciclos completos de abrir → verificar → Escape → verificar. Todos passaram; o `inert` foi aplicado e removido corretamente em cada ciclo.
- Mobile 360: 2 ciclos completos. O isolamento e o Escape passaram; o foco voltou a `BODY` porque o CTA do menu móvel deixa o DOM ao abrir o modal.

### Fechamento e retorno de foco

- **Escape:** fecha; foco volta ao CTA do header.
- **X do diálogo:** fecha; foco volta ao CTA do header.
- **Botão “Fechar” do estado de sucesso:** fecha; foco volta ao CTA do header.
- **CTA do hero (`main`):** abre; Escape fecha; foco volta ao CTA do hero.
- **Clique no overlay:** fecha, mas o foco termina em `BODY`, não no CTA.

Diagnóstico do overlay:

- O cleanup do modal chega a focar o CTA (registrado no `focusin`).
- O default do `mousedown` real no overlay depois devolve o foco para `BODY`.
- Um `mousedown` sintético no overlay, sem o default do mouse real, manteve o foco no CTA. Isso mostra que a restauração do cleanup funciona; o problema é o comportamento padrão do clique real.

### Formulário e estado de sucesso

- Nome e e-mail preenchidos; envio simulado; texto “Pronto, Marlon! Você está na lista.” apareceu.
- Durante o sucesso: diálogo visível, `header/main/footer` com `inert=true`, `body overflow: hidden`.
- Árvore AX do sucesso: somente `dialog`, heading e os dois botões “Fechar”.
- Fechamento pelo botão “Fechar” do sucesso: `dialogCount=0`, `inert=false`, scroll restaurado, foco no CTA do header.

### Mobile 360×800

- Diálogo aberto: 328×427, posicionado em `x=16`, `y=186`, `bottom=614`; sem scroll horizontal.
- `header/main/footer` inertes; foco no diálogo; tentativa de focar um link do menu bloqueada.
- Árvore AX aberta: somente diálogo, heading, campos e botões.
- Depois do Escape: `dialogCount=0`, `inert=false`, scroll restaurado, landmarks de volta na árvore AX.
- O CTA do menu móvel (`#menu-mobile`) é removido ao abrir o modal; portanto o elemento que abriu não existe mais no fechamento e o foco fica em `BODY`.

### Console e rede

- Console: **0 erros, 0 warnings**. As mensagens restantes são `INFO` do React DevTools e não são erros.
- Rede: **0 falhas**; 73 requisições estáticas, todas com status `200` ou `304`; nenhuma requisição não estática.
- Sem scroll horizontal em 1280 ou 360.

## Falhas e ressalvas

1. **Clique no overlay não devolve o foco ao acionador.**
   - Observado: `document.activeElement === document.body` após o fechamento.
   - Não é o isolamento B2 em si; o `inert` foi removido e o fundo voltou a ficar acessível.
   - Se o retorno de foco nesse caminho for requisito, precisa de correção separada — por exemplo, `preventDefault()` no `mousedown` do overlay ou restaurar o foco após o evento de clique.
   - Não foi alterado nesta etapa.

2. **Mobile: foco em `BODY` após fechar.**
   - O CTA que abriu o modal é removido junto com o menu móvel.
   - Se o comportamento esperado for devolver o foco ao botão do menu, isso exige um ajuste específico de gerenciamento de foco.
   - Não foi alterado nesta etapa.

3. **Limitação da evidência do MCP.**
   - `browser_snapshot`/`ariaSnapshot` do MCP lista o fundo mesmo com `inert`, porque percorre o DOM e não reflete a árvore AX nativa.
   - As capturas `B2-mcp-ariaSnapshot-*.yml` documentam essa limitação; a prova de isolamento é o CDP AX em `B2-cdp-ax.json`.

4. **Cobertura de navegador.**
   - Somente Chromium foi testado. Não houve teste em navegadores sem suporte a `inert`.

## Conclusão da etapa anterior

O objetivo central do B2 — impedir que `header`, `main` e `footer` apareçam na árvore de acessibilidade enquanto o modal está aberto — **foi validado no Chromium**, com o diálogo preservado, Tab/Shift+Tab contidos, Escape funcionando e o fundo voltando a ficar acessível ao fechar.

O item 7 não passou em todos os caminhos: o fechamento por clique no overlay deixa o foco em `BODY`, e no mobile o acionador é removido. Portanto, **não declaro a validação geral como totalmente aprovada**; registro as ressalvas acima para decisão e eventual correção separada.

Nenhum código foi alterado durante esta validação. Nenhum commit foi feito. `docs/evidencias/antes/` permanece intacto.

## Artefatos

- Relatório: `docs/evidencias/depois/B2-validacao.md`
- JSON: `docs/evidencias/depois/B2-validacao.json`
- Árvore AX via CDP: `docs/evidencias/depois/B2-cdp-ax.json`
- Capturas:
  - `docs/evidencias/depois/B2-fechado-1280.png`
  - `docs/evidencias/depois/B2-aberto-1280.png`
  - `docs/evidencias/depois/B2-apos-fechar-1280.png`
  - `docs/evidencias/depois/B2-aberto-360.png`
  - `docs/evidencias/depois/B2-apos-fechar-360.png`
  - `docs/evidencias/depois/B2-sucesso-1280.png`
- Snapshots do MCP (com a limitação do `ariaSnapshot`):
  - `docs/evidencias/depois/B2-mcp-ariaSnapshot-aberto.yml`
  - `docs/evidencias/depois/B2-mcp-ariaSnapshot-fechado.yml`
  - `docs/evidencias/depois/B2-mcp-ariaSnapshot-apos-fechar.yml`
- Console:
  - `docs/evidencias/depois/B2-console-desktop.txt`
  - `docs/evidencias/depois/B2-console-mobile.txt`
  - `docs/evidencias/depois/B2-console-all.txt`
- Rede:
  - `docs/evidencias/depois/B2-network-desktop.txt`
  - `docs/evidencias/depois/B2-network-desktop-static.txt`
  - `docs/evidencias/depois/B2-network-mobile.txt`
  - `docs/evidencias/depois/B2-network-mobile-static.txt`

---

# Complemento de foco — validação separada

**Data:** 2026-10-29
**HEAD durante esta validação:** `f021874`
**Implementação testada:** `src/shared/ui/Modal/Modal.jsx` e `src/widgets/header/Header.jsx` — alterações ainda não commitadas.
**Código alterado durante esta validação:** não.
**Commit realizado:** não.
**Aplicação:** `http://localhost:5173/`
**Navegadores/viewports:** Chromium; 1280×900 e 360×800. Também foi criado um contexto separado com `hasTouch=true` e `isMobile=true` em 360×800.

## Método

- Testes reais com Playwright MCP no Chromium, sem alterar arquivos da aplicação.
- Foco verificado por `document.activeElement`, incluindo comparação por identidade com o acionador (`===`).
- Isolamento verificado por `inert` no DOM e pela árvore nativa do Chromium via CDP `Accessibility.getFullAXTree` (`ignored=false`).
- Clique no fundo verificado com um listener de `click` em fase de captura, instalado apenas em tempo de execução; nenhum código da aplicação foi modificado.
- Toque verificado em contexto Playwright separado com `hasTouch=true`, `isMobile=true` e `deviceScaleFactor=1`.

## Resultado dos testes obrigatórios

| # | Cenário | Resultado | Observação |
|---|---|---|---|
| 1 | Desktop — CTA do header; fechar no overlay; foco e clique de fundo | **Passou** | Foco voltou ao CTA do header; nenhum clique foi entregue ao conteúdo de fundo. |
| 2 | Mobile — CTA do menu; fechar por Escape, X e overlay | **Passou** | Menu fecha, `aria-expanded=false`; foco voltou ao hambúrguer em todos os três caminhos. |
| 3 | Outros acionadores — hero e CTA final | **Passou** | Desktop e mobile: foco voltou ao respectivo CTA, não ao hambúrguer. |
| 4 | Teclado — Tab/Shift+Tab, Escape, Enter e Espaço | **Passou** | Focus trap preservado em desktop e mobile; Enter e Espaço abriram o modal pelo CTA mobile. |
| 5 | Isolamento do fundo com árvore AX nativa | **Passou** | `header/main/footer` inertes; sem landmarks de fundo na AX; diálogo presente. |
| 6 | Restauração de `inert` e `overflow` anteriores | **Passou** | Um `footer` previamente inerte continuou inerte; `overflow: auto` anterior foi restaurado. |
| 7 | Formulário, sucesso e fechamento | **Passou com observação** | Foco voltou ao CTA do header ao fechar. No estado de sucesso, o `activeElement` ficou em `BODY`; ver ressalva abaixo. |
| 8 | Regressões — ciclos, console, rede, scroll e toque | **Passou** | 2 ciclos desktop + 2 mobile; 0 erros/warnings; 0 falhas de rede; sem scroll horizontal; toque no overlay passou. |

## Desktop — CTA do header e overlay

- Acionador: `header > button "Entrar na lista"`.
- Aberto: `dialogCount=1`, foco inicial no diálogo, `inert={header:true, main:true, footer:true}`, `body.overflow=hidden`.
- Overlay: `1280×900`; diálogo: `440×427` em `x=420`, `y=240,5`.
- Tentativa de focar o link “Pular para o conteúdo” no header: bloqueada; o foco permaneceu no diálogo.
- Fechamento com clique real em `(5, 450)`: `dialogCount=0`; `activeElement` era o botão `"Entrar na lista"` do header; `activeIsOpener=true`; `inert=false`; `body.overflow=""`.
- Teste de clique atravessando o overlay, com o ponteiro sobre o CTA do header:
  - `clicksCapturados=[]`;
  - `dialogCount=0` depois do clique;
  - o modal não reabriu;
  - portanto, não foi observado acionamento de conteúdo de fundo.
- AX aberta (CDP): 28 nós não ignorados, sem `banner`, `main` ou `contentinfo`; somente:
  `dialog "Lista de espera"`, `button "Fechar"`, `heading "Lista de espera"`, `textbox "Nome"`, `textbox "E-mail"`, `button "Entrar na lista de espera"`.
- AX fechada: 541 nós não ignorados; `banner=1`, `main=1`, `contentinfo=1`.

## Mobile — CTA do menu

- Em 360×800, o menu foi aberto pelo hambúrguer; `aria-expanded=true`, rótulo “Fechar menu”.
- Ao acionar o CTA do menu:
  - o diálogo abriu com foco inicial no próprio diálogo;
  - `#menu-mobile` deixou de existir;
  - o hambúrguer ficou com `aria-expanded=false` e rótulo “Abrir menu”;
  - `inert={header:true, main:true, footer:true}` e `body.overflow=hidden`.
- Diálogo: `328×427`, `x=16`, `y≈188,6`, `bottom≈615,8`; sem scroll horizontal.
- Fechamento e foco:
  - **Escape:** `activeElement` era o hambúrguer; `aria-expanded=false`; menu ausente.
  - **X “Fechar”:** mesmo resultado.
  - **Overlay em ponto neutro `(5, 450)`:** mesmo resultado.
  - **Overlay sobre o centro do hambúrguer:** `clicksCapturados=[]`; menu não reabriu; foco no hambúrguer.
- AX aberta: 28 nós não ignorados, sem landmarks de fundo; mesmos seis nós do diálogo.
- AX fechada: 555 nós não ignorados; `banner=1`, `main=1`, `contentinfo=1`.

## Toque no overlay

Contexto separado: 360×800, `hasTouch=true`, `isMobile=true`.

- Abrir menu e tocar no CTA: diálogo aberto, foco no diálogo, `inert` aplicado, menu fechado, `aria-expanded=false`.
- Tocar no overlay em `(5, 450)`: diálogo fechado, `activeElement` no hambúrguer, rótulo “Abrir menu”, `aria-expanded=false`, `inert=false`, `overflow=""`.
- Console do contexto de toque: 3 mensagens, 0 erros, 0 warnings, 0 `pageerror`.
- Rede do contexto de toque: 73 respostas, 0 requisições falhas, 0 status ≥400.
- Sem scroll horizontal.

## Outros acionadores

| Viewport | Acionador | Resultado | Foco após Escape |
|---|---|---|---|
| 1280×900 | Hero (`#topo button`) | Abriu e isolou o fundo | CTA do hero; `activeIsBurger=false` |
| 1280×900 | CTA final (`#lista-de-espera button`) | Abriu e isolou o fundo | CTA final; `activeIsBurger=false` |
| 360×800 | Hero | Abriu e isolou o fundo | CTA do hero; `activeIsBurger=false` |
| 360×800 | CTA final | Abriu e isolou o fundo | CTA final; `activeIsBurger=false` |

Nenhum desses caminhos desviou o foco para o hambúrguer.

## Teclado

### Desktop

Sequência observada, começando com o foco no diálogo:

```text
inicial        DIV (diálogo)
Shift+Tab      BUTTON "Entrar na lista de espera" (último)
Tab            BUTTON "Fechar" (primeiro)
Shift+Tab      BUTTON "Entrar na lista de espera"
Tab            BUTTON "Fechar"
Tab            INPUT (Nome)
Tab            INPUT (E-mail)
Tab            BUTTON "Entrar na lista de espera"
Tab            BUTTON "Fechar" (wrap para frente)
Tab            INPUT (Nome)
```

Todos os passos permaneceram dentro de `[role="dialog"]`.

### Mobile

Com o modal aberto pelo CTA do menu:

```text
inicial        DIV (diálogo)
Shift+Tab      BUTTON "Entrar na lista de espera"
Tab            BUTTON "✕" (Fechar)
Tab            INPUT (Nome)
Tab            INPUT (E-mail)
Tab            BUTTON "Entrar na lista de espera"
Tab            BUTTON "✕" (Fechar)
```

Todos os passos permaneceram dentro do diálogo; Escape fechou e devolveu o foco ao hambúrguer.

### Enter e Espaço

- Hambúrguer focado + `Enter`: menu abriu.
- CTA mobile focado + `Enter`: modal abriu; Escape fechou; foco no hambúrguer.
- Hambúrguer focado + `Enter`: menu abriu novamente.
- CTA mobile focado + `Espaço`: modal abriu; Escape fechou; foco no hambúrguer.

## Restauração de `inert` e `overflow`

Foi testado um estado anterior não padrão, em tempo de execução:

| Momento | `footer.inert` | `header.inert` | `main.inert` | `body.overflow` |
|---|---|---|---|---|
| Antes de abrir | `true` | `false` | `false` | `auto` |
| Com o modal aberto | `true` | `true` | `true` | `hidden` |
| Depois de fechar | `true` | `false` | `false` | `auto` |

O `footer` que já estava inerte permaneceu inerte; o `overflow: auto` anterior foi restaurado. O foco voltou ao CTA do header.

## Formulário e sucesso

- Nome: `Marlon`; e-mail: `marlon@example.com`.
- Texto de sucesso observado: “Pronto, Marlon! Você está na lista. Quando o Horus Guardian for lançado, o aviso chega em marlon@example.com.”
- Durante o sucesso: `dialogCount=1`, `inert={header:true, main:true, footer:true}`, `body.overflow=hidden`.
- AX do sucesso: 28 nós não ignorados, sem landmarks de fundo; `dialog "Lista de espera"`, `button "Fechar"`, `heading "Lista de espera"`, `button "Fechar"`.
- Havia exatamente 1 botão “Fechar” do estado de sucesso (sem contar o X, que tem `aria-label="Fechar"`).
- Ao fechar pelo botão de sucesso: `dialogCount=0`, `inert=false`, `body.overflow=""`, `activeElement` no CTA do header.

**Observação:** no instante da tela de sucesso, o `activeElement` era `BODY` (`activeInsideDialog=false`). O foco não foi movido para o conteúdo de sucesso. Isso não era um dos critérios solicitados — o critério era o retorno ao acionador após fechar — e não foi alterado nesta validação. Fica registrado como ressalva de acessibilidade para decisão separada.

## Repetições e regressões

- Desktop: 2 ciclos de abrir pelo CTA do header → Escape → verificar. Passaram: `inert` aplicado/removido, `overflow` restaurado e foco no CTA.
- Mobile: 2 ciclos de abrir pelo menu → CTA → Escape → verificar. Passaram: menu fechado, `aria-expanded=false`, `inert` aplicado/removido, foco no hambúrguer.
- Sem scroll horizontal em nenhum estado medido (1280×900 e 360×800).
- Console da sessão principal: **0 erros, 0 warnings**; 64 mensagens informativas do React DevTools no arquivo consolidado.
- Rede da sessão principal: **0 falhas**; 584 requisições estáticas, sendo 515 com `200` e 69 com `304`; 0 requisições não estáticas.
- Contexto de toque: 0 erros/warnings, 0 falhas de rede.

## Ressalvas e limitações

1. **Foco durante o sucesso:** `activeElement` em `BODY` na tela de sucesso; o retorno ao acionador após fechar funciona. Não foi corrigido nem declarado como parte desta validação.
2. **B4 fora do escopo:** os inputs continuam sem `name`, `required` ou `aria-required`; isso pertence ao achado B4 e não foi alterado.
3. **Cobertura:** somente Chromium. Não houve teste em navegadores sem suporte a `inert`.
4. **Limitação do `ariaSnapshot` do MCP:** ele percorre o DOM e inclui conteúdo inerte. A prova de isolamento usada aqui é a árvore AX nativa do Chromium via CDP.
5. **Contexto de toque:** foi um contexto Playwright separado; os dados de console/rede desse contexto estão no respectivo JSON de resultado.

## Conclusão do complemento

Os 8 cenários obrigatórios passaram. O foco retorna ao acionador no desktop e ao hambúrguer no mobile após Escape, X, overlay e fechamento do sucesso; Enter e Espaço também foram verificados. O isolamento por `inert` e a árvore AX nativa continuam corretos, e os valores anteriores de `inert`/`overflow` são restaurados.

A única ressalva observada é o foco em `BODY` no estado de sucesso, que não afeta o retorno ao acionador após o fechamento e não fazia parte do critério solicitado. Nenhum código foi alterado nesta validação e nenhum commit foi feito.

## Artefatos desta etapa

- Relatório: `docs/evidencias/depois/B2-validacao.md`
- JSON consolidado: `docs/evidencias/depois/B2-validacao.json`
- AX via CDP:
  - `docs/evidencias/depois/B2-foco-cdp-ax-desktop-aberto.json`
  - `docs/evidencias/depois/B2-foco-cdp-ax-desktop-fechado.json`
  - `docs/evidencias/depois/B2-foco-cdp-ax-mobile-aberto.json`
  - `docs/evidencias/depois/B2-foco-cdp-ax-mobile-fechado.json`
  - `docs/evidencias/depois/B2-foco-cdp-ax-sucesso.json`
- Resultados observados:
  - `docs/evidencias/depois/B2-foco-desktop-resultado.json`
  - `docs/evidencias/depois/B2-foco-mobile-resultado.json`
  - `docs/evidencias/depois/B2-foco-extras-resultado.json`
  - `docs/evidencias/depois/B2-foco-mobile-teclado-resultado.json`
  - `docs/evidencias/depois/B2-foco-mobile-toque-resultado.json`
- Capturas:
  - `docs/evidencias/depois/B2-foco-desktop-aberto.png`
  - `docs/evidencias/depois/B2-foco-desktop-apos-overlay.png`
  - `docs/evidencias/depois/B2-foco-mobile-menu-aberto.png`
  - `docs/evidencias/depois/B2-foco-mobile-apos-escape.png`
  - `docs/evidencias/depois/B2-foco-mobile-apos-overlay.png`
  - `docs/evidencias/depois/B2-foco-mobile-toque-aberto.png`
  - `docs/evidencias/depois/B2-foco-mobile-toque-apos-overlay.png`
  - `docs/evidencias/depois/B2-foco-cta-final-apos-fechar.png`
  - `docs/evidencias/depois/B2-foco-sucesso-desktop.png`
- Console/rede:
  - `docs/evidencias/depois/B2-foco-console-all.txt`
  - `docs/evidencias/depois/B2-foco-console-warnings.txt`
  - `docs/evidencias/depois/B2-foco-network-static.txt`
  - `docs/evidencias/depois/B2-foco-network-nonstatic.txt`
