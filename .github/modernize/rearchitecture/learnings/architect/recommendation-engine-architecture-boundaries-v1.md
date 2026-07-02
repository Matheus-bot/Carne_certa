# Recommendation Engine Architecture Boundaries V1

Padroniza que a engine de recomendacao deve concentrar determinismo de ranking e boundaries contratuais para seguranca, UX e PWA.

## What Happened
No Carne_certa/t2, o desenho arquitetural precisava permitir implementacao por multiplos papeis sem ambiguidades. A solucao foi definir RecommendationEngine como orquestrador unico de validacao, score, ranking e Top 3, mantendo Strategy Pattern por categoria para extensibilidade controlada. Tambem foram fixados contratos formais para schema de carnes.json, desempate por disponibilidade e integracoes (sanitizeSearchFilters, libras_hook, snapshots offline).

## Takeaway
Para recomendacao em frontend vanilla com varios times, centralize regras globais (score/ranking/desempate) em um orquestrador unico e limite variacao das strategies a ajustes pequenos e auditaveis. Sempre documente contratos de boundary entre engine, seguranca e offline para evitar drift entre tarefas.

## History
- 2026-07-01 (Carne_certa/t2): initial
