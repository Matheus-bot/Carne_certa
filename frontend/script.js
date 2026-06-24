console.log("CarneCerta iniciado 🚀");

const themeStorageKey = "carnecerta-theme";
const themeOptions = {
  dark: {
    label: "🌙",
    title: "Modo escuro",
    className: "dark-theme"
  },
  light: {
    label: "☀️",
    title: "Modo claro",
    className: "light-theme"
  }
};

const getStoredTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey) || "dark";
  } catch (error) {
    return "dark";
  }
};

const applyTheme = (themeName) => {
  const nextTheme = themeName === "light" ? "light" : "dark";
  const body = document.body;

  body.classList.remove(themeOptions.dark.className, themeOptions.light.className);
  body.classList.add(themeOptions[nextTheme].className);
  body.dataset.theme = nextTheme;

  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    /* localStorage unavailable */
  }

  const toggleButton = document.querySelector("[data-theme-toggle]");
  if (toggleButton) {
    const targetTheme = nextTheme === "dark" ? "light" : "dark";
    toggleButton.dataset.theme = nextTheme;
    toggleButton.setAttribute("aria-label", `Alternar para ${themeOptions[targetTheme].title}`);
    toggleButton.innerHTML = `
      <span class="theme-toggle-icon" aria-hidden="true">${themeOptions[nextTheme].label}</span>
      <span class="theme-toggle-thumb" aria-hidden="true"></span>
    `;
  }
};

const injectThemeToggle = () => {
  if (document.querySelector("[data-theme-toggle]")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.setAttribute("data-theme-toggle", "true");
  toggle.setAttribute("aria-live", "polite");
  toggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme === "light" ? "light" : "dark";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  document.body.appendChild(toggle);
};

const initTheme = () => {
  injectThemeToggle();
  applyTheme(getStoredTheme());
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme, { once: true });
} else {
  initTheme();
}

const cowMapCuts = [
  {
    id: "acem",
    name: "Acem",
    pointX: 32.4,
    pointY: 40.5,
    labelX: 2.8,
    labelY: 18,
    side: "left",
    link: "../carnes/acem.html",
    description: "Corte dianteiro versatil, ideal para receitas de panela e dia a dia."
  },
  {
    id: "contrafile",
    name: "Contra-file",
    pointX: 59.8,
    pointY: 39.2,
    labelX: 68.2,
    labelY: 16.5,
    side: "right",
    link: "../carnes/contrafile.html",
    description: "Corte nobre para grelha e chapa, com sabor intenso e boa suculencia."
  },
  {
    id: "bistecadocontrafile",
    name: "Bisteca do Contra File",
    pointX: 58.4,
    pointY: 37.8,
    labelX: 66.2,
    labelY: 15.8,
    side: "right",
    link: "../carnes/bistecadocontrafile.html",
    description: "Versao clássica do contra file, ideal para grelha e churrasco com textura marcante."
  },
  {
    id: "bistecadosete",
    name: "Bisteca do Sete",
    pointX: 56.8,
    pointY: 36.6,
    labelX: 64.8,
    labelY: 14.6,
    side: "right",
    link: "../carnes/bistecadosete.html",
    description: "Corte tradicional com sabor marcante e ótima resposta na grelha."
  },
  {
    id: "coxaomole",
    name: "Coxao Mole",
    pointX: 73.6,
    pointY: 55,
    labelX: 70.4,
    labelY: 65.5,
    side: "right",
    link: "../carnes/coxaomole.html",
    description: "Maciez equilibrada para bifes, assados e preparos rapidos."
  },
  {
    id: "musculo",
    name: "Musculo",
    pointX: 74.9,
    pointY: 74.2,
    labelX: 66.5,
    labelY: 82.5,
    side: "right",
    link: "../carnes/musculo.html",
    description: "Rico em colageno, excelente para caldos encorpados e coccao lenta."
  },
  {
    id: "filemignon",
    name: "File Mignon",
    pointX: 62.5,
    pointY: 34.8,
    labelX: 66.8,
    labelY: 30.8,
    side: "right",
    link: "../carnes/filemignon.html",
    description: "Corte extremamente macio e magro, ideal para fitness e preparos delicados."
  },
  {
    id: "paleta",
    name: "Paleta",
    pointX: 25.5,
    pointY: 58,
    labelX: 2.8,
    labelY: 61.5,
    side: "left",
    link: "../carnes/paleta.html",
    description: "Corte dianteiro com sabor marcante, otimo para molhos e panelas."
  },
  {
    id: "picanha",
    name: "Picanha",
    pointX: 64.2,
    pointY: 33.8,
    labelX: 71.2,
    labelY: 27.2,
    side: "right",
    link: "../carnes/picanha.html",
    description: "Corte nobre, extremamente macio e saboroso para churrasco premium."
  },
  {
    id: "alcatra",
    name: "Alcatra",
    pointX: 60.8,
    pointY: 39.8,
    labelX: 58.4,
    labelY: 34.4,
    side: "left",
    link: "../carnes/alcatra.html",
    description: "Corte versátil e saboroso, excelente para grelha, assados e panela.",
    zIndex: 6
  },
  {
    id: "pontadealcatra",
    name: "Ponta de Alcatra",
    pointX: 70.2,
    pointY: 43.8,
    labelX: 68.2,
    labelY: 43.8,
    side: "right",
    link: "../carnes/pontadealcatra.html",
    description: "Perfil saboroso para churrasco, bifes altos e preparos suculentos."
  }
];

