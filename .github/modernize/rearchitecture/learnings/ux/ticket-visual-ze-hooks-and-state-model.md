# Ticket Visual Ze Hooks And State Model

Padroniza o modelo de estados do Ticket Visual (top3, vazio, erro) e o contrato de evento para integracao do avatar Ze.

## What Happened
No task Carne_certa/t3, foi necessario especificar UX de Ticket Visual com iconografia de preparo e acessibilidade, sem escrever codigo, garantindo handoff implementavel para frontend vanilla e aderencia aos requisitos REQ-008..REQ-011 e REQ-019.

## Takeaway
Para fluxos com assistive avatar, desacoplar experiencia principal do componente de acessibilidade: o ticket deve funcionar integralmente sem o avatar, e o hook de Ze deve ser um evento com payload minimo estavel. Sempre explicitar estados vazio/erro com microcopy acionavel e estrategia de foco/aria-live.

## History
- 2026-07-01 (Carne_certa/t3): initial
