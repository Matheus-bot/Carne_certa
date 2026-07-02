# t1 - Consolidação de Escopo V1, Critérios de Aceite e Matriz de Requisitos

## Resumo Executivo
Este documento consolida o escopo funcional e não funcional do CarneCerta V1 para orientar as fases t2 a t8.
O foco V1 cobre: motor de recomendação com Strategy Pattern, acessibilidade com ganchos para avatar de Libras (Zé), Ticket Visual, segurança de filtros de busca e base de PWA offline para ticket e catálogo.

## Baseline de Escopo V1

### Objetivos em Escopo
1. Implementar motor de recomendação com RecommendationStrategy.recommend(preferences, data).
2. Criar estratégias por categoria (Panela, Churrasco e demais categorias do produto).
3. Consumir dados de carnes.json com atributos de nota e disponibilidade.
4. Calcular ranking com peso dominante para preferência econômica.
5. Retornar Top 3 cortes com desempate por disponibilidade.
6. Preparar ganchos de integração para avatar de Libras (Zé).
7. Gerar Ticket Visual com ícones de preparo para operação de açougue.
8. Implementar validação de tipos e sanitização contra injeção em filtros de busca.
9. Estruturar Service Worker para operação offline inicial de catálogo e ticket.
10. Preservar fidelidade visual pixel por pixel ao premium documentado, usando tokens CSS existentes em :root e sem bibliotecas UI.

### Fora de Escopo V1
1. Personalização avançada por perfil de usuário autenticado.
2. Sincronização offline bidirecional com backend.
3. Mecanismos de recomendação com ML.
4. Internacionalização nova além dos idiomas já existentes no projeto.
5. Refatoração ampla de arquitetura além do necessário para os requisitos V1.

## Premissas e Restrições
1. A implementação será em HTML, CSS e JavaScript vanilla.
2. Compatibilidade alvo: navegadores evergreen modernos (2 últimas versões principais).
3. Acessibilidade mínima: WCAG 2.1 AA.
4. Sem Tailwind, sem UI libs e sem frameworks de frontend.
5. Deve reutilizar o design system premium e tokens CSS já existentes.

## Modelo de Dados V1 (carnes.json)
Cada item de corte deve conter:
- id: string
- nome: string
- categoria: string
- maciez: number (0 a 10)
- sabor: number (0 a 10)
- rapidez: number (0 a 10)
- economia: number (0 a 10)
- integridade_fibra: number (0 a 10)
- disponibilidade: boolean
- preparo_icones: string[]
- descricao_curta: string

Regra de validação de dados:
- Campos numéricos fora de 0 a 10 devem invalidar o item para o cálculo.
- Campos ausentes obrigatórios devem excluir o item do ranking e registrar motivo técnico.

## Regras de Negócio de Recomendação
1. Contrato obrigatório: RecommendationStrategy.recommend(preferences, data).
2. Estratégia por categoria deve ser encapsulada em classe específica.
3. Peso de economia deve ser o maior da fórmula de score.
4. Retorno deve conter exatamente Top 3 quando houver ao menos 3 itens válidos.
5. Em empate de score final, priorizar disponibilidade true sobre false.
6. Persistindo empate, usar ordenação determinística por nome ascendente.
7. Itens indisponíveis podem participar do ranking, mas perdem desempate para disponíveis.

## Critérios de Aceite (Gherkin)

### CA-R - Recomendação
- Dado um conjunto válido de cortes em carnes.json
- Quando o usuário selecionar preferências de categoria e prioridade econômica
- Então o sistema deve retornar os 3 cortes com maior score final
- E o cálculo deve privilegiar economia sobre os demais atributos
- E empates devem ser resolvidos por disponibilidade

### CA-A - Acessibilidade e Libras
- Dado um corte recomendado no Top 3
- Quando o ticket for renderizado
- Então o sistema deve expor gancho de integração para avatar de Libras (Zé)
- E o texto de apoio deve permitir descrição clara do corte e preparo
- E componentes interativos devem manter conformidade WCAG 2.1 AA

### CA-T - Ticket Visual
- Dado o Top 3 calculado
- Quando o ticket visual for gerado
- Então cada item deve apresentar nome do corte, posição no ranking e ícones de preparo
- E o layout deve manter fidelidade visual ao premium documentado

### CA-S - Segurança de Filtros
- Dado uma entrada de filtro de busca
- Quando o valor contiver payload inválido ou potencialmente malicioso
- Então o sistema deve validar tipos, sanitizar e normalizar a entrada
- E bloquear caracteres e padrões fora da allowlist definida
- E impedir execução ou propagação de conteúdo injetado no fluxo de busca

### CA-P - Estrutura PWA Offline
- Dado o usuário sem conexão
- Quando acessar catálogo ou ticket previamente cacheados
- Então o sistema deve responder via Service Worker com conteúdo local válido
- E registrar estratégia de cache para evolução futura

## Matriz de Requisitos V1

