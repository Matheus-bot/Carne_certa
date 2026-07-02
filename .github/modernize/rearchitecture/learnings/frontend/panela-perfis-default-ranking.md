# Panela Perfis Default Ranking

Padronizar Panela com resolvedor de perfis proprio e default fixo de negocio para manter ordem previsivel do Top 3 sem afetar outras categorias.

## What Happened
No Carne_certa/t5.1, a regra de negocio exigiu perfis dedicados para Panela (Maciez, Economico, Magro) e um default sem preferencia com prioridade explicita Economia > Maciez > Sabor > Magra > Rapidez, com Top inicial Acem, Musculo e Paleta. A solucao aplicada foi separar a resolucao de prioridades de Panela no frontend (`resolvePanelaPreferencePriorities`) e calibrar somente as notas dos cortes de Panela em `carnes.json`.

## Takeaway
Quando houver regra comercial especifica de uma categoria, criar resolvedor de perfil dedicado para a categoria em vez de alterar o resolvedor global. Isso preserva consistencia das demais categorias e facilita manutencao de ranking alvo por segmento.

## Example (optional)
```js
prioridades: effectiveCategory === "panela"
  ? resolvePanelaPreferencePriorities(selected)
  : resolvePreferencePriorities(selected)
```

## History
- 2026-07-01 (Carne_certa/t5.1): initial
