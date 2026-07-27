# 🔗 Exemplos Práticos e Integrações

## 📌 Exemplos de Customização

### Exemplo 1: Adicionar 6 Cortes Completos

```javascript
const cutsData = [
  {
    id: 'acem',
    name: 'Acém',
    description: 'Corte versátil com sabor intenso. Ótimo para panelas e ensopados.',
    image: '../assets/imagens/acem/acemgerado.jpg',
    link: './paginas/carnes/acem.html',
    position: { x: 32, y: 42 },
    side: 'left'
  },
  {
    id: 'contrafile',
    name: 'Contra-filé Tradicional',
    description: 'Premium para churrasco. Maciez excepcional e gordura equilibrada.',
    image: '../assets/imagens/contrafileTradicional/contrafilet.png',
    link: './paginas/carnes/contrafile.html',
    position: { x: 60, y: 40 },
    side: 'right'
  },
  {
    id: 'alcatra',
    name: 'Alcatra',
    description: 'Corte nobre e versátil. Perfeito para bifes finos e grelhados.',
    image: '../assets/imagens/pontadealcatra/pontadealcatragerada1.png',
    link: './paginas/carnes/pontadealcatra.html',
    position: { x: 70, y: 44 },
    side: 'right'
  },
  {
    id: 'filemignon',
    name: 'Filé Mignon',
    description: 'O corte mais nobre e macio. Perfeito para ocasiões premium.',
    image: '../assets/imagens/filemignon/filemignongerado.jpg',
    link: './paginas/carnes/filemignon.html',
    position: { x: 50, y: 55 },
    side: 'right'
  },
  {
    id: 'costela',
    name: 'Costela Bovina',
    description: 'Carne com osso. Ótima para churrascos longos e receitas rústicas.',
    image: '../assets/imagens/costelaBovina/costelagerad.jpg',
    link: './paginas/carnes/costela.html',
    position: { x: 35, y: 60 },
    side: 'left'
  },
  {
    id: 'musculo',
    name: 'Músculo',
    description: 'Corte econômico. Excelente para receitas que necessitam cozimento longo.',
    image: '../assets/imagens/musculo/musculogerado.jpg',
    link: './paginas/carnes/musculo.html',
    position: { x: 25, y: 65 },
    side: 'left'
  }
];
```

---

## 🌍 Exemplo 2: Integração com API Backend

### Carregar Dados Dinamicamente
```javascript
// Versão com fetch assincrono
async function loadCutsFromAPI() {
  try {
    const response = await fetch('https://seu-api.com/api/cuts');
    const data = await response.json();
    
    return data.map(cut => ({
      id: cut.id,
      name: cut.nome_pt,
      description: cut.descricao_pt,
      image: cut.imagem_url,
      link: `./paginas/carnes/${cut.slug}.html`,
      position: { 
        x: cut.posicao_x,  // Já vem como % do backend
        y: cut.posicao_y 
      },
      side: cut.lado  // 'left' ou 'right'
    }));
  } catch (error) {
    console.error('Erro ao carregar cortes:', error);
    return [];  // Fallback para dados locais
  }
}

// Modificar initCowMap para usar dados dinâmicos
async function initCowMapDynamic() {
  const cuts = await loadCutsFromAPI();
  
  if (cuts.length === 0) {
    // Se API falhar, usar dados locais
    cuts = cutsData;
  }
  
  // Resto da função igual...
  const hotspotsLayer = document.getElementById('hotspotsLayer');
  
  cuts.forEach((cut, index) => {
    // ... criar hotspot com 'cut'
  });
}

// Na inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initCowMapDynamic();  // Ao invés de initCowMap()
  initPodium();
});
```

---

## 🎨 Exemplo 3: Tema Dinâmico Dark/Light

### CSS Expandido com Temas
```css
:root {
  --color-bg-primary: #121212;
  --color-text-primary: #ffffff;
  --color-accent-red: #d32f2f;
}

[data-theme="light"] {
  --color-bg-primary: #f5f5f5;
  --color-bg-secondary: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #4a4a4a;
  --color-accent-red: #c62828;
}
```

### JavaScript com Detecção de Preferência
```javascript
function initTheme() {
  // 1. Verificar localStorage
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    return;
  }
  
  // 2. Respeitar preferência do SO
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  
  // Dispara evento para outras componentes
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
```

