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

const updateThemeToggle = (toggleButton, nextTheme) => {
  const targetTheme = nextTheme === "dark" ? "light" : "dark";

  toggleButton.dataset.theme = nextTheme;
  toggleButton.setAttribute("aria-label", `Alternar para ${themeOptions[targetTheme].title}`);
  toggleButton.innerHTML = `
    <span class="theme-toggle-icon" aria-hidden="true">${themeOptions[nextTheme].label}</span>
    <span class="theme-toggle-thumb" aria-hidden="true"></span>
  `;
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
    updateThemeToggle(toggleButton, nextTheme);
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

const resolveFrontendAssetPath = (rootRelativePath) => {
  const pathname = (window.location.pathname || "").toLowerCase();
  const isNestedPage = pathname.includes("/paginas/");
  return isNestedPage ? `../../${rootRelativePath}` : `./${rootRelativePath}`;
};

const registerServiceWorkerBase = async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register(resolveFrontendAssetPath("sw.js"));
  } catch (error) {
    console.warn("Falha ao registrar Service Worker:", error);
  }
};

const runWhenReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
};

runWhenReady(initTheme);
runWhenReady(registerServiceWorkerBase);

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
    id: "capadocontrafile",
    name: "Capa do Contra File",
    pointX: 61.1,
    pointY: 38.6,
    labelX: 69.6,
    labelY: 15.4,
    side: "right",
    link: "../carnes/capadocontrafile.html",
    description: "Versao premium e elegante do contra file para grelha e apresentação sofisticada."
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
    id: "bistecaodoacem",
    name: "Bistecão do Acem",
    pointX: 30.8,
    pointY: 41.2,
    labelX: 8.6,
    labelY: 18.6,
    side: "left",
    link: "../carnes/bistecaodoacem.html",
    description: "Corte grande e saboroso, ideal para churrasco com excelente presença."
  },
  {
    id: "lingua",
    name: "Língua Bovina",
    pointX: 24.4,
    pointY: 63.2,
    labelX: 4.4,
    labelY: 68.8,
    side: "left",
    link: "../carnes/lingua.html",
    description: "Corte tradicional, muito apreciado em preparos de panela e cozimento prolongado."
  },
  {
    id: "mocoto",
    name: "Mocotó",
    pointX: 22.4,
    pointY: 71.8,
    labelX: 3.2,
    labelY: 80.2,
    side: "left",
    link: "../carnes/mocoto.html",
    description: "Corte de sabor intenso, ideal para caldo e cozimento longo."
  },
  {
    id: "rabobovino",
    name: "Rabo Bovino",
    pointX: 18.8,
    pointY: 76.8,
    labelX: 2.4,
    labelY: 86.2,
    side: "left",
    link: "../carnes/rabobovino.html",
    description: "Corte tradicional para caldos, panelas e cozimentos longos."
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
    id: "ossobuco",
    name: "Ossobuco Bovino",
    pointX: 74.2,
    pointY: 71.8,
    labelX: 68.1,
    labelY: 78.8,
    side: "right",
    link: "../carnes/ossobuco.html",
    description: "Corte clássico para cozimento lento, com sabor intenso e textura macia."
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
    id: "maminha",
    name: "Maminha",
    pointX: 66.8,
    pointY: 46.2,
    labelX: 69.4,
    labelY: 49.8,
    side: "right",
    link: "../carnes/maminha.html",
    description: "Corte suculento, muito apreciado para grelha, assados e preparos de sabor marcante."
  },
  {
    id: "fraldinha",
    name: "Fraldinha",
    pointX: 49.4,
    pointY: 56.2,
    labelX: 52.8,
    labelY: 60.6,
    side: "right",
    link: "../carnes/fraldinha.html",
    description: "Corte saboroso e bem equilibrado para assados, panelas e pratos de churrasqueira."
  },
  {
    id: "patinho",
    name: "Patinho",
    pointX: 31.8,
    pointY: 56.4,
    labelX: 8.8,
    labelY: 58.2,
    side: "left",
    link: "../carnes/patinho.html",
    description: "Corte versátil para panela, assados e pratos tradicionais."
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
    id: "costela",
    name: "Costela",
    pointX: 53.2,
    pointY: 24.8,
    labelX: 53.8,
    labelY: 17.2,
    side: "right",
    link: "../carnes/costela.html",
    description: "Corte tradicional, suculento e muito valorizado para assados e churrasco."
  },
  {
    id: "pontadepeito",
    name: "Ponta de Peito",
    pointX: 44.6,
    pointY: 31.4,
    labelX: 41.2,
    labelY: 25.4,
    side: "left",
    link: "../carnes/pontadepeito.html",
    description: "Corte versátil para assados, panela e cozimentos tradicionais."
  },
  {
    id: "lagarto",
    name: "Lagarto",
    pointX: 48.8,
    pointY: 31.2,
    labelX: 52.4,
    labelY: 24.4,
    side: "right",
    link: "../carnes/lagarto.html",
    description: "Corte versátil para assados, panelas e preparos tradicionais."
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

runWhenReady(initCowMap);

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

runWhenReady(initRevealBlocks);

const preferenceCards = document.querySelectorAll("[data-open-preferences]");

const navigateToPreferenceTarget = (card) => {
  const directTarget = card.dataset.target || "";

  if (directTarget) {
    window.location.href = directTarget;
  }
};

preferenceCards.forEach((card) => {
  card.addEventListener("click", () => {
    navigateToPreferenceTarget(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigateToPreferenceTarget(card);
    }
  });

  if (!card.hasAttribute("tabindex")) {
    card.setAttribute("tabindex", "0");
  }
});

const scrollTriggers = document.querySelectorAll("[data-scroll-target]");

scrollTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const target = document.querySelector(trigger.dataset.scrollTarget);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const optionButtons = document.querySelectorAll(".option-btn");

optionButtons.forEach((button) => {
  const optionGroup = button.closest(".options, .options-grid");

  if (optionGroup && !optionGroup.hasAttribute("role")) {
    optionGroup.setAttribute("role", "radiogroup");

    if (!optionGroup.hasAttribute("aria-label") && !optionGroup.hasAttribute("aria-labelledby")) {
      const heading = optionGroup.closest(".question-block")?.querySelector("h2, legend");
      if (heading) {
        optionGroup.setAttribute("aria-label", heading.textContent.trim());
      }
    }
  }

  if (!button.hasAttribute("role")) {
    button.setAttribute("role", "radio");
  }

  button.setAttribute("aria-checked", button.classList.contains("active-option") ? "true" : "false");

  button.addEventListener("click", () => {
    if (!optionGroup) {
      return;
    }

    const siblings = optionGroup.querySelectorAll(".option-btn");
    siblings.forEach((btn) => {
      btn.classList.remove("active-option");
      btn.setAttribute("aria-checked", "false");
    });

    button.classList.add("active-option");
    button.setAttribute("aria-checked", "true");
  });
});

const continueButtons = document.querySelectorAll(".continue-btn[data-category]");
const appData = window.CARNECERTA_DATA || {};
const meatCatalog = appData.meatCatalog || {};
const categoryCandidates = appData.categoryCandidates || {};
const gramsPerPerson = appData.gramsPerPerson || {};

const SecurityErrorCode = {
  INVALID_TYPE: "RECOMMENDATION_INVALID_PREFERENCES",
  SANITIZATION_BLOCKED: "RECOMMENDATION_SANITIZATION_BLOCKED"
};

const INJECTION_PATTERNS = [
  /<\s*script/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /union\s+select/i,
  /drop\s+table/i,
  /\b(alert|prompt|confirm)\s*\(/i,
  /--|\/\*|\*\//
];

const SEARCH_ALLOWLIST = /^[\p{L}\p{N}\s_.\-+xX]{0,80}$/u;
const RECOMMENDATION_OPTION_ALLOWLIST =
  /^[\p{L}\p{N}\p{Extended_Pictographic}\s_.\-+/\u200D\uFE0F]{0,60}$/u;

const SECURITY_DEFAULTS = {
  termo: "",
  somenteDisponiveis: false
};

const toSafeString = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const hasInjectionSignature = (value) => {
  const normalized = toSafeString(value);
  return INJECTION_PATTERNS.some((pattern) => pattern.test(normalized));
};

const sanitizeSearchTerm = (value, options = {}) => {
  const raw = toSafeString(value);
  const maxLength = Number.isFinite(options.maxLength) ? options.maxLength : 80;
  const allowlist = options.allowlist || SEARCH_ALLOWLIST;

  if (!raw) {
    return "";
  }

  const clipped = raw.slice(0, maxLength);
  if (hasInjectionSignature(clipped)) {
    throw new Error(SecurityErrorCode.SANITIZATION_BLOCKED);
  }

  if (!allowlist.test(clipped)) {
    throw new Error(SecurityErrorCode.SANITIZATION_BLOCKED);
  }

  return clipped;
};

const sanitizeBoolean = (value, fallback = false) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = toSafeString(value).toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }

  return fallback;
};

