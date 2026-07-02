# Emoji Sanitization Blocks UI Options

Selecionar opcoes com emoji em botoes de preferencia pode ser bloqueado pela sanitizacao e quebrar o fluxo principal de recomendacao.

## What Happened
Na validacao do t6 (CarneCerta), a categoria Desfiar retornou "Entrada invalida para recomendacao" quando o usuario selecionava opcoes da UI (ex.: "🥩 Mais macia", "💰 Mais barata").
A causa observada foi `sanitizeRecommendationInputs` rejeitando textos com emoji via allowlist, gerando `RECOMMENDATION_SANITIZATION_BLOCKED`.
Com fallback textual sem emojis, o ticket foi gerado normalmente (Top 3 + pressao + dicas), confirmando bug no boundary de entrada.

## Takeaway
Ao sanitizar entradas vindas de labels de UI, permitir/remover explicitamente emojis antes da validacao final para nao bloquear caminhos legitimos.
Para testes E2E, sempre validar o fluxo de clique real (com labels originais da interface), nao apenas harness tecnico com strings limpas.

## History
- 2026-07-02 (Carne_certa/t6): initial
