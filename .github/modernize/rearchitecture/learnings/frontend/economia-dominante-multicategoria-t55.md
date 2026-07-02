# Economia Dominante Multicategoria T55

Para categorias especiais de recomendacao, manter pesos por categoria com economia como maior pilar evita regressao no ranking global.

## What Happened
No Carne_certa/t5.5, foi necessario ajustar 7 categorias com regras especificas sem quebrar Panela (sem osso) e Desfiar. A implementacao ficou estavel com pesos por categoria (`CATEGORY_PILLAR_WEIGHTS`) e um resolvedor unico de prioridade por categoria (`resolveCategoryPreferencePriorities`). O comparator global foi mantido para preservar desempate por disponibilidade, nome e id.

No Carne_certa/t5.5.1, para atender aderencia estrita ao Top1 oficial por categoria com regra global de economia dominante, o roteamento de prioridades dessas categorias precisou ser fixado no preset `default` de cada categoria (com economia como maior peso), sem variar por texto de preferencia livre.

## Takeaway
Quando houver tuning de negocio por categoria:
- manter `economia` como maior peso dentro da propria categoria;
- centralizar o roteamento de prioridades por categoria em uma funcao unica;
- para categorias com regra global fixa de negocio, evitar desvio por parsing de texto e usar preset deterministico por categoria;
- preservar comparator global para desempate deterministico e auditavel;
- validar com smoke de Top 3 por categoria + empate sintetico de disponibilidade.

## History
- 2026-07-02 (Carne_certa/t5.5): initial
- 2026-07-02 (Carne_certa/t5.5.1): fixado roteamento de prioridades multicategoria para economia dominante deterministica