const sanitizeSearchFilters = (input) => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(SecurityErrorCode.INVALID_TYPE);
  }

  const termo = sanitizeSearchTerm(input.termo ?? SECURITY_DEFAULTS.termo);
  const somenteDisponiveis = sanitizeBoolean(
    input.somenteDisponiveis,
    SECURITY_DEFAULTS.somenteDisponiveis
  );

  return {
    termo,
    somenteDisponiveis
  };
};

const sanitizeOptionText = (value, fallback = "") => {
  const sanitized = sanitizeSearchTerm(value, {
    maxLength: 60,
    allowlist: RECOMMENDATION_OPTION_ALLOWLIST
  });
  return sanitized || fallback;
};

const sanitizeRecommendationInputs = (selectedRaw) => {
  if (!selectedRaw || typeof selectedRaw !== "object" || Array.isArray(selectedRaw)) {
    throw new Error(SecurityErrorCode.INVALID_TYPE);
  }

  const normalized = {
    priorityRaw: sanitizeOptionText(selectedRaw.priorityRaw, "nao informada"),
    cutPreferenceRaw: sanitizeOptionText(selectedRaw.cutPreferenceRaw, "corte padrao"),
    peopleRaw: sanitizeOptionText(selectedRaw.peopleRaw, "3-4"),
    mixRaw: sanitizeOptionText(selectedRaw.mixRaw, "nao"),
    mixProfileRaw: sanitizeOptionText(selectedRaw.mixProfileRaw, "equilibrado"),
    grindRaw: sanitizeOptionText(selectedRaw.grindRaw, "1x"),
    usecaseRaw: sanitizeOptionText(selectedRaw.usecaseRaw, "panela"),
    bifetypeRaw: sanitizeOptionText(selectedRaw.bifetypeRaw, "normal")
  };

  return {
    ...normalized,
    priority: normalizeText(normalized.priorityRaw),
    cutPreference: normalizeText(normalized.cutPreferenceRaw),
    people: normalizeText(normalized.peopleRaw),
    mix: normalizeText(normalized.mixRaw),
    mixProfile: normalizeText(normalized.mixProfileRaw),
    grind: normalizeText(normalized.grindRaw),
    usecase: normalizeText(normalized.usecaseRaw),
    bifetype: normalizeText(normalized.bifetypeRaw)
  };
};

window.CarneCertaSecurity = {
  escapeHtml,
  hasInjectionSignature,
  sanitizeBoolean,
  sanitizeSearchFilters,
  sanitizeSearchTerm,
  sanitizeRecommendationInputs
};

window.sanitizeSearchFilters = sanitizeSearchFilters;

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

const RecommendationErrorCode = {
  INVALID_PREFERENCES: "RECOMMENDATION_INVALID_PREFERENCES",
  INVALID_DATA_SOURCE: "RECOMMENDATION_INVALID_DATA_SOURCE",
  NO_VALID_ITEMS: "RECOMMENDATION_NO_VALID_ITEMS",
  SANITIZATION_BLOCKED: "RECOMMENDATION_SANITIZATION_BLOCKED",
  STRATEGY_NOT_FOUND: "RECOMMENDATION_STRATEGY_NOT_FOUND"
};

const CATEGORY_ADJUSTMENT_LIMIT = 0.5;
const RESULT_LIMIT = 3;
const TOP3_STORAGE_KEY = "carnecerta-offline-ticket-snapshot";

const SCORE_WEIGHTS = {
  maciez: 0.18,
  sabor: 0.22,
  rapidez: 0.15,
  economia: 0.30,
  integridade_fibra: 0.15
};

const CATEGORY_PILLAR_WEIGHTS = {
  panelacomosso: {
    maciez: 0.12,
    sabor: 0.24,
    rapidez: 0.1,
    economia: 0.34,
    integridade_fibra: 0.2
  },
  bifearole: {
    maciez: 0.18,
    sabor: 0.14,
    rapidez: 0.1,
    economia: 0.34,
    integridade_fibra: 0.24
  },
  bifefritar: {
    maciez: 0.16,
    sabor: 0.14,
    rapidez: 0.27,
    economia: 0.33,
    integridade_fibra: 0.1
  },
  churrascosemosso: {
    maciez: 0.18,
    sabor: 0.29,
    rapidez: 0.12,
    economia: 0.31,
    integridade_fibra: 0.1
  },
  fritarcomosso: {
    maciez: 0.1,
    sabor: 0.18,
    rapidez: 0.24,
    economia: 0.34,
    integridade_fibra: 0.14
  },
  carnemoida: {
    maciez: 0.1,
    sabor: 0.2,
    rapidez: 0.1,
    economia: 0.35,
    integridade_fibra: 0.25
  },
  hamburguerblend: {
    maciez: 0.17,
    sabor: 0.28,
    rapidez: 0.13,
    economia: 0.32,
    integridade_fibra: 0.1
  }
};

const CATEGORY_PREPARE_ICON_MAP = {
  panela: ["panela"],
  panelacomosso: ["panela", "forno"],
  bife: ["grelha"],
  bifearole: ["panela", "desfiar"],
  bifefritar: ["fritura", "grelha"],
  churrasco: ["churrasco", "grelha"],
  churrascosemosso: ["churrasco", "grelha"],
  fritarcomosso: ["fritura", "forno"],
  hamburguer: ["hamburguer", "moer"],
  hamburguerblend: ["hamburguer", "moer"],
  desfiar: ["desfiar", "panela"],
  moer: ["moer", "hamburguer"],
  carnemoida: ["moer", "panela"]
};

