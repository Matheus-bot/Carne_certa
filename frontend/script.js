console.log("CarneCerta iniciado 🚀");

const preferenceCards = document.querySelectorAll("[data-open-preferences]");

preferenceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const directTarget = card.dataset.target || "";

    if (directTarget) {
      window.location.href = directTarget;
      return;
    }
  });
});

const optionButtons = document.querySelectorAll(".option-btn");

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const optionGroup = button.closest(".options, .options-grid");

    if (!optionGroup) {
      return;
    }

    const siblings = optionGroup.querySelectorAll(".option-btn");
    siblings.forEach((btn) => {
      btn.classList.remove("active-option");
    });

    button.classList.add("active-option");
  });
});

const continueButtons = document.querySelectorAll(".continue-btn[data-category]");
const appData = window.CARNECERTA_DATA || {};
const meatCatalog = appData.meatCatalog || {};
const categoryCandidates = appData.categoryCandidates || {};
const gramsPerPerson = appData.gramsPerPerson || {};

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getSelectedQuestionText = (questionKey, fallbackText) => {
  const block = document.querySelector(`.question-block[data-question="${questionKey}"]`);

  if (!block) {
    return fallbackText;
  }

  const activeButton = block.querySelector(".option-btn.active-option");
  return activeButton ? activeButton.textContent.trim().toLowerCase() : fallbackText;
};

const parsePeopleCount = (peopleText) => {
  const normalizedPeopleText = normalizeText(peopleText);
  const digits = (normalizedPeopleText.match(/\d+/g) || []).map(Number);

  if (!digits.length) {
    return 4;
  }

  if (normalizedPeopleText.includes("+")) {
    return digits[0] + 1;
  }

  if (digits.length > 1) {
    return digits[1];
  }

  return digits[0];
};

const calculateQuantityKg = (category, peopleCount, meatFactor) => {
  const gramsBase = gramsPerPerson[category] || 250;
  const gramsTotal = gramsBase * peopleCount * meatFactor;
  return (gramsTotal / 1000).toFixed(2);
};

const getResultSection = () => {
  const page = document.querySelector(".preferences-page");

  if (!page) {
    return null;
  }

  let section = document.getElementById("resultsSection");

  if (!section) {
    section = document.createElement("section");
    section.id = "resultsSection";
    section.className = "results-section";
    page.appendChild(section);
  }

  return section;
};

const scoreCandidate = (candidate, selected, effectiveCategory) => {
  let score = 1;

  if ((candidate.categories || []).includes(effectiveCategory)) {
    score += 3;
  }

  (candidate.priorities || []).forEach((token) => {
    if (selected.priority.includes(token)) {
      score += 3;
    }
  });

  (candidate.cutHints || []).forEach((token) => {
    if (selected.cutPreference.includes(token)) {
      score += 2;
    }
  });

  if (selected.cutPreference.includes("magra") && candidate.fatProfile === "magra") {
    score += 2;
  }

  if (selected.cutPreference.includes("sabor") && candidate.fatProfile === "saborosa") {
    score += 2;
  }

  return score;
};

const pickEffectiveCategory = (category, selected) => {
  if (category !== "ajuda") {
    return category;
  }

  if (selected.usecase.includes("panela")) {
    return "panela";
  }

  if (selected.usecase.includes("bife")) {
    return "bife";
  }

  if (selected.usecase.includes("churrasco")) {
    return "churrasco";
  }

  if (selected.usecase.includes("hamburg")) {
    return "hamburguer";
  }

  if (selected.usecase.includes("desfi")) {
    return "desfiar";
  }

  if (selected.usecase.includes("moer")) {
    return "moer";
  }

  return "panela";
};

const buildBlendRecommendation = (id, name, firstMeatId, secondMeatId, note, butcherCut, factor) => {
  const first = meatCatalog[firstMeatId];
  const second = meatCatalog[secondMeatId];

  if (!first || !second) {
    return null;
  }

  return {
    id,
    name,
    image: first.image,
    page: first.page,
    priorities: ["sabor", "maci", "barat"],
    notes: note,
    butcherCut,
    factor,
    isBlend: true
  };
};

