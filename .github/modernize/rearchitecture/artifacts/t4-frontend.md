# t4 - Validacao de tipos e sanitizacao para filtros de busca

## Resumo
Implementacao de camada reutilizavel de seguranca no frontend para o motor de recomendacao, cobrindo normalizacao NFKC, allowlist, escaping de HTML e bloqueio de assinaturas comuns de injecao.

## Entregas
- Adicionados utilitarios reutilizaveis em `frontend/script.js`:
  - `sanitizeSearchTerm`
  - `sanitizeBoolean`
  - `sanitizeSearchFilters`
  - `sanitizeRecommendationInputs`
  - `escapeHtml`
  - `hasInjectionSignature`
- Exposicao de boundary para reuso no motor V1:
  - `window.CarneCertaSecurity`
  - `window.sanitizeSearchFilters`
- Integracao da sanitizacao no fluxo de recomendacao antes do ranking.
- Escape aplicado na renderizacao dinamica de recomendacoes e ticket final para reduzir risco de injecao em HTML/atributos.
- Tratamento de erro de entrada invalida com fallback seguro de UX, sem stacktrace sensivel.

## Detalhes tecnicos
1. Validacao de tipo:
- Rejeita input nao-objeto ou array em filtros e preferencias.

2. Normalizacao:
- Strings normalizadas com Unicode NFKC e remocao de caracteres de controle.

3. Allowlist:
- Filtros aceitam apenas letras, numeros, espacos, sublinhado, hifen, ponto e sinais controlados.
- Limite de tamanho aplicado para reduzir superficie de payloads.

4. Deteccao defensiva:
- Bloqueio explicito de padroes suspeitos (script tags, handlers inline, `javascript:`, SQLi basica e comentarios maliciosos).

5. Escaping:
- Escape de entidades HTML para campos dinamicos interpolados em `innerHTML`.

## Arquivos alterados
- `frontend/script.js`

## Test Results
- Command: `node --check frontend/script.js`
- Passed: 1
- Failed: 0
- Skipped: 0

## Riscos e observacoes
- O score/ranking vigente nao foi reescrito nesta task (escopo t4 focado em seguranca de entrada/saida).
- A cobertura de payloads hostis em cenarios reais deve ser ampliada por t6/t7 com suite dedicada de testes maliciosos.
