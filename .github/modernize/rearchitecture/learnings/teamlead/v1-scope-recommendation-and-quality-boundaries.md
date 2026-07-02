# V1 Scope Recommendation And Quality Boundaries

Padroniza que o V1 deve ser conduzido por matriz REQ única com dominância de economia no score e gates de evidência para segurança e offline.

## What Happened
No t1 do projeto CarneCerta, o escopo precisava consolidar arquitetura de recomendação, acessibilidade, segurança e PWA sem ambiguidade para tarefas t2-t8. A decisão foi estruturar requisitos numerados REQ-001..REQ-020, com critérios de aceite por domínio (Recomendação, Acessibilidade, Ticket, Segurança e PWA) e dependências explícitas entre tarefas.

## Takeaway
Para features transversais em frontend vanilla, usar uma matriz de requisitos única com donos alvo e evidências esperadas reduz retrabalho entre design, implementação e validação. Sempre declarar fallback determinístico no ranking e separar claramente escopo V1 de evolução pós-V1.

## History
- 2026-07-01 (Carne_certa/t1): initial