const describeLinePath = (startX, startY, endX, endY, side) => {
  const direction = side === "left" ? -1 : 1;
  const deltaX = Math.abs(endX - startX);
  const controlOffset = Math.max(22, deltaX * 0.3);
  const middleX = startX + direction * controlOffset;

  return [
    `M ${startX} ${startY}`,
    `C ${middleX} ${startY}, ${endX - direction * 18} ${endY}, ${endX} ${endY}`
  ].join(" ");
};

const syncCowMapLines = (mapRoot, cuts) => {
  if (mapRoot.dataset.mapLayout === "a") {
    return;
  }

  const svg = mapRoot.querySelector("[data-cow-lines]");

  if (!svg) {
    return;
  }

  const mapRect = mapRoot.getBoundingClientRect();

  if (!mapRect.width || !mapRect.height) {
    return;
  }

  svg.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);

  cuts.forEach((cut) => {
    const hotspot = mapRoot.querySelector(`[data-cut-id="${cut.id}"]`);

    if (!hotspot) {
      return;
    }

    const point = hotspot.querySelector(".cow-hotspot-point");
    const label = hotspot.querySelector(".cow-hotspot-label");
    const line = svg.querySelector(`[data-line-id="${cut.id}"]`);

    if (!point || !label || !line) {
      return;
    }

    const pointRect = point.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();

    const startX = pointRect.left + pointRect.width / 2 - mapRect.left;
    const startY = pointRect.top + pointRect.height / 2 - mapRect.top;
    const endX = cut.side === "left"
      ? labelRect.right - mapRect.left
      : labelRect.left - mapRect.left;
    const endY = labelRect.top + labelRect.height / 2 - mapRect.top;

    const path = describeLinePath(startX, startY, endX, endY, cut.side);
    line.setAttribute("d", path);

    const length = line.getTotalLength();
    line.style.setProperty("--path-length", `${length}`);
  });
};

