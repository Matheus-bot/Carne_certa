# 📖 Índice da Documentação — CarneCerta

Documentação técnica e de projeto do CarneCerta, organizada por categoria. Nenhum conteúdo de código foi alterado nesta organização — apenas arquivos `.md` foram movidos, renomeados ou tiveram links internos corrigidos.

---

## 02-Arquitetura

Documentos sobre o comportamento e a estrutura do sistema.

| Documento | Descrição | Finalidade |
|---|---|---|
| [fluxo.md](02-Arquitetura/fluxo.md) | Fluxo do sistema (arquivo reservado, ainda em branco) | Descrever o fluxo de navegação/uso do CarneCerta |
| [casos-de-uso.md](02-Arquitetura/casos-de-uso.md) | Casos de uso (arquivo reservado, ainda em branco) | Documentar cenários de uso do sistema |
| [banco-de-dados.md](02-Arquitetura/banco-de-dados.md) | Estrutura de banco de dados (arquivo reservado, ainda em branco) | Planejar o modelo de dados para a futura integração com MongoDB/SQL |

## 03-Frontend

Documentação da interface e dos componentes visuais implementados no `frontend/`.

| Documento | Descrição | Finalidade |
|---|---|---|
| [DOCUMENTACAO_INTERFACE_PREMIUM.md](03-Frontend/DOCUMENTACAO_INTERFACE_PREMIUM.md) | Documentação completa da interface `index-premium.html` (mapa do boi, pódio Kahoot, design system) | Referência principal da interface premium |
| [GUIA_RAPIDO_INTERFACE.md](03-Frontend/GUIA_RAPIDO_INTERFACE.md) | Guia rápido de uso e teste da interface premium | Consulta rápida sem ler a documentação completa |
| [CODE_SNIPPETS_PRONTOS.md](03-Frontend/CODE_SNIPPETS_PRONTOS.md) | Trechos de código prontos para copiar/colar (hotspots, cores, textos, API, temas, service worker) | Acelerar customizações pontuais |
| [EXEMPLOS_INTEGRACAO_PRATICA.md](03-Frontend/EXEMPLOS_INTEGRACAO_PRATICA.md) | Exemplos práticos de integração (novos cortes, API, temas dinâmicos, analytics) | Guiar integrações mais completas |
| [COMPONENTE_MUSCULO_ANIMACAO.md](03-Frontend/COMPONENTE_MUSCULO_ANIMACAO.md) | Documentação do componente isolado de animação da página do corte Músculo | Explicar HTML/CSS/JS do componente e suas variáveis de imagem |
| [EXEMPLOS_MUSCULO_ANIMACAO.md](03-Frontend/EXEMPLOS_MUSCULO_ANIMACAO.md) | Exemplos práticos para reaproveitar a animação do Músculo em outros cortes | Copiar/colar e adaptar o componente para novas páginas de corte |

## 05-Estudo

Material de revisão para estudo e apresentação do projeto.

| Documento | Descrição | Finalidade |
|---|---|---|
| [GUIA_TECNICO_ESTUDO.md](05-Estudo/GUIA_TECNICO_ESTUDO.md) | Guia técnico objetivo sobre arquitetura, tecnologias, fluxo, técnicas usadas e ~20 perguntas de banca com respostas | Estudo e preparação para apresentação acadêmica |

## 06-Decisoes

Registros de decisões arquiteturais e resumos de entrega da interface premium.

| Documento | Descrição | Finalidade |
|---|---|---|
| [NOTAS_TECNICAS_IMPLEMENTACAO.md](06-Decisoes/NOTAS_TECNICAS_IMPLEMENTACAO.md) | Decisões arquiteturais da interface premium (single-file, hotspots percentuais, SVG dinâmico, etc.) | Justificar escolhas técnicas para quem for manter/expandir o código |
| [ENTREGA_INTERFACE_PREMIUM.md](06-Decisoes/ENTREGA_INTERFACE_PREMIUM.md) | Resumo de entrega da interface premium (consolida o antigo `README_INTERFACE_PREMIUM.md` + `SUMARIO_ENTREGA_COMPLETA.md`, que eram duplicados) | Visão única do que foi entregue: seções implementadas, performance, compatibilidade, troubleshooting e próximos passos |

