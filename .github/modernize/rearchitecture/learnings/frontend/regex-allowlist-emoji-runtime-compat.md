# Regex Allowlist Emoji Runtime Compat

Para campos de opcao com emoji, usar classe Unicode robusta e compativel (`\p{Extended_Pictographic}`) evita bloqueios falsos por regex invalida em runtime.

## What Happened
No Carne_certa/t6.3, a jornada real de submit em Desfiar continuava falhando com `RECOMMENDATION_SANITIZATION_BLOCKED` mesmo apos remediacao anterior. A causa raiz foi a regex de allowlist de opcoes (`RECOMMENDATION_OPTION_ALLOWLIST`) com range Unicode que, no runtime do navegador, gerava erro de classe/range e derrubava a sanitizacao para labels legitimos com emoji.

A correcao foi trocar o trecho de range por `\p{Extended_Pictographic}`, mantendo `u` flag, limite de tamanho e validacao por assinaturas de injecao.

## Takeaway
Neste projeto, para aceitar emoji em labels de UI sem abrir superficie de injecao, preferir `\p{Extended_Pictographic}` em vez de ranges extensos com code points dentro de character class. Preservar `hasInjectionSignature` como barreira obrigatoria e separada da allowlist.

## Example (optional)
```js
const RECOMMENDATION_OPTION_ALLOWLIST =
  /^[\p{L}\p{N}\p{Extended_Pictographic}\s_.\-+/\u200D\uFE0F]{0,60}$/u;
```

## History
- 2026-07-02 (Carne_certa/t6.3): initial
