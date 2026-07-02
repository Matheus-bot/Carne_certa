# Panela Ranking Calibracao Corte Compartilhado

Quando um corte compartilhado invade o Top 3 de Panela, prefira calibracao local de notas no dataset antes de alterar pesos globais ou heuristica da engine.

## What Happened
No Carne_certa/t5.3, a regra exigia ranking default exato em Panela: Acem > Musculo > Paleta. O desvio observado era `coxaomole` em terceiro lugar. A formula global e as prioridades default estavam corretas; o problema era calibracao de notas do corte compartilhado no contexto de candidatos de Panela. A correcao foi reduzir notas de `coxaomole` em `carnes.json`, mantendo inalterados pesos globais e a cadeia de prioridade.

## Takeaway
Para ajustes de aderencia de ranking por categoria, primeiro corrigir notas dos candidatos da categoria alvo e revalidar com a formula real da engine. Evitar mexer em `SCORE_WEIGHTS` e no resolvedor global quando a exigencia e local de negocio.

## Example (optional)
```js
// Mantido sem mudancas:
const SCORE_WEIGHTS = {
  maciez: 0.18,
  sabor: 0.22,
  rapidez: 0.15,
  economia: 0.30,
  integridade_fibra: 0.15
};
```

## History
- 2026-07-01 (Carne_certa/t5.3): initial
