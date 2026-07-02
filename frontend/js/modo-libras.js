const recommendations = {
  churrasco: {
    barato: {
      name: "Acém",
      description: "Boa opção para churrasco econômico, com sabor e bom rendimento.",
      why: "É mais acessível e funciona bem em cortes para brasa quando você quer economizar.",
      features: ["Mais econômico", "Bom rendimento", "Sabor equilibrado"],
      prep: "Churrasco",
    },
    macio: {
      name: "Contrafilé",
      description: "Corte macio e muito valorizado para churrasco.",
      why: "Entrega maciez e uma experiência mais premium para grelha.",
      features: ["Maciez alta", "Ideal para grelha", "Mais suculento"],
      prep: "Churrasco",
    },
    sabor: {
      name: "Ponta de Alcatra",
      description: "O corte ideal para bife a rolê e também muito forte no sabor.",
      why: "Se a prioridade for sabor, a ponta de alcatra aparece como destaque.",
      features: ["Sabor marcante", "Excelente custo-benefício", "Versátil"],
      prep: "Churrasco",
    },
    gordura: {
      name: "Coxão Mole",
      description: "Uma opção mais equilibrada e com menor gordura aparente.",
      why: "Funciona bem quando a ideia é reduzir gordura sem perder versatilidade.",
      features: ["Menos gordura", "Boa versatilidade", "Corte fácil de preparar"],
      prep: "Churrasco",
    }
  },
  panela: {
    barato: {
      name: "Músculo",
      description: "Corte magro, forte no sabor e ótimo para cozimento longo.",
      why: "Ganha muito valor em panela e cozidos, com ótima economia.",
      features: ["Mais magro", "Ideal para panela", "Sabor intenso"],
      prep: "Panela",
    },
    macio: {
      name: "Paleta",
      description: "Boa combinação de maciez, sabor e custo-benefício.",
      why: "É uma escolha equilibrada para panela quando a maciez importa mais.",
      features: ["Maciez equilibrada", "Boa para panela", "Versátil"],
      prep: "Panela",
    },
    sabor: {
      name: "Acém",
      description: "Excelente para panela, com bastante sabor e rendimento.",
      why: "Tem ótimo aproveitamento e funciona muito bem em cozimento lento.",
      features: ["Sabor forte", "Bom rendimento", "Muito versátil"],
      prep: "Panela",
    },
    gordura: {
      name: "Músculo",
      description: "A melhor escolha para reduzir gordura e manter boa presença no prato.",
      why: "É a alternativa mais leve dentro da proposta de panela.",
      features: ["Menos gordura", "Corte magro", "Ideal para cozidos"],
      prep: "Panela",
    }
  },
  bife: {
    barato: {
      name: "Coxão Mole",
      description: "Clássico custo-benefício para bifes do dia a dia.",
      why: "Entrega um bife mais acessível e fácil de preparar.",
      features: ["Mais econômico", "Bom para bife", "Versátil"],
      prep: "Bife",
    },
    macio: {
      name: "Contrafilé",
      description: "Bife premium, macio e muito agradável na frigideira.",
      why: "Se a prioridade é maciez, é a escolha mais segura.",
      features: ["Maciez alta", "Mais premium", "Bom para grelha"],
      prep: "Bife",
    },
    sabor: {
      name: "Ponta de Alcatra",
      description: "Sabor intenso e ótimo para bife a rolê, com muito destaque no prato.",
      why: "Aqui o sabor conduz a recomendação.",
      features: ["Sabor marcante", "Ideal para bife a rolê", "Boa presença"],
      prep: "Bife",
    },
    gordura: {
      name: "Coxão Mole",
      description: "Opção mais leve para quem quer reduzir gordura no bife.",
      why: "Ajuda a manter o preparo mais magro.",
      features: ["Menos gordura", "Bom para bife fino", "Prático"],
      prep: "Bife",
    }
  },
  hamburguer: {
    barato: {
      name: "Acém",
      description: "Base econômica e eficiente para hambúrguer artesanal.",
      why: "Combina custo e bom sabor para moagem.",
      features: ["Mais econômico", "Bom rendimento", "Sabor equilibrado"],
      prep: "Hambúrguer",
    },
    macio: {
      name: "Coxão Mole",
      description: "Ajuda a deixar a mistura mais macia e leve.",
      why: "Funciona bem quando você quer uma textura mais suave.",
      features: ["Mais macio", "Boa moagem", "Versátil"],
      prep: "Hambúrguer",
    },
    sabor: {
      name: "Contrafilé",
      description: "Mais sabor e suculência para hambúrguer.",
      why: "É a escolha premium quando o sabor precisa se destacar.",
      features: ["Sabor alto", "Mais suculento", "Textura firme"],
      prep: "Hambúrguer",
    },
    gordura: {
      name: "Músculo",
      description: "A opção mais magra para hambúrguer entre as principais escolhas.",
      why: "Traz leveza e fica muito bem em combinações de moagem.",
      features: ["Menos gordura", "Mais magro", "Bom para moer"],
      prep: "Hambúrguer",
    }
  }
};

