# Prefer E2E Real Click Over Sanitization Smoke

Smoke de sanitizacao isolado pode passar enquanto o fluxo real de clique da UI ainda falha na etapa de submit.

## What Happened
No t6.2 (CarneCerta), o checkpoint de sanitizacao com emoji passou em Node, mas a jornada real da pagina Desfiar (selecionar botoes com emoji e clicar em "Ver 3 opcoes ideais") retornou "Entrada invalida para recomendacao".
A coleta de estado em runtime mostrou selecoes ativas corretas e erro `RECOMMENDATION_SANITIZATION_BLOCKED` no submit.

## Takeaway
Para categorias guiadas por botoes, o gate funcional deve exigir E2E de clique real no navegador alem do smoke tecnico de funcao.
Sempre validar os dois niveis: (1) utilitario de sanitizacao isolado, (2) handler de submit da tela com estado real de DOM.

## History
- 2026-07-02 (Carne_certa/t6.2): initial
