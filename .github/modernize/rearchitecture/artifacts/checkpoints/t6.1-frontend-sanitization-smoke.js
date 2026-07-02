const fs = require("fs");
const path = require("path");

const root = process.cwd();
const scriptPath = path.join(root, "frontend", "script.js");
const smokePath = path.join(
  root,
  ".github",
  "modernize",
  "rearchitecture",
  "artifacts",
  "checkpoints",
  "t5.5-frontend-smoke.js"
);

const script = fs.readFileSync(scriptPath, "utf8");

const extractRegexLiteral = (constName) => {
  const pattern = new RegExp(`const\\s+${constName}\\s*=\\s*(\\/[^\\n;]+\\/[a-z]*)`);
  const match = script.match(pattern);
  if (!match) {
    throw new Error(`Constante ${constName} nao encontrada`);
  }
  return Function(`"use strict"; return ${match[1]};`)();
};

const SEARCH_ALLOWLIST = extractRegexLiteral("SEARCH_ALLOWLIST");
const RECOMMENDATION_OPTION_ALLOWLIST = extractRegexLiteral("RECOMMENDATION_OPTION_ALLOWLIST");

const INJECTION_PATTERNS = [
  /<\s*script/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /<\/?\w+[^>]*>/i,
  /[;]{2,}/,
  /\b(select|insert|update|delete|drop|truncate|alter|create|replace|exec|execute)\b/i,
  /union\s+select/i,
  /drop\s+table/i,
  /\b(alert|prompt|confirm)\s*\(/i,
  /--|\/\*|\*\//
];

const toSafeString = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();

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
    const error = new Error("RECOMMENDATION_SANITIZATION_BLOCKED");
    error.code = "RECOMMENDATION_SANITIZATION_BLOCKED";
    throw error;
  }

  if (!allowlist.test(clipped)) {
    const error = new Error("RECOMMENDATION_SANITIZATION_BLOCKED");
    error.code = "RECOMMENDATION_SANITIZATION_BLOCKED";
    throw error;
  }

  return clipped;
};

const sanitizeOptionText = (value, fallback = "") => {
  const sanitized = sanitizeSearchTerm(value, {
    maxLength: 60,
    allowlist: RECOMMENDATION_OPTION_ALLOWLIST
  });
  return sanitized || fallback;
};

const checks = [];

const emojiSamples = [
  "🥩 Mais macia",
  "💰 Mais barata",
  "🥗 Menos gordura",
  "🔥 Mais sabor",
  "🔪 Cubos médios",
  "🍽️ 5-6"
];

for (const sample of emojiSamples) {
  let accepted = false;
  try {
    const result = sanitizeOptionText(sample, "fallback");
    accepted = result === sample;
  } catch (error) {
    accepted = false;
  }

  checks.push({
    check: `Aceita opcao legitima com emoji: ${sample}`,
    pass: accepted,
    expected: sample,
    actual: accepted ? sample : "blocked"
  });
}

const maliciousPayloads = [
  "💰 Mais barata <script>alert(1)</script>",
  "🥩 Mais macia javascript:alert(1)",
  "🔥 Mais sabor -- drop table carnes",
  "🔪 Cubos médios onerror=alert(1)"
];

for (const payload of maliciousPayloads) {
  let blocked = false;
  try {
    sanitizeOptionText(payload, "fallback");
  } catch (error) {
    blocked = error && error.code === "RECOMMENDATION_SANITIZATION_BLOCKED";
  }

  checks.push({
    check: `Bloqueia payload malicioso: ${payload}`,
    pass: blocked,
    expected: "RECOMMENDATION_SANITIZATION_BLOCKED",
    actual: blocked ? "RECOMMENDATION_SANITIZATION_BLOCKED" : "allowed"
  });
}

const smokeRaw = require("child_process").execSync(`node ${smokePath}`, { encoding: "utf8" });
const smoke = JSON.parse(smokeRaw);
const byKey = Object.fromEntries((smoke.checks || []).map((entry) => [entry.key, entry]));

checks.push({
  check: "Top1 Desfiar preservado",
  pass: byKey.desfiar?.top3?.[0]?.id === "coxaoduro",
  expected: "coxaoduro",
  actual: byKey.desfiar?.top3?.[0]?.id || null
});

checks.push({
  check: "Top3 Desfiar preservado",
  pass: Array.isArray(byKey.desfiar?.top3) && byKey.desfiar.top3.length === 3,
  expected: "3 itens",
  actual: Array.isArray(byKey.desfiar?.top3) ? byKey.desfiar.top3.length : 0
});

console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      overallPass: checks.every((entry) => entry.pass),
      checks
    },
    null,
    2
  )
);