### HTML - Botão Melhorado
```html
<button id="themeToggle" onclick="toggleTheme()">
  <span class="icon-dark">🌙</span> <!-- Mostra em dark mode -->
  <span class="icon-light">☀️</span>  <!-- Mostra em light mode -->
</button>

<style>
  [data-theme="dark"] .icon-light { display: none; }
  [data-theme="light"] .icon-dark { display: none; }
</style>
```

---

## 📊 Exemplo 4: Analytics & Rastreamento

### Google Analytics Integration
```javascript
// Rastrear cliques em hotspots
function initCowMapWithAnalytics() {
  const hotspotsLayer = document.getElementById('hotspotsLayer');
  
  cutsData.forEach((cut, index) => {
    const hotspot = document.createElement('div');
    hotspot.className = `hotspot label-${cut.side}`;
    // ... resto do código ...
    
    hotspot.addEventListener('click', (e) => {
      // Registrar evento
      if (window.gtag) {
        gtag('event', 'cut_hotspot_click', {
          'cut_id': cut.id,
          'cut_name': cut.name,
          'position': `${cut.position.x}%,${cut.position.y}%`,
          'timestamp': new Date().toISOString()
        });
      }
      
      // Resto do comportamento normal
      if (window.innerWidth <= 900) {
        e.preventDefault();
        openBottomSheet(cut);
      }
    });
    
    hotspotsLayer.appendChild(hotspot);
  });
}
```

### Rastrear Bottom Sheet
```javascript
function openBottomSheetWithAnalytics(cut) {
  if (window.gtag) {
    gtag('event', 'bottom_sheet_open', {
      'cut_id': cut.id,
      'cut_name': cut.name
    });
  }
  
  // Chamar função original
  openBottomSheet(cut);
}

function closeBottomSheetWithAnalytics() {
  if (window.gtag) {
    gtag('event', 'bottom_sheet_close');
  }
  
  closeBottomSheet();
}
```

---

## 🔐 Exemplo 5: Proteção de Conteúdo

### Lazy Loading Seguro de Imagens
```javascript
// Usar Intersection Observer para lazy-load imagens
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-lazy]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.lazy;
        img.removeAttribute('data-lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => observer.observe(img));
}

// Usar assim no HTML
<img data-lazy="../assets/imagens/boi/boimodelofuncional.png" 
     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E"
     alt="Mapa anatômico">
```

---

## 🚀 Exemplo 6: Performance Optimization

