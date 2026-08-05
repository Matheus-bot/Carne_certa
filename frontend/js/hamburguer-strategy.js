/**
 * Hambúrguer / Carne Moída — Strategy Pattern dedicado.
 *
 * Por que uma engine separada da genérica (script.js)?
 * As demais categorias (panela, bife, churrasco...) usam BaseRecommendationStrategy,
 * que RANQUEIA o catálogo de carnes.json por pontuação (score ponderado) e devolve
 * um Top 3 dentre itens já cadastrados.
 *
 * Hambúrguer/Carne Moída é diferente: o resultado é uma RECEITA determinística
 * (corte único ou blend com proporção fixa), calculada a partir de regras de
 * balcão (golden rule 80/20, blends "duas magras", etc.), não uma busca por
 * score no catálogo. Por isso ela vive neste módulo, como uma implementação
 * alternativa da mesma ideia de Strategy: uma classe com um único ponto de
 * entrada, `recommend(input)`, que devolve o Ticket Digital pronto para o
 * açougueiro — sempre com exatamente 3 recomendações, para qualquer
 * combinação possível de filtro/blend/pessoas/moagem da tela hamburguer.html.
 *
 * Integração com o motor principal (frontend/script.js):
 * o handler de clique do botão "continue" (`continueButtons`) detecta
 * `category === "hamburguer"` e, se este módulo estiver carregado
 * (`window.CarneCertaHamburguer`), usa `HamburguerStrategy` + `renderTicketHtml`
 * em vez do caminho genérico `getTopRecommendations` / `renderRecommendations`.
 * Todas as demais categorias continuam usando StrategyFactory normalmente.
 */
