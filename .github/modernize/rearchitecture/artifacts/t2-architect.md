# t2 - Arquitetura da Recommendation Engine (Strategy Pattern)

## Objetivo de Arquitetura
Definir o blueprint técnico da Recommendation Engine V1 para implementação determinística, segura e extensível, cobrindo contrato de estratégia, fórmula de score com dominância de economia, desempate por disponibilidade, schema de dados carnes.json e interfaces com Ticket Visual, avatar de Libras (Zé) e base PWA offline.

## Escopo Arquitetural (HOW)
1. Definição de componentes e responsabilidades da Recommendation Engine.
2. Contrato RecommendationStrategy.recommend(preferences, data).
3. Regras formais de score e ordenação Top 3.
4. Schema canônico de carnes.json e contrato de validação de entrada.
5. Pontos de integração com segurança, UX/acessibilidade e cache offline.

## Estrutura de Módulos
```text
frontend/
  data/
    carnes.json                        # fonte de catálogo e atributos de score
  js/
    recommendation/
      RecommendationStrategy.js        # contrato/abstração
      BaseRecommendationStrategy.js    # utilitários comuns de score
      PanelaStrategy.js                # estratégia por categoria
      ChurrascoStrategy.js
      BifeStrategy.js
      MoerStrategy.js
      DesfiarStrategy.js
      HamburguerStrategy.js
      StrategyFactory.js               # mapeia categoria -> estratégia
      RecommendationEngine.js          # orquestra validação, score, ranking, top3
      RankingComparator.js             # desempate determinístico
      RecommendationErrors.js          # erros de domínio
      RecommendationTypes.js           # shape guards em runtime
```

## Contratos de Domínio

### RecommendationStrategy
Contrato obrigatório para toda estratégia de categoria.

```text
interface RecommendationStrategy {
  recommend(preferences, data) -> RecommendationResult[]
}
```

### Shape de Entrada
```text
preferences: {
  categoria: string,                   # ex: "panela", "churrasco"
  prioridades?: {
    maciez?: number,                   # 0..1
    sabor?: number,                    # 0..1
    rapidez?: number,                  # 0..1
    economia?: number,                 # 0..1
    integridade_fibra?: number         # 0..1
  },
  filtrosBusca?: {
    termo?: string,
    somenteDisponiveis?: boolean
  }
}

data: CarneItem[]
```

### Shape de Saída
```text
RecommendationResult: {
  id: string,
  nome: string,
  categoria: string,
  score_final: number,
  disponibilidade: boolean,
  preparo_icones: string[],
  descricao_curta: string,
  ranking_posicao: 1|2|3,
  libras_hook: {
    key: string,
    text: string,
    enabled: true
  }
}
```

## Estratégia por Categoria
Cada classe de categoria implementa RecommendationStrategy e só altera:
1. Vetor de ajuste fino por categoria (bias de domínio).
2. Regras opcionais de elegibilidade (sem quebrar schema base).
3. Metadados para Ticket Visual e Libras.

Padrão recomendado:
1. BaseRecommendationStrategy aplica validação/sanitização delegadas e score base.
2. Classe de categoria aplica fator categórico controlado.
3. RecommendationEngine consolida ranking final e corte Top 3.

## Fórmula de Score (economia dominante)

### Pesos base globais
Os pesos devem somar 1.0:
- maciez: 0.18
- sabor: 0.22
- rapidez: 0.15
- economia: 0.30  <- maior peso obrigatório
- integridade_fibra: 0.15

### Cálculo
Para cada corte válido, com notas no intervalo [0,10]:

$$
score_{base} = 0.18\cdot maciez + 0.22\cdot sabor + 0.15\cdot rapidez + 0.30\cdot economia + 0.15\cdot integridade\_fibra
$$

Ajuste por categoria (opcional e limitado):

$$
score_{categoria} = score_{base} + ajuste_{categoria}
$$

Restrições arquiteturais de ajuste:
1. ajuste_categoria no intervalo [-0.5, +0.5].
2. Ajuste não pode inverter dominância estrutural de economia no modelo global.
3. Score final deve ser normalizado para 2 casas decimais para estabilidade de exibição.

$$
score_{final} = round(score_{categoria}, 2)
$$

## Regra de Ranking e Top 3
Ordenação determinística obrigatória:
1. score_final desc.
2. disponibilidade true antes de false (desempate principal).
3. nome ascendente (locale pt-BR, sensitivity base) como fallback determinístico.
4. id ascendente como último fallback técnico.

Seleção:
1. Retornar no máximo 3 itens.
2. Se houver 3 ou mais válidos, retornar exatamente 3.
3. Se houver menos de 3 válidos, retornar todos os válidos e sinalizar estado parcial.
4. Se 0 válidos, retornar coleção vazia e motivo técnico padronizado.

## Schema Canônico de carnes.json

