window.CARNECERTA_DATA = {
  meatCatalog: {
    acem: {
      id: "acem",
      name: "Acem",
      image: "../../../assets/imagens/carnes/acemgerado2.jpg",
      page: "../carnes/acem.html",
      priorities: ["barat", "sabor"],
      categories: ["panela", "moer", "desfiar", "hamburguer"],
      fatProfile: "equilibrada",
      cutHints: ["cubos", "medio", "grosso", "inteira", "saborosa", "equilibrada"],
      butcherCut: "corte em cubos medios para panela",
      notes: "Ideal para cozimento lento, com bom custo-beneficio.",
      factor: 1.0
    },
    paleta: {
      id: "paleta",
      name: "Paleta",
      image: "../../../assets/imagens/carnes/paletagerada.png",
      page: "../carnes/paleta.html",
      priorities: ["maci", "barat"],
      categories: ["panela", "moer", "desfiar", "hamburguer"],
      fatProfile: "equilibrada",
      cutHints: ["cubos", "medio", "inteira", "magra", "equilibrada"],
      butcherCut: "corte em cubos medios e retire excesso de nervo",
      notes: "Macia e versatil para receitas de panela.",
      factor: 1.0
    },
    coxaomole: {
      id: "coxaomole",
      name: "Coxao Mole",
      image: "../../../assets/imagens/carnes/coxãomole.png",
      page: "../carnes/coxaomole.html",
      priorities: ["maci", "gord"],
      categories: ["bife", "hamburguer", "moer"],
      fatProfile: "magra",
      cutHints: ["fino", "medio", "magra", "pequeno"],
      butcherCut: "bifes de 1,5 cm para grelha ou frigideira",
      notes: "Textura macia e sabor equilibrado.",
      factor: 0.95
    },
    contrafile: {
      id: "contrafile",
      name: "Contrafile",
      image: "../../../assets/imagens/carnes/contrafilet.png",
      page: "../carnes/contrafile.html",
      priorities: ["maci", "sabor", "gord"],
      categories: ["bife", "churrasco", "hamburguer"],
      fatProfile: "saborosa",
      cutHints: ["medio", "grosso", "saborosa", "suculento"],
      butcherCut: "bifes altos de 2 cm",
      notes: "Muito saboroso, excelente para grelha.",
      factor: 1.05
    },
    pontadealcatra: {
      id: "pontadealcatra",
      name: "Ponta de Alcatra",
      image: "../../../assets/imagens/carnes/pontadealcatragerada1.png",
      page: "../carnes/pontadealcatra.html",
      priorities: ["sabor", "maci"],
      categories: ["churrasco", "bife", "hamburguer"],
      fatProfile: "saborosa",
      cutHints: ["grosso", "inteira", "saborosa", "suculento"],
      butcherCut: "peca inteira em mantas para churrasco",
      notes: "Macia e com excelente resultado na brasa.",
      factor: 1.15
    }
  },
  categoryCandidates: {
    panela: ["acem", "paleta", "coxaomole", "pontadealcatra"],
    bife: ["contrafile", "coxaomole", "pontadealcatra", "acem"],
    churrasco: ["pontadealcatra", "contrafile", "coxaomole", "paleta"],
    hamburguer: ["coxaomole", "acem", "contrafile", "paleta", "pontadealcatra"],
    desfiar: ["acem", "paleta", "pontadealcatra", "coxaomole"],
    moer: ["acem", "paleta", "coxaomole", "contrafile"]
  },
  gramsPerPerson: {
    panela: 250,
    bife: 220,
    churrasco: 400,
    hamburguer: 220,
    desfiar: 240,
    moer: 200
  }
};