const getHamburguerBlendRecommendations = (selected) => {
  const blendProfile = selected.mixProfile;

  const magras = [
    buildBlendRecommendation(
      "blend-magra-1",
      "Blend Magro: Coxao Mole + Paleta",
      "coxaomole",
      "paleta",
      "Blend equilibrado e mais leve para hambúrguer artesanal.",
      "misture 50% coxao mole e 50% paleta",
      1.0
    ),
    buildBlendRecommendation(
      "blend-magra-2",
      "Blend Magro: Coxao Mole + Acem",
      "coxaomole",
      "acem",
      "Boa suculencia com perfil mais magro.",
      "misture 50% coxao mole e 50% acem",
      1.02
    ),
    buildBlendRecommendation(
      "blend-magra-3",
      "Blend Magro: Paleta + Acem",
      "paleta",
      "acem",
      "Blend econômico e macio para o dia a dia.",
      "misture 60% paleta e 40% acem",
      1.0
    )
  ].filter(Boolean);

  const magraSabor = [
    buildBlendRecommendation(
      "blend-ms-1",
      "Blend Equilibrado: Coxao Mole + Contrafile",
      "coxaomole",
      "contrafile",
      "Macio com gordura na medida para burger suculento.",
      "misture 60% coxao mole e 40% contrafile",
      1.08
    ),
    buildBlendRecommendation(
      "blend-ms-2",
      "Blend Equilibrado: Paleta + Ponta de Alcatra",
      "paleta",
      "pontadealcatra",
      "Combina maciez e sabor intenso.",
      "misture 60% paleta e 40% ponta de alcatra",
      1.1
    ),
    buildBlendRecommendation(
      "blend-ms-3",
      "Blend Equilibrado: Acem + Contrafile",
      "acem",
      "contrafile",
      "Ótimo custo-benefício com sabor marcante.",
      "misture 55% acem e 45% contrafile",
      1.06
    )
  ].filter(Boolean);

  const sabor = [
    buildBlendRecommendation(
      "blend-sabor-1",
      "Blend Sabor: Contrafile + Ponta de Alcatra",
      "contrafile",
      "pontadealcatra",
      "Sabor forte e bastante suculencia.",
      "misture 50% contrafile e 50% ponta de alcatra",
      1.14
    ),
    buildBlendRecommendation(
      "blend-sabor-2",
      "Blend Sabor: Acem + Ponta de Alcatra",
      "acem",
      "pontadealcatra",
      "Burger encorpado e muito saboroso.",
      "misture 60% acem e 40% ponta de alcatra",
      1.12
    ),
    buildBlendRecommendation(
      "blend-sabor-3",
      "Blend Sabor: Acem + Contrafile",
      "acem",
      "contrafile",
      "Sabor intenso com textura ótima.",
      "misture 50% acem e 50% contrafile",
      1.1
    )
  ].filter(Boolean);

  if (blendProfile.includes("duas carnes magras")) {
    return magras.slice(0, 3);
  }

  if (blendProfile.includes("magra") || blendProfile.includes("saborosa")) {
    return magraSabor.slice(0, 3);
  }

  return sabor.slice(0, 3);
};

const getTopRecommendations = (category, selected) => {
  const effectiveCategory = pickEffectiveCategory(category, selected);

  if (effectiveCategory === "hamburguer" && selected.mix.includes("sim")) {
    return {
      effectiveCategory,
      list: getHamburguerBlendRecommendations(selected)
    };
  }

  const candidateIds = categoryCandidates[effectiveCategory] || [];

  const ranked = candidateIds
    .map((id) => meatCatalog[id])
    .filter(Boolean)
    .map((candidate) => ({
      ...candidate,
      score: scoreCandidate(candidate, selected, effectiveCategory)
    }))
    .sort((a, b) => b.score - a.score);

  const top3 = ranked.slice(0, 3);

  if (top3.length < 3) {
    ranked.forEach((candidate) => {
      if (top3.length >= 3) {
        return;
      }

      if (!top3.find((item) => item.id === candidate.id)) {
        top3.push(candidate);
      }
    });
  }

  return {
    effectiveCategory,
    list: top3
  };
};

const extractGrindTimes = (textValue) => {
  const digits = (normalizeText(textValue).match(/\d+/g) || []).map(Number);
  return digits[0] || 1;
};

