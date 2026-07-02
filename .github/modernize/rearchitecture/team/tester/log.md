## [t6] Validacao funcional obrigatoria da recomendacao, ticket Desfiar e smoke offline
- Motor de ranking multicategoria validado com evidencias executaveis (Top1 oficiais, Top3 fixo, desempate por disponibilidade e economia dominante).
- Falha encontrada no fluxo real de UI: ao selecionar opcoes com emoji na tela de Desfiar, a sanitizacao bloqueia entrada e interrompe geracao do ticket.
- O ticket de Desfiar (Pressao + dicas tecnicas) funciona quando acionado por fallback textual sem emojis, indicando regressao no boundary de entrada e nao no Strategy em si.
- Offline inicial confirmado: Service Worker ativo, cache de carnes.json acessivel offline e snapshot local de ticket persistido.
- Learnings consumed: [(none)]

## [t6.2] Revalidacao t6 apos correcao t6.1 (jornada real UI Desfiar)
- Regressao global permaneceu estavel em harness: Top1 oficiais, Top3, desempate por disponibilidade e guardrails Panela/Desfiar.
- Rerun E2E real por clique na tela Desfiar ainda reproduziu `Entrada invalida para recomendacao` com opcoes legitimas contendo emoji.
- Divergencia observada: smoke tecnico da sanitizacao passa, mas fluxo real (coleta de opcoes ativas + submit do botao) falha em runtime.
- Evidencia interna coletada no navegador: `sanitizeRecommendationInputs` lancando `RECOMMENDATION_SANITIZATION_BLOCKED` com `priorityRaw/cutPreferenceRaw/peopleRaw` validos e ativos na UI.
- Learnings consumed: [tester/emoji-sanitization-blocks-ui-options]
