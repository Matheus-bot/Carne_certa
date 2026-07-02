## [t2] Blueprint da Recommendation Engine V1 com Strategy Pattern
- O projeto já tinha escopo fechado em t1 com REQ-001..REQ-020, então o foco foi detalhar contratos de implementação sem redefinir requisitos.
- A decisão central foi manter a dominância de economia no score global com peso 0.30 e limitar ajustes por categoria para evitar distorções.
- O desempate foi formalizado em cadeia determinística: disponibilidade, nome (pt-BR), id.
- Segurança e PWA ficaram como boundaries contratuais para t4/t5/t7, evitando acoplamento de design com implementação.
- Learnings consumed: [teamlead/v1-scope-recommendation-and-quality-boundaries]