const getButcherInstruction = (meat, quantityKg, selected, effectiveCategory) => {
  const cutPreference = selected.cutPreferenceRaw || "corte padrão";
  const grindTimes = extractGrindTimes(selected.grindRaw || "1x");

  if (effectiveCategory === "panela") {
    return `Quero ${quantityKg} kg de ${meat.name}, em ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "bife") {
    return `Quero ${quantityKg} kg de ${meat.name}, em bifes ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "churrasco") {
    return `Quero ${quantityKg} kg de ${meat.name}, em cortes ${cutPreference.toLowerCase()} para churrasco.`;
  }

  if (effectiveCategory === "desfiar") {
    return `Quero ${quantityKg} kg de ${meat.name}, ${cutPreference.toLowerCase()} para cozinhar e desfiar.`;
  }

  if (effectiveCategory === "moer") {
    return `Quero ${quantityKg} kg de ${meat.name}, moendo ${grindTimes}x e com perfil ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "hamburguer") {
    const blendText = meat.isBlend ? `${meat.butcherCut}, ` : "";
    return `Quero ${quantityKg} kg para hambúrguer, ${blendText}moendo ${grindTimes}x.`;
  }

  return `Quero ${quantityKg} kg de ${meat.name}, ${meat.butcherCut}.`;
};

const renderFinalInstruction = (section, meat, quantityKg, peopleCount, category, selected, effectiveCategory) => {
  const qrPayload = `CarneCerta|categoria:${effectiveCategory}|corte:${meat.name}|qtd:${quantityKg}kg|pessoas:${peopleCount}|prioridade:${selected.priority}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrPayload)}`;
  const butcherInstruction = getButcherInstruction(meat, quantityKg, selected, effectiveCategory);

  section.innerHTML = `
    <div class="results-header">
      <h2>Escolha final confirmada</h2>
      <p>Use o texto abaixo para pedir no acougue e garantir a quantidade certa.</p>
    </div>

    <article class="final-choice-card">
      <img src="${meat.image}" alt="${meat.name}" class="final-choice-image">
      <div class="final-choice-content">
        <h3>${meat.name}</h3>
        <p><strong>Quantidade recomendada:</strong> ${quantityKg} kg para ${peopleCount} pessoas.</p>
        <p><strong>Como pedir ao acougueiro:</strong> "${butcherInstruction}"</p>
        <p><strong>Dica de preparo:</strong> ${meat.notes}</p>
        <p class="final-note">Essa sugestao foi calculada para ${peopleCount} pessoas e prioriza: ${selected.priority}.</p>
        <a class="details-link" href="${meat.page}">Ver pagina completa do corte</a>
      </div>
    </article>

    <article class="qr-card">
      <div>
        <h3>QR Code da sua escolha</h3>
        <p>Mostre esse QR Code no acougue para facilitar o pedido, salvar no celular ou compartilhar com quem vai comprar.</p>
      </div>
      <img src="${qrSrc}" alt="QR Code da recomendacao" class="qr-image">
      <div class="qr-tips">
        <p><strong>Como usar:</strong></p>
        <p>1. Escaneie para abrir o resumo da escolha.</p>
        <p>2. Mostre no balcão para evitar erro de corte e quantidade.</p>
        <p>3. Pode integrar com pedido online, WhatsApp ou sistema de caixa.</p>
      </div>
    </article>
  `;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const renderRecommendations = (section, recommendations, category, selected, effectiveCategory) => {
  if (!recommendations.length) {
    section.innerHTML = `
      <div class="results-header">
        <h2>Nenhuma recomendacao cadastrada</h2>
        <p>Atualize o catalogo em frontend/data/cortes.js para esta categoria.</p>
      </div>
    `;
    return;
  }

  const peopleCount = parsePeopleCount(selected.peopleRaw);

  const cardsMarkup = recommendations
    .map((meat) => {
      const quantityKg = calculateQuantityKg(effectiveCategory, peopleCount, meat.factor || 1);

      return `
        <article class="result-card" data-meat-id="${meat.id}">
          <img src="${meat.image}" alt="${meat.name}" class="result-image">
          <div class="result-content">
            <h3>${meat.name}</h3>
            <p>${meat.notes}</p>
            <p><strong>Quantidade:</strong> ${quantityKg} kg</p>
            <button
              class="result-select-btn"
              type="button"
              data-meat-id="${meat.id}"
              data-quantity="${quantityKg}"
              data-people="${peopleCount}"
              data-category="${category}"
              data-effective-category="${effectiveCategory}"
            >
              Escolher esta opcao
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  section.innerHTML = `
    <div class="results-header">
      <h2>3 cortes ideais para voce</h2>
      <p>Baseado na sua prioridade e quantidade de pessoas.</p>
    </div>
    <div class="results-grid">${cardsMarkup}</div>
  `;

  const selectButtons = section.querySelectorAll(".result-select-btn");
  selectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const meatId = button.dataset.meatId || "";
      const meat = recommendations.find((item) => item.id === meatId) || meatCatalog[meatId];
      const quantityKg = button.dataset.quantity || "0.00";
      const selectedPeople = Number(button.dataset.people || "1");
      const selectedCategory = button.dataset.category || category;
      const selectedEffectiveCategory = button.dataset.effectiveCategory || effectiveCategory;

      if (!meat) {
        return;
      }

      renderFinalInstruction(
        section,
        meat,
        quantityKg,
        selectedPeople,
        selectedCategory,
        selected,
        selectedEffectiveCategory
      );
    });
  });

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

continueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const selected = {
      priorityRaw: getSelectedQuestionText("priority", "nao informada"),
      cutPreferenceRaw: getSelectedQuestionText("cutpreference", "corte padrao"),
      peopleRaw: getSelectedQuestionText("people", "3-4"),
      mixRaw: getSelectedQuestionText("mix", "nao"),
      mixProfileRaw: getSelectedQuestionText("mixprofile", "equilibrado"),
      grindRaw: getSelectedQuestionText("grind", "1x"),
      usecaseRaw: getSelectedQuestionText("usecase", "panela")
    };

    selected.priority = normalizeText(selected.priorityRaw);
    selected.cutPreference = normalizeText(selected.cutPreferenceRaw);
    selected.people = normalizeText(selected.peopleRaw);
    selected.mix = normalizeText(selected.mixRaw);
    selected.mixProfile = normalizeText(selected.mixProfileRaw);
    selected.grind = normalizeText(selected.grindRaw);
    selected.usecase = normalizeText(selected.usecaseRaw);

    const section = getResultSection();
    if (!section || !category) {
      return;
    }

    const recommendationData = getTopRecommendations(category, selected);
    const recommendations = recommendationData.list || [];
    const effectiveCategory = recommendationData.effectiveCategory || category;

    renderRecommendations(
      section,
      recommendations,
      category,
      selected,
      effectiveCategory
    );
  });
});