const choiceState = {
  prep: null,
  priority: null,
  people: null
};

const prepCards = document.querySelectorAll('[data-group="prep"]');
const priorityCards = document.querySelectorAll('[data-group="priority"]');
const peopleCards = document.querySelectorAll('[data-group="people"]');
const showButton = document.getElementById("show-butchers-btn");
const butcherDetails = document.getElementById("butcher-details");
const recommendedName = document.getElementById("recommended-meat-name");
const recommendedDescription = document.getElementById("recommended-meat-description");
const recommendedWhy = document.getElementById("recommended-meat-why");
const butcherMeat = document.getElementById("butcher-meat");
const butcherFeatures = document.getElementById("butcher-features");
const butcherPrep = document.getElementById("butcher-prep");

const setActiveCard = (groupName, value, clickedButton) => {
  const buttons = document.querySelectorAll(`[data-group="${groupName}"]`);
  buttons.forEach((button) => {
    const isSelected = button === clickedButton;
    button.setAttribute("aria-pressed", String(isSelected));
  });
  choiceState[groupName] = value;
  updateRecommendation();
};

const resolvePriorityKey = (value) => {
  if (!value) return "barato";
  if (value === "mais-barato") return "barato";
  if (value === "mais-macio") return "macio";
  if (value === "mais-sabor") return "sabor";
  if (value === "menos-gordura") return "gordura";
  return "barato";
};

const resolvePrepKey = (value) => {
  if (!value) return "panela";
  if (value === "churrasco") return "churrasco";
  if (value === "panela") return "panela";
  if (value === "bife") return "bife";
  if (value === "hamburguer") return "hamburguer";
  return "panela";
};

const resolvePeopleLabel = (value) => value || "3-4";

const updateRecommendation = () => {
  const prepKey = resolvePrepKey(choiceState.prep);
  const priorityKey = resolvePriorityKey(choiceState.priority);
  const peopleLabel = resolvePeopleLabel(choiceState.people);
  const meat = recommendations[prepKey][priorityKey];

  if (!meat) {
    return;
  }

  recommendedName.textContent = meat.name;
  recommendedDescription.textContent = meat.description;
  recommendedWhy.innerHTML = `<strong>Por que foi recomendado:</strong> ${meat.why} Pessoas: ${peopleLabel}.`;
  butcherMeat.textContent = meat.name;
  butcherFeatures.textContent = meat.features.join(" • ");
  butcherPrep.textContent = meat.prep;
};

prepCards.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveCard("prep", button.dataset.value || "", button);
  });
});

priorityCards.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveCard("priority", button.dataset.value || "", button);
  });
});

peopleCards.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveCard("people", button.dataset.value || "", button);
  });
});

if (showButton && butcherDetails) {
  showButton.addEventListener("click", () => {
    const isOpen = butcherDetails.hasAttribute("hidden");
    butcherDetails.hidden = !isOpen;
    showButton.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      butcherDetails.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

updateRecommendation();

window.addEventListener("ze:describe-cut", (event) => {
  const payload = event.detail || {};
  if (!payload || !payload.nome) {
    return;
  }

  const narration = payload.textoNarracao || `${payload.nome}. ${payload.descricaoCurta || ""}`;

  if (recommendedName) {
    recommendedName.textContent = payload.nome;
  }

  if (recommendedDescription) {
    recommendedDescription.textContent = payload.descricaoCurta || "Descricao enviada pelo ticket visual.";
  }

  if (recommendedWhy) {
    recommendedWhy.innerHTML = `<strong>Por que foi recomendado:</strong> ${narration}`;
  }

  if (butcherMeat) {
    butcherMeat.textContent = payload.nome;
  }

  if (butcherFeatures) {
    butcherFeatures.textContent = (payload.preparo || []).join(" • ") || "Preparo recomendado no ticket";
  }

  if (butcherPrep) {
    butcherPrep.textContent = payload.disponibilidade ? "Disponivel hoje" : "Baixa disponibilidade";
  }
});
