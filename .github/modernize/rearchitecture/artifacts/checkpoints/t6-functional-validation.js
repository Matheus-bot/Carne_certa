const { execSync } = require("child_process");
const fs = require("fs");

const scriptSource = fs.readFileSync("frontend/script.js", "utf8");
const smokeRaw = execSync("node .github/modernize/rearchitecture/artifacts/checkpoints/t5.5-frontend-smoke.js", {
  encoding: "utf8"
});
const smoke = JSON.parse(smokeRaw);

const byKey = Object.fromEntries((smoke.checks || []).map((entry) => [entry.key, entry]));
const results = [];

const expectedTop1 = {
  bifearole: "coxaoduro",
  bifefritar: "contrafile",
  churrascosemosso: "picanha",
  fritarcomosso: "bistecadocontrafile",
  carnemoida: "patinho",
  panelacomosso: "costela"
};

for (const [key, expected] of Object.entries(expectedTop1)) {
  const actual = byKey[key]?.top3?.[0]?.id || null;
  results.push({
    check: `Top1 oficial ${key}`,
    pass: actual === expected,
    expected,
    actual
  });
}

const top3Always = (smoke.checks || []).every((entry) => Array.isArray(entry.top3) && entry.top3.length === 3);
results.push({
  check: "Retorno sempre Top 3",
  pass: top3Always,
  expected: "3 itens por categoria",
  actual: (smoke.checks || []).map((entry) => `${entry.key}:${(entry.top3 || []).length}`).join(", ")
});

const tieOrder = (smoke.syntheticTie || []).map((item) => item.id).join(" > ");
const tieOk = tieOrder === "tie-true > tie-false";
results.push({
  check: "Desempate por disponibilidade=true",
  pass: tieOk,
  expected: "tie-true > tie-false",
  actual: tieOrder || "n/a"
});

results.push({
  check: "Panela sem regressao (Top1 Acem)",
  pass: byKey.panela?.top3?.[0]?.id === "acem",
  expected: "acem",
  actual: byKey.panela?.top3?.[0]?.id || null
});

results.push({
  check: "Desfiar sem regressao (Top1 Coxao Duro)",
  pass: byKey.desfiar?.top3?.[0]?.id === "coxaoduro",
  expected: "coxaoduro",
  actual: byKey.desfiar?.top3?.[0]?.id || null
});

const parseObjectLiteral = (name) => {
  const marker = `const ${name} = `;
  const start = scriptSource.indexOf(marker);
  if (start < 0) {
    return null;
  }

  const source = scriptSource.slice(start + marker.length);
  const end = source.indexOf("};");
  if (end < 0) {
    return null;
  }

  const objectBody = source.slice(0, end + 1);
  return Function(`"use strict"; return (${objectBody});`)();
};

const scoreWeights = parseObjectLiteral("SCORE_WEIGHTS") || {};
const topGlobal = Object.entries(scoreWeights).sort((a, b) => b[1] - a[1])[0] || [null, null];
results.push({
  check: "Economia dominante (peso global)",
  pass: topGlobal[0] === "economia",
  expected: "economia",
  actual: `${topGlobal[0]}:${topGlobal[1]}`
});

const categoryPillarWeights = parseObjectLiteral("CATEGORY_PILLAR_WEIGHTS") || {};
const economyDominantCategories = [
  "panelacomosso",
  "bifearole",
  "bifefritar",
  "churrascosemosso",
  "fritarcomosso",
  "carnemoida",
  "hamburguerblend"
];

for (const category of economyDominantCategories) {
  const weights = categoryPillarWeights[category] || {};
  const topWeight = Object.entries(weights).sort((a, b) => b[1] - a[1])[0] || [null, null];
  results.push({
    check: `Economia dominante (${category})`,
    pass: topWeight[0] === "economia",
    expected: "economia",
    actual: `${topWeight[0]}:${topWeight[1]}`
  });
}

const output = {
  generatedAt: new Date().toISOString(),
  overallPass: results.every((entry) => entry.pass),
  results
};

console.log(JSON.stringify(output, null, 2));
