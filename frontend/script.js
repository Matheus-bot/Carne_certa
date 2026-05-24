console.log("CarneCerta iniciado 🚀");

// ABRIR PAINEL

const openPanel =
document.getElementById("openPanel");

// PAINEL

const preferencesPanel =
document.getElementById("preferencesPanel");

// FECHAR

const closePanel =
document.getElementById("closePanel");

// OVERLAY

const overlay =
document.getElementById("overlay");

// ABRIR PAINEL

openPanel.onclick = () => {

  preferencesPanel.classList.add("active");

  overlay.classList.add("active");

};

// FECHAR NO X

closePanel.onclick = () => {

  preferencesPanel.classList.remove("active");

  overlay.classList.remove("active");

};

// FECHAR CLICANDO NO FUNDO

overlay.onclick = () => {

  preferencesPanel.classList.remove("active");

  overlay.classList.remove("active");

};
// BOTÕES DE OPÇÃO

const optionButtons =
document.querySelectorAll(".option-btn");

// CLICOU

optionButtons.forEach((button) => {

  button.onclick = () => {

    // REMOVE DOS OUTROS

    const siblings =
    button.parentElement.querySelectorAll(".option-btn");

    siblings.forEach((btn) => {

      btn.classList.remove("active-option");

    });

    // ADICIONA NO CLICADO

    button.classList.add("active-option");

  };

});