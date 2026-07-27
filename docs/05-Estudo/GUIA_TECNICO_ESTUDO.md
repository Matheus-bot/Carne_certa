# 🥩 CarneCerta Web — Guia Técnico de Estudo

> Documento de revisão rápida para estudo do projeto
> Baseado apenas no que existe de fato no repositório em 27/07/2026.

---

## 1. Visão Geral

O **CarneCerta** é uma aplicação web (frontend puro, sem backend em produção) que ajuda o cliente de açougue a descobrir **qual corte de carne comprar** para um determinado preparo (panela, bife, churrasco, hambúrguer, desfiar, moer).

- **Problema que resolve:** muita gente não sabe qual corte pedir no açougue para cada tipo de prato, nem a quantidade certa por pessoa.
- **Público-alvo:** clientes de açougue, pessoas com dificuldade em escolher carne, quem busca custo-benefício e pessoas que precisam de suporte de acessibilidade.
- **Principais funcionalidades hoje implementadas:**
  - Home com categorias de preparo (cards) e "mapa do boi" interativo.
  - Fluxo de perguntas de preferência (maciez, preço, gordura, sabor) por categoria.
  - Motor de recomendação que pontua os cortes do catálogo e retorna o **Top 3**.
  - Tela de resultado com **ticket final**: nome do corte, quantidade em kg, frase pronta para falar ao açougueiro e **QR Code** da escolha.
  - Funcionamento **offline** via Service Worker + último ticket salvo em `localStorage`.
  - Página de acessibilidade ("Modo Libras") com fluxo simplificado por botões grandes.
  - Instalável como **PWA** (manifest + ícones).

Não existe, até o momento, backend real: as pastas `banco/mongodb` e `banco/sql` estão vazias (planejadas para o futuro, conforme o README).

---

## 2. Arquitetura

Estrutura de pastas (raiz do projeto):

```
Carne_certa/
├── frontend/          → todo o código que roda no navegador
│   ├── index.html            → página inicial (Home)
│   ├── index-premium.html    → variação/protótipo de layout mais elaborado
│   ├── script.js             → lógica da aplicação (tema, mapa do boi, motor de recomendação, ticket)
│   ├── sw.js                 → Service Worker (cache e modo offline)
│   ├── manifest.webmanifest  → configuração do PWA
│   ├── css/                  → estilos (style.css, categorias.css, modo-libras.css)
│   ├── data/                 → carnes.json (catálogo "oficial") e cortes.js (dados auxiliares/legado)
│   ├── js/modo-libras.js     → dados/lógica específicos da página de acessibilidade
│   └── paginas/
│       ├── categorias/       → 1 página por categoria de preparo (perguntas de preferência)
│       ├── carnes/           → 1 página de detalhe por corte (23 páginas)
│       ├── boi/              → mapa interativo do boi
│       └── acessibilidade/   → Modo Libras
├── assets/            → imagens dos cortes, logos, ícones
├── docs/              → toda a documentação do projeto, organizada por categoria (ver docs/README.md)
├── prototipos/        → wireframes e imagens de referência visual
└── banco/             → pastas reservadas para MongoDB/SQL (backend futuro, ainda vazias)
```

**Fluxo geral da aplicação:**

1. O usuário abre `index.html` (Home).
2. Escolhe uma categoria (card) → é redirecionado para `paginas/categorias/<categoria>.html`.
3. Responde perguntas de preferência (botões `option-btn`).
4. `script.js` calcula a recomendação usando o catálogo `carnes.json`.
5. É exibido o resultado (Top 3) e depois o **ticket final** com quantidade e QR Code.

Não há roteador nem framework: a "navegação" é feita com **links/redirects entre arquivos HTML estáticos**, e cada página inclui `script.js` e os CSS necessários.

---

## 3. Tecnologias Utilizadas