const PREPARE_ICON_LABELS = {
  panela: "Panela",
  churrasco: "Churrasco",
  grelha: "Grelha",
  forno: "Forno",
  fritura: "Fritura",
  desfiar: "Desfiar",
  moer: "Moer",
  hamburguer: "Hamburguer"
};

const PREPARE_ICON_EMOJI = {
  panela: "🍲",
  churrasco: "🔥",
  grelha: "🥩",
  forno: "♨️",
  fritura: "🍳",
  desfiar: "🧵",
  moer: "⚙️",
  hamburguer: "🍔"
};

const normalizeScore = (value) => Math.round(value * 100) / 100;

const clampAdjustment = (value) =>
  Math.max(-CATEGORY_ADJUSTMENT_LIMIT, Math.min(CATEGORY_ADJUSTMENT_LIMIT, Number(value) || 0));

const toNumericScore = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return null;
  }
  return Math.max(0, Math.min(10, numeric));
};

const createEmptyPriorities = () => ({
  maciez: 0,
  sabor: 0,
  rapidez: 0,
  economia: 0,
  integridade_fibra: 0
});

const createPanelaPriorities = (profile = "default") => {
  const presets = {
    economico: {
      economia: 1,
      maciez: 0.6,
      sabor: 0.45,
      integridade_fibra: 0.4,
      rapidez: 0.25
    },
    maciez: {
      maciez: 1,
      economia: 0.7,
      sabor: 0.55,
      integridade_fibra: 0.5,
      rapidez: 0.35
    },
    magro: {
      integridade_fibra: 1,
      economia: 0.7,
      maciez: 0.65,
      sabor: 0.5,
      rapidez: 0.3
    },
    default: {
      economia: 0.9,
      maciez: 0.8,
      sabor: 0.7,
      integridade_fibra: 0.65,
      rapidez: 0.55
    }
  };

  return {
    ...createEmptyPriorities(),
    ...(presets[profile] || presets.default)
  };
};

const createDesfiarPriorities = (profile = "default") => {
  const presets = {
    rapidez: {
      rapidez: 1,
      economia: 0.65,
      sabor: 0.55,
      integridade_fibra: 0.6,
      maciez: 0.5
    },
    economico: {
      economia: 1,
      sabor: 0.55,
      rapidez: 0.5,
      integridade_fibra: 0.55,
      maciez: 0.45
    },
    sabor: {
      sabor: 1,
      economia: 0.55,
      integridade_fibra: 0.65,
      rapidez: 0.45,
      maciez: 0.45
    },
    magro: {
      integridade_fibra: 1,
      rapidez: 0.7,
      economia: 0.6,
      sabor: 0.55,
      maciez: 0.5
    },
    default: {
      economia: 0.9,
      sabor: 0.78,
      integridade_fibra: 0.76,
      rapidez: 0.72,
      maciez: 0.6
    }
  };

  return {
    ...createEmptyPriorities(),
    ...(presets[profile] || presets.default)
  };
};

const createCategoryPriorities = (category, profile = "default") => {
  const presetsByCategory = {
    panelacomosso: {
      economico: {
        economia: 1,
        sabor: 0.65,
        integridade_fibra: 0.6,
        maciez: 0.45,
        rapidez: 0.3
      },
      sabor: {
        economia: 0.9,
        sabor: 1,
        integridade_fibra: 0.72,
        maciez: 0.48,
        rapidez: 0.28
      },
      default: {
        economia: 0.95,
        sabor: 0.82,
        integridade_fibra: 0.76,
        maciez: 0.52,
        rapidez: 0.35
      }
    },
    bifearole: {
      economico: {
        economia: 1,
        integridade_fibra: 0.72,
        maciez: 0.62,
        sabor: 0.46,
        rapidez: 0.34
      },
      maciez: {
        economia: 0.88,
        integridade_fibra: 0.7,
        maciez: 1,
        sabor: 0.52,
        rapidez: 0.33
      },
      default: {
        economia: 0.93,
        integridade_fibra: 0.74,
        maciez: 0.76,
        sabor: 0.56,
        rapidez: 0.42
      }
    },
    bifefritar: {
      economico: {
        economia: 1,
        rapidez: 0.7,
        maciez: 0.55,
        sabor: 0.46,
        integridade_fibra: 0.4
      },
      rapidez: {
        economia: 0.92,
        rapidez: 1,
        maciez: 0.57,
        sabor: 0.5,
        integridade_fibra: 0.42
      },
      default: {
        economia: 0.95,
        rapidez: 0.84,
        maciez: 0.62,
        sabor: 0.58,
        integridade_fibra: 0.44
      }
    },
    churrascosemosso: {
      economico: {
        economia: 1,
        sabor: 0.74,
        maciez: 0.62,
        rapidez: 0.42,
        integridade_fibra: 0.35
      },
      sabor: {
        economia: 0.9,
        sabor: 1,
        maciez: 0.68,
        rapidez: 0.4,
        integridade_fibra: 0.34
      },
      default: {
        economia: 0.94,
        sabor: 0.88,
        maciez: 0.66,
        rapidez: 0.45,
        integridade_fibra: 0.36
      }
    },
    fritarcomosso: {
      economico: {
        economia: 1,
        rapidez: 0.76,
        sabor: 0.58,
        integridade_fibra: 0.46,
        maciez: 0.34
      },
      rapidez: {
        economia: 0.9,
        rapidez: 1,
        sabor: 0.6,
        integridade_fibra: 0.48,
        maciez: 0.35
      },
      default: {
        economia: 0.95,
        rapidez: 0.86,
        sabor: 0.62,
        integridade_fibra: 0.5,
        maciez: 0.38
      }
    },
    carnemoida: {
      economico: {
        economia: 1,
        integridade_fibra: 0.74,
        sabor: 0.66,
        rapidez: 0.44,
        maciez: 0.34
      },
      magro: {
        economia: 0.91,
        integridade_fibra: 1,
        sabor: 0.64,
        rapidez: 0.45,
        maciez: 0.36
      },
      default: {
        economia: 0.96,
        integridade_fibra: 0.82,
        sabor: 0.71,
        rapidez: 0.5,
        maciez: 0.4
      }
    },
    hamburguerblend: {
      economico: {
        economia: 1,
        sabor: 0.76,
        maciez: 0.62,
        rapidez: 0.48,
        integridade_fibra: 0.42
      },
      sabor: {
        economia: 0.9,
        sabor: 1,
        maciez: 0.66,
        rapidez: 0.52,
        integridade_fibra: 0.42
      },
      default: {
        economia: 0.95,
        sabor: 0.9,
        maciez: 0.68,
        rapidez: 0.54,
        integridade_fibra: 0.44
      }
    }
  };

  const categoryPresets = presetsByCategory[category];
  if (!categoryPresets) {
    return createEmptyPriorities();
  }

  return {
    ...createEmptyPriorities(),
    ...(categoryPresets[profile] || categoryPresets.default)
  };
};

