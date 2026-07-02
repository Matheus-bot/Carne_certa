# UX Log

## [t3] Especificacao do Ticket Visual com Ze e estados
- Definido modelo de experiencia com tres estados canonicos: Top 3 (sucesso), vazio orientado e erro resiliente.
- Estabelecido contrato UX do hook do avatar Ze via evento `ze:describe-cut` com payload minimo estavel por card.
- Mapeada iconografia canonica de preparo com regra de limite visual (4 icones + "+N") para legibilidade operacional.
- Reforcado desacoplamento: ticket sempre util sem avatar; Ze atua como camada assistiva adicional.
- Adicionados guardrails de regressao invisivel e checklist de paridade pixel por pixel para manter o baseline premium.
- Documentada integracao de estados offline para ticket cacheado e ausencia de cache.
- Learnings consumed: [teamlead/v1-scope-recommendation-and-quality-boundaries]