| Tecnologia | Por que foi usada | Onde é usada |
|---|---|---|
| **HTML5** | Estruturar conteúdo semântico, formulários e páginas estáticas simples de hospedar | Todas as páginas em `frontend/` e `frontend/paginas/` |
| **CSS3** | Estilizar sem dependências externas, usar variáveis (`:root`) para temas claro/escuro | `style.css`, `categorias.css`, `modo-libras.css` |
| **JavaScript puro (Vanilla JS)** | Projeto pequeno/médio não justifica o custo de um framework; roda em qualquer navegador sem build | `script.js`, `modo-libras.js` |
| **JSON** | Formato simples para guardar o catálogo de cortes como dado, separado da lógica | `frontend/data/carnes.json` |
| **Service Worker** | Permitir cache de arquivos e uso do site sem internet | `frontend/sw.js` |
| **Web App Manifest** | Tornar o site instalável como app (PWA) | `frontend/manifest.webmanifest` |
| **Fetch API** | Carregar o `carnes.json` de forma assíncrona | função `loadCarnesData()` em `script.js` |
| **localStorage** | Guardar o último "ticket" de recomendação para exibir quando o usuário está offline | `persistOfflineTicketSnapshot()` / `loadOfflineTicketSnapshot()` |
| **PWA (Progressive Web App)** | Unir manifest + service worker para experiência de app instalável e offline | conjunto `sw.js` + `manifest.webmanifest` |
| **ARIA / HTML semântico** | Melhorar acessibilidade (leitores de tela, navegação por teclado) | atributos `aria-label`, `aria-pressed`, `role="radiogroup"`, `aria-live` nas páginas de categorias e no Modo Libras |
| **API externa (QR Code)** | Gerar o QR Code do ticket sem precisar de biblioteca própria | `api.qrserver.com` chamada em `renderFinalInstruction()` |

Não há framework de frontend (React, Vue etc.), bundler (Webpack/Vite) nem backend ativo — é **100% estático**, o que explica por que roda direto no navegador.

---

## 4. Principais Arquivos

- **`frontend/index.html`** — Página inicial. Contém o header, o "chat" estático da IA açougueiro, o carrossel de categorias e o link para o mapa do boi. É o ponto de entrada do site e do Service Worker.
- **`frontend/script.js`** (~2500 linhas) — Arquivo central da aplicação. Concentra:
  - alternância de tema claro/escuro;
  - lógica do mapa interativo do boi (`initCowMap`);
  - sanitização de entradas do usuário (proteção contra injeção de HTML/scripts);
  - o **motor de recomendação** (classes `RecommendationStrategy`, `BaseRecommendationStrategy` e uma estratégia por categoria, geridas por uma `StrategyFactory`);
  - cálculo de quantidade em kg por pessoa;
  - renderização do resultado e do ticket final com QR Code.
- **`frontend/data/carnes.json`** — Catálogo "oficial" de 24 cortes de carne. Cada item tem notas (maciez, sabor, rapidez, economia, integridade de fibra, colágeno etc.), categoria, ícones de preparo, imagem, página de detalhe e uma frase pronta para o açougueiro (`butcherCut`). É a fonte de dados principal do motor de recomendação.
- **`frontend/data/cortes.js`** — Objeto `CARNECERTA_DATA` com metadados complementares do catálogo (prioridades, perfil de gordura, dicas de corte) usado como apoio/preferências pelo motor de recomendação.
- **`frontend/sw.js`** — Service Worker. Define estratégias de cache diferentes por tipo de recurso: `cacheFirst` para estáticos, `networkFirst` para `script.js` e páginas de categorias/acessibilidade, e `staleWhileRevalidate` para `carnes.json`. Garante uso offline do app.
- **`frontend/manifest.webmanifest`** — Metadados do PWA: nome, ícones, cor de tema, modo de exibição `standalone` — permite "instalar" o CarneCerta como aplicativo.
- **`frontend/js/modo-libras.js`** — Base de recomendações simplificadas (por categoria x prioridade) usada na página de acessibilidade, com textos prontos e diretos.
- **`frontend/paginas/categorias/*.html`** (7 páginas) — Uma página de perguntas por categoria de preparo (panela, bife, churrasco, hambúrguer, desfiar, moer, ajuda).
- **`frontend/paginas/carnes/*.html`** (23 páginas) — Uma página de detalhe por corte de carne.

---

## 5. Fluxo da Aplicação

```
Usuário
   ↓
Página Inicial (index.html)
   ↓
Categoria de preparo (ex.: Para Panela, Bife, Churrasco...)
   ↓
Perguntas de preferência (maciez, preço, gordura, sabor, corte)
   ↓
Motor de recomendação (script.js aplica a Strategy da categoria sobre carnes.json)
   ↓
Resultado — Top 3 cortes recomendados, com score e disponibilidade
   ↓
Ticket final — corte escolhido + quantidade (kg) + frase para o açougueiro + QR Code
```

