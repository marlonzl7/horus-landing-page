# Verificação do estado atual — problema M1 (FAQ na árvore de acessibilidade)

- **Data:** 28/10/2026
- **URL:** http://localhost:5173
- **Navegador:** Chromium via Playwright MCP
- **Objetivo:** conferir se a correção do M1 está realmente implementada e se o FAQ continua funcionando.
- **Resultado:** **correção presente e validada, sem regressões encontradas.**

## 1. Estado do código

- `git diff` (working tree) vem vazio porque a alteração está **staged**.
- `git diff --cached` confirma a correção no arquivo `src/features/faq-accordion/FaqAccordion.jsx`:

```diff
- <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
+ <div
+   id={panelId}
+   role="region"
+   aria-labelledby={buttonId}
+   aria-hidden={!isOpen}
+   className={styles.panel}
+ >
```

- `git show HEAD:src/features/faq-accordion/FaqAccordion.jsx` ainda mostra a versão **sem** `aria-hidden` — ou seja, a correção existe no índice/working tree, mas não foi commitada.
- Nenhum outro arquivo de código aparece como modificado.

## 2. Árvore de acessibilidade

| Cenário | Regiões expostas | Respostas expostas | Resultado |
|---|---|---|---|
| FAQ todo fechado | **0** (6 `role="region"` continuam no DOM com `aria-hidden="true"`, mas fora da árvore) | 0 | **OK** |
| Uma resposta aberta (clique) | **1** | 1 (a resposta correta) | **OK** |
| Uma resposta aberta (teclado) | **1** | 1 (a resposta correta) | **OK** |

Nos snapshots fechados, a árvore contém apenas o subtítulo da seção e os 6 botões das perguntas. Nenhum texto de resposta aparece.

## 3. Comportamento do FAQ

| Teste | Verificação | Resultado |
|---|---|---|
| F1 — clique | 6 perguntas clicadas; no máximo 1 aberta; 0 fechadas sem `aria-hidden="true"`; 0 abertas sem `aria-hidden="false"`; clicar na aberta fecha todas | **OK** |
| `aria-expanded` | Alterna corretamente entre `"true"` e `"false"` no clique e no teclado | **OK** |
| `aria-controls` / `aria-labelledby` | Todos os 6 botões apontam para painéis existentes; `aria-labelledby` dos painéis confere com o `id` do botão | **OK** |
| F2 — teclado | 14 Tabs até a 1ª pergunta; outline `3px solid`; Enter fecha; Espaço abre; Tab vai para a 2ª; Enter na 2ª abre e fecha a 1ª | **OK** |
| Mobile 360 px | Abre e fecha por clique; `aria-hidden` alterna; altura 162 px aberta e 0 px fechada | **OK** |
| Console | 0 erros, 0 avisos e 0 `pageerror` durante os testes | **OK** |
| Rede | 0 requisições falhas e 0 respostas 4xx/5xx | **OK** |

**Sobre o console:** apareceram apenas 6 mensagens `info` do React DevTools (uma por recarga), tratadas como informativas e **não** como erro.

## 4. Evidências desta verificação (`docs/evidencias/depois/`)

- `M1-verificacao-fechado.yml` — árvore com o FAQ todo fechado (0 regiões, 0 respostas)
- `M1-verificacao-aberto.yml` — árvore com uma resposta aberta por clique
- `M1-verificacao-teclado.yml` — árvore com uma resposta aberta por teclado
- `M1-verificacao-faq-fechado.png` — FAQ fechado no desktop
- `M1-verificacao-faq-aberto.png` — FAQ aberto no desktop
- `M1-verificacao-F1.png` — regressão do clique (uma aberta)
- `M1-verificacao-F2-foco.png` — foco de teclado na pergunta
- `M1-verificacao-F2.png` — segunda pergunta aberta por teclado
- `M1-verificacao-teclado.png` — mesma situação, captura da árvore
- `M1-verificacao-360.png` — FAQ em 360 px
- `M1-verificacao.json` — resultados estruturados
- `M1-verificacao.md` — este relatório

As evidências anteriores em `docs/evidencias/depois/` foram mantidas, e **nada foi alterado em `docs/evidencias/antes/`** (verificado por data de modificação).

## 5. Comandos para revisar

```bash
git diff --cached -- src/features/faq-accordion/FaqAccordion.jsx
git status --short
```

## 6. Limitações

- A árvore de acessibilidade foi lida pelo Chromium (Playwright MCP), não por um leitor de tela real (NVDA/VoiceOver).
- A barra de rolagem foi ocultada por CSS injetado apenas em runtime para fidelidade das medições; nenhum estilo do projeto foi alterado.
- Nenhum commit foi feito e nenhum outro problema foi iniciado.
