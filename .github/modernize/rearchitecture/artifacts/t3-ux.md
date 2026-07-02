# t3 - UX Spec Ticket Visual + Libras (Ze)

## Summary
Especificacao de experiencia para o Ticket Visual do CarneCerta V1 com icones de preparo e ganchos de integracao do avatar de Libras (Ze), cobrindo os estados Top 3, vazio e erro. Este documento atende REQ-008, REQ-009, REQ-010, REQ-011 e REQ-019.

## Contexto e Escopo
- Entrada funcional: Top 3 cortes retornados pela engine de recomendacao (ja ordenados com desempate por disponibilidade).
- Saida UX: ticket legivel para balconista/acougueiro, com orientacao de preparo e narracao acessivel para Ze.
- Plataforma: frontend HTML/CSS/JS vanilla, sem UI libs, mantendo fidelidade premium e tokens :root ja existentes.

## Objetivos de UX
1. Exibir o Top 3 com hierarquia visual clara de ranking (1o, 2o, 3o).
2. Tornar o ticket rapidamente escaneavel em ambiente de operacao (balcao).
3. Permitir que cada recomendacao tenha um texto pronto para narracao em Libras (Ze hook).
4. Tratar ausencia de dados e falhas sem ambiguidades, com orientacao de recuperacao.
5. Garantir navegacao por teclado e leitura adequada por tecnologias assistivas.

## Informacao e Hierarquia do Ticket
Cada item recomendado deve conter, nesta ordem:
1. Selo de posicao: "1", "2", "3" (ou "Top 1", "Top 2", "Top 3" para leitor de tela).
2. Nome do corte.
3. Selo de disponibilidade:
- "Disponivel hoje" quando disponibilidade=true.
- "Baixa disponibilidade" quando disponibilidade=false.
4. Linha de apoio curta (descricao_curta).
5. Bloco de icones de preparo (chips visuais).
6. Acao secundaria de acessibilidade: "Descrever em Libras" (botao/acao para acionar Ze).

## Especificacao de Iconografia de Preparo
Fonte dos dados: preparo_icones[] em cada corte.

Mapeamento canonico (id -> rotulo visivel -> narracao acessivel):
- panela -> "Panela" -> "Preparo ideal para panela."
- churrasco -> "Churrasco" -> "Preparo ideal para churrasco."
- grelha -> "Grelha" -> "Preparo ideal em grelha."
- forno -> "Forno" -> "Preparo ideal em forno."
- fritura -> "Fritura" -> "Preparo ideal para fritura."
- desfiar -> "Desfiar" -> "Indicado para desfiar."
- moer -> "Moer" -> "Indicado para moer."
- hamburguer -> "Hamburguer" -> "Indicado para hamburguer."

Regras UX para icones:
1. Exibir ate 4 icones por card sem quebra de leitura visual.
2. Se houver mais de 4, mostrar "+N" e manter lista completa no texto para Ze.
3. Cada icone deve ter texto alternativo sem abreviacao.
4. Nunca depender apenas da cor para diferenciar tipos de preparo.

## Fluxo de Interacao (Ticket)
1. Usuario finaliza selecao de preferencias.
2. Sistema gera recomendacoes e abre secao Ticket Visual.
3. Focus inicial vai para titulo do ticket (anchor para leitor de tela).
4. Usuario pode percorrer cards por teclado (Tab natural) e acionar "Descrever em Libras" em qualquer card.
5. Ao acionar Ze, sistema publica payload estruturado do item e confirma feedback visual/textual.

## Estados de Tela

### Estado A - Top 3 (sucesso)
Condicao:
- 3 ou mais itens validos.

Comportamento:
- Exibe exatamente 3 cards no ticket.
- Mostra destaque maior para Top 1 (sem romper fidelidade premium ja definida).
- Exibe status de disponibilidade em cada card.
- Exibe CTA de Libras por card.

Microcopy:
- Titulo: "Seu Ticket CarneCerta"
- Subtitulo: "Top 3 cortes recomendados para hoje"
- Feedback Ze (ao acionar): "Descricao enviada para o avatar Ze."

### Estado B - Vazio
Condicao:
- Nenhum item valido apos filtros/validacao.

