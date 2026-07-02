# Sanitizacao Boundary Frontend

Padronizar sanitizacao de entrada antes do motor e escaping em renderizacao dinamica para reduzir risco de injecao no fluxo de recomendacao.

## What Happened
No t4 de CarneCerta, os filtros e respostas de UI eram processados sem uma camada central reutilizavel. Foi definido um boundary de seguranca no frontend para validar tipo, normalizar (NFKC), aplicar allowlist e bloquear assinaturas de injecao antes da recomendacao. Em paralelo, interpolacoes dinamicas em `innerHTML` passaram a usar escaping.

## Takeaway
Para este projeto, todo dado textual que entra no fluxo de recomendacao deve passar por utilitarios de sanitizacao centralizados (`sanitizeSearchFilters` e `sanitizeRecommendationInputs`) e todo conteudo interpolado em HTML deve ser escapado com `escapeHtml`.

## Example (optional)
```js
const safeFilters = sanitizeSearchFilters({ termo: category, somenteDisponiveis: false });
const safeName = escapeHtml(meat.name);
```

## History
- 2026-07-01 (Carne_certa/t4): initial
