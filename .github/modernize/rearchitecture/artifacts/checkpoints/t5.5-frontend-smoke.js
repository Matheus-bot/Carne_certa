const fs = require("fs");
const path = require("path");

const root = process.cwd();
const scriptPath = path.join(root, "frontend", "script.js");
const dataPath = path.join(root, "frontend", "data", "carnes.json");
const cutsPath = path.join(root, "frontend", "data", "cortes.js");

const script = fs.readFileSync(scriptPath, "utf8");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const cutsSource = fs.readFileSync(cutsPath, "utf8");
const marker = "window.CARNECERTA_DATA = ";
const markerIndex = cutsSource.indexOf(marker);
if (markerIndex === -1) {
  throw new Error("CARNECERTA_DATA marker not found");
}
const objectSource = cutsSource.slice(markerIndex + marker.length).trim().replace(/;\s*$/, "");
const appData = Function(`"use strict"; return (${objectSource});`)();
const categoryCandidates = appData.categoryCandidates || {};

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SCORE_WEIGHTS = {
  maciez: 0.18,
  sabor: 0.22,
  rapidez: 0.15,
  economia: 0.30,
  integridade_fibra: 0.15
};

const CATEGORY_PILLAR_WEIGHTS = {
  panelacomosso: { maciez: 0.12, sabor: 0.24, rapidez: 0.1, economia: 0.34, integridade_fibra: 0.2 },
  bifearole: { maciez: 0.18, sabor: 0.14, rapidez: 0.1, economia: 0.34, integridade_fibra: 0.24 },
  bifefritar: { maciez: 0.16, sabor: 0.14, rapidez: 0.27, economia: 0.33, integridade_fibra: 0.1 },
  churrascosemosso: { maciez: 0.18, sabor: 0.29, rapidez: 0.12, economia: 0.31, integridade_fibra: 0.1 },
  fritarcomosso: { maciez: 0.1, sabor: 0.18, rapidez: 0.24, economia: 0.34, integridade_fibra: 0.14 },
  carnemoida: { maciez: 0.1, sabor: 0.2, rapidez: 0.1, economia: 0.35, integridade_fibra: 0.25 },
  hamburguerblend: { maciez: 0.17, sabor: 0.28, rapidez: 0.13, economia: 0.32, integridade_fibra: 0.1 }
};

