# Strategy Ticket PWA Boundary

Manter Recommendation Engine, Ticket Visual e fallback offline desacoplados via contratos fechados de dados e evento ze:describe-cut.

## What Happened
No t5 de CarneCerta, o fluxo antigo de recomendacao estava acoplado ao catalogo legado e ao render de cards. Foi adotada uma estrutura com Strategy Pattern por categoria e orquestracao central no script, com contrato de output unico (score, disponibilidade, preparo_icones, libras_hook). Em paralelo, o Ticket Visual passou a consumir apenas esse contrato e disparar evento `ze:describe-cut`, enquanto a base PWA/SW ficou responsavel apenas por cache de shell/dados e snapshot offline do ticket.

## Takeaway
Para evolucoes futuras, manter: (1) calculo de ranking separado da renderizacao, (2) contrato de recomendacao estavel para Ticket/Libras, e (3) fallback offline em camada de cache/snapshot sem duplicar regra de negocio.

## Example (optional)
```js
const strategy = StrategyFactory.create(effectiveCategory);
const recommendations = strategy.recommend(preferences, filteredData);
window.dispatchEvent(new CustomEvent("ze:describe-cut", { detail: payload }));
```

## History
- 2026-07-01 (Carne_certa/t5): initial
