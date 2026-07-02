# Sanitizacao Opcoes UI Com Emoji

Aceitar labels legitimos com emoji na UI requer allowlist dedicada por contexto, sem relaxar deteccao de assinaturas de injecao.

## What Happened
No task Carne_certa/t6.1, o fluxo de Desfiar falhava com `RECOMMENDATION_SANITIZATION_BLOCKED` ao selecionar opcoes validas como "🥩 Mais macia" e "💰 Mais barata". A causa foi a allowlist de `sanitizeOptionText` nao incluir ranges unicode usados por emoji e variation selector.

A remediacao foi criar `RECOMMENDATION_OPTION_ALLOWLIST` para inputs de opcao da recomendacao, mantendo `hasInjectionSignature` inalterado. Assim, opcoes legitimas com emoji passaram a ser aceitas, enquanto payloads com `<script>`, `javascript:`, `onerror=` e SQL-like continuam bloqueados.

## Takeaway
Para este projeto, nao reutilizar cegamente a allowlist de busca em labels de botao da UI. Usar allowlist contextual para recomendacao, com suporte explicito a emoji/simbolos esperados da interface e manutencao do bloqueio por assinaturas de injecao como primeira barreira.

## Example (optional)
```js
const RECOMMENDATION_OPTION_ALLOWLIST =
  /^[\p{L}\p{N}\s_.\-+/\u200D\uFE0F\u2600-\u27BF\u{1F300}-\u{1FAFF}]{0,60}$/u;
```

## History
- 2026-07-02 (Carne_certa/t6.1): initial
