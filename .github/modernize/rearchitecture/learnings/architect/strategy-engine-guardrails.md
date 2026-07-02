# Strategy Engine Guardrails

Padrao arquitetural para manter ranking deterministico e economia dominante na Recommendation Engine.

## What Happened
No projeto CarneCerta (t2), a arquitetura da engine exigiu combinar Strategy Pattern com pesos customizaveis sem perder a regra de negocio principal: economia precisa permanecer com maior impacto no score. Tambem foi necessario impedir instabilidade de ordenacao em empates entre ambientes de execucao.

## Takeaway
Ao permitir customizacao de pesos, aplique guard-rail explicito para garantir que economia continue estritamente maior que os demais pesos apos reescalonamento. Centralize a ordenacao em um comparador unico com fallback deterministico por disponibilidade, nome e id.

## Example (optional)
- Ordem canonica: score desc -> disponibilidade true primeiro -> nome asc (pt-BR) -> id asc.
- Guard-rail: se peso economia <= max(outros), elevar economia para max(outros)+delta e reescalar.

## History
- 2026-07-01 (Carne_certa/t2): initial
