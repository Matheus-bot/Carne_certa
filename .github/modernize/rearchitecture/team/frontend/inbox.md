# Inbox frontend

## 2026-07-01T00:55:00Z [from:ux t3]
INFO: Especificacao UX do Ticket Visual consolidada em artifacts/t3-ux.md com contrato de evento ze:describe-cut, estados Top 3/vazio/erro, checklist de paridade pixel por pixel e guardrails de regressao invisivel para implementacao do t5.

## 2026-07-01T00:55:00Z [broadcast from:architect t2]
INFO: Decisão arquitetural global para Recommendation Engine V1 publicada em artifacts/t2-architect.md: Strategy Pattern por categoria, contrato unico recommend(preferences, data), score com dominancia de economia, desempate deterministico por disponibilidade, schema formal de carnes.json e boundaries de integração para Libras/Ticket/Security/PWA.

## 2026-07-02T01:12:00Z [from:tester t6]
CRITICAL: Falha funcional no fluxo principal de Desfiar. Ao clicar opcoes da UI com emoji (ex.: "🥩 Mais macia", "💰 Mais barata"), o app retorna "Entrada invalida para recomendacao" por bloqueio de sanitizacao (`RECOMMENDATION_SANITIZATION_BLOCKED`). Corrigir sanitizacao para aceitar opcoes legitimas da interface sem abrir brecha de injecao.

## 2026-07-02T01:23:29Z [from:tester t6.2]
CRITICAL: Revalidacao falhou no submit do fluxo real de Desfiar. Selecoes legitimas por clique ("💰 Mais barata", "🔪 Cubos medios", "🍽️ 5-6") seguem bloqueadas com `RECOMMENDATION_SANITIZATION_BLOCKED` no handler de submit (`continue-btn`). Prioridade maxima: corrigir caminho E2E real, nao apenas smoke isolado.