const initCowMap = () => {
  const mapRoot = document.querySelector("[data-cow-map]");

  if (!mapRoot || mapRoot.dataset.initialized === "true") {
    return;
  }

  const hotspotsLayer = mapRoot.querySelector("[data-cow-hotspots]");
  const svg = mapRoot.querySelector("[data-cow-lines]");
  const image = mapRoot.querySelector("[data-cow-image]");
  const shell = mapRoot.closest(".cow-map-shell");
  const infoCard = document.querySelector("[data-cow-info-card]");
  const infoName = document.querySelector("[data-cow-active-name]");
  const infoDescription = document.querySelector("[data-cow-active-description]");
  const infoLink = document.querySelector("[data-cow-active-link]");
  const modeButtons = Array.from(document.querySelectorAll("[data-cow-layout-toggle]"));

  if (!hotspotsLayer || !svg || !image) {
    return;
  }

  mapRoot.dataset.initialized = "true";

  const cutById = new Map(cowMapCuts.map((cut) => [cut.id, cut]));
  let activeCutId = cowMapCuts[0]?.id || "";

  const parseLayoutFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const queryMode = (params.get("layout") || params.get("opcao") || "").toLowerCase();
    return queryMode === "a" ? "a" : "b";
  };

  let currentMode = parseLayoutFromUrl();

  const applyLayoutMode = (mode) => {
    currentMode = mode === "b" ? "b" : "a";
    mapRoot.dataset.mapLayout = currentMode;

    if (shell) {
      shell.dataset.mapLayout = currentMode;
    }

    modeButtons.forEach((button) => {
      const selected = button.dataset.cowLayoutToggle === currentMode;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const updateInfoCard = (cut) => {
    if (!infoCard || !cut) {
      return;
    }

    if (infoName) {
      infoName.textContent = cut.name;
    }

    if (infoDescription) {
      infoDescription.textContent = cut.description || "Explore os detalhes completos deste corte.";
    }

    if (infoLink) {
      infoLink.href = cut.link;
      infoLink.setAttribute("aria-label", `Abrir detalhes de ${cut.name}`);
    }
  };

  const setActiveCut = (cutId) => {
    if (!cutById.has(cutId)) {
      return;
    }

    activeCutId = cutId;
    const activeCut = cutById.get(cutId);

    mapRoot.querySelectorAll(".cow-hotspot").forEach((hotspot) => {
      hotspot.classList.toggle("is-active", hotspot.dataset.cutId === activeCutId);
    });

    updateInfoCard(activeCut);
  };

  cowMapCuts.forEach((cut, index) => {
    const delay = `${index * 0.22}s`;
    const hotspot = document.createElement("div");
    hotspot.className = "cow-hotspot";
    hotspot.dataset.cutId = cut.id;
    hotspot.style.setProperty("--point-x", `${cut.pointX}%`);
    hotspot.style.setProperty("--point-y", `${cut.pointY}%`);
    hotspot.style.setProperty("--delay", delay);
    hotspot.style.setProperty("--hotspot-z-index", `${cut.zIndex ?? 3}`);

    const label = document.createElement("div");
    label.className = "cow-hotspot-label";
    label.setAttribute("role", "dialog");
    label.setAttribute("aria-label", `Resumo do corte ${cut.name}`);
    label.innerHTML = `
      <span class="cow-hotspot-label-content">
        <span class="cow-hotspot-title">${cut.name}</span>
        <span class="cow-hotspot-subtitle">Corte selecionado</span>
      </span>
      <a href="${cut.link}" class="cow-hotspot-cta" aria-label="Abrir detalhes de ${cut.name}">Abrir detalhes</a>
    `;

    const point = document.createElement("button");
    point.type = "button";
    point.className = "cow-hotspot-point";
    point.setAttribute("aria-label", `Selecionar ${cut.name}`);

    const activate = () => {
      hotspot.classList.add("is-hovered");
      setActiveCut(cut.id);
    };
    const deactivate = () => hotspot.classList.remove("is-hovered");

    [point, label].forEach((element) => {
      element.addEventListener("mouseenter", activate);
      element.addEventListener("focus", activate);
      element.addEventListener("mouseleave", deactivate);
      element.addEventListener("blur", deactivate);
    });

    point.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setActiveCut(cut.id);
      if (currentMode === "b") {
        hotspot.classList.add("is-hovered");
      }
      const targetUrl = new URL(cut.link, window.location.href);
      window.location.assign(targetUrl.href);
    });

    label.addEventListener("click", () => setActiveCut(cut.id));

    hotspot.append(point, label);
    hotspotsLayer.appendChild(hotspot);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("class", "cow-hotspot-line");
    line.dataset.lineId = cut.id;
    line.style.setProperty("--delay", delay);
    svg.appendChild(line);
  });

  const updateLines = () => syncCowMapLines(mapRoot, cowMapCuts);
  const scheduleUpdate = () => window.requestAnimationFrame(updateLines);

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLayoutMode(button.dataset.cowLayoutToggle);
      scheduleUpdate();
    });
  });

  applyLayoutMode(currentMode);
  setActiveCut(activeCutId);

  if (image.complete) {
    scheduleUpdate();
  } else {
    image.addEventListener("load", scheduleUpdate, { once: true });
  }

  window.addEventListener("resize", scheduleUpdate, { passive: true });

  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(mapRoot);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCowMap, { once: true });
} else {
  initCowMap();
}