Comportamento:
- Nao renderizar cards vazios.
- Exibir bloco unico com explicacao + proximo passo.
- Manter acao para "Limpar filtros" e "Tentar novamente".

Microcopy:
- Titulo: "Sem recomendacoes no momento"
- Mensagem: "Nao encontramos cortes com os criterios atuais. Ajuste os filtros para continuar."
- Acao primaria: "Limpar filtros"
- Acao secundaria: "Recalcular recomendacoes"

Acessibilidade:
- Mensagem anunciada via regiao aria-live="polite".

### Estado C - Erro
Condicao:
- Falha de carregamento de dados, excecao de processamento ou payload invalido.

Comportamento:
- Exibir painel de erro com linguagem nao tecnica para usuario.
- Exibir codigo curto de suporte para operacao (ex.: CC-TICKET-01).
- Preservar ultima recomendacao valida em memoria visual se existir (modo resiliente).

Microcopy:
- Titulo: "Nao foi possivel gerar seu ticket"
- Mensagem: "Ocorreu uma falha temporaria. Tente novamente em instantes."
- Acao primaria: "Tentar novamente"
- Acao secundaria: "Voltar para filtros"

Acessibilidade:
- Erro anunciado via aria-live="assertive".
- Focus movido para titulo do painel de erro.

## Ganchos de Integracao do Avatar de Libras (Ze)
Objetivo: padronizar contrato de dados que o frontend enviara ao modulo do avatar.

Evento de disparo:
- ze:describe-cut

Payload minimo por item:
- ticketId: string (id da sessao de recomendacao)
- rank: 1 | 2 | 3
- corteId: string
- nome: string
- disponibilidade: boolean
- descricaoCurta: string
- preparo: string[] (lista normalizada de ids de icones)
- textoNarracao: string (frase pronta para Ze)

Template recomendado de textoNarracao:
- "Top {rank}: {nome}. {statusDisponibilidade}. {descricaoCurta}. Preparo recomendado: {listaPreparo}."

Regras UX dos ganchos:
1. Acionamento de Ze deve ter resposta imediata (<300ms visual) com feedback "Enviando...".
2. Se Ze indisponivel, mostrar fallback: "Avatar indisponivel no momento. Leia a descricao textual abaixo.".
3. A descricao textual deve permanecer visivel independentemente do estado do avatar.

## Requisitos de Acessibilidade (WCAG 2.1 AA)
1. Ordem de foco linear: titulo ticket -> card 1 -> card 2 -> card 3 -> acoes globais.
2. Todo icone com nome acessivel via aria-label ou texto adjacente.
3. Contraste minimo AA em textos, selos e chips de icones.
4. Nao usar apenas animacao para transmitir estado de sucesso/erro.
5. Suporte a navegacao por teclado sem armadilhas de foco.
6. Regioes de atualizacao dinamica com aria-live para sucesso, vazio e erro.

## Fidelidade Premium e Tokens
Diretriz de fidelity handoff para frontend:
1. Reutilizar os tokens :root existentes para cor, tipografia, espacamento e raio.
2. Nao introduzir biblioteca visual externa.
3. Manter grid, ritmo vertical e escala tipografica ja documentados no premium.
4. Variacoes de estado (sucesso/vazio/erro) devem herdar os mesmos tokens base.

### Baseline visual obrigatorio (pixel fidelity)
1. Ticket deve manter o mesmo DNA visual premium dark: fundo principal escuro, destaque vermelho cinematografico e tipografia da base premium.
2. Hierarquia visual deve preservar contraste de importancia:
- Titulo do ticket no nivel de destaque de secao.
- Top 1 com maior proeminencia visual que Top 2 e Top 3.
- Selos e chips sem competir com nome do corte.
3. Motion deve seguir o ritmo premium existente:
- Entrada do bloco: transicao curta e suave.
- Feedback Ze: animacao breve e nao intrusiva.
4. Em mobile, manter densidade legivel sem quebrar consistencia de espacamento com o restante da home/paginas.