## 07-Planejamento

Documentos de metodologia e planejamento do projeto (personas, objetivos, requisitos, backlog, Scrum). A maioria ainda está em branco — são a estrutura reservada para preenchimento futuro, conforme já indicado no `README.md` original.

| Documento | Descrição | Finalidade |
|---|---|---|
| [objetivos.md](07-Planejamento/objetivos.md) | Objetivos do projeto (em branco) | Registrar metas e objetivos formais |
| [personas.md](07-Planejamento/personas.md) | Personas do projeto (em branco) | Descrever perfis de usuário-alvo |
| [requisitos.md](07-Planejamento/requisitos.md) | Requisitos funcionais/não funcionais (em branco) | Formalizar requisitos do sistema |
| [casos-de-uso.md](02-Arquitetura/casos-de-uso.md) | *(ver 02-Arquitetura)* | — |
| [scrum.md](07-Planejamento/scrum.md) | Planejamento Scrum (em branco) | Registrar sprints, backlog e cerimônias |
| [ideias.md](07-Planejamento/ideias.md) | Ideias gerais do projeto (em branco, renomeado de `ideas.md` para padronizar em português) | Brainstorm e backlog de ideias |
| [pesquisa.md](07-Planejamento/pesquisa.md) | Pesquisa de referência (em branco) | Registrar pesquisas de mercado/concorrência |
| [telas.md](07-Planejamento/telas.md) | Ideias de telas (em branco) | Registrar propostas de telas antes do protótipo |
| [Personas.docx](07-Planejamento/Personas.docx) | Documento Word com personas do projeto (movido de `documentacao/personas/`) | Único arquivo não-Markdown da documentação; mantido como está, sem conversão |

---

## Fora da pasta `docs/`

- **`README.md`** (raiz do projeto) — permanece na raiz por ser o ponto de entrada padrão do repositório (é o que GitHub e ferramentas exibem automaticamente). Foi atualizado apenas para apontar para este índice em vez da antiga pasta `documentacao/`.
- **`.github/modernize/rearchitecture/**/*.md`** — não foram tocados. São artefatos de estado de um fluxo de automação (logs de "agentes"/times, aprendizados, board), não documentação de projeto para consulta humana; mover ou renomear esses arquivos poderia quebrar essa ferramenta.

A antiga pasta `documentacao/` (com `personas/`, `objetivos/`, `requisitos/`, `casos-de-uso/`, `scrum/`, `pesquisa/`, `telas/`, `banco/`) foi removida: todo o seu conteúdo, incluindo o `Personas.docx`, já está em `docs/`.

---

## Sugestões para manter a documentação organizada

1. **Preencher aos poucos os arquivos de `07-Planejamento`:** eles já têm nome e local certos; falta só o conteúdo (personas, requisitos, scrum etc.) conforme o projeto avança. Isso depende de informação real do projeto (entrevistas, decisões de negócio) — não é algo para gerar automaticamente.
2. **Manter esta tabela atualizada:** ao criar um novo `.md`, adicione uma linha aqui na categoria correspondente em vez de deixá-lo solto na raiz do projeto.
3. **Padrão de nomes:** preferir `kebab-case.md` ou `nome-simples.md` (como já é o caso em `02-Arquitetura` e `07-Planejamento`) para documentos novos; os nomes em `MAIUSCULO_COM_UNDERSCORE.md` foram mantidos em `03-Frontend`/`06-Decisoes` para não quebrar links já existentes entre eles.
4. **Converter `Personas.docx` para Markdown** quando fizer sentido, para manter tudo em um formato único e versionável por diff.
