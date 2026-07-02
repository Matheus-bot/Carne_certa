## [t4] Sanitizacao reutilizavel de filtros e renderizacao segura no recomendador
- A sanitizacao precisava acontecer antes da etapa de ranking para evitar propagacao de dados nao confiaveis.
- A escolha de expor `window.CarneCertaSecurity` manteve compatibilidade com o frontend vanilla e facilita reuso no motor Strategy V1 (t5).
- Escape em campos dinamicos de `innerHTML` foi necessario para reduzir risco de XSS refletido na montagem de cards e ticket.
- Erros de sanitizacao foram tratados com fallback de UX simples, sem vazar detalhes internos.
- Learnings consumed: [(none)]

## [t5] Recommendation Engine V1 com Strategy + Ticket + base PWA
- O motor de recomendacao foi reestruturado com classes de estrategia por categoria e factory para manter extensibilidade sem acoplar regras na UI.
- O ranking ficou deterministico com cadeia fixa: score_final desc, disponibilidade true primeiro, nome asc, id asc.
- O ticket visual passou a carregar metadados completos (score, disponibilidade, icones, hook libras) e disparar evento `ze:describe-cut` por card.
- O fallback offline mais estavel foi snapshot local do Top 3 com TTL curto + cache de `carnes.json` no SW (stale-while-revalidate).
- A integracao com sanitizacao do t4 foi mantida no boundary antes de carregar estrategia e antes de renderizar HTML.
- Learnings consumed: [frontend/sanitizacao-boundary-frontend]

## [t5.1] Ajuste de negocio de Panela (sem osso) com perfis e ranking default
- A categoria Panela passou a ter resolvedor proprio de prioridades para evitar impacto lateral no tuning das outras categorias.
- O default sem preferencia de Panela foi fixado em ordem de negocio (Economia > Maciez > Sabor > Magra > Rapidez), mantendo economia dominante tambem no peso global.
- O ranking alvo (Acem > Musculo > Paleta) foi garantido pela combinacao de tuning de perfis e calibracao de notas em `carnes.json` so para itens de Panela.
- O smoke de ranking com a formula real do motor foi mais confiavel para validar negocio rapido do que inferencia visual na tela.
- Learnings consumed: [frontend/strategy-ticket-pwa-boundary, frontend/sanitizacao-boundary-frontend]

## [t5.2] Alinhamento completo Panela (sem osso) com 9 cortes e consolidacao de perfis
- A cobertura de Panela depende de `categoryCandidates.panela`; sem alinhar essa lista, cortes validos em `carnes.json` podem nao entrar no ranking da categoria.
- Para evitar regressao entre categorias, os cortes compartilhados mantiveram categoria original no dataset, e a elegibilidade de Panela foi garantida pelo funil de candidatos.
- O default de Panela foi mantido com prioridade de negocio (Economia > Maciez > Sabor > Magra > Rapidez), preservando dominancia de economia e determinismo no Top 3.
- O smoke de ranking em 9 cortes detectou rapidamente desvios de calibracao e orientou ajustes de notas antes da entrega.
- Learnings consumed: [frontend/panela-perfis-default-ranking, frontend/strategy-ticket-pwa-boundary]

## [t5.3] Correcao obrigatoria do ranking default de Panela para Acem > Musculo > Paleta
- O desvio vinha de corte compartilhado (`coxaomole`) superando `paleta` no default de Panela, mesmo sem alterar pesos globais.
- A correcao segura foi calibrar apenas as notas do item divergente no dataset, preservando formula global (`SCORE_WEIGHTS`) e prioridade default de Panela.
- Validar com o mesmo calculo do motor (pesos + boosts + ajuste da categoria) evitou falso positivo de ordenacao visual.
- A alteracao permaneceu restrita a `frontend/data/carnes.json`, sem tocar no Strategy Pattern nem no fluxo de renderizacao.
- Learnings consumed: [frontend/panela-perfis-default-ranking, frontend/panela-candidates-vs-categoria-fonte]

## [t5.4] Regra dedicada de Desfiar com pilares tecnicos e tempo de pressao por corte
- A categoria Desfiar ficou mais estavel com estrategia propria (4 pilares) em vez de depender do resolvedor generico de prioridades.
- O peso dominante de economia foi mantido dentro do contexto de Desfiar sem alterar pesos globais do motor para as outras categorias.
- `colageno` e `fibra_longa` como metadados tecnicos no dataset melhoraram o sinal de textura para desfiar sem acoplar regra de UI.
- A orientacao de preparo e o tempo de pressao por corte funcionam melhor quando declarados por item no `carnes.json` e apenas renderizados no ticket/final instruction.
- Learnings consumed: [frontend/sanitizacao-boundary-frontend, frontend/strategy-ticket-pwa-boundary]

