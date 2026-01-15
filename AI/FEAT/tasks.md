# Fase 2 - Tasks

## Date range e tags
1. Mapear todos os pontos de entrada que buscam dados (dashboards, unidades, componentes) e listar quais ainda nao enviam `startDate/endDate`.
2. Criar um util unico de calculo de range `[data_inicial, data_final)` em `America/Sao_Paulo` com `data_final` exclusiva e sem incluir o dia atual.
3. Implementar as tags de periodo (e seus labels na UI): `ultimos_7_dias`, `ultimo_mes_fechado`, `este_mes`, `acumulado_do_ano`.
4. Remover/substituir as tags descontinuadas (`ultimos_6_meses` e `ultimos_30_dias`) em UI, mapeamentos e defaults.
5. Padronizar o formato enviado ao backend (`startDate/endDate` em `DD/MM/YYYY`) a partir do util de range.
6. Garantir que todas as requisicoes de dashboards usem `startDate/endDate` (sem excecoes) e que cada endpoint consumido corresponda ao range selecionado.
7. Validar consistencia de filtros: o contexto/filtros do realizado deve ser o mesmo aplicado pelo backend em `previousDate` e `monthlyForecast`.

## Big Numbers (tripla) e hierarquia tipografica
8. Padronizar parsing/tipagem do contrato de Big Numbers: `currentDate`, `previousDate`, `monthlyForecast` (incluindo `BigNumbersEcommerce` quando existir).
9. Atualizar componentes de Big Numbers para dar maior relevancia tipografica ao realizado (`currentDate`) e deixar `previousDate/monthlyForecast` como secundarias, sem alterar a estrutura do layout.
10. Garantir que todos os 4 dashboards e as 4 unidades exibam Big Numbers com o mesmo padrao (total 16 endpoints).

## Resiliencia de UI (primeira renderizacao)
11. Definir e implementar componentes reutilizaveis de estado: skeleton (loading) e alert (erro) no mesmo container do grafico/tabela.
12. Implementar regra de vazio: quando nao houver dados, o componente nao deve renderizar (sem placeholder) e o layout nao deve ficar quebrado.
13. Aplicar o padrao de loading/erro/vazio em todos os graficos/tabelas/Big Numbers tocados nesta fase, mantendo layout/estrutura atual.
14. Cobrir cenarios de primeira renderizacao: hard refresh, cache frio, rede lenta e erro 500 (sem tela quebrada).

## Tabelas e graficos (PENDENTE backend)
15. Definir contrato/layout do grafico de giro por unidade (campos, ordenacao, formatacao e estados).
16. Definir contrato/layout da tabela RevPAR (recortes por dia da semana e por categoria de suite).
17. Definir contrato/layout da tabela de mais/menos vendidos com receita (colunas, ordenacao e formatacao).
18. Definir regras do ajuste do grafico de faturamento por grupo (agrupamento, series e legenda).
19. Definir contrato/layout de 2 tabelas de mais/menos representatividade (criterio, colunas e ordenacao).
20. Implementar as views/componentes das novas tabelas e ajustes de graficos com integracao via props/adapter, isolando a camada de fetch.
21. Criar mecanismo de integracao segura enquanto backend nao entrega (feature flag ou desabilitar renderizacao), sem quebrar a pagina.
22. Integrar os endpoints do backend quando liberados, garantindo suporte a `startDate/endDate` e aplicando o padrao de loading/erro/vazio.

## Rotas e limpeza tecnica
23. Inventariar rotas antigas e entrypoints que nao serao mais usados apos a mudanca de tags/range.
24. Remover componentes, paginas, helpers e mocks sem uso (incluindo imports mortos) e corrigir warnings relevantes.
25. Garantir que nao existam rotas orfas e que o build/lint finalize sem warnings relevantes ligados a rotas/imports.

## QA e validacao final
26. Montar checklist de regressao para todos os arquivos alterados nesta fase (rotas, tags, Big Numbers, graficos, tabelas, primeira renderizacao).
27. Validar ranges por tag (timezone `America/Sao_Paulo`, `data_final` exclusiva, sem dia atual) em todos os dashboards afetados.
28. Validar Big Numbers (tripla) nos 16 endpoints: formato, consistencia entre valores e hierarquia visual.
29. Validar consistencia visual: alinhamento entre cards, graficos e tabelas para o mesmo range/contexto.
30. Validar performance basica em hard refresh/cache frio/rede lenta (sem travamentos perceptiveis e sem layout quebrado).
31. Validar tratamento de erro 500: alert no container e recuperacao (retry/reload) sem quebrar a pagina.
32. Registrar evidencias do QA (checklist preenchido) e listar pendencias bloqueadas por backend (novas tabelas/ajustes).