### Minificação e Compressão
```html
<!-- Inline Critical CSS (Above the fold) -->
<style>
  /* Only essential styles */
  .header-premium { /* ... */ }
  .cow-map-canvas { /* ... */ }
</style>

<!-- Defer non-critical CSS -->
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

### Service Worker para Cache
```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('carnecerta-v1').then((cache) => {
      return cache.addAll([
        '/index-premium.html',
        '/assets/imagens/boi/boimodelofuncional.png',
        // ... adicionar mais assets
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Registrar Service Worker
```javascript
// No final do index-premium.html
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registrado'))
    .catch(err => console.error('Erro SW:', err));
}
```

---

## 📱 Exemplo 7: Suporte a Web App

### Manifest.json
```json
{
  "name": "CarneCerta - Premium Beef Cuts",
  "short_name": "CarneCerta",
  "description": "Explore cortes de carne premium com mapa interativo",
  "start_url": "/index-premium.html",
  "display": "standalone",
  "theme_color": "#121212",
  "background_color": "#121212",
  "scope": "/",
  "icons": [
    {
      "src": "/assets/logo/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/logo/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Link no HTML
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#121212">
<meta name="mobile-web-app-capable" content="yes">
```

---

## 🔄 Exemplo 8: Sincronização com localStorage

### Salvar Histórico de Cliques
```javascript
function saveClickHistory(cut) {
  const history = JSON.parse(localStorage.getItem('carnecerta_history') || '[]');
  
  const entry = {
    cut_id: cut.id,
    cut_name: cut.name,
    timestamp: new Date().toISOString(),
    viewport: window.innerWidth
  };
  
  history.push(entry);
  // Manter apenas últimos 20 cliques
  if (history.length > 20) history.shift();
  
  localStorage.setItem('carnecerta_history', JSON.stringify(history));
}

// Usar ao clicar em hotspot
hotspot.addEventListener('click', (e) => {
  saveClickHistory(cut);
  // ... resto do código
});
```

### Mostrar Últimos Cortes Visitados
```javascript
function getRecentCuts() {
  const history = JSON.parse(localStorage.getItem('carnecerta_history') || '[]');
  
  // Remover duplicatas
  const unique = [...new Map(
    history.map(item => [item.cut_id, item])
  ).values()];
  
  return unique.slice(-5).reverse();  // Últimos 5
}
```

---

## 🌐 Exemplo 9: Multi-idioma (i18n)

### Estrutura de Tradução
```javascript
const i18n = {
  'pt-BR': {
    'map.title': 'Descubra Cada Corte',
    'map.subtitle': 'Clique nos hotspots para explorar...',
    'podium.title': 'Melhores Cortes para Grelhar',
    'cuts.acem': 'Acém',
    'cuts.contrafile': 'Contra-filé'
  },
  'en-US': {
    'map.title': 'Discover Each Cut',
    'map.subtitle': 'Click the hotspots to explore...',
    'podium.title': 'Best Cuts for Grilling',
    'cuts.acem': 'Chuck',
    'cuts.contrafile': 'Strip Steak'
  },
  'es-ES': {
    'map.title': 'Descubre Cada Corte',
    'map.subtitle': 'Haz clic en los puntos calientes...',
    'podium.title': 'Mejores Cortes para Asar',
    'cuts.acem': 'Aguja',
    'cuts.contrafile': 'Entrecot'
  }
};

function t(key) {
  const lang = localStorage.getItem('lang') || 'pt-BR';
  return i18n[lang]?.[key] || key;
}

// Usar no HTML
document.querySelector('.cow-map-title').textContent = t('map.title');
document.querySelector('.podium-title').textContent = t('podium.title');
```

---

## 🎯 Exemplo 10: A/B Testing

### Teste de Variações
```javascript
function getVariant() {
  let variant = sessionStorage.getItem('carnecerta_variant');
  
  if (!variant) {
    // Aleatoriamente escolher: A ou B
    variant = Math.random() > 0.5 ? 'A' : 'B';
    sessionStorage.setItem('carnecerta_variant', variant);
  }
  
  return variant;
}

// Aplicar estilos diferentes por variante
const variant = getVariant();
if (variant === 'B') {
  document.documentElement.classList.add('variant-b');
}
```

### CSS Variante B
```css
/* Tema alternativo */
.variant-b {
  --color-accent-red: #ff5252;  /* Vermelho mais brilhante */
}

.variant-b .podium-card {
  border-radius: 8px;  /* Ao invés de 20px */
}
```

---

## 📈 Métricas de Teste Sugeridas

```javascript
// Medir performance do hotspot
const startTime = performance.now();
hotspot.addEventListener('click', () => {
  const endTime = performance.now();
  console.log(`Hotspot action time: ${endTime - startTime}ms`);
});

// Medir renderização de pódio
const podiumStart = performance.now();
initPodium();
const podiumEnd = performance.now();
console.log(`Podium render: ${podiumEnd - podiumStart}ms`);

// Medir tempo até interatividade
document.addEventListener('DOMContentLoaded', () => {
  const tti = performance.timing.domInteractive - performance.timing.navigationStart;
  console.log(`Time to Interactive: ${tti}ms`);
});
```

---

## 🔗 Checklist de Implementação

- [ ] Copiar `index-premium.html` para `frontend/`
- [ ] Testar em desktop >1200px
- [ ] Testar em tablet 900px-1200px
- [ ] Testar em mobile <900px
- [ ] Validar hotspot cliques
- [ ] Validar bottom sheet mobile
- [ ] Validar pódio animação
- [ ] Verificar compatibilidade navegadores
- [ ] Testar acessibilidade com screen reader
- [ ] Performance audit com Lighthouse
- [ ] Implementar analytics (opcional)
- [ ] Implementar temas dinâmicos (opcional)
- [ ] Implementar i18n (opcional)

---

**Documentação completa de exemplos práticos para expansão e manutenção** 🚀✨