### Checklist de paridade pixel por pixel
1. Mesmo token de cor para texto principal e secundario usados no premium.
2. Mesmo token de raio para cards/chips.
3. Mesmo token de sombra para cards em estado normal e hover/focus.
4. Mesmo ritmo vertical (espacos entre titulo, subtitulo, cards e rodape de acoes).
5. Mesmo comportamento de responsividade documentado para 900px e 600px.
6. Sem alteracao de identidade visual do podio premium ja existente.

## Comportamento Offline (PWA) no Ticket
1. Se app estiver offline e houver ultimo ticket cacheado, exibir estado "Ultimo ticket disponivel offline".
2. Se offline sem ticket cacheado, cair no Estado B (vazio orientado) com mensagem especifica:
- "Voce esta sem internet e ainda nao ha ticket salvo neste dispositivo."
3. Manter acao de retorno ao catalogo offline quando disponivel.

## Guardrails de Regressao Invisivel
1. Nao quebrar fluxo atual de escolha final do corte (usuario deve continuar conseguindo concluir pedido sem Ze).
2. Nao remover navegacao por teclado existente nos componentes de resultado.
3. Nao reduzir legibilidade da mensagem final para acougueiro por excesso de elementos decorativos.
4. Nao introduzir dependencia de rede para renderizar o ticket basico (ticket deve funcionar com dados locais).
5. Nao substituir textos de status por somente icones (status textual continua obrigatorio).

## Especificacao de Interacao (wireframe textual)
```
[Titulo] Seu Ticket CarneCerta
[Subtitulo] Top 3 cortes recomendados para hoje

[Card Top 1]
	[Selo ranking] 1
	[Nome corte]
	[Selo disponibilidade]
	[Descricao curta]
	[Icones preparo...]
	[Botao] Descrever em Libras

[Card Top 2]
	...

[Card Top 3]
	...

[Acoes globais]
	[Primaria] Recalcular recomendacoes
	[Secundaria] Voltar para filtros
```

## Notas para Integracao com Seguranca (t4)
1. Microcopy de erro/vazio nao deve ecoar entrada de filtro do usuario sem sanitizacao.
2. Nome de corte e descricao exibidos no ticket devem vir de payload ja validado/tipado.
3. Evento ze:describe-cut deve transportar apenas campos esperados (schema fechado), descartando extras.

## Requisitos de Dados para Backend/Engine
Para viabilizar UX acima, o payload de recomendacao deve incluir:
- id, nome, disponibilidade, descricao_curta, preparo_icones[] por item
- posicao/rank explicita apos ordenacao final
- identificador de sessao (ticketId)

Se qualquer campo obrigatorio faltar, UX deve cair no Estado C (erro) com logging tecnico silencioso para diagnostico.

## Handoff para Frontend (Implementacao)
Checklist objetivo para t5:
1. Renderizar componente de ticket com 3 estados (sucesso, vazio, erro).
2. Implementar mapeamento de icones por id canonico e fallback para id desconhecido ("Preparo" generico).
3. Criar dispatch do evento ze:describe-cut por card com payload minimo definido.
4. Adicionar feedback visual de envio/erro do Ze.
5. Garantir aria-live e foco inicial por estado.
6. Implementar variante offline com mensagem especifica.
7. Validar pixel fidelity com baseline premium existente.

## Riscos de UX e Mitigacoes
1. Risco: excesso de icones reduzir legibilidade no balcao.
- Mitigacao: limite visual de 4 + agregador "+N".
2. Risco: dependencia do avatar Ze quebrar jornada principal.
- Mitigacao: descricao textual sempre presente e autonoma.
3. Risco: mensagens tecnicas em erro confundirem operador.
- Mitigacao: microcopy nao tecnica + codigo curto de suporte.

## Criterios de Aceite UX (t3)
1. Existe especificacao clara de Ticket Visual para Top 3, vazio e erro.
2. Existe contrato de integracao Ze com evento e payload minimo.
3. Existe mapa de iconografia de preparo com regras de truncamento e acessibilidade.
4. Existe diretriz objetiva de fidelidade premium sem UI libs.
5. Existe orientacao de comportamento offline do ticket.
6. Existem guardrails explicitos para evitar regressao invisivel no fluxo atual.
7. Existe checklist de paridade visual para validar implementacao pixel por pixel.

## Test Results
- Command: n/a (task de UX documental)
- Passed: 0
- Failed: 0
- Skipped: 0
