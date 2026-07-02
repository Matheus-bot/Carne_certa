---
schema: clarification/v1
generated_at: "2026-07-01T00:00:00Z"
scope:
  - frontend
clarity_score: 0.92
rounds: 2
gaps:
  - id: compliance.accessibility
    resolution: default
    default_used: "WCAG 2.1 AA"
  - id: compatibility.browsers
    resolution: default
    default_used: "modern evergreen (Chrome, Firefox, Safari, Edge - latest 2 major versions)"
  - id: i18n.locales
    resolution: default
    default_used: "preserve current locales; keep existing i18n library if present"
  - id: state_mgmt.preference
    resolution: default
    default_used: "preserve existing pattern if identifiable; otherwise recommend minimal (component state + server-state library)"
  - id: out_of_scope
    resolution: default
    default_used: "no explicit exclusions; agent will infer from project structure"
  - id: existing_tests.posture
    resolution: default
    default_used: "must pass"
blocking_gaps: []
---

# Scenario Clarification

## Frontend

- **Target framework**: HTML/CSS/JS vanilla (sem framework).
- **Component library**: Sem biblioteca de UI; componentes custom em vanilla.
- **Screenshots**: Referencia visual nos prototipos existentes em `prototipos/telas/` e recursos em `assets/imagens/telas/`.
- **Design system**: Tokens CSS existentes em `:root`, baseados nos prototipos Figma; fidelidade visual pixel por pixel.
- **Accessibility**: WCAG 2.1 AA (default).
- **Browser targets**: modern evergreen (Chrome, Firefox, Safari, Edge - latest 2 major versions) (default).
- **Responsive strategy**: Manter layout atual e breakpoints existentes do projeto (abordagem mobile-first onde aplicavel).
- **i18n locales**: preserve current locales; keep existing i18n library if present (default).
- **State management**: preserve existing pattern if identifiable; otherwise recommend minimal (component state + server-state library) (default).
- **Routing**: Navegacao multipage baseada nas paginas HTML existentes (sem router de framework).

## Generic

- **Success definition**: Preservar e entregar com fidelidade o contexto funcional original: Strategy Pattern, carnes.json, Top3 com desempate por disponibilidade, Libras Ze, Ticket Visual, seguranca e PWA offline.
- **Out of scope**: no explicit exclusions; agent will infer from project structure (default).
- **Existing test posture**: must pass (default).

---

## Gaps & Defaults Applied

- id: compliance.accessibility
  resolution: default
  default_used: "WCAG 2.1 AA"

- id: compatibility.browsers
  resolution: default
  default_used: "modern evergreen (Chrome, Firefox, Safari, Edge - latest 2 major versions)"

- id: i18n.locales
  resolution: default
  default_used: "preserve current locales; keep existing i18n library if present"

- id: state_mgmt.preference
  resolution: default
  default_used: "preserve existing pattern if identifiable; otherwise recommend minimal (component state + server-state library)"

- id: out_of_scope
  resolution: default
  default_used: "no explicit exclusions; agent will infer from project structure"

- id: existing_tests.posture
  resolution: default
  default_used: "must pass"

## Downstream Usage Notes

- Itens em defaults sao pressupostos operacionais e devem ser revisados se impactarem decisoes criticas de design/implementacao.
- Nao re-perguntar itens ja resolvidos neste artefato; considerar como fechados para o budget de clarificacao.
