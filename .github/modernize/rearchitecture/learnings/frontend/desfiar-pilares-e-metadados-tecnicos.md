# Desfiar Pilares E Metadados Tecnicos

Para Desfiar, manter score por pilares de negocio e sinais tecnicos no dataset reduz regressao entre categorias e facilita evolucao.

## What Happened
No task Carne_certa/t5.4, a categoria Desfiar exigiu regra propria com 4 pilares (Rapidez, Economia, Sabor, Magro) e foco em fibras longas/colageno. A implementacao ficou estavel ao manter o calculo na `DesfiarStrategy` e mover sinais tecnicos para `carnes.json` (`colageno`, `fibra_longa`, `magro`, `tempo_pressao_min`, `tempo_pressao_max`, `dica_preparo_desfiar`).

## Takeaway
Para evolucoes de Desfiar neste projeto:
- manter pesos de pilar e boosts de preferencia dentro da estrategia da categoria;
- manter tempo de pressao e dica tecnica no dataset por corte;
- renderizar no ticket/final instruction sem duplicar regra de score na UI.
- preservar no payload final da recomendacao os campos `tempo_pressao_min`, `tempo_pressao_max` e `dica_preparo_desfiar` para evitar perda de metadados no Ticket Visual.
- quando houver exigencia textual de negocio no ticket, usar composicao defensiva da dica para garantir frases obrigatorias (ex.: `selar antes`, `desfiar quente`) independentemente da variacao do texto base do corte.

## History
- 2026-07-01 (Carne_certa/t5.4): initial
- 2026-07-01 (Carne_certa/t5.4): calibracao de ranking default para `coxaoduro` em 1o por integridade da fibra, mantendo pesos globais inalterados