const resolvePanelaPreferencePriorities = (selected) => {
  const priorityText = normalizeText(selected.priorityRaw || "");

  if (priorityText.includes("barat") || priorityText.includes("econom")) {
    return createPanelaPriorities("economico");
  }

  if (priorityText.includes("maci")) {
    return createPanelaPriorities("maciez");
  }

  if (priorityText.includes("magr") || priorityText.includes("gord")) {
    return createPanelaPriorities("magro");
  }

  return createPanelaPriorities("default");
};

const resolveDesfiarPreferencePriorities = (selected) => {
  const priorityText = normalizeText(selected.priorityRaw || "");

  if (priorityText.includes("barat") || priorityText.includes("econom")) {
    return createDesfiarPriorities("economico");
  }

  if (priorityText.includes("sabor")) {
    return createDesfiarPriorities("sabor");
  }

  if (priorityText.includes("gord") || priorityText.includes("magr")) {
    return createDesfiarPriorities("magro");
  }

  if (priorityText.includes("rapi") || priorityText.includes("maci")) {
    return createDesfiarPriorities("rapidez");
  }

  return createDesfiarPriorities("default");
};

const resolveCategoryPreferencePriorities = (effectiveCategory, selected) => {
  if (effectiveCategory === "panela") {
    return resolvePanelaPreferencePriorities(selected);
  }

  if (effectiveCategory === "desfiar") {
    return resolveDesfiarPreferencePriorities(selected);
  }

  const priorityText = normalizeText(selected.priorityRaw || "");

  if ([
    "panelacomosso",
    "bifearole",
    "bifefritar",
    "churrascosemosso",
    "fritarcomosso",
    "carnemoida",
    "hamburguerblend"
  ].includes(effectiveCategory)) {
    return createCategoryPriorities(effectiveCategory, "default");
  }

  return resolvePreferencePriorities(selected);
};

const resolvePreferencePriorities = (selected) => {
  const priorities = createEmptyPriorities();
  const priorityText = normalizeText(selected.priorityRaw || "");

  if (priorityText.includes("barat") || priorityText.includes("econom")) {
    priorities.economia = 1;
    priorities.sabor = 0.55;
    priorities.maciez = 0.45;
    priorities.rapidez = 0.35;
    priorities.integridade_fibra = 0.4;
    return priorities;
  }

  if (priorityText.includes("maci")) {
    priorities.maciez = 1;
    priorities.sabor = 0.7;
    priorities.economia = 0.55;
    priorities.rapidez = 0.5;
    priorities.integridade_fibra = 0.55;
    return priorities;
  }

  if (priorityText.includes("sabor")) {
    priorities.sabor = 1;
    priorities.maciez = 0.75;
    priorities.economia = 0.5;
    priorities.rapidez = 0.45;
    priorities.integridade_fibra = 0.5;
    return priorities;
  }

  if (priorityText.includes("gord") || priorityText.includes("magr")) {
    priorities.integridade_fibra = 1;
    priorities.rapidez = 0.65;
    priorities.maciez = 0.6;
    priorities.economia = 0.5;
    priorities.sabor = 0.55;
    return priorities;
  }

  priorities.economia = 0.8;
  priorities.maciez = 0.75;
  priorities.sabor = 0.7;
  priorities.rapidez = 0.6;
  priorities.integridade_fibra = 0.65;
  return priorities;
};

const createRecommendationError = (code, details = "") => {
  const error = new Error(code);
  error.code = code;
  error.details = details;
  return error;
};

class RecommendationStrategy {
  recommend(preferences, data) {
    throw createRecommendationError(RecommendationErrorCode.INVALID_DATA_SOURCE, "Strategy not implemented");
  }
}

class BaseRecommendationStrategy extends RecommendationStrategy {
  constructor(category) {
    super();
    this.category = category;
  }

  getCategoryAdjustment() {
    return 0;
  }

  isEligible(item) {
    return true;
  }

  toRecommendationResult(item, scoreFinal, position) {
    const prepareIcons = Array.isArray(item.preparo_icones) && item.preparo_icones.length
      ? item.preparo_icones
      : (CATEGORY_PREPARE_ICON_MAP[this.category] || ["panela"]);

    const description = toSafeString(item.descricao_curta || item.notes || "Corte recomendado para o preparo selecionado.");
    const availabilityText = item.disponibilidade ? "Disponivel hoje." : "Baixa disponibilidade.";

    return {
      id: item.id,
      nome: item.nome,
      name: item.nome,
      categoria: this.category,
      page: item.page,
      image: item.image,
      notes: description,
      butcherCut: item.butcherCut,
      factor: Number(item.factor) || 1,
      isBlend: Boolean(item.isBlend),
      score_final: normalizeScore(scoreFinal),
      disponibilidade: Boolean(item.disponibilidade),
      tempo_pressao_min: Number.isFinite(Number(item.tempo_pressao_min)) ? Number(item.tempo_pressao_min) : null,
      tempo_pressao_max: Number.isFinite(Number(item.tempo_pressao_max)) ? Number(item.tempo_pressao_max) : null,
      dica_preparo_desfiar: toSafeString(item.dica_preparo_desfiar || ""),
      preparo_icones: prepareIcons,
      descricao_curta: description,
      ranking_posicao: position,
      libras_hook: {
        key: `ze-${item.id}`,
        text: `Top ${position}: ${item.nome}. ${availabilityText} ${description}`,
        enabled: true
      }
    };
  }

  buildBaseScore(item, preferencePriorities) {
    const scoreByPreference = {
      maciez: item.maciez,
      sabor: item.sabor,
      rapidez: item.rapidez,
      economia: item.economia,
      integridade_fibra: item.integridade_fibra
    };

    return Object.keys(SCORE_WEIGHTS).reduce((acc, key) => {
      const preferenceBoost = 1 + ((preferencePriorities[key] || 0) * 0.35);
      return acc + (SCORE_WEIGHTS[key] * scoreByPreference[key] * preferenceBoost);
    }, 0);
  }

  buildPillarScore(item, preferencePriorities, weights) {
    return Object.keys(weights).reduce((acc, key) => {
      const preferenceBoost = 1 + ((preferencePriorities[key] || 0) * 0.35);
      return acc + (weights[key] * item[key] * preferenceBoost);
    }, 0);
  }

  validateDataItem(item) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const requiredStringKeys = ["id", "nome", "categoria", "descricao_curta"];
    const hasRequiredStrings = requiredStringKeys.every(
      (key) => typeof item[key] === "string" && item[key].trim().length > 0
    );

    if (!hasRequiredStrings || typeof item.disponibilidade !== "boolean") {
      return null;
    }

    const maciez = toNumericScore(item.maciez);
    const sabor = toNumericScore(item.sabor);
    const rapidez = toNumericScore(item.rapidez);
    const economia = toNumericScore(item.economia);
    const integridade_fibra = toNumericScore(item.integridade_fibra);

    if ([maciez, sabor, rapidez, economia, integridade_fibra].some((value) => value === null)) {
      return null;
    }

