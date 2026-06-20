console.log("CarneCerta iniciado 🚀");

const preferencesPanel = document.getElementById("preferencesPanel");
const closePanel = document.getElementById("closePanel");
const overlay = document.getElementById("overlay");
const panelTag = document.getElementById("panelTag");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const panelActionButton = document.getElementById("panelActionButton");
const preferenceCards = document.querySelectorAll("[data-open-preferences]");

let panelTargetUrl = "";

const openPreferencesPanel = () => {
  if (!preferencesPanel || !overlay) {
    return;
  }

  preferencesPanel.classList.add("active");
  overlay.classList.add("active");
};

const closePreferencesPanel = () => {
  if (!preferencesPanel || !overlay) {
    return;
  }

  preferencesPanel.classList.remove("active");
  overlay.classList.remove("active");
};

if (closePanel) {
  closePanel.addEventListener("click", closePreferencesPanel);
}

if (overlay) {
  overlay.addEventListener("click", closePreferencesPanel);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePreferencesPanel();
  }
});

preferenceCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (panelTag && card.dataset.tag) {
      panelTag.textContent = card.dataset.tag;
    }

    if (panelTitle && card.dataset.title) {
      panelTitle.textContent = card.dataset.title;
    }

    if (panelDescription && card.dataset.description) {
      panelDescription.textContent = card.dataset.description;
    }

    if (panelActionButton && card.dataset.buttonText) {
      panelActionButton.textContent = card.dataset.buttonText;
    }

    panelTargetUrl = card.dataset.target || "";
    openPreferencesPanel();
  });
});

if (panelActionButton) {
  panelActionButton.addEventListener("click", () => {
    if (panelTargetUrl) {
      window.location.href = panelTargetUrl;
      return;
    }

    closePreferencesPanel();
  });
}

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