Caminho alternativo: o card **"Explorar o boi"** leva direto para `paginas/boi/boi.html`, onde o usuário escolhe o corte clicando em regiões do mapa do animal, sem passar pelo questionário de preferências.

---

## 6. Técnicas Utilizadas

- **Fetch API:** busca assíncrona do `carnes.json` (com fallback embutido em `buildCarneJsonFallback()` caso o fetch falhe).
- **JSON como banco de dados estático:** todo o catálogo de carnes vive em um arquivo `.json`, não em um banco real — simples de editar e versionar no Git.
- **Eventos JavaScript:** cliques em cards, botões de preferência e navegação são tratados com `addEventListener` e atributos `data-*` (ex.: `data-open-preferences`, `data-scroll-target`).
- **Manipulação de DOM:** o resultado e o ticket são montados dinamicamente via `innerHTML` no momento em que o usuário termina o questionário.
- **Sanitização de entrada:** funções como `sanitizeSearchTerm`, `escapeHtml` e um conjunto de `INJECTION_PATTERNS` evitam que texto digitado pelo usuário quebre o HTML ou insira código malicioso.
- **Padrão de projeto Strategy:** cada categoria de preparo (panela, churrasco, bife, moer, desfiar, hambúrguer etc.) tem sua própria classe de recomendação, todas herdando de `BaseRecommendationStrategy` e escolhidas dinamicamente por uma `StrategyFactory`. Isso evita um "if/else gigante" e facilita adicionar novas categorias.
- **Sistema de pontuação (score):** cada corte recebe uma nota calculada a partir de pesos (`SCORE_WEIGHTS`) combinados com as prioridades escolhidas pelo usuário (mais peso para o critério que ele marcou como importante).
- **Cache Offline / Service Worker:** três estratégias de cache diferentes conforme o tipo de recurso (documentado no item 4).
- **Progressive Web App (PWA):** manifest + service worker tornam o site instalável e utilizável sem conexão.
- **Persistência local:** o último ticket gerado é salvo no `localStorage` (`carnecerta-offline-ticket-snapshot`) e reaparece automaticamente se o usuário abrir o site sem internet.
- **Acessibilidade (ARIA):** uso de `aria-label`, `aria-pressed`, `role="radiogroup"` e `aria-live="polite"` nas páginas de categoria e no Modo Libras, além de uma rota dedicada (`modo-libras.html`) com fluxo simplificado.
- **Responsividade:** CSS com variáveis de tema (`:root`) e layout adaptável (cards, grid) para diferentes tamanhos de tela.

---

## 7. Curiosidades Técnicas

- O motor de recomendação já está desenhado com **Strategy Pattern** mesmo sem framework — mostra preocupação com organização de código mesmo em um projeto vanilla JS.
- Existe uma camada de **sanitização de entrada** (proteção contra injeção de HTML) mesmo em um app sem backend — boa prática pouco comum em projetos acadêmicos desse porte.
- O Service Worker usa **três estratégias de cache diferentes** conforme o tipo de arquivo, em vez de uma única regra genérica — mostra entendimento de quando usar cache-first vs. network-first vs. stale-while-revalidate.
- O app salva o **último ticket de recomendação no localStorage**, permitindo repetir a última recomendação mesmo totalmente offline — um "modo offline" funcional, não apenas cosmético.
- Há um **fallback de dados embutido no próprio JS** (`buildCarneJsonFallback`) para o caso do `carnes.json` não carregar, evitando que o app quebre.
- A pasta `docs/07-Planejamento/` já reserva espaço para personas, requisitos, casos de uso e Scrum — sinal de que o processo de desenvolvimento foi pensado com metodologia, mesmo que os arquivos ainda estejam em branco.
- O catálogo tem **24 cortes de carne** cadastrados e **23 páginas de detalhe** individuais, além de **7 páginas de categoria** de preparo.
- O "Modo Libras" já reserva `data-feature-slot` para recursos futuros (mascote animado, avatar em libras, integração com chat de IA), mostrando planejamento de extensibilidade sem implementar tudo de uma vez.