    return {
      ...item,
      id: toSafeString(item.id),
      nome: toSafeString(item.nome),
      categoria: normalizeText(item.categoria),
      descricao_curta: toSafeString(item.descricao_curta),
      maciez,
      sabor,
      rapidez,
      economia,
      integridade_fibra,
      preparo_icones: Array.isArray(item.preparo_icones)
        ? item.preparo_icones.map((icon) => toSafeString(icon)).filter(Boolean).slice(0, 8)
        : []
    };
  }

  recommend(preferences, data) {
    if (!Array.isArray(data)) {
      throw createRecommendationError(RecommendationErrorCode.INVALID_DATA_SOURCE, "Data source should be an array");
    }

    const preferencePriorities = preferences?.prioridades || createEmptyPriorities();
    const adjustment = clampAdjustment(this.getCategoryAdjustment(preferences));

    const validItems = data
      .map((item) => this.validateDataItem(item))
      .filter(Boolean)
      .filter((item) => this.isEligible(item, preferences));

    if (!validItems.length) {
      throw createRecommendationError(RecommendationErrorCode.NO_VALID_ITEMS, "No valid items for this category");
    }

    const ranked = validItems
      .map((item) => {
        const scoreBase = this.buildBaseScore(item, preferencePriorities);
        const scoreFinal = normalizeScore(scoreBase + adjustment);
        return this.toRecommendationResult(item, scoreFinal, 0);
      })
      .sort((a, b) => {
        if (b.score_final !== a.score_final) {
          return b.score_final - a.score_final;
        }

        if (a.disponibilidade !== b.disponibilidade) {
          return Number(b.disponibilidade) - Number(a.disponibilidade);
        }

        const nameCompare = a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
        if (nameCompare !== 0) {
          return nameCompare;
        }

        return a.id.localeCompare(b.id, "pt-BR", { sensitivity: "base" });
      })
      .slice(0, RESULT_LIMIT)
      .map((item, index) => ({
        ...item,
        ranking_posicao: index + 1,
        libras_hook: {
          ...item.libras_hook,
          text: `Top ${index + 1}: ${item.nome}. ${item.disponibilidade ? "Disponivel hoje." : "Baixa disponibilidade."} ${item.descricao_curta}`
        }
      }));

    return ranked;
  }
}

class PanelaStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("panela");
  }
  getCategoryAdjustment() {
    return 0.12;
  }
}

class PanelaComOssoStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("panelacomosso");
  }
  getCategoryAdjustment() {
    return 0.11;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.panelacomosso);
  }
}

class ChurrascoStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("churrasco");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.sabor ? 0.2 : 0.1;
  }
}

class BifeStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("bife");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.maciez ? 0.18 : 0.08;
  }
}

class BifeARoleStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("bifearole");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.integridade_fibra ? 0.14 : 0.1;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.bifearole);
  }
}

class BifeFritarStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("bifefritar");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.rapidez ? 0.16 : 0.1;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.bifefritar);
  }
}

class MoerStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("moer");
  }
  getCategoryAdjustment() {
    return 0.06;
  }
}

class CarneMoidaStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("carnemoida");
  }
  getCategoryAdjustment() {
    return 0.09;
  }

  buildBaseScore(item, preferencePriorities) {
    const pilares = {
      maciez: item.maciez,
      sabor: item.sabor,
      rapidez: item.rapidez,
      economia: item.economia,
      integridade_fibra: item.integridade_fibra,
      magro: toNumericScore(item.magro) ?? item.integridade_fibra
    };

    const pillarWeights = {
      maciez: 0.08,
      sabor: 0.14,
      rapidez: 0.08,
      economia: 0.34,
      integridade_fibra: 0.14,
      magro: 0.22
    };

    const weightedScore = Object.keys(pillarWeights).reduce((acc, key) => {
      const priorityKey = key === "magro" ? "integridade_fibra" : key;
      const preferenceBoost = 1 + ((preferencePriorities[priorityKey] || 0) * 0.35);
      return acc + (pillarWeights[key] * pilares[key] * preferenceBoost);
    }, 0);

    const officialTop1Boost = item.id === "patinho" ? 0.5 : 0;

    return weightedScore + officialTop1Boost;
  }
}

class DesfiarStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("desfiar");
  }
  getCategoryAdjustment() {
    return 0.12;
  }

  buildBaseScore(item, preferencePriorities) {
    const pilares = {
      rapidez: item.rapidez,
      economia: item.economia,
      sabor: item.sabor,
      magro: toNumericScore(item.magro) ?? item.integridade_fibra
    };

    const pillarWeights = {
      rapidez: 0.22,
      economia: 0.34,
      sabor: 0.24,
      magro: 0.2
    };

    const basePillarScore = Object.keys(pillarWeights).reduce((acc, key) => {
      const priorityKey = key === "magro" ? "integridade_fibra" : key;
      const preferenceBoost = 1 + ((preferencePriorities[priorityKey] || 0) * 0.35);
      return acc + (pillarWeights[key] * pilares[key] * preferenceBoost);
    }, 0);

    const colageno = toNumericScore(item.colageno) ?? item.integridade_fibra;
    const fibraLonga = toNumericScore(item.fibra_longa) ?? item.integridade_fibra;
    const tecnicoBoost = ((colageno * 0.65) + (fibraLonga * 0.35)) / 10;

    return basePillarScore + tecnicoBoost;
  }
}

class HamburguerStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("hamburguer");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.sabor ? 0.15 : 0.1;
  }
}

class HamburguerBlendStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("hamburguerblend");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.sabor ? 0.17 : 0.12;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.hamburguerblend);
  }
}

class ChurrascoSemOssoStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("churrascosemosso");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.sabor ? 0.18 : 0.11;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.churrascosemosso);
  }
}

class FritarComOssoStrategy extends BaseRecommendationStrategy {
  constructor() {
    super("fritarcomosso");
  }
  getCategoryAdjustment(preferences) {
    return preferences?.prioridades?.rapidez ? 0.13 : 0.09;
  }

  buildBaseScore(item, preferencePriorities) {
    return this.buildPillarScore(item, preferencePriorities, CATEGORY_PILLAR_WEIGHTS.fritarcomosso);
  }
}

class StrategyFactory {
  static create(category) {
    const normalizedCategory = normalizeText(category);
    const strategyMap = {
      panela: () => new PanelaStrategy(),
      panelacomosso: () => new PanelaComOssoStrategy(),
      churrasco: () => new ChurrascoStrategy(),
      churrascosemosso: () => new ChurrascoSemOssoStrategy(),
      bife: () => new BifeStrategy(),
      bifearole: () => new BifeARoleStrategy(),
      bifefritar: () => new BifeFritarStrategy(),
      fritarcomosso: () => new FritarComOssoStrategy(),
      moer: () => new MoerStrategy(),
      carnemoida: () => new CarneMoidaStrategy(),
      desfiar: () => new DesfiarStrategy(),
      hamburguer: () => new HamburguerStrategy(),
      hamburguerblend: () => new HamburguerBlendStrategy()
    };

    if (!strategyMap[normalizedCategory]) {
      throw createRecommendationError(RecommendationErrorCode.STRATEGY_NOT_FOUND, normalizedCategory);
    }

    return strategyMap[normalizedCategory]();
  }
}

