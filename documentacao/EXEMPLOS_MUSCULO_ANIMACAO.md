# 💻 Exemplos Práticos: Componente Músculo com Animações

## 📚 Índice
1. [Copiar & Colar para Outros Cortes](#copiar--colar-para-outros-cortes)
2. [Customizações Avançadas](#customizações-avançadas)
3. [Troubleshooting](#troubleshooting)
4. [Snippets Reutilizáveis](#snippets-reutilizáveis)

---

## 🔧 Copiar & Colar para Outros Cortes

### Como Criar Componente Similar para "Alcatra"

#### Passo 1: Duplicar HTML
```html
<section class="alcatra-animation-container">
  <div class="alcatra-image-wrapper">
    <img 
      id="alcatra-image" 
      src="../../../assets/imagens/alcatra/alcatrainteira.png" 
      alt="Corte de Alcatra - Estado Inicial"
      class="reset-state"
    >
  </div>

  <div class="alcatra-buttons-group">
    <button id="alcatra-btn-bife" class="alcatra-btn" data-action="bife">
      🥩 Bife
    </button>
    <button id="alcatra-btn-assado" class="alcatra-btn" data-action="assado">
      🔥 Assado
    </button>
  </div>

  <div class="alcatra-info-label" id="alcatra-info-label"></div>
</section>
```

#### Passo 2: Duplicar CSS
```css
.alcatra-animation-container {
  /* ... mesmos estilos do musculo ... */
  /* Apenas mude "musculo" para "alcatra" */
}

.alcatra-image-wrapper img {
  animation: fadeInScale 0.8s ease-out forwards;
}

.alcatra-btn { /* ... */ }
.alcatra-btn:hover { /* ... */ }
```

#### Passo 3: Duplicar + Adaptar JavaScript
```javascript
class AlcatraAnimationController {
  constructor() {
    this.imageElement = document.getElementById('alcatra-image');
    this.btnBife = document.getElementById('alcatra-btn-bife');
    this.btnAssado = document.getElementById('alcatra-btn-assado');
    this.infoLabel = document.getElementById('alcatra-info-label');

    this.imagePaths = {
      'inteira-cru': '../../../assets/imagens/alcatra/alcatrainteira.png',
      'bife-cru': '../../../assets/imagens/alcatra/alcatraBife.png',
      'bife-grelhado': '../../../assets/imagens/alcatra/alcatrabifeGrelhado.png',
      'assado-cru': '../../../assets/imagens/alcatra/alcatraassadoCru.png',
      'assado-pronto': '../../../assets/imagens/alcatra/alcatraassadoPronto.png'
    };

    this.sequences = {
      bife: [
        { state: 'bife-cru', delay: 0, label: '🔪 Cortando em bifes...' },
        { state: 'bife-grelhado', delay: 1500, label: '✅ Bife grelhado!' }
      ],
      assado: [
        { state: 'assado-cru', delay: 0, label: '🔥 Preparando assado...' },
        { state: 'assado-pronto', delay: 1500, label: '✅ Assado pronto!' }
      ]
    };

    this.init();
  }

  // ... resto dos métodos são idênticos ...
}

document.addEventListener('DOMContentLoaded', () => {
  new AlcatraAnimationController();
});
```

---

## 🚀 Customizações Avançadas

### 1. Modificar Tempo de Transição

**Padrão atual:** 1500ms entre frames

```javascript
// Deixar MAIS RÁPIDO (1 segundo)
this.sequences.cozido = [
  { state: 'cubos-cru', delay: 0, label: '🔪 Transformando...' },
  { state: 'cubos-cozido', delay: 1000, label: '✅ Pronto!' }  // ← Mudado
];

// Deixar MAIS LENTO (2 segundos)
this.sequences.cozido = [
  { state: 'cubos-cru', delay: 0, label: '🔪 Transformando...' },
  { state: 'cubos-cozido', delay: 2000, label: '✅ Pronto!' }  // ← Mudado
];
```

### 2. Adicionar Mais Frames (Sequência de 3 imagens)

**Exemplo: Músculo com 3 estágios**

```javascript
this.sequences.desfiar = [
  { state: 'tiras-cru', delay: 0, label: '🔪 Desfiando...' },
  { state: 'tiras-parcial', delay: 1000, label: '⏳ Quase pronto...' },  // ← NOVO
  { state: 'tiras-final', delay: 2000, label: '✅ Desfiado!' }          // ← NOVO
];

// Adicionar imagem ao mapa
this.imagePaths['tiras-parcial'] = '../../../assets/imagens/musculo/musculotirasemchamas.png';
```

### 3. Adicionar Efeito de Rotação

```css
@keyframes fadeInScaleRotate {
  from {
    opacity: 0;
    transform: scale(0.95) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.musculo-image-wrapper img {
  animation: fadeInScaleRotate 0.8s ease-out forwards;
}
```

### 4. Adicionar Som a Cada Transição

```javascript
playSequence(action) {
  const sequence = this.sequences[action];
  
  sequence.forEach((frame, index) => {
    this.animationTimer = setTimeout(() => {
      // 🔊 Toca som antes de mudar imagem
      const audio = new Audio('../../../assets/sounds/whoosh.mp3');
      audio.play().catch(e => console.log('Som desabilitado:', e));
      
      this.transitionToImage(frame.state, frame.label);
      
      if (index === sequence.length - 1) {
        setTimeout(() => {
          this.isAnimating = false;
          this.updateButtonStates(null);
        }, 800);
      }
    }, frame.delay);
  });
}
```

### 5. Desabilitar Botões Durante Animação

```javascript
updateButtonStates(activeAction) {
  if (activeAction === 'cozido') {
    this.btnCozido.classList.add('active');
    this.btnMoido.classList.remove('active');
    // ✅ AMBOS desabilitados durante animação
    this.btnCozido.disabled = true;
    this.btnMoido.disabled = true;  // ← Bloqueia clicar em outro
  } else if (activeAction === 'moido') {
    this.btnMoido.classList.add('active');
    this.btnCozido.classList.remove('active');
    this.btnMoido.disabled = true;
    this.btnCozido.disabled = true;
  } else {
    // Ambos habilitados quando não animando
    this.btnCozido.disabled = false;
    this.btnMoido.disabled = false;
  }
}
```

### 6. Adicionar Validação de Imagem

```javascript
transitionToImage(state, label) {
  this.currentState = state;
  this.infoLabel.textContent = label;
  
  this.imageElement.classList.remove('reset-state');
  void this.imageElement.offsetWidth;
  
  const imagePath = this.imagePaths[state];
  
  // Validar se arquivo existe
  fetch(imagePath, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        this.imageElement.src = imagePath;
        this.imageElement.alt = `Corte de Músculo - ${label}`;
      } else {
        console.error(`❌ Imagem não encontrada: ${imagePath}`);
        this.infoLabel.textContent = '⚠️ Erro ao carregar imagem';
      }
    })
    .catch(error => {
      console.error(`❌ Erro: ${error}`);
    });
}
```

---

## 🐛 Troubleshooting

### Problema 1: Animação não funciona
**Causa possível:** Imagem não encontrada  
**Solução:**
```javascript
// Verificar no console
this.imageElement.addEventListener('error', (e) => {
  console.error('Erro ao carregar imagem:', e);
});
```

### Problema 2: Múltiplos timers rodando
**Causa possível:** `clearTimeout()` não está sendo chamado  
**Solução:**
```javascript
// Adicionar log para debug
cancelAnimation() {
  if (this.animationTimer !== null) {
    console.log('⏹️  Cancelando timer:', this.animationTimer);
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
  }
}
```

### Problema 3: Animação tremulante (stuttering)
**Causa possível:** Reflow forçado não está funcionando  
**Solução:**
```javascript
transitionToImage(state, label) {
  // Forçar reflow ANTES de remover classe
  void this.imageElement.offsetWidth;
  
  this.imageElement.classList.remove('reset-state');
  void this.imageElement.offsetWidth; // Forçar NOVAMENTE
  
  this.imageElement.src = this.imagePaths[state];
}
```

### Problema 4: Botões não desabilitam
**Causa possível:** Estado não está sendo atualizado  
**Solução:**
```javascript
handleAction(action) {
  console.log('🔘 Botão clicado:', action); // Debug
  
  if (this.isAnimating) {
    this.cancelAnimation();
  }
  
  this.resetToInitial();
  this.isAnimating = true;
  this.updateButtonStates(action); // ← Adicionar log aqui
  this.playSequence(action);
}
```

---

## 📦 Snippets Reutilizáveis

### Snippet 1: Factory para Criar Animadores

```javascript
function createMeatAnimationController(config) {
  return class MeatController {
    constructor() {
      this.imageElement = document.getElementById(config.imageId);
      this.buttons = config.buttonIds.map(id => document.getElementById(id));
      this.infoLabel = document.getElementById(config.labelId);
      
      this.imagePaths = config.imagePaths;
      this.sequences = config.sequences;
      
      this.currentState = config.initialState || 'inteiro-cru';
      this.isAnimating = false;
      this.animationTimer = null;
      
      this.init();
    }
    
    init() {
      config.buttonIds.forEach((id, i) => {
        document.getElementById(id).addEventListener('click', () => {
          this.handleAction(config.actions[i]);
        });
      });
    }
    
    handleAction(action) {
      if (this.isAnimating) this.cancelAnimation();
      this.resetToInitial();
      this.isAnimating = true;
      this.playSequence(action);
    }
    
    // ... resto dos métodos ...
  };
}
```

**Uso:**
```javascript
const AlcatraController = createMeatAnimationController({
  imageId: 'alcatra-image',
  buttonIds: ['alcatra-btn-bife', 'alcatra-btn-assado'],
  labelId: 'alcatra-info-label',
  actions: ['bife', 'assado'],
  initialState: 'inteira-cru',
  imagePaths: { /* ... */ },
  sequences: { /* ... */ }
});

new AlcatraController();
```

### Snippet 2: Hook para Analytics

```javascript
handleAction(action) {
  if (this.isAnimating) this.cancelAnimation();
  
  // 📊 Enviar evento de analytics
  if (window.gtag) {
    gtag('event', 'meat_animation_started', {
      'meat_type': 'musculo',
      'action_type': action,
      'timestamp': new Date().toISOString()
    });
  }
  
  this.resetToInitial();
  this.isAnimating = true;
  this.playSequence(action);
}

// Ao finalizar
setTimeout(() => {
  this.isAnimating = false;
  
  if (window.gtag) {
    gtag('event', 'meat_animation_completed', {
      'meat_type': 'musculo',
      'action_type': action,
      'duration_ms': Date.now() - startTime
    });
  }
}, 800);
```

### Snippet 3: Precarregar Imagens

```javascript
preloadImages() {
  Object.values(this.imagePaths).forEach(path => {
    const img = new Image();
    img.src = path;
    img.addEventListener('load', () => {
      console.log(`✅ Precarregada: ${path}`);
    });
    img.addEventListener('error', () => {
      console.error(`❌ Falha ao precarregar: ${path}`);
    });
  });
}

// Chamar no constructor
this.init();
this.preloadImages();
```

### Snippet 4: Salvar Estado do Usuário

```javascript
saveState() {
  localStorage.setItem('muscleAnimation_lastAction', this.currentState);
  localStorage.setItem('muscleAnimation_timestamp', Date.now());
}

loadState() {
  const lastAction = localStorage.getItem('muscleAnimation_lastAction');
  if (lastAction) {
    console.log(`↩️  Restaurando última ação: ${lastAction}`);
    // Poderia reexecutar automaticamente
  }
}

handleAction(action) {
  // ... código existente ...
  this.saveState();
}
```

### Snippet 5: Mobile Touch Events

```javascript
init() {
  this.btnCozido.addEventListener('click', () => this.handleAction('cozido'));
  this.btnMoido.addEventListener('click', () => this.handleAction('moido'));
  
  // 📱 Também aceitar touch
  this.btnCozido.addEventListener('touchstart', () => this.handleAction('cozido'));
  this.btnMoido.addEventListener('touchstart', () => this.handleAction('moido'));
}
```

---

## 🎓 Boas Práticas Resumidas

| ✅ Faça | ❌ Evite |
|-------|---------|
| Usar `clearTimeout()` sempre | Deixar timers pendentes |
| CSS para animações | Animar com JS puro |
| Classes para estado | Inline styles |
| Event listeners em init() | Event listeners globais |
| IDs únicos por componente | IDs genéricos reutilizados |
| Forçar reflow com offsetWidth | Assumir que CSS funciona |
| Comentários explicativos | Código sem documentação |
| Testar em 3+ resoluções | Assumir que desktop = mobile |

---

**Última atualização:** 2026-06-22