| ID | Domínio | Requisito | Prioridade | Critério de aceite | Dono alvo | Evidência esperada |
|---|---|---|---|---|---|---|
| REQ-001 | Arquitetura | Adotar Strategy Pattern com interface RecommendationStrategy e método recommend(preferences, data). | P1 | CA-R | t2 | Contrato documentado e diagrama de classes |
| REQ-002 | Arquitetura | Implementar classes de estratégia por categoria (Panela, Churrasco, etc.). | P1 | CA-R | t2/t5 | Estratégias implementadas e mapeamento por categoria |
| REQ-003 | Dados | Definir schema carnes.json com maciez, sabor, rapidez, economia, integridade_fibra e disponibilidade. | P1 | CA-R | t2/t5 | Schema e exemplos válidos |
| REQ-004 | Algoritmo | Fórmula de score deve atribuir maior peso para economia. | P1 | CA-R | t2/t5/t6 | Documento da fórmula e teste de dominância |
| REQ-005 | Algoritmo | Retornar Top 3 cortes por score final. | P1 | CA-R | t5/t6 | Testes de ranking e asserts Top 3 |
| REQ-006 | Algoritmo | Em empate de score, priorizar disponibilidade true. | P1 | CA-R | t2/t5/t6 | Casos de teste de empate |
| REQ-007 | Algoritmo | Em empate remanescente, usar fallback determinístico por nome ascendente. | P2 | CA-R | t2/t5/t6 | Teste de ordenação estável |
| REQ-008 | Acessibilidade | Expor hook para avatar de Libras (Zé) em cada item recomendado. | P1 | CA-A | t3/t5/t6 | Contrato de integração e render no ticket |
| REQ-009 | Acessibilidade | Garantir WCAG 2.1 AA em interações do fluxo de recomendação e ticket. | P1 | CA-A | t3/t5/t6 | Checklist de acessibilidade e evidências manuais |
| REQ-010 | UI | Gerar Ticket Visual com ícones de preparo para cada recomendação. | P1 | CA-T | t3/t5/t6 | Componente renderizado com ícones |
| REQ-011 | UI | Manter fidelidade visual pixel por pixel ao premium documentado. | P1 | CA-T | t3/t5/t6 | Comparativo visual e validação de layout |
| REQ-012 | Segurança | Validar tipos de entrada em filtros de busca antes do processamento. | P1 | CA-S | t4/t5/t7 | Testes de tipo e rejeição de input inválido |
| REQ-013 | Segurança | Sanitizar e normalizar filtros com allowlist de caracteres e termos. | P1 | CA-S | t4/t5/t7 | Utilitário de sanitização e testes de payloads |
| REQ-014 | Segurança | Evitar injeções no fluxo de busca e renderização de resultados. | P1 | CA-S | t4/t5/t7 | Testes de segurança com payload malicioso |
| REQ-015 | PWA | Criar estrutura base de Service Worker para cache de catálogo e ticket. | P1 | CA-P | t5/t6/t7 | Arquivos de registro e instalação do SW |
| REQ-016 | PWA | Definir estratégia inicial de cache/versionamento e fallback offline. | P2 | CA-P | t5/t6/t7 | Política de cache documentada e teste offline |
| REQ-017 | Frontend | Implementação apenas com CSS/JS vanilla e tokens :root existentes. | P1 | CA-T | t5 | Revisão técnica de dependências e CSS tokens |
| REQ-018 | Qualidade | Comportamento de ranking deve ser determinístico e repetível. | P1 | CA-R | t5/t6 | Testes repetidos com mesma saída |
| REQ-019 | Qualidade | Fluxo deve tratar ausência de dados válidos com estado vazio seguro e claro. | P1 | CA-R/CA-T | t3/t5/t6 | Estado vazio no UI e teste correspondente |
| REQ-020 | Governança | Evidências de teste funcional e segurança são obrigatórias para gate final. | P1 | Gate t8 | t6/t7/t8 | Relatórios e checklist de fechamento |

## Dependências para Próximas Tasks
1. t2 depende de REQ-001 a REQ-007 para arquitetura e fórmula.
2. t3 depende de REQ-008 a REQ-011 e REQ-019 para UX e acessibilidade.
3. t4 depende de REQ-012 a REQ-014 para desenho de segurança.
4. t5 depende de todos os blocos técnicos (arquitetura, UX e segurança).
5. t6 valida REQ-004 a REQ-006, REQ-010, REQ-015 e REQ-018.
6. t7 valida REQ-012 a REQ-016 com foco em hardening.
7. t8 consolida evidências e verifica cobertura de REQ-001 a REQ-020.

## Riscos Iniciais e Mitigações
1. Risco: divergência entre fidelidade visual premium e novas integrações de ticket.
   Mitigação: baseline visual obrigatório antes/depois e checklist de tokens.
2. Risco: fórmula de score sem dominância real de economia.
   Mitigação: teste automatizado de sensibilidade e casos de fronteira.
3. Risco: sanitização insuficiente para payloads compostos.
   Mitigação: suíte de payloads maliciosos e validação por allowlist estrita.
4. Risco: cache offline servir conteúdo obsoleto sem versão.
   Mitigação: estratégia de versionamento de cache e invalidação controlada.

## Critério de Pronto do Escopo (DoD desta fase)
1. Escopo V1 explicitado com fronteiras claras.
2. Critérios de aceite definidos por domínio principal.
3. Requisitos numerados e rastreáveis para t2 a t8.
4. Dependências entre tasks explicitadas.
5. Riscos críticos iniciais registrados com mitigação.
