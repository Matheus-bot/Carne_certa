# 🚀 Guia Rápido - Interface Premium CarneCerta

## 📦 Arquivos Criados

### `frontend/index-premium.html`
Página principal interativa completa com:
- ✅ Mapa interativo do boi com hotspots responsivos
- ✅ Bottom Sheet mobile premium
- ✅ Pódio estilo Kahoot com animação invertida
- ✅ Design Dark Premium (#121212, branco, #D32F2F)
- ✅ Sem dependências externas

---

## ⚡ Como Usar

### 1. Visualização Imediata
```bash
# Abra o arquivo no navegador:
frontend/index-premium.html
```

### 2. Dados Funcionais (Pré-configurados)
O arquivo já inclui 3 cortes de teste:
- **Acém** - Corte versátil
- **Contra-filé** - Premium para churrasco  
- **Alcatra** - Nobre e versátil

Dados são carregados do array `cutsData` no JavaScript.

### 3. Desktop (>900px)
- Passe mouse nos hotspots
- Veja linhas SVG se animarem
- Clique para navegar para página de detalhes
- Pódio em 3 colunas com alturas diferentes

### 4. Mobile (<900px)
- Clique nos pontos vermelhos (hotspots)
- Bottom Sheet desliza de baixo com detalhes
- Clique "Ver Detalhes" ou fora da gaveta para fechar
- Pódio empilha verticalmente

---

## 🎨 Estrutura Visual

```
┌─────────────────────────────────────────┐
│  HEADER PREMIUM - Logo + Nav            │
├─────────────────────────────────────────┤
│                                         │
│  SEÇÃO 1: MAPA DO BOI                   │
│  ┌───────────────────────────────────┐  │
│  │      IMAGEM DO BOI                │  │
│  │   • Hotspot 1 (Acém)             │  │
│  │   • Hotspot 2 (Contra-filé)      │  │
│  │   • Hotspot 3 (Alcatra)          │  │
│  └───────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  SEÇÃO 2: PÓDIO KAHOOT                  │
│         🥈        🥇        🥉          │
│      2º LUGAR  1º LUGAR  3º LUGAR       │
│      (menor)   (MAIOR)    (pequeno)     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Customização Básica

### Adicionar Novo Hotspot

1. Abra `index-premium.html`
2. Localize o array `cutsData`:
```javascript
const cutsData = [
  {
    id: 'novo-corte',
    name: 'Nome do Corte',
    description: 'Descrição técnica',
    image: '../assets/imagens/novo-corte/img.jpg',
    link: './paginas/carnes/novo-corte.html',
    position: { x: 50, y: 55 },  // % - Percentual na imagem
    side: 'left'  // 'left' ou 'right'
  }
];
```

3. Salve e recarregue

### Mudar Cores

Localize `:root` no `<style>`:
```css
:root {
  --color-accent-red: #d32f2f;        /* Cor principal */
  --color-bg-primary: #121212;         /* Fundo */
}
```

### Alterar Textos

Procure por:
- `.cow-map-title` - Título do mapa
- `.podium-title` - Título do pódio
- Nomes nos arrays `cutsData` e `podiumData`

---

## 📱 Responsividade

### Desktop (1200px+)
- Pódio em 3 colunas: 2º | 1º (maior) | 3º
- Hotspots com labels visíveis ao hover
- Linhas SVG animadas

### Tablet (900px - 1200px)
- Transição suave
- Pódio começa a reduzir espaço

### Mobile (<900px)
- Pódio empilha verticalmente
- Labels ocultos, apenas pontos visíveis
- Bottom Sheet ao tocar hotspot
- Hitbox aumentada para 44x44px+

---

## 🎬 Animações Principais

### 1. Hotspot Cascata
- Ao carregar: pontos piscam, linhas se estendem, labels fade-in
- Sequência: 0ms, 150ms, 300ms

### 2. Hover Label
- Muda cor para vermelho
- Sobe 4px com shadow aumentado
- Duração: 0.35s (spring effect)

### 3. Bottom Sheet Slide
- Desliza de baixo para cima
- Duração: 0.35s cubic-bezier
- Fecha ao clicar fora ou link

### 4. Pódio Kahoot
- 3º lugar sobe aos 600ms
- 2º lugar sobe aos 300ms  
- 1º lugar sobe aos 0ms (base)
- 1º lugar tem glow pulse infinito

---

## ✅ Checklist de Teste

### Desktop
- [ ] Página carrega sem erros
- [ ] Hotspots aparecem sobre a imagem do boi
- [ ] Hover no hotspot mostra label + anima linha SVG
- [ ] Clique navega para página de detalhes
- [ ] Pódio em 3 colunas (2º menor | 1º maior | 3º pequeno)
- [ ] 1º lugar tem glow animado

### Mobile (simulate com DevTools)
- [ ] Mude para viewport <900px
- [ ] Clique em hotspot abre Bottom Sheet
- [ ] Bottom Sheet desliza suavemente de baixo
- [ ] Campos preenchidos corretamente (nome, descrição, imagem, link)
- [ ] Clique em "Ver Detalhes" navega
- [ ] Clique fora fecha gaveta
- [ ] Pódio empilha verticalmente

### Performance
- [ ] Sem console errors
- [ ] Animações fluidas (60fps)
- [ ] Cliques respondem instantaneamente
- [ ] Sem lag no hover/scroll

---

## 🐛 Troubleshooting

### Hotspots não aparecem
```bash
✓ Verifique se a imagem existe em:
  ../assets/imagens/boi/boimodelofuncional.png
✓ Confirme que <div id="hotspotsLayer"></div> existe
✓ Abra DevTools Console (F12) - veja se há erros
```

### Labels não ficam visíveis
```bash
✓ Desktop: Passe mouse sobre pontos vermelhos
✓ Mobile: Clique no ponto para abrir Bottom Sheet
✓ Verifique breakpoint: <900px ativa mobile
```

### Pódio não anima
```bash
✓ Scroll down até ver a seção "Melhores Cortes"
✓ IntersectionObserver dispara animação
✓ Verifique suporte no navegador (Chrome 51+)
```

### Bottom Sheet não funciona
```bash
✓ Verifique se está em viewport mobile (<900px)
✓ F12 Console - procure por erros
✓ Teste clique em hotspot mobile
```

---

## 📊 Dados Estrutura

### cutsData - Hotspots do Mapa
```javascript
[
  { id, name, description, image, link, position: {x, y}, side }
]
```

### podiumData - Recomendações Pódio
```javascript
[
  { rank: 1-3, medal: '🥇/🥈/🥉', name, description }
]
```

---

## 🎯 Próximos Passos Sugeridos

1. **Substituir imagens teste** pelos ativos finais do CarneCerta
2. **Adicionar mais cortes** ao array `cutsData` (6-8 para encher o mapa)
3. **Integrar com backend** para dados dinâmicos via API/JSON
4. **Testes cross-browser** em Safari, Firefox, Edge
5. **Analytics** para rastrear cliques em hotspots
6. **Temas dinâmicos** beyond dark/light

---

## 📞 Suporte

Para dúvidas sobre:
- **CSS/Animações** → Ver `DOCUMENTACAO_INTERFACE_PREMIUM.md` seção "🎬 Animações"
- **JavaScript** → Ver seção "⚙️ Inicialização"
- **Responsividade** → Ver seção "📐 Responsividade"
- **Acessibilidade** → Ver seção "♿ Acessibilidade"

---

**Interface criada com padrões ultra-premium, zero dependências externas, 100% vanilla code** 🎯✨
