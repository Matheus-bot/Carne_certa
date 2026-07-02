# Panela Candidates Vs Categoria Fonte

Para cortes compartilhados entre categorias, manter categoria fonte no dataset e controlar elegibilidade de Panela pela lista de candidatos evita regressao cruzada.

## What Happened
No Carne_certa/t5.2, foi necessario aplicar alinhamento completo de Panela (sem osso) com 9 cortes. Durante a implementacao, alterar `categoria` de cortes compartilhados (ex.: coxaomole, pontadealcatra, patinho, fraldinha) para `panela` gerou risco de impacto lateral em fluxos de outras categorias. A correcao foi preservar `categoria` fonte e usar `categoryCandidates.panela` como fronteira de elegibilidade da recomendacao da categoria.

## Takeaway
Em datasets multiuso, tratar `categoria` como classificacao fonte e usar `categoryCandidates` como filtro de contexto de recomendacao por categoria. Isso reduz regressao entre jornadas sem duplicar registros.

## Example (optional)
```js
// Elegibilidade de Panela por candidatos, sem recategorizar cortes compartilhados
panela: ["acem", "paleta", "musculo", "pontadealcatra", "pontadepeito", "patinho", "coxaomole", "lagarto", "fraldinha"]
```

## History
- 2026-07-01 (Carne_certa/t5.2): initial