### JSON Schema (normativo)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CarneCertaV1Catalog",
  "type": "array",
  "items": {
    "type": "object",
    "additionalProperties": false,
    "required": [
      "id",
      "nome",
      "categoria",
      "maciez",
      "sabor",
      "rapidez",
      "economia",
      "integridade_fibra",
      "disponibilidade",
      "preparo_icones",
      "descricao_curta"
    ],
    "properties": {
      "id": { "type": "string", "minLength": 1, "maxLength": 80 },
      "nome": { "type": "string", "minLength": 1, "maxLength": 120 },
      "categoria": { "type": "string", "minLength": 1, "maxLength": 60 },
      "maciez": { "type": "number", "minimum": 0, "maximum": 10 },
      "sabor": { "type": "number", "minimum": 0, "maximum": 10 },
      "rapidez": { "type": "number", "minimum": 0, "maximum": 10 },
      "economia": { "type": "number", "minimum": 0, "maximum": 10 },
      "integridade_fibra": { "type": "number", "minimum": 0, "maximum": 10 },
      "disponibilidade": { "type": "boolean" },
      "preparo_icones": {
        "type": "array",
        "minItems": 1,
        "maxItems": 8,
        "items": { "type": "string", "minLength": 1, "maxLength": 40 }
      },
      "descricao_curta": { "type": "string", "minLength": 1, "maxLength": 240 }
    }
  }
}
```

### Regras de Integridade de Dados
1. Item inválido no schema não entra no ranking.
2. Parsing deve produzir relatório técnico de descartes por item/campo.
3. Itens descartados não quebram execução; engine segue com válidos.

## Segurança por Contrato (integração com t4)
A Recommendation Engine deve consumir entrada já sanitizada, mas também impor guard-rails defensivos:
1. Type guards estritos para preferences e filtrosBusca.
2. Normalização unicode NFKC para strings de filtro.
3. Allowlist de caracteres para termo de busca (letras, números, espaço, hífen, underscore).
4. Escape de caracteres especiais antes de qualquer interpolação em seletor/renderização.
5. Rejeição explícita de payloads com padrão de injeção conhecido.

Contrato de boundary:
1. Security layer fornece sanitizeSearchFilters(input).
2. RecommendationEngine invoca sanitizeSearchFilters antes de StrategyFactory.
3. Falha de sanitização retorna erro de domínio tipado, sem stack sensível em UI.

## Ganchos de Acessibilidade e Ticket Visual (integração com t3/t5)
A engine deve retornar metadados consumíveis pela UI sem acoplamento visual:
1. libras_hook.key: identificador estável para acionar avatar Zé.
2. libras_hook.text: texto curto para narração do corte e preparo.
3. preparo_icones: lista ordenada de ícones de preparo para Ticket Visual.
4. ranking_posicao explícita para renderização consistente (1,2,3).

## Estrutura PWA Offline (integração com t5/t7)
Blueprint para Service Worker sem definir implementação visual:
1. Cache estático versão (app-shell).
2. Cache de catálogo carnes.json com estratégia stale-while-revalidate.
3. Cache do Ticket Visual com cache-first e TTL curto.
4. Fallback offline para leitura de último Top 3 persistido.

Contratos de dados offline:
1. offline_catalog_snapshot (catálogo validado).
2. offline_ticket_snapshot (último ticket válido com timestamp).
3. cache_version obrigatória para invalidação controlada.

## Erros de Domínio
Padronizar códigos para observabilidade e UX:
1. RECOMMENDATION_INVALID_PREFERENCES
2. RECOMMENDATION_INVALID_DATA_SOURCE
3. RECOMMENDATION_NO_VALID_ITEMS
4. RECOMMENDATION_SANITIZATION_BLOCKED
5. RECOMMENDATION_STRATEGY_NOT_FOUND

## Decisões Arquiteturais (ADR resumido)
1. Pattern principal: Strategy Pattern por categoria para isolar regras e facilitar evolução.
2. Orquestração central em RecommendationEngine para garantir determinismo global.
3. Dominância de economia garantida por peso estrutural máximo (0.30).
4. Desempate por disponibilidade como regra de negócio obrigatória e auditável.
5. Schema formal em JSON Schema para validar catálogo antes de score.

## Riscos e Mitigações
1. Risco HIGH: Estratégias de categoria aplicarem ajustes excessivos e distorcerem pesos.
   Mitigação: limitar ajuste_categoria em [-0.5,+0.5] + testes de sensibilidade.
2. Risco HIGH: dados reais com lacunas frequentes em carnes.json reduzir cobertura do Top 3.
   Mitigação: relatório de descarte por item e monitoramento de taxa de validade.
3. Risco MEDIUM: divergência entre sanitização (t4) e contrato da engine (t5).
   Mitigação: contrato único sanitizeSearchFilters e suíte de contratos compartilhada.
4. Risco MEDIUM: inconsistência de fallback offline entre ticket e catálogo.
   Mitigação: versionamento de cache e snapshots com timestamp.

## Rastreabilidade de Requisitos
- REQ-001: contrato RecommendationStrategy.recommend definido.
- REQ-002: classes por categoria e factory de estratégia.
- REQ-003: schema canônico carnes.json e regras de integridade.
- REQ-004: fórmula com economia como maior peso.
- REQ-005: retorno Top 3.
- REQ-006: desempate por disponibilidade.
- REQ-007: fallback determinístico adicional por nome e id.

## Hand-off para Implementação
1. t4 (security): implementar sanitizeSearchFilters e type validators conforme boundary.
2. t5 (frontend): implementar módulos recommendation/* e integrar com Ticket Visual e hooks Libras.
3. t6 (tester): validar dominância de economia, desempates e determinismo.
4. t7 (security): executar payload suite contra filtros e hardening de cache offline.

## Test Results
- Command: n/a (design task - sem alteração de código executável)
- Passed: 0
- Failed: 0
- Skipped: 0