## [t5.4] Ajuste de ranking default Desfiar para Coxao Duro em 1o por integridade
- A forma mais segura de garantir o ranking de negocio local foi calibrar notas dos candidatos de Desfiar no dataset, sem alterar `SCORE_WEIGHTS` globais.
- O ticket de Desfiar precisou preservar `tempo_pressao_min/max` no payload final da recomendacao para exibir a faixa por corte de forma confiavel.
- A dica tecnica no ticket ficou robusta com composicao defensiva: sempre garantir presenca explicita de `selar antes` e `desfiar quente`, mesmo quando o texto base variar por corte.
- O smoke de ranking com a mesma formula da estrategia foi essencial para confirmar `Coxao Duro > Acem > Paleta` antes de fechar a entrega.
- Learnings consumed: [frontend/desfiar-pilares-e-metadados-tecnicos, frontend/strategy-ticket-pwa-boundary, ux/ticket-visual-ze-and-premium-fidelity-guardrails, ux/ticket-visual-ze-hooks-and-state-model]

## [t5.5] Estrategias multicategoria com economia dominante e Top 3 deterministico
- As categorias `bifearole`, `bifefritar`, `churrascosemosso`, `fritarcomosso`, `carnemoida`, `hamburguerblend` e `panelacomosso` ficaram mais previsiveis com pesos de pilares proprios por estrategia, mantendo `economia` como maior peso em todas elas.
- A melhor forma de preservar Panela sem osso e Desfiar foi nao tocar nas estrategias dedicadas dessas categorias e isolar a nova regra em `resolveCategoryPreferencePriorities` + `CATEGORY_PILLAR_WEIGHTS`.
- O desempate por disponibilidade permaneceu global no comparator (score desc -> disponibilidade true -> nome -> id), validado com empate sintetico em smoke.
- Para Hamburguer blend, manter os 2 blends obrigatorios 80/20 no dataset e reforcar a sugestao no header do ticket evita perda de visibilidade da regra de negocio.
- Learnings consumed: [frontend/strategy-ticket-pwa-boundary, frontend/panela-candidates-vs-categoria-fonte, frontend/desfiar-pilares-e-metadados-tecnicos]

## [t5.5.1] Correcao obrigatoria de aderencia multicategoria para Top1 oficial
- Aderencia exata dos Top1 oficiais foi fechada com calibracao localizada em dataset + estrategia de `carnemoida`, sem alterar o comparator global nem quebrar guardrails de Panela/Desfiar.
- Para Bife a Role, a inclusao de `coxaoduro` em `categoryCandidates.bifearole` foi necessaria para refletir o corte oficial no funil da categoria.
- A regra global de economia dominante nas categorias multicategoria foi consolidada via roteamento fixo de prioridades da categoria (`resolveCategoryPreferencePriorities`).
- O smoke precisou ser alinhado com a formula real da estrategia de `carnemoida` para gerar evidencia fiel do Top1 oficial de Patinho.
- Learnings consumed: [frontend/economia-dominante-multicategoria-t55, frontend/strategy-ticket-pwa-boundary]

## [t6.1] Remediacao critica de sanitizacao para opcoes da UI com emoji no fluxo Desfiar
- A causa raiz foi allowlist restritiva em `sanitizeOptionText`, que aceitava texto alfanumerico mas bloqueava labels legitimos da UI contendo emoji.
- A correcao segura foi separar uma allowlist especifica para opcoes de recomendacao com suporte a emoji/simbolos de interface (`RECOMMENDATION_OPTION_ALLOWLIST`), preservando o bloqueio por assinaturas de injecao (`hasInjectionSignature`).
- O smoke dedicado de t6.1 confirmou os tres pilares de aceite: aceita opcao legitima com emoji, bloqueia payload malicioso e preserva Top1/Top3 em Desfiar.
- A revalidacao funcional global de t6 confirmou ausencia de regressao em ranking, desempate por disponibilidade e economia dominante.
- Learnings consumed: [frontend/sanitizacao-boundary-frontend, frontend/desfiar-pilares-e-metadados-tecnicos]

## [t6.3] Remediacao critica v2 no submit real (continue-btn) de Desfiar
- A causa raiz persistente do bloqueio no click-path real foi uma regex de allowlist de emoji invalida em runtime (`Range out of order in character class`), que gerava `RECOMMENDATION_SANITIZATION_BLOCKED` para opcoes legitimas.
- A correcao segura foi trocar a allowlist para `\p{Extended_Pictographic}` mantendo limite de tamanho e mantendo `hasInjectionSignature` para bloqueio de payload malicioso.
- A persistencia percebida foi agravada por stale-cache no Service Worker; mitiguei com versao de caches `v2`, `networkFirst` para `script.js` e para paginas de categorias/acessibilidade.
- O click-path real (`💰 Mais barata` + `🔪 Cubos médios` + `🍽️ 5-6` + submit) voltou a renderizar ticket Top 3 sem mensagem de entrada invalida.
- Learnings consumed: [frontend/sanitizacao-opcoes-ui-com-emoji, frontend/sanitizacao-boundary-frontend, frontend/strategy-ticket-pwa-boundary]
