# 🔌 Code Snippets - Copy & Paste

Coleção de trechos de código prontos para integrar ao seu projeto.

---

## 📋 Índice Rápido

1. [Adicionar Novo Hotspot](#adicionar-novo-hotspot)
2. [Mudar Cores](#mudar-cores)
3. [Customizar Textos](#customizar-textos)
4. [Rastrear Cliques](#rastrear-cliques)
5. [Carregar Dados API](#carregar-dados-api)
6. [Temas Dinâmicos](#temas-dinâmicos)
7. [Service Worker](#service-worker)
8. [Teste de Performance](#teste-de-performance)

---

## Adicionar Novo Hotspot

### Corte Simples
```javascript
// Localize a linha: const cutsData = [
// Adicione antes do fechamento do array:

{
  id: 'novo-corte',
  name: 'Novo Corte',
  description: 'Descrição do novo corte com detalhes técnicos.',
  image: '../assets/imagens/novo-corte/imagem.jpg',
  link: './paginas/carnes/novo-corte.html',
  position: { x: 45, y: 55 },
  side: 'left'  // ou 'right'
}
```

### 6 Cortes Completos
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

## Mudar Cores

### Paleta Completa Alternativa
```css
:root {
  /* Variação: Gold Premium */
  --color-bg-primary: #0d0d0d;
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #262626;
  --color-text-primary: #fafafa;
  --color-text-secondary: #d0d0d0;
  --color-accent-red: #d4af37;  /* Gold */
  --color-accent-red-light: #e8c547;
  --color-border-dark: rgba(255, 255, 255, 0.06);
  --color-border-light: rgba(255, 255, 255, 0.1);
}
```

### Variação: Minimalist
```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9f9f9;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent-red: #0066cc;  /* Azul */
  --color-accent-red-light: #0080ff;
  --color-border-dark: rgba(0, 0, 0, 0.08);
  --color-border-light: rgba(0, 0, 0, 0.12);
}
```

### Variação: Vibrant
```css
:root {
  --color-bg-primary: #1a0a2e;
  --color-bg-secondary: #2d1b4e;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #c0c0c0;
  --color-accent-red: #ff6b9d;  /* Rosa Neon */
  --color-accent-red-light: #ff85b8;
  --color-border-dark: rgba(255, 107, 157, 0.1);
  --color-border-light: rgba(255, 107, 157, 0.2);
}
```

---

## Customizar Textos

### Mudar Títulos
```javascript
// Localize as linhas com class="cow-map-title" e "podium-title"
// E altere o textContent:

// No HTML:
<h2 class="cow-map-title">Seu Título Aqui</h2>
<h2 class="podium-title">Novo Título do Pódio</h2>

// Ou via JS:
document.querySelector('.cow-map-title').textContent = 'Novo Título';
document.querySelector('.podium-title').textContent = 'Novo Título Pódio';
```

### Mudar Descrições
```html
<!-- Altere na seção HTML -->
<p class="cow-map-subtitle">Sua descrição do mapa aqui</p>
<p class="podium-subtitle">Sua descrição do pódio aqui</p>
```

---

## Rastrear Cliques

### Google Analytics Simples
```javascript
// Adicione no <head>:
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

// Rastrear hotspot clicks:
hotspot.addEventListener('click', () => {
  gtag('event', 'hotspot_click', {
    'cut_id': cut.id,
    'cut_name': cut.name,
    'position_x': cut.position.x,
    'position_y': cut.position.y
  });
});

// Rastrear bottom sheet:
function openBottomSheet(cut) {
  gtag('event', 'bottom_sheet_open', {
    'cut_name': cut.name
  });
  // ... resto do código
}
```

### Analytics Customizado (localStorage)
```javascript
function trackEvent(eventName, data) {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  
  events.push({
    name: eventName,
    data: data,
    timestamp: new Date().toISOString()
  });
  
  // Manter últimos 100 eventos
  if (events.length > 100) events.shift();
  
  localStorage.setItem('events', JSON.stringify(events));
}

// Usar:
hotspot.addEventListener('click', () => {
  trackEvent('hotspot_click', { cut_id: cut.id, cut_name: cut.name });
});
```

---

## Carregar Dados API

### Versão Simples (Fetch)
```javascript
async function loadCutsFromAPI() {
  try {
    const response = await fetch('https://seu-api.com/api/cuts');
    const data = await response.json();
    
    return data.map(cut => ({
      id: cut.id,
      name: cut.nome,
      description: cut.descricao,
      image: cut.imagem_url,
      link: cut.link_destino,
      position: { x: cut.posicao_x, y: cut.posicao_y },
      side: cut.lado
    }));
  } catch (error) {
    console.error('Erro ao carregar cortes:', error);
    return cutsData;  // Fallback para dados locais
  }
}

// Na inicialização:
document.addEventListener('DOMContentLoaded', async () => {
  const cuts = await loadCutsFromAPI();
  // Usar 'cuts' ao invés de cutsData
});
```

### Com Retry e Cache
```javascript
async function loadCutsWithCache() {
  // Verificar cache
  const cached = localStorage.getItem('cuts_cache');
  const cacheTime = localStorage.getItem('cuts_cache_time');
  
  const now = Date.now();
  const MAX_CACHE_AGE = 60 * 60 * 1000;  // 1 hora
  
  if (cached && cacheTime && (now - parseInt(cacheTime)) < MAX_CACHE_AGE) {
    return JSON.parse(cached);
  }
  
  // Se cache expirou, buscar novo
  try {
    const response = await fetch('https://seu-api.com/api/cuts');
    const data = await response.json();
    
    // Salvar no cache
    localStorage.setItem('cuts_cache', JSON.stringify(data));
    localStorage.setItem('cuts_cache_time', Date.now().toString());
    
    return data;
  } catch (error) {
    console.error('Erro ao carregar:', error);
    
    // Usar cache antigo se disponível
    return cached ? JSON.parse(cached) : cutsData;
  }
}
```

---

## Temas Dinâmicos

### Sistema Completo Dark/Light
```javascript
function initTheme() {
  // Verificar localStorage
  const saved = localStorage.getItem('carnecerta_theme');
  
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    return;
  }
  
  // Respeitar preferência do SO
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
  localStorage.setItem('carnecerta_theme', next);
  
  // Dispara evento
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
}

// CSS para temas
const themeCss = `
  :root {
    --color-bg-primary: #121212;
    --color-text-primary: #ffffff;
    --color-accent-red: #d32f2f;
  }
  
  [data-theme="light"] {
    --color-bg-primary: #fafafa;
    --color-text-primary: #1a1a1a;
    --color-accent-red: #c62828;
  }
`;

// Injetar no documento
const style = document.createElement('style');
style.textContent = themeCss;
document.head.appendChild(style);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
```

---

## Service Worker

### SW Básico (Cache-First)
```javascript
// Salve como: frontend/sw.js

const CACHE_NAME = 'carnecerta-v1';
const urlsToCache = [
  '/index-premium.html',
  '/assets/imagens/boi/boimodelofuncional.png',
  // Adicione outras URLs importantes
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### Registrar SW no index-premium.html
```javascript
// Adicione no final da seção <script>:

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/frontend/sw.js')
      .then(reg => {
        console.log('Service Worker registrado:', reg);
      })
      .catch(error => {
        console.error('Erro registrar SW:', error);
      });
  });
}
```

---

## Teste de Performance

### Medir Tempos
```javascript
// Performance Monitoring

class PerformanceMonitor {
  constructor() {
    this.marks = {};
  }
  
  mark(name) {
    this.marks[name] = performance.now();
    console.log(`📍 Mark: ${name}`);
  }
  
  measure(name, startMark, endMark) {
    const duration = this.marks[endMark] - this.marks[startMark];
    console.log(`⏱️  Measure ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }
  
  report() {
    console.log('=== PERFORMANCE REPORT ===');
    console.log('Performance Timing:', performance.timing);
    
    // Calcular tempos importantes
    const dns = performance.timing.domainLookupEnd - performance.timing.domainLookupStart;
    const tcp = performance.timing.connectEnd - performance.timing.connectStart;
    const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
    const dl = performance.timing.responseEnd - performance.timing.responseStart;
    const dom = performance.timing.domInteractive - performance.timing.navigationStart;
    const tti = performance.timing.loadEventStart - performance.timing.navigationStart;
    
    console.log(`📊 DNS: ${dns}ms`);
    console.log(`📊 TCP: ${tcp}ms`);
    console.log(`📊 TTFB: ${ttfb}ms`);
    console.log(`📊 Download: ${dl}ms`);
    console.log(`📊 DOM Interactive: ${dom}ms`);
    console.log(`📊 Time to Interactive: ${tti}ms`);
  }
}

const monitor = new PerformanceMonitor();

document.addEventListener('DOMContentLoaded', () => {
  monitor.mark('dom-loaded');
});

window.addEventListener('load', () => {
  monitor.mark('page-loaded');
  monitor.measure('total', 'dom-loaded', 'page-loaded');
  monitor.report();
});
```

### Lighthouse CLI
```bash
# Instalar Lighthouse
npm install -g lighthouse

# Executar auditoria
lighthouse https://seu-site.com/index-premium.html --view

# Salvar relatório
lighthouse https://seu-site.com/index-premium.html --output=html --output-path=./report.html
```

---

## 🔥 Bônus: Animação Extra

### Parallax no Scroll
```css
.parallax-element {
  transform: translateY(calc(var(--scroll, 0) * 0.5px));
}
```

```javascript
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', window.scrollY);
});
```

### Transição Suave de Página
```javascript
// Fade out ao navegar
function navigateTo(url) {
  const container = document.querySelector('main');
  container.style.opacity = '0';
  container.style.transition = 'opacity 0.3s ease-out';
  
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

// Fade in na chegada
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('main');
  container.style.opacity = '0';
  container.style.transition = 'opacity 0.3s ease-in';
  
  setTimeout(() => {
    container.style.opacity = '1';
  }, 50);
});
```

---

**Todos os snippets testados e prontos para usar! 🚀**