const initRevealBlocks = () => {
  const revealBlocks = document.querySelectorAll("[data-reveal]");

  if (!revealBlocks.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || typeof IntersectionObserver !== "function") {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });

  revealBlocks.forEach((block, index) => {
    block.style.setProperty("--reveal-delay", `${index * 0.08}s`);
    observer.observe(block);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRevealBlocks, { once: true });
} else {
  initRevealBlocks();
}

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

const getDisplayImage = (meat, effectiveCategory) => {
  if (effectiveCategory === "moer" && meat.grindImage) {
    return meat.grindImage;
  }

  return meat.image;
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

  if (selected.priority.includes("magra") && candidate.fatProfile === "magra") {
    score += 4;
  }

  if (selected.priority.includes("magra") && candidate.id === "musculo") {
    score += 3;
  }

  if (selected.priority.includes("magra") && candidate.id === "filemignon") {
    score += 4;
  }

  if (selected.cutPreference.includes("maci") && candidate.id === "filemignon") {
    score += 4;
  }

  if (selected.priority.includes("maci") && candidate.id === "picanha") {
    score += 5;
  }

  if (selected.priority.includes("sabor") && candidate.id === "picanha") {
    score += 5;
  }

  if (selected.cutPreference.includes("sabor") && candidate.fatProfile === "saborosa") {
    score += 2;
  }

  return score;
};

const pickEffectiveCategory = (category, selected) => {
  if (category === "bife" && selected.bifetype && selected.bifetype.includes("role")) {
    return "bifearole";
  }

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
  const meatImage = getDisplayImage(meat, effectiveCategory);

  section.innerHTML = `
    <div class="results-header">
      <h2>Escolha final confirmada</h2>
      <p>Use o texto abaixo para pedir no acougue e garantir a quantidade certa.</p>
    </div>

    <article class="final-choice-card">
      <img src="${meatImage}" alt="${meat.name}" class="final-choice-image">
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
      const meatImage = getDisplayImage(meat, effectiveCategory);

      return `
        <article class="result-card" data-meat-id="${meat.id}">
          <img src="${meatImage}" alt="${meat.name}" class="result-image">
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
      usecaseRaw: getSelectedQuestionText("usecase", "panela"),
      bifetypeRaw: getSelectedQuestionText("bifetype", "normal")
    };

    selected.priority = normalizeText(selected.priorityRaw);
    selected.cutPreference = normalizeText(selected.cutPreferenceRaw);
    selected.people = normalizeText(selected.peopleRaw);
    selected.mix = normalizeText(selected.mixRaw);
    selected.mixProfile = normalizeText(selected.mixProfileRaw);
    selected.grind = normalizeText(selected.grindRaw);
    selected.usecase = normalizeText(selected.usecaseRaw);
    selected.bifetype = normalizeText(selected.bifetypeRaw);

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