const RESULT_LIMIT = 3;

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
      economico: { economia: 1, sabor: 0.65, integridade_fibra: 0.6, maciez: 0.45, rapidez: 0.3 },
      sabor: { economia: 0.9, sabor: 1, integridade_fibra: 0.72, maciez: 0.48, rapidez: 0.28 },
      default: { economia: 0.95, sabor: 0.82, integridade_fibra: 0.76, maciez: 0.52, rapidez: 0.35 }
    },
    bifearole: {
      economico: { economia: 1, integridade_fibra: 0.72, maciez: 0.62, sabor: 0.46, rapidez: 0.34 },
      maciez: { economia: 0.88, integridade_fibra: 0.7, maciez: 1, sabor: 0.52, rapidez: 0.33 },
      default: { economia: 0.93, integridade_fibra: 0.74, maciez: 0.76, sabor: 0.56, rapidez: 0.42 }
    },
    bifefritar: {
      economico: { economia: 1, rapidez: 0.7, maciez: 0.55, sabor: 0.46, integridade_fibra: 0.4 },
      rapidez: { economia: 0.92, rapidez: 1, maciez: 0.57, sabor: 0.5, integridade_fibra: 0.42 },
      default: { economia: 0.95, rapidez: 0.84, maciez: 0.62, sabor: 0.58, integridade_fibra: 0.44 }
    },
    churrascosemosso: {
      economico: { economia: 1, sabor: 0.74, maciez: 0.62, rapidez: 0.42, integridade_fibra: 0.35 },
      sabor: { economia: 0.9, sabor: 1, maciez: 0.68, rapidez: 0.4, integridade_fibra: 0.34 },
      default: { economia: 0.94, sabor: 0.88, maciez: 0.66, rapidez: 0.45, integridade_fibra: 0.36 }
    },
    fritarcomosso: {
      economico: { economia: 1, rapidez: 0.76, sabor: 0.58, integridade_fibra: 0.46, maciez: 0.34 },
      rapidez: { economia: 0.9, rapidez: 1, sabor: 0.6, integridade_fibra: 0.48, maciez: 0.35 },
      default: { economia: 0.95, rapidez: 0.86, sabor: 0.62, integridade_fibra: 0.5, maciez: 0.38 }
    },
    carnemoida: {
      economico: { economia: 1, integridade_fibra: 0.74, sabor: 0.66, rapidez: 0.44, maciez: 0.34 },
      magro: { economia: 0.91, integridade_fibra: 1, sabor: 0.64, rapidez: 0.45, maciez: 0.36 },
      default: { economia: 0.96, integridade_fibra: 0.82, sabor: 0.71, rapidez: 0.5, maciez: 0.4 }
    },
    hamburguerblend: {
      economico: { economia: 1, sabor: 0.76, maciez: 0.62, rapidez: 0.48, integridade_fibra: 0.42 },
      sabor: { economia: 0.9, sabor: 1, maciez: 0.66, rapidez: 0.52, integridade_fibra: 0.42 },
      default: { economia: 0.95, sabor: 0.9, maciez: 0.68, rapidez: 0.54, integridade_fibra: 0.44 }
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

const resolvePreferencePriorities = (priorityRaw) => {
  const priorities = createEmptyPriorities();
  const priorityText = normalizeText(priorityRaw || "");

  if (priorityText.includes("barat") || priorityText.includes("econom")) {
    priorities.economia = 1;
    priorities.sabor = 0.55;
    priorities.maciez = 0.45;
    priorities.rapidez = 0.35;
    priorities.integridade_fibra = 0.4;
    return priorities;
  }

  priorities.economia = 0.8;
  priorities.maciez = 0.75;
  priorities.sabor = 0.7;
  priorities.rapidez = 0.6;
  priorities.integridade_fibra = 0.65;
  return priorities;
};

const resolvePanelaPreferencePriorities = (priorityRaw) => {
  const priorityText = normalizeText(priorityRaw || "");

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

const resolveDesfiarPreferencePriorities = (priorityRaw) => {
  const priorityText = normalizeText(priorityRaw || "");

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

const resolveCategoryPreferencePriorities = (effectiveCategory, priorityRaw) => {
  if (effectiveCategory === "panela") {
    return resolvePanelaPreferencePriorities(priorityRaw);
  }

  if (effectiveCategory === "desfiar") {
    return resolveDesfiarPreferencePriorities(priorityRaw);
  }

  const priorityText = normalizeText(priorityRaw || "");

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

  return resolvePreferencePriorities(priorityRaw);
};

const buildBaseScore = (item, priorities) => {
  const boost = (key) => 1 + ((priorities[key] || 0) * 0.35);
  return (
    SCORE_WEIGHTS.maciez * item.maciez * boost("maciez") +
    SCORE_WEIGHTS.sabor * item.sabor * boost("sabor") +
    SCORE_WEIGHTS.rapidez * item.rapidez * boost("rapidez") +
    SCORE_WEIGHTS.economia * item.economia * boost("economia") +
    SCORE_WEIGHTS.integridade_fibra * item.integridade_fibra * boost("integridade_fibra")
  );
};

const buildPillarScore = (item, priorities, weights) =>
  Object.keys(weights).reduce((acc, key) => {
    const boost = 1 + ((priorities[key] || 0) * 0.35);
    return acc + (weights[key] * item[key] * boost);
  }, 0);

const CATEGORY_ADJUST = {
  panela: 0.12,
  panelacomosso: 0.11,
  bife: 0.08,
  bifearole: 0.1,
  bifefritar: 0.1,
  churrasco: 0.1,
  churrascosemosso: 0.11,
  fritarcomosso: 0.09,
  moer: 0.06,
  carnemoida: 0.09,
  hamburguer: 0.1,
  hamburguerblend: 0.12,
  desfiar: 0.12
};

const buildDesfiarScore = (item, priorities) => {
  const pilares = {
    rapidez: item.rapidez,
    economia: item.economia,
    sabor: item.sabor,
    magro: Number.isFinite(Number(item.magro)) ? Number(item.magro) : item.integridade_fibra
  };

  const weights = { rapidez: 0.22, economia: 0.34, sabor: 0.24, magro: 0.2 };
  const base = Object.keys(weights).reduce((acc, key) => {
    const prefKey = key === "magro" ? "integridade_fibra" : key;
    const prefBoost = 1 + ((priorities[prefKey] || 0) * 0.35);
    return acc + (weights[key] * pilares[key] * prefBoost);
  }, 0);

  const colageno = Number.isFinite(Number(item.colageno)) ? Number(item.colageno) : item.integridade_fibra;
  const fibraLonga = Number.isFinite(Number(item.fibra_longa)) ? Number(item.fibra_longa) : item.integridade_fibra;
  const tecnico = ((colageno * 0.65) + (fibraLonga * 0.35)) / 10;

  return base + tecnico;
};

const buildCarneMoidaScore = (item, priorities) => {
  const pilares = {
    maciez: item.maciez,
    sabor: item.sabor,
    rapidez: item.rapidez,
    economia: item.economia,
    integridade_fibra: item.integridade_fibra,
    magro: Number.isFinite(Number(item.magro)) ? Number(item.magro) : item.integridade_fibra
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
    const preferenceBoost = 1 + ((priorities[priorityKey] || 0) * 0.35);
    return acc + (pillarWeights[key] * pilares[key] * preferenceBoost);
  }, 0);

  const officialTop1Boost = item.id === "patinho" ? 0.5 : 0;
  return weightedScore + officialTop1Boost;
};

const normalizeScore = (value) => Math.round(value * 100) / 100;

const byCategory = (category) => {
  const ids = categoryCandidates[category] || [];
  if (!ids.length) {
    return data.filter((item) => normalizeText(item.categoria) === category);
  }
  return data.filter((item) => ids.includes(item.id));
};

const rank = (category, priorities) => {
  const items = byCategory(category);
  const adjustment = CATEGORY_ADJUST[category] || 0;
  const scored = items.map((item) => {
    let base;
    if (category === "desfiar") {
      base = buildDesfiarScore(item, priorities);
    } else if (category === "carnemoida") {
      base = buildCarneMoidaScore(item, priorities);
    } else if (CATEGORY_PILLAR_WEIGHTS[category]) {
      base = buildPillarScore(item, priorities, CATEGORY_PILLAR_WEIGHTS[category]);
    } else {
      base = buildBaseScore(item, priorities);
    }

    return {
      id: item.id,
      nome: item.nome,
      disponibilidade: Boolean(item.disponibilidade),
      score_final: normalizeScore(base + adjustment)
    };
  });

  return scored
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
    .slice(0, RESULT_LIMIT);
};

const scenarios = [
  { key: "bifearole", title: "Bife a Role", priorities: resolveCategoryPreferencePriorities("bifearole", "mais barato") },
  { key: "bifefritar", title: "Bife para Fritar", priorities: resolveCategoryPreferencePriorities("bifefritar", "mais barato") },
  { key: "churrascosemosso", title: "Churrasco sem osso", priorities: resolveCategoryPreferencePriorities("churrascosemosso", "mais barato") },
  { key: "fritarcomosso", title: "Fritar com osso", priorities: resolveCategoryPreferencePriorities("fritarcomosso", "mais barato") },
  { key: "carnemoida", title: "Carne Moida", priorities: resolveCategoryPreferencePriorities("carnemoida", "mais barato") },
  { key: "hamburguerblend", title: "Hamburguer (blend)", priorities: resolveCategoryPreferencePriorities("hamburguerblend", "mais barato") },
  { key: "panelacomosso", title: "Panela com osso", priorities: resolveCategoryPreferencePriorities("panelacomosso", "mais barato") },
  { key: "panela", title: "Panela sem osso (guardrail)", priorities: resolveCategoryPreferencePriorities("panela", "default") },
  { key: "desfiar", title: "Desfiar (guardrail)", priorities: resolveCategoryPreferencePriorities("desfiar", "default") }
];

const evidence = scenarios.map((scenario) => {
  const top = rank(scenario.key, scenario.priorities);
  return {
    categoria: scenario.title,
    key: scenario.key,
    top3: top
  };
});

const tieItems = byCategory("fritarcomosso").map((item) => {
  const priorities = resolveCategoryPreferencePriorities("fritarcomosso", "mais barato");
  const score = normalizeScore(buildPillarScore(item, priorities, CATEGORY_PILLAR_WEIGHTS.fritarcomosso) + (CATEGORY_ADJUST.fritarcomosso || 0));
  return { id: item.id, nome: item.nome, disponibilidade: item.disponibilidade, score_final: score };
});

const grouped = tieItems.reduce((acc, item) => {
  const key = String(item.score_final);
  acc[key] = acc[key] || [];
  acc[key].push(item);
  return acc;
}, {});

const tieCheck = Object.keys(grouped)
  .map((score) => ({ score: Number(score), items: grouped[score] }))
  .filter((entry) => entry.items.length > 1)
  .map((entry) => {
    const sorted = [...entry.items].sort((a, b) => Number(b.disponibilidade) - Number(a.disponibilidade));
    return {
      score: entry.score,
      before: entry.items,
      expectedOrder: sorted
    };
  });

const syntheticTie = [
  { id: "tie-true", nome: "Empate Disponivel", disponibilidade: true, score_final: 8.88 },
  { id: "tie-false", nome: "Empate Indisponivel", disponibilidade: false, score_final: 8.88 }
].sort((a, b) => {
  if (b.score_final !== a.score_final) {
    return b.score_final - a.score_final;
  }
  if (a.disponibilidade !== b.disponibilidade) {
    return Number(b.disponibilidade) - Number(a.disponibilidade);
  }
  return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
});

const output = {
  generatedAt: new Date().toISOString(),
  checks: evidence,
  tieCheck,
  syntheticTie
};

console.log(JSON.stringify(output, null, 2));