(function initHamburguerStrategyModule(global) {
  "use strict";

  // Notas de balcão (0 a 10) para os 7 cortes usados em hambúrguer/carne moída.
  // "preco" aqui significa custo-benefício (quanto maior, mais barato/rende
  // mais), no mesmo sentido do pilar "economia" do motor genérico.
  // image/page seguem o mesmo padrao de frontend/data/cortes.js (caminho
  // relativo calibrado para paginas em frontend/paginas/categorias/*.html).
  const CUT_GRADES = {
    fraldinha: {
      id: "fraldinha", nome: "Fraldinha", sabor: 10, suculencia: 10, preco: 6, gordura: 8,
      image: "../../../assets/imagens/fraldinha/fraldinhainteiracrua03.jpg", page: "../carnes/fraldinha.html"
    },
    acem: {
      id: "acem", nome: "Acém", sabor: 8, suculencia: 7, preco: 9, gordura: 6,
      image: "../../../assets/imagens/acem/aceminteirocru.jpeg", page: "../carnes/acem.html"
    },
    pontadepeito: {
      id: "pontadepeito", nome: "Peito (Maçã)", sabor: 7, suculencia: 9, preco: 10, gordura: 9,
      image: "../../../assets/imagens/pontadepeito/peitobovino.webp", page: "../carnes/pontadepeito.html"
    },
    patinho: {
      id: "patinho", nome: "Patinho", sabor: 6, suculencia: 4, preco: 7, gordura: 2,
      image: "../../../assets/imagens/patinho/patinhointeirocru.jpg", page: "../carnes/patinho.html"
    },
    coxaomole: {
      id: "coxaomole", nome: "Coxão Mole", sabor: 6, suculencia: 5, preco: 8, gordura: 4,
      image: "../../../assets/imagens/coxaomole/coxãomole.png", page: "../carnes/coxaomole.html"
    },
    paleta: {
      id: "paleta", nome: "Paleta", sabor: 7, suculencia: 7, preco: 8, gordura: 6,
      image: "../../../assets/imagens/paleta/Paletabovinainteiracrua.jpeg", page: "../carnes/paleta.html"
    },
    lagarto: {
      id: "lagarto", nome: "Lagarto", sabor: 6, suculencia: 3, preco: 7, gordura: 3,
      image: "../../../assets/imagens/lagarto/lagartointeirocru.jpg", page: "../carnes/lagarto.html"
    }
  };

  // Cada filtro principal tem exatamente 3 cortes candidatos, na ordem de
  // prioridade de balcão (não é um ranking calculado por nota — é a lista
  // explícita de negócio). Isso garante 3 recomendações sempre, para
  // qualquer um dos 4 filtros da tela (o 4º, "sabor", reaproveita a lista de
  // "macia" pois os mesmos 3 cortes lideram sabor e suculência).
  const PREFERENCE_CANDIDATES = {
    macia: ["fraldinha", "acem", "pontadepeito"],
    barata: ["acem", "pontadepeito", "paleta"],
    magra: ["patinho", "coxaomole", "lagarto"],
    sabor: ["fraldinha", "acem", "pontadepeito"]
  };

  // "Sem Blend": ordem de prioridade técnica geral, usada apenas como
  // desempate quando duas opções de filtros diferentes precisarem ser
  // comparadas entre si (não é usada para decidir a ordem dentro de um
  // mesmo filtro — essa ordem já vem de PREFERENCE_CANDIDATES).
  const DEFAULT_PRIORITY_ORDER = ["fraldinha", "pontadepeito", "acem", "patinho", "coxaomole", "paleta", "lagarto"];

  const GRAMS_PER_PERSON = 200;

  const HamburguerErrorCode = {
    INVALID_PEOPLE_COUNT: "HAMBURGUER_INVALID_PEOPLE_COUNT"
  };

  const createHamburguerError = (code, message) => {
    const error = new Error(message);
    error.code = code;
    return error;
  };

  // Aceita number, string vazia/nula ou string com vírgula/ponto decimal
  // (ex.: "2,5"). Arredonda pra cima porque, num pedido de carne, é melhor
  // sobrar do que faltar para o cliente. Lança erro amigável para qualquer
  // valor nulo, vazio, zero, negativo ou não numérico em vez de mascarar a
  // entrada inválida com um fallback silencioso. Na prática, os botões de
  // hamburguer.html sempre entregam um valor válido (1-2/3-4/5-6/7+), então
  // isso nunca dispara pela UI — é uma proteção para chamadas diretas da
  // strategy (testes, futura API, etc.).
  const parsePeopleCountOrThrow = (rawValue) => {
    if (rawValue === null || rawValue === undefined || rawValue === "") {
      throw createHamburguerError(HamburguerErrorCode.INVALID_PEOPLE_COUNT, "Informe a quantidade de pessoas.");
    }

    const numeric = typeof rawValue === "number"
      ? rawValue
      : Number.parseFloat(String(rawValue).trim().replace(",", "."));

    if (!Number.isFinite(numeric) || numeric <= 0) {
      throw createHamburguerError(HamburguerErrorCode.INVALID_PEOPLE_COUNT, "Informe a quantidade de pessoas.");
    }

    return Math.ceil(numeric);
  };

  const cutsFor = (ids) => ids.map((id) => CUT_GRADES[id]);

  const getPreferenceCandidates = (filtroPrincipal) =>
    cutsFor(PREFERENCE_CANDIDATES[filtroPrincipal] || PREFERENCE_CANDIDATES.macia);

  const byDefaultPriority = (a, b) => DEFAULT_PRIORITY_ORDER.indexOf(a.id) - DEFAULT_PRIORITY_ORDER.indexOf(b.id);

  // Todos os pares únicos possíveis dentro de uma lista de 3 cortes = C(3,2) = 3.
  // É por isso que cada filtro ter exatamente 3 candidatos garante exatamente
  // 3 recomendações também nos blends "duas magras" e "só saborosas".
  const uniquePairs = (cuts) => {
    const pairs = [];
    for (let i = 0; i < cuts.length; i += 1) {
      for (let j = i + 1; j < cuts.length; j += 1) {
        pairs.push([cuts[i], cuts[j]]);
      }
    }
    return pairs;
  };

  const sortPairsBySuculenciaDesc = (pairs) =>
    pairs
      .slice()
      .sort((pairA, pairB) => {
        const suculenciaA = pairA[0].suculencia + pairA[1].suculencia;
        const suculenciaB = pairB[0].suculencia + pairB[1].suculencia;
        return suculenciaB - suculenciaA || byDefaultPriority(pairA[0], pairB[0]);
      });

  const roundGrams = (value) => Math.round(value);

  const buildCortes = (composicao, totalGrams) =>
    composicao.map(({ cut, percent }) => ({
      id: cut.id,
      nome: cut.nome,
      percentual: percent,
      pesoGramas: roundGrams(totalGrams * percent),
      image: cut.image,
      page: cut.page
    }));

  class HamburguerStrategy {
    /**
     * @param {object} input
     * @param {number} input.peopleCount - quantidade de pessoas.
     * @param {number} input.grindTimes - quantas vezes moer (1x, 2x...).
     * @param {boolean} input.wantsBlend - true se o usuário escolheu blend.
     * @param {"duasmagras"|"magrasaborosa"|"sosaborosas"} [input.blendType] - tipo de blend, se houver.
     * @param {"macia"|"barata"|"magra"|"sabor"} input.filtroPrincipal - filtro principal escolhido.
     * @returns {object} Ticket Digital com exatamente 3 recomendações (`recomendacoes`).
     */
    recommend(input) {
      const peopleCount = parsePeopleCountOrThrow(input.peopleCount);
      const grindTimes = Math.max(1, Math.round(Number(input.grindTimes) || 1));
      const totalGrams = peopleCount * GRAMS_PER_PERSON;

      const composicoes = input.wantsBlend
        ? this.resolveBlendOptions(input.blendType, input.filtroPrincipal)
        : this.resolveSingleCutOptions(input.filtroPrincipal);

      const recomendacoes = composicoes.map((opcao, index) => ({
        ranking: index + 1,
        rotulo: opcao.rotulo,
        cortes: buildCortes(opcao.composicao, totalGrams)
      }));

      return {
        titulo: "Pedido CarneCerta - Hambúrguer",
        pessoas: peopleCount,
        vezesMoida: grindTimes,
        pesoTotalGramas: totalGrams,
        recomendacoes,
        instrucaoTecnica: `Moer na hora ${grindTimes}x para garantir o frescor e a coloração viva.`
      };
    }

    // Sem blend: as 3 recomendações são os 3 cortes candidatos do filtro
    // escolhido, cada um como opção de corte único (100% do peso total),
    // na ordem de prioridade de negócio definida em PREFERENCE_CANDIDATES.
    resolveSingleCutOptions(filtroPrincipal) {
      return getPreferenceCandidates(filtroPrincipal).map((cut) => ({
        rotulo: `Corte único — ${cut.nome}`,
        composicao: [{ cut, percent: 1 }]
      }));
    }

    resolveBlendOptions(blendType, filtroPrincipal) {
      if (blendType === "duasmagras") {
        return this.buildDuasMagrasOptions();
      }

      if (blendType === "magrasaborosa") {
        return this.buildMagraSaborosaOptions();
      }

      return this.buildSoSaborosasOptions(filtroPrincipal);
    }

    // Duas Magras: os 3 pares possíveis dentro da lista "magra" (Patinho,
    // Coxão Mole, Lagarto), split 50/50 — nenhum dos dois é "a carne de
    // sabor" do par, então não há razão para pesar mais um lado. Ordenados
    // pela suculência combinada (maior primeiro), o que já coloca
    // Patinho + Coxão Mole em 1º, batendo com o exemplo oficial.
    buildDuasMagrasOptions() {
      const magras = getPreferenceCandidates("magra");
      const pares = sortPairsBySuculenciaDesc(uniquePairs(magras));

      return pares.map(([primeiro, segundo]) => ({
        rotulo: `Blend Duas Magras — ${primeiro.nome} + ${segundo.nome}`,
        composicao: [
          { cut: primeiro, percent: 0.5 },
          { cut: segundo, percent: 0.5 }
        ]
      }));
    }

    // Uma Magra + Uma Saborosa: Patinho é a âncora magra fixa em todas as 3
    // opções (é o exemplo oficial e "a carne mais pedida para moer" do
    // filtro Magra); a carne saborosa varia entre os 3 candidatos do filtro
    // Macia (Fraldinha, Acém, Peito), sempre na regra de ouro 80% magra/20%
    // saborosa. Fraldinha vem primeiro por ser o par oficial do exemplo.
    buildMagraSaborosaOptions() {
      const magraAncora = CUT_GRADES.patinho;
      const saborosas = getPreferenceCandidates("macia");

      return saborosas.map((saborosa) => ({
        rotulo: `Blend 80/20 — ${magraAncora.nome} + ${saborosa.nome}`,
        composicao: [
          { cut: magraAncora, percent: 0.8 },
          { cut: saborosa, percent: 0.2 }
        ]
      }));
    }

    // Só Saborosas (Blend Premium): os 3 pares possíveis dentro da lista
    // "macia" (Fraldinha, Acém, Peito), split 50/50 (mesma categoria — sem
    // componente magro para justificar 80/20). Os dois pares já batizados no
    // catálogo (frontend/data/cortes.js) entram primeiro; o filtro "barata"
    // decide qual dos dois vem em 1º. O par restante (sem nome no catálogo)
    // fecha como 3ª opção.
    buildSoSaborosasOptions(filtroPrincipal) {
      const { fraldinha, acem, pontadepeito } = CUT_GRADES;
      const isEconomic = filtroPrincipal === "barata";

      const blendClassico = { par: [acem, pontadepeito], rotulo: `Blend Clássico — ${acem.nome} + ${pontadepeito.nome}` };
      const blendSabor = { par: [fraldinha, acem], rotulo: `Blend de Sabor — ${fraldinha.nome} + ${acem.nome}` };
      const blendPremium = { par: [fraldinha, pontadepeito], rotulo: `Blend Premium — ${fraldinha.nome} + ${pontadepeito.nome}` };

      const ordenados = isEconomic
        ? [blendClassico, blendSabor, blendPremium]
        : [blendSabor, blendClassico, blendPremium];

      return ordenados.map(({ par, rotulo }) => ({
        rotulo,
        composicao: [
          { cut: par[0], percent: 0.5 },
          { cut: par[1], percent: 0.5 }
        ]
      }));
    }
  }

  const escapeHtmlLocal = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  // Template HTML do Ticket Digital — segue o mesmo padrão visual das
  // demais categorias (results-grid/result-card/result-image, já usado nas
  // recomendações de Panela): uma configuração (pessoas/moagem)
  // compartilhada e 3 cards de recomendação, cada um com foto(s) do(s)
  // corte(s) e peso calculado.
  const renderTicketHtml = (ticket) => {
    const cardsMarkup = ticket.recomendacoes
      .map((recomendacao) => {
        const imagensMarkup = recomendacao.cortes
          .map((corte) => `<img src="${escapeHtmlLocal(corte.image)}" alt="${escapeHtmlLocal(corte.nome)}" class="result-image">`)
          .join("");

        const cortesMarkup = recomendacao.cortes
          .map(
            (corte) => `
              <li class="hamburguer-ticket-cut">
                <span class="hamburguer-ticket-cut-name">${escapeHtmlLocal(corte.nome)}</span>
                <span class="hamburguer-ticket-cut-weight">${corte.pesoGramas}g</span>
              </li>
            `
          )
          .join("");

        const isBlend = recomendacao.cortes.length > 1;

        return `
          <article class="result-card">
            <div class="hamburguer-result-images${isBlend ? " is-blend" : ""}">${imagensMarkup}</div>
            <div class="result-content">
              <div class="ticket-rank-line">
                <span class="ticket-rank-badge" aria-label="Top ${recomendacao.ranking}">Top ${recomendacao.ranking}</span>
              </div>
              <h3>${escapeHtmlLocal(recomendacao.rotulo)}</h3>
              <ul class="hamburguer-ticket-cuts">${cortesMarkup}</ul>
              <button class="result-select-btn" type="button" data-ranking="${recomendacao.ranking}">
                Escolher esta opção
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <div class="results-header">
        <h2>${escapeHtmlLocal(ticket.titulo)}</h2>
        <p class="hamburguer-ticket-config">${ticket.pessoas} Pessoas | ${ticket.vezesMoida}x Moída</p>
      </div>
      <div class="results-grid">${cardsMarkup}</div>
      <p class="hamburguer-ticket-instruction">
        <strong>Instrução técnica:</strong> ${escapeHtmlLocal(ticket.instrucaoTecnica)}
      </p>
    `;
  };

  // Tela de "escolha final" de uma recomendação específica do Ticket Digital —
  // mesmo padrão visual de renderFinalInstruction em script.js (final-choice-card
  // + qr-card), adaptado para blend: como um blend tem 2 cortes, renderiza um
  // final-choice-card por corte, cada um com seu próprio link "Ver página do
  // corte" (corte.page já vem pronto de buildCortes/CUT_GRADES).
  const buildFinalQrPayload = (ticket, recomendacao) => {
    const cortesResumo = recomendacao.cortes
      .map((corte) => `${corte.nome} ${corte.pesoGramas}g`)
      .join(" + ");
    return `CarneCerta|categoria:hamburguer|receita:${recomendacao.rotulo}|cortes:${cortesResumo}|pessoas:${ticket.pessoas}|moagem:${ticket.vezesMoida}x`;
  };

  const renderFinalTicketHtml = (ticket, recomendacao) => {
    const isBlend = recomendacao.cortes.length > 1;
    const qrPayload = buildFinalQrPayload(ticket, recomendacao);
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrPayload)}`;

    const choiceCardsMarkup = recomendacao.cortes
      .map(
        (corte) => `
          <article class="final-choice-card">
            <img src="${escapeHtmlLocal(corte.image)}" alt="${escapeHtmlLocal(corte.nome)}" class="final-choice-image">
            <div class="final-choice-content">
              <h3>${escapeHtmlLocal(corte.nome)}</h3>
              <p><strong>Quantidade recomendada:</strong> ${corte.pesoGramas}g${isBlend ? ` (${Math.round(corte.percentual * 100)}% do blend)` : ""} para ${ticket.pessoas} pessoas.</p>
              <p class="final-note">Parte de: ${escapeHtmlLocal(recomendacao.rotulo)}.</p>
              <a class="details-link" href="${escapeHtmlLocal(corte.page)}">Ver página do corte (${escapeHtmlLocal(corte.nome)})</a>
            </div>
          </article>
        `
      )
      .join("");

    return `
      <div class="results-header">
        <h2>Escolha final confirmada</h2>
        <p>Use o texto abaixo para pedir no açougue e garantir a quantidade certa.</p>
      </div>

      ${choiceCardsMarkup}

      <article class="qr-card">
        <div>
          <h3>QR Code da sua escolha</h3>
          <p>Mostre esse QR Code no açougue para facilitar o pedido, salvar no celular ou compartilhar com quem vai comprar.</p>
        </div>
        <img src="${escapeHtmlLocal(qrSrc)}" alt="QR Code da recomendação" class="qr-image">
        <div class="qr-tips">
          <p><strong>Como usar:</strong></p>
          <p>1. Escaneie para abrir o resumo da escolha.</p>
          <p>2. Mostre no balcão para evitar erro de corte e quantidade.</p>
          <p>3. Pode integrar com pedido online, WhatsApp ou sistema de caixa.</p>
        </div>
      </article>
    `;
  };

  // Versão Markdown do mesmo ticket (útil para compartilhar por WhatsApp/print).
  const renderTicketMarkdown = (ticket) => {
    const blocos = ticket.recomendacoes.map((recomendacao) => {
      const linhasCortes = recomendacao.cortes.map((corte) => `  - ${corte.nome}: ${corte.pesoGramas}g`);
      return [`**Top ${recomendacao.ranking} — ${recomendacao.rotulo}**`, ...linhasCortes].join("\n");
    });

    return [
      `### ${ticket.titulo}`,
      `**${ticket.pessoas} Pessoas | ${ticket.vezesMoida}x Moída**`,
      "",
      ...blocos.join("\n\n").split("\n"),
      "",
      `> ${ticket.instrucaoTecnica}`
    ].join("\n");
  };

  // A pergunta "se for blend, qual estilo?" só faz sentido quando o usuário
  // escolheu blend; escondida por padrão e reexibida assim que "Sim - quero
  // blend" é clicado. Guardado por `typeof document` para não quebrar em
  // ambientes sem DOM (ex.: os testes de node que carregam este módulo puro).
  const initMixProfileVisibilityToggle = () => {
    if (typeof document === "undefined") {
      return;
    }

    const mixBlock = document.querySelector('.question-block[data-question="mix"]');
    const mixProfileBlock = document.querySelector('.question-block[data-question="mixprofile"]');

    if (!mixBlock || !mixProfileBlock) {
      return;
    }

    const setMixProfileVisible = (visible) => {
      mixProfileBlock.style.display = visible ? "" : "none";
    };

    setMixProfileVisible(false);

    mixBlock.querySelectorAll(".option-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const wantsBlend = button.textContent.trim().toLowerCase().includes("sim");
        setMixProfileVisible(wantsBlend);
      });
    });
  };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initMixProfileVisibilityToggle, { once: true });
    } else {
      initMixProfileVisibilityToggle();
    }
  }

  global.CarneCertaHamburguer = {
    CUT_GRADES,
    PREFERENCE_CANDIDATES,
    GRAMS_PER_PERSON,
    HamburguerErrorCode,
    HamburguerStrategy,
    renderTicketHtml,
    renderFinalTicketHtml,
    renderTicketMarkdown
  };
})(window);