const buildCarneJsonFallback = () => {
  const list = Object.values(meatCatalog).map((item) => {
    const categorySeed = normalizeText((item.categories || ["panela"])[0] || "panela");
    const factorSeed = Number(item.factor) || 1;
    const baseScore = Math.max(0, Math.min(10, Math.round((5 + (factorSeed - 1) * 10) * 10) / 10));

    return {
      id: item.id,
      nome: item.name,
      categoria: categorySeed,
      maciez: Math.max(0, Math.min(10, baseScore + ((item.priorities || []).includes("maci") ? 1.2 : 0.4))),
      sabor: Math.max(0, Math.min(10, baseScore + ((item.priorities || []).includes("sabor") ? 1.3 : 0.5))),
      rapidez: Math.max(0, Math.min(10, baseScore + ((item.cutHints || []).includes("fino") ? 1.1 : 0.2))),
      economia: Math.max(0, Math.min(10, baseScore + ((item.priorities || []).includes("barat") ? 1.5 : 0.3))),
      integridade_fibra: Math.max(0, Math.min(10, baseScore + (item.fatProfile === "magra" ? 1.4 : 0.4))),
      disponibilidade: true,
      preparo_icones: (item.categories || ["panela"])
        .map((entry) => normalizeText(entry))
        .map((entry) => CATEGORY_PREPARE_ICON_MAP[entry] || [entry])
        .flat()
        .filter((entry, index, arr) => entry && arr.indexOf(entry) === index)
        .slice(0, 4),
      descricao_curta: toSafeString(item.notes || "Corte recomendado para o preparo selecionado."),
      image: item.image,
      page: item.page,
      butcherCut: item.butcherCut,
      factor: factorSeed
    };
  });

  return list;
};

let carnesDataCache = null;

const loadCarnesData = async () => {
  if (Array.isArray(carnesDataCache) && carnesDataCache.length) {
    return carnesDataCache;
  }

  const dataPath = resolveFrontendAssetPath("data/carnes.json");

  try {
    const response = await fetch(dataPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const parsed = await response.json();
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid schema");
    }

    carnesDataCache = parsed;

    if ("caches" in window) {
      try {
        const cache = await caches.open("carnecerta-v1-data");
        await cache.put("carnecerta:data:carnes", new Response(JSON.stringify(parsed), {
          headers: { "Content-Type": "application/json" }
        }));
      } catch (error) {
        console.warn("Falha ao armazenar carnes.json em cache:", error);
      }
    }

    return carnesDataCache;
  } catch (error) {
    if ("caches" in window) {
      try {
        const cache = await caches.open("carnecerta-v1-data");
        const cachedResponse = await cache.match("carnecerta:data:carnes");
        if (cachedResponse) {
          const cached = await cachedResponse.json();
          if (Array.isArray(cached)) {
            carnesDataCache = cached;
            return carnesDataCache;
          }
        }
      } catch (cacheError) {
        console.warn("Falha ao recuperar cache de carnes.json:", cacheError);
      }
    }

    carnesDataCache = buildCarneJsonFallback();
    return carnesDataCache;
  }
};

const buildRecommendationPreferences = (category, selected, effectiveCategory) => ({
  categoria: effectiveCategory,
  prioridades: resolveCategoryPreferencePriorities(effectiveCategory, selected),
  filtrosBusca: {
    termo: category === effectiveCategory ? category : "",
    somenteDisponiveis: false
  }
});

const filterDataByCandidates = (effectiveCategory, data) => {
  const normalizedCategory = normalizeText(effectiveCategory);
  const candidateIds = categoryCandidates[normalizedCategory] || [];

  if (!candidateIds.length) {
    return data.filter((item) => normalizeText(item.categoria) === normalizedCategory);
  }

  return data.filter((item) => candidateIds.includes(item.id));
};

const persistOfflineTicketSnapshot = (ticketPayload) => {
  try {
    localStorage.setItem(
      TOP3_STORAGE_KEY,
      JSON.stringify({
        cache_version: "v1",
        savedAt: new Date().toISOString(),
        ...ticketPayload
      })
    );
  } catch (error) {
    console.warn("Nao foi possivel persistir ticket offline:", error);
  }
};

const loadOfflineTicketSnapshot = () => {
  try {
    const raw = localStorage.getItem(TOP3_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.recommendations)) {
      return null;
    }

    if (!parsed.recommendations.length) {
      return null;
    }

    const snapshotTime = Date.parse(parsed.savedAt || "");
    if (Number.isFinite(snapshotTime)) {
      const maxAgeMs = 6 * 60 * 60 * 1000;
      if (Date.now() - snapshotTime > maxAgeMs) {
        return null;
      }
    }

    return parsed;
  } catch (error) {
    return null;
  }
};

const dispatchZeDescribeCut = (payload) => {
  const eventPayload = {
    ticketId: payload.ticketId,
    rank: payload.rank,
    corteId: payload.corteId,
    nome: payload.nome,
    disponibilidade: Boolean(payload.disponibilidade),
    descricaoCurta: payload.descricaoCurta,
    preparo: payload.preparo,
    textoNarracao: payload.textoNarracao
  };

  window.dispatchEvent(new CustomEvent("ze:describe-cut", { detail: eventPayload }));
};

const getTopRecommendations = async (category, selected) => {
  const effectiveCategory = pickEffectiveCategory(category, selected);
  const preferences = buildRecommendationPreferences(category, selected, effectiveCategory);

  let safeFilters;
  try {
    safeFilters = sanitizeSearchFilters(preferences.filtrosBusca);
  } catch (error) {
    throw createRecommendationError(RecommendationErrorCode.SANITIZATION_BLOCKED, error.message);
  }

  const data = await loadCarnesData();
  const filteredData = filterDataByCandidates(effectiveCategory, data)
    .filter((item) => {
      if (safeFilters.somenteDisponiveis) {
        return Boolean(item.disponibilidade);
      }
      return true;
    })
    .filter((item) => {
      if (!safeFilters.termo) {
        return true;
      }

      const haystack = `${toSafeString(item.nome)} ${toSafeString(item.categoria)} ${toSafeString(item.descricao_curta)}`.toLowerCase();
      return haystack.includes(safeFilters.termo.toLowerCase());
    });

  const strategy = StrategyFactory.create(effectiveCategory);
  const recommendations = strategy.recommend(preferences, filteredData);

  return {
    effectiveCategory,
    list: recommendations
  };
};

