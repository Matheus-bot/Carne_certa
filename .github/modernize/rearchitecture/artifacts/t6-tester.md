# t6 - Validacao funcional obrigatoria (P4)

## Escopo validado
- Top1 oficiais por categoria da t5.5.1
- Regra de economia dominante (peso global e pesos por categoria multicategoria)
- Desempate por disponibilidade=true
- Retorno sempre Top 3
- Guardrails sem regressao: Panela sem osso e Desfiar
- Ticket de Desfiar com tempo de pressao + dicas tecnicas
- Smoke offline inicial de catalogo/ticket (cache e fallback)

## Evidencias executadas
- Script de validacao funcional: .github/modernize/rearchitecture/artifacts/checkpoints/t6-functional-validation.js
- Smoke multicategoria base: .github/modernize/rearchitecture/artifacts/checkpoints/t5.5-frontend-smoke.js
- Validacao de runtime no navegador (http://127.0.0.1:4173/paginas/categorias/desfiar.html)

## Resultado por criterio
- 1) Top1 oficiais por categoria da t5.5.1: PASS
  - bifearole: coxaoduro
  - bifefritar: contrafile
  - churrascosemosso: picanha
  - fritarcomosso: bistecadocontrafile
  - carnemoida: patinho
  - panelacomosso: costela

- 2) Economia dominante funcionando: PASS
  - Peso global: economia=0.30 (maior)
  - Pesos multicategoria: economia maior em panelacomosso, bifearole, bifefritar, churrascosemosso, fritarcomosso, carnemoida, hamburguerblend

- 3) Desempate por disponibilidade=true: PASS
  - Empate sintetico validado: tie-true > tie-false

- 4) Retorno sempre Top 3: PASS
  - Todas as categorias testadas retornaram exatamente 3 itens

- 5) Panela sem osso e Desfiar sem regressao: PASS
  - Panela: Top1 acem
  - Desfiar: Top1 coxaoduro

- 6) Desfiar no Ticket com tempo de pressao + dicas selar antes/desfiar quente: PARTIAL
  - PASS: ticket exibiu Top 3 + Pressao + dicas tecnicas quando acionado com valores fallback (sem selecionar botoes com emoji)
  - FAIL: fluxo de clique normal da pagina (selecionando botoes) gera erro "Entrada invalida para recomendacao"
  - Causa observada: sanitizacao bloqueia valores com emoji (RECOMMENDATION_SANITIZATION_BLOCKED)

- 7) Smoke offline inicial de catalogo/ticket: PASS
  - Service Worker registrado (registrations=1, hasController=true)
  - Cache de dados detectado e fetch offline de /data/carnes.json retornando array (24 itens)
  - Snapshot de ticket offline persistido em localStorage (carnecerta-offline-ticket-snapshot)

## Test Results
- Command: node .github/modernize/rearchitecture/artifacts/checkpoints/t6-functional-validation.js
- Passed: 18
- Failed: 0
- Skipped: 0

- Command: node .github/modernize/rearchitecture/artifacts/checkpoints/t5.5-frontend-smoke.js
- Passed: 1
- Failed: 0
- Skipped: 0

- Command: Runtime browser smoke em http://127.0.0.1:4173/paginas/categorias/desfiar.html
- Passed: 5
- Failed: 1
- Skipped: 0
- Falha objetiva:
  - Selecionar botoes de preferencia com emoji e clicar em "Ver 3 opcoes ideais" retorna "Entrada invalida para recomendacao" e nao renderiza ticket

## Verdict Block (Charter)
integration: FAIL - motor e regras passam em harness, mas ha falha funcional no fluxo real da UI de Desfiar ao selecionar opcoes

e2e: PARTIAL - cobertura de ranking/offline ok; fluxo principal de clique em Desfiar apresenta bloqueio por sanitizacao

overall: FAIL - regressao funcional no caminho principal de uso da categoria Desfiar

## Riscos residuais
- Fluxos com botoes contendo emoji podem falhar por bloqueio de sanitizacao em outras paginas/categorias.
- Cache de dados no caminho interno carnecerta:data:carnes em runtime emite warning de scheme nao suportado no Cache API; existe fallback, mas vale hardening para evitar comportamento inconsistente entre navegadores.