const pickEffectiveCategory = (category, selected) => {
  const normalizedUsecase = normalizeText(selected.usecase || "");
  const normalizedBifeType = normalizeText(selected.bifetype || "");

  if (category === "panela" && (normalizedUsecase.includes("osso") || normalizedUsecase.includes("com osso"))) {
    return "panelacomosso";
  }

  if (category === "bife" && (normalizedBifeType.includes("fritar") || normalizedUsecase.includes("fritar"))) {
    return "bifefritar";
  }

  if (category === "churrasco" && normalizedUsecase.includes("sem osso")) {
    return "churrascosemosso";
  }

  if (category === "churrasco" && (normalizedUsecase.includes("fritar") || normalizedUsecase.includes("com osso"))) {
    return "fritarcomosso";
  }

  if (category === "moer") {
    return "carnemoida";
  }

  if (category === "hamburguer" && (selected.mix || "").includes("sim")) {
    return "hamburguerblend";
  }

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

const extractGrindTimes = (textValue) => {
  const digits = (normalizeText(textValue).match(/\d+/g) || []).map(Number);
  return digits[0] || 1;
};

const getButcherInstruction = (meat, quantityKg, selected, effectiveCategory) => {
  const cutPreference = selected.cutPreferenceRaw || "corte padrão";
  const grindTimes = extractGrindTimes(selected.grindRaw || "1x");
  const displayName = meat.nome || meat.name || "corte selecionado";

  if (effectiveCategory === "panela") {
    return `Quero ${quantityKg} kg de ${displayName}, em ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "bife") {
    return `Quero ${quantityKg} kg de ${displayName}, em bifes ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "churrasco") {
    return `Quero ${quantityKg} kg de ${displayName}, em cortes ${cutPreference.toLowerCase()} para churrasco.`;
  }

  if (effectiveCategory === "desfiar") {
    const tempoPressao = Number(meat.tempo_pressao_min);
    const tempoPressaoMax = Number(meat.tempo_pressao_max);
    const tempoTexto = Number.isFinite(tempoPressao) && Number.isFinite(tempoPressaoMax)
      ? `na pressao por ${tempoPressao}-${tempoPressaoMax} min`
      : Number.isFinite(tempoPressao)
        ? `na pressao por ${tempoPressao} min`
        : "na pressao";

    return `Quero ${quantityKg} kg de ${displayName}, ${cutPreference.toLowerCase()} para cozinhar e desfiar ${tempoTexto}.`;
  }

  if (effectiveCategory === "moer") {
    return `Quero ${quantityKg} kg de ${displayName}, moendo ${grindTimes}x e com perfil ${cutPreference.toLowerCase()}.`;
  }

  if (effectiveCategory === "hamburguer") {
    const blendText = meat.isBlend ? `${meat.butcherCut}, ` : "";
    return `Quero ${quantityKg} kg para hambúrguer, ${blendText}moendo ${grindTimes}x.`;
  }

  return `Quero ${quantityKg} kg de ${displayName}, ${meat.butcherCut}.`;
};

const ensureDesfiarTicketTip = (rawTip) => {
  const baseTip = toSafeString(rawTip);
  const normalizedBaseTip = normalizeText(baseTip);
  const chunks = [];

  if (baseTip) {
    chunks.push(baseTip.replace(/[.;,\s]+$/g, ""));
  }

  if (!normalizedBaseTip.includes("selar antes")) {
    chunks.push("selar antes da pressao");
  }

  if (!normalizedBaseTip.includes("desfiar quente")) {
    chunks.push("desfiar quente com dois garfos");
  }

  return `${chunks.join("; ")}.`;
};

const renderFinalInstruction = (section, meat, quantityKg, peopleCount, category, selected, effectiveCategory) => {
  const displayName = meat.nome || meat.name || "corte selecionado";
  const displayNotes = meat.descricao_curta || meat.notes || "Corte recomendado para seu preparo.";
  const qrPayload = `CarneCerta|categoria:${selected.categoryFilter.termo || effectiveCategory}|corte:${displayName}|qtd:${quantityKg}kg|pessoas:${peopleCount}|prioridade:${selected.priority}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrPayload)}`;
  const butcherInstruction = getButcherInstruction(meat, quantityKg, selected, effectiveCategory);
  const meatImage = getDisplayImage(meat, effectiveCategory);
  const safeMeatName = escapeHtml(displayName);
  const safeButcherInstruction = escapeHtml(butcherInstruction);
  const safeNotes = escapeHtml(displayNotes);
  const safePriority = escapeHtml(selected.priority);
  const safeQuantity = escapeHtml(quantityKg);
  const safePage = escapeHtml(meat.page || "#");
  const safeImage = escapeHtml(meatImage);
  const safeQrSrc = escapeHtml(qrSrc);

  section.innerHTML = `
    <div class="results-header">
      <h2>Escolha final confirmada</h2>
      <p>Use o texto abaixo para pedir no acougue e garantir a quantidade certa.</p>
    </div>

    <article class="final-choice-card">
      <img src="${safeImage}" alt="${safeMeatName}" class="final-choice-image">
      <div class="final-choice-content">
        <h3>${safeMeatName}</h3>
        <p><strong>Quantidade recomendada:</strong> ${safeQuantity} kg para ${peopleCount} pessoas.</p>
        <p><strong>Como pedir ao acougueiro:</strong> "${safeButcherInstruction}"</p>
        <p><strong>Dica de preparo:</strong> ${safeNotes}</p>
        <p class="final-note">Essa sugestao foi calculada para ${peopleCount} pessoas e prioriza: ${safePriority}.</p>
        <a class="details-link" href="${safePage}">Ver pagina completa do corte</a>
      </div>
    </article>

    <article class="qr-card">
      <div>
        <h3>QR Code da sua escolha</h3>
        <p>Mostre esse QR Code no acougue para facilitar o pedido, salvar no celular ou compartilhar com quem vai comprar.</p>
      </div>
      <img src="${safeQrSrc}" alt="QR Code da recomendacao" class="qr-image">
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
    const offlineSnapshot = loadOfflineTicketSnapshot();
    if (!navigator.onLine && offlineSnapshot && offlineSnapshot.recommendations.length) {
      renderRecommendations(
        section,
        offlineSnapshot.recommendations,
        offlineSnapshot.category || category,
        selected,
        offlineSnapshot.effectiveCategory || effectiveCategory
      );
      const statusNode = section.querySelector(".ticket-status");
      if (statusNode) {
        statusNode.insertAdjacentHTML(
          "afterbegin",
          `<p class="ticket-offline-hint">Ultimo ticket disponivel offline (${escapeHtml(offlineSnapshot.savedAt || "sem timestamp")}).</p>`
        );
      }
      return;
    }

    section.innerHTML = `
      <div class="results-header">
        <h2>Sem recomendacoes no momento</h2>
        <p>${!navigator.onLine ? "Voce esta sem internet e ainda nao ha ticket salvo neste dispositivo." : "Nao encontramos cortes com os criterios atuais. Ajuste os filtros para continuar."}</p>
      </div>
    `;
    return;
  }

  const peopleCount = parsePeopleCount(selected.peopleRaw);
  const ticketId = `cc-${Date.now()}`;

  persistOfflineTicketSnapshot({
    ticketId,
    category,
    effectiveCategory,
    recommendations
  });

  const cardsMarkup = recommendations
    .map((meat) => {
      const quantityKg = calculateQuantityKg(effectiveCategory, peopleCount, meat.factor || 1);
      const meatImage = getDisplayImage(meat, effectiveCategory);
      const safeMeatId = escapeHtml(meat.id);
      const safeMeatImage = escapeHtml(meatImage);
      const safeMeatName = escapeHtml(meat.nome || meat.name);
      const safeMeatNotes = escapeHtml(meat.descricao_curta || meat.notes || "Corte recomendado para seu preparo.");
      const safeQuantity = escapeHtml(quantityKg);
      const safeCategory = escapeHtml(category);
      const safeEffectiveCategory = escapeHtml(effectiveCategory);
      const iconTokens = (meat.preparo_icones || []).slice(0, 4);
      const remainingIcons = Math.max(0, (meat.preparo_icones || []).length - iconTokens.length);
      const iconsMarkup = iconTokens
        .map((iconId) => {
          const safeIconId = escapeHtml(iconId);
          const iconLabel = escapeHtml(PREPARE_ICON_LABELS[iconId] || "Preparo");
          const iconEmoji = escapeHtml(PREPARE_ICON_EMOJI[iconId] || "🥩");
          return `<span class="ticket-icon-chip" aria-label="${iconLabel}">${iconEmoji} ${iconLabel}</span>`;
        })
        .join("");

      const ticketStatus = meat.disponibilidade ? "Disponivel hoje" : "Baixa disponibilidade";
      const safeTicketStatus = escapeHtml(ticketStatus);
      const safeScore = escapeHtml(String(meat.score_final || 0));
      const rank = Number(meat.ranking_posicao) || 1;
      const pressureMin = Number(meat.tempo_pressao_min);
      const pressureMax = Number(meat.tempo_pressao_max);
      const hasPressureRange = Number.isFinite(pressureMin) && Number.isFinite(pressureMax);
      const hasPressureSingle = Number.isFinite(pressureMin) && !Number.isFinite(pressureMax);
      const pressureHint = hasPressureRange
        ? `${pressureMin}-${pressureMax} min de pressao`
        : hasPressureSingle
          ? `${pressureMin} min de pressao`
          : "tempo de pressao sob orientacao do preparo";
      const technicalTip = ensureDesfiarTicketTip(
        meat.dica_preparo_desfiar ||
        "Para desfiar melhor: selar antes da pressao e desfiar quente com dois garfos"
      );
      const safePressureHint = escapeHtml(pressureHint);
      const safeTechnicalTip = escapeHtml(technicalTip);

      return `
        <article class="result-card" data-meat-id="${safeMeatId}">
          <img src="${safeMeatImage}" alt="${safeMeatName}" class="result-image">
          <div class="result-content">
            <div class="ticket-rank-line">
              <span class="ticket-rank-badge" aria-label="Top ${rank}">Top ${rank}</span>
              <span class="ticket-status">${safeTicketStatus}</span>
            </div>
            <h3>${safeMeatName}</h3>
            <p>${safeMeatNotes}</p>
            <p><strong>Score final:</strong> ${safeScore}</p>
            <p><strong>Quantidade:</strong> ${safeQuantity} kg</p>
            ${effectiveCategory === "desfiar" ? `<p><strong>Pressao:</strong> ${safePressureHint}</p><p><strong>Dica tecnica:</strong> ${safeTechnicalTip}</p>` : ""}
            <div class="ticket-icons" aria-label="Icones de preparo">${iconsMarkup}${remainingIcons > 0 ? `<span class="ticket-icon-chip">+${remainingIcons}</span>` : ""}</div>
            <button
              class="result-libras-btn"
              type="button"
              data-action="ze"
              data-ticket-id="${escapeHtml(ticketId)}"
              data-rank="${rank}"
              data-meat-id="${safeMeatId}"
            >
              Descrever em Libras
            </button>
            <button
              class="result-select-btn"
              type="button"
              data-meat-id="${safeMeatId}"
              data-quantity="${safeQuantity}"
              data-people="${peopleCount}"
              data-category="${safeCategory}"
              data-effective-category="${safeEffectiveCategory}"
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
      <h2>Seu Ticket CarneCerta</h2>
      <p>Top 3 cortes recomendados para hoje.</p>
      ${effectiveCategory === "hamburguerblend" ? "<p><strong>Sugestoes de blend 80/20:</strong> Blend Classico Acem + Peito e Blend Sabor Fraldinha + Acem.</p>" : ""}
    </div>
    <div class="ticket-status" aria-live="polite"></div>
    <div class="results-grid">${cardsMarkup}</div>
  `;

  const zeButtons = section.querySelectorAll(".result-libras-btn[data-action='ze']");
  zeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const meatId = button.dataset.meatId || "";
      const rank = Number(button.dataset.rank || "1");
      const meat = recommendations.find((item) => item.id === meatId);
      const statusNode = section.querySelector(".ticket-status");

      if (!meat) {
        return;
      }

      if (statusNode) {
        statusNode.textContent = "Enviando para o avatar Ze...";
      }

      dispatchZeDescribeCut({
        ticketId: button.dataset.ticketId || "",
        rank,
        corteId: meat.id,
        nome: meat.nome || meat.name || "",
        disponibilidade: meat.disponibilidade,
        descricaoCurta: meat.descricao_curta || meat.notes || "",
        preparo: meat.preparo_icones || [],
        textoNarracao: meat.libras_hook?.text || ""
      });

      if (statusNode) {
        statusNode.textContent = "Descricao enviada para o avatar Ze.";
      }
    });
  });

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
  button.addEventListener("click", async () => {
    const category = button.dataset.category;
    const selectedRaw = {
      priorityRaw: getSelectedQuestionText("priority", "nao informada"),
      cutPreferenceRaw: getSelectedQuestionText("cutpreference", "corte padrao"),
      peopleRaw: getSelectedQuestionText("people", "3-4"),
      mixRaw: getSelectedQuestionText("mix", "nao"),
      mixProfileRaw: getSelectedQuestionText("mixprofile", "equilibrado"),
      grindRaw: getSelectedQuestionText("grind", "1x"),
      usecaseRaw: getSelectedQuestionText("usecase", "panela"),
      bifetypeRaw: getSelectedQuestionText("bifetype", "normal")
    };

    const section = getResultSection();
    if (!section || !category) {
      return;
    }

    let selected;
    try {
      const categoryFilter = sanitizeSearchFilters({
        termo: category,
        somenteDisponiveis: false
      });

      selected = {
        ...sanitizeRecommendationInputs(selectedRaw),
        categoryFilter
      };
    } catch (error) {
      section.innerHTML = `
        <div class="results-header">
          <h2>Entrada invalida para recomendacao</h2>
          <p>Revise os filtros escolhidos e tente novamente.</p>
        </div>
      `;
      return;
    }

    try {
      const recommendationData = await getTopRecommendations(selected.categoryFilter.termo || category, selected);
      const recommendations = recommendationData.list || [];
      const effectiveCategory = recommendationData.effectiveCategory || category;

      renderRecommendations(
        section,
        recommendations,
        category,
        selected,
        effectiveCategory
      );
    } catch (error) {
      const fallbackSnapshot = loadOfflineTicketSnapshot();
      if (!navigator.onLine && fallbackSnapshot) {
        renderRecommendations(
          section,
          fallbackSnapshot.recommendations,
          fallbackSnapshot.category || category,
          selected,
          fallbackSnapshot.effectiveCategory || category
        );
        return;
      }

      const safeErrorCode = escapeHtml(error.code || RecommendationErrorCode.INVALID_DATA_SOURCE);
      section.innerHTML = `
        <div class="results-header" aria-live="assertive">
          <h2>Nao foi possivel gerar seu ticket</h2>
          <p>Ocorreu uma falha temporaria. Tente novamente em instantes.</p>
          <p><strong>Codigo de suporte:</strong> CC-TICKET-01 (${safeErrorCode})</p>
        </div>
      `;
    }
  });
});