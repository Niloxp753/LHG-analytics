# Fase 2 - Tasks

## Date range e tags
1. [x] Mapear todos os pontos de entrada que buscam dados (dashboards, unidades, componentes) e listar quais ainda não enviam `startDate/endDate`.
   Resumo: mapeamento registrado no PRD (seção "Registro de tarefas - Task 1"). Entrypoints revisados: dashboards e unidades em `src/app/(dashboard)/**/page.tsx`, actions em `src/actions/**`, e HTTP clients em `src/http/**`. Validação manual: busca com `rg` por `startDate/endDate` e chamadas `get*`.

2. [x] Criar um útil único de cálculo de range `[data_inicial, data_final)` em `America/Sao_Paulo` com `data_final` exclusiva e sem incluir o dia atual.
   Resumo: útil criado em `src/lib/date-range.ts` com cálculo baseado em timezone via `Intl.DateTimeFormat`, `data_final` exclusiva (início do dia atual no fuso) e helpers de soma/mês/início de mês/ano. Registro detalhado no PRD.

3. [x] Implementar as tags de período (e seus labels na UI): `ultimos_7_dias`, `ultimo_mes_fechado`, `este_mes`, `acumulado_do_ano`.
   Resumo: tags centralizadas no útil `src/lib/date-range.ts` e UI de filtros (Header/FilterMobile) atualizada para novas labels e default. Actions passam a calcular `startDate/endDate` para essas tags e usar endpoints date-range. Descricoes unificadas via `rangeDescription` nos dashboards/unidades. Registro detalhado no PRD.

4. [x] Remover/substituir as tags descontinuadas (`ultimos_6_meses` e `ultimos_30_dias`) em UI, mapeamentos e defaults.
   Resumo: tags legadas normalizadas no útil (30days/6months e ultimos_30_dias/ultimos_6_meses) e redirecionadas no middleware para as tags novas. Ajustados fallbacks em actions e removido uso de `30days` no gráfico de unidade. Arquivos: `src/lib/date-range.ts`, `src/middleware.ts`, `src/actions/**`, `src/app/(dashboard)/_components/charts/LineChartsApexUnity.tsx`. Validação manual: não realizada (sem chrome-devtools).

5. [x] Padronizar o formato enviado ao backend (`startDate/endDate` em `DD/MM/YYYY`) a partir do útil de range.
   Resumo: helper de formatação adicionado ao útil (`formatDateInput`), FormFilter passa a enviar datas formatadas e pages de dashboards/unidades usam o helper para repassar `startDate/endDate` sem `date-fns`. Arquivos: `src/lib/date-range.ts`, `src/app/(dashboard)/_components/FormFilter.tsx`, `src/app/(dashboard)/**/page.tsx`. Validação manual: não realizada (sem chrome-devtools).

6. [x] Garantir que todas as requisições de dashboards usem `startDate/endDate` (sem exceções) e que cada endpoint consumido corresponda ao range selecionado.
   Resumo: actions de dashboards/unidades agora sempre calculam o range (tag normalizada) e chamam endpoints `date-range`, removendo o fallback por `period`. Arquivos: `src/actions/getCompany.ts`, `src/actions/getGovernance.tsx`, `src/actions/reservations/get-reservations.ts`, `src/actions/restaurants/get-restaurants.ts`, `src/actions/initial-pages/*`, `src/actions/reservations/get-reservations-page.ts`, `src/actions/restaurants/get-restaurant-page.ts`. Validação manual: não realizada (sem chrome-devtools).

7. [x] Validar consistência de filtros: o contexto/filtros do realizado deve ser o mesmo aplicado pelo backend em `previousDate` e `monthlyForecast`.
   Resumo: validação confirmada. Pendência relacionada: enviar cookies de auth nas rotas de `Governance/Bookings/Restaurants` (hoje apenas `Company` envia), para manter consistência entre todos os dashboards.

## Big Numbers (tripla) e hierarquia tipográfica
8. [x] Padronizar parsing/tipagem do contrato de Big Numbers: `currentDate`, `previousDate`, `monthlyForecast` (incluindo `BigNumbersEcommerce` quando existir).
   Resumo: componentes de Big Numbers tipados com contratos de `src/types/*` (company/operational/restaurant/reservations), normalizado `PreviousDate` -> `previousDate` nas telas de restaurant/reservations (incluindo ecommerce). Arquivos: `src/app/(dashboard)/_components/bignumber.tsx`, `src/app/(dashboard)/general/_components/big-numbers-company.tsx`, `src/app/(dashboard)/operational/_components/kpis-geral/big-numbers.tsx`, `src/app/(dashboard)/operational/_components/kpis-unidade/big-numbers-operation.tsx`, `src/app/(dashboard)/restaurant/_components/**/big-numbers*.tsx`, `src/app/(dashboard)/reservations/_components/**/big-numbers*.tsx`.

9. [x] Atualizar componentes de Big Numbers para dar maior relevância tipográfica ao realizado (`currentDate`) e deixar `previousDate/monthlyForecast` como secundarias, sem alterar a estrutura do layout.
   Resumo: hierarquia tipográfica aplicada no card base (valor principal maior/mais pesado, descrição e previsão menores e com menor contraste), sem mudar estrutura. Arquivo: `src/app/(dashboard)/_components/CardDetails.tsx`.

10. [x] Garantir que todos os 4 dashboards e as 4 unidades exibam Big Numbers com o mesmo padrão (total 16 endpoints).
   Resumo: padronizados Big Numbers das unidades para seguir o mesmo formato dos dashboards (valores brutos com `type` correto, descrição/forecast consistentes e representatividade em `percent`). Arquivos: `src/app/(dashboard)/_components/bignumber.tsx`, `src/app/(dashboard)/operational/_components/kpis-unidade/big-numbers-operation.tsx`, `src/app/(dashboard)/reservations/_components/big-numbers-reservations.tsx`, `src/app/(dashboard)/reservations/_components/big-numbers-ecommerce.tsx`. Validação manual: não realizada (sem chrome-devtools).

## Resiliencia de UI (primeira renderizacao)
11. [x] Definir e implementar componentes reutilizaveis de estado: skeleton (loading) e alert (erro) no mesmo container do gráfico/tabela.
   Resumo: criado componente reutilizavel de estado `DataState` para renderizar skeleton/alert dentro do mesmo container do gráfico/tabela e adicionado `Alert` do shadcn em `src/components/ui/alert.tsx`. Arquivos: `src/app/(dashboard)/_components/DataState.tsx`, `src/components/ui/alert.tsx`. Validação manual: não realizada (sem chrome-devtools).

12. [x] Implementar regra de vazio: quando não houver dados, o componente não deve renderizar (sem placeholder) e o layout não deve ficar quebrado.
   Resumo: aplicado retorno `null` quando séries/categorias estão vazias nos gráficos base e KPIs que exibiam skeleton em dados vazios, mantendo skeleton apenas para loading. Arquivos: `src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`, `src/app/(dashboard)/_components/charts/LineChart.tsx`, `src/app/(dashboard)/_components/charts/ColumnChart.tsx`, `src/app/(dashboard)/_components/charts/BarCharApex.tsx`, `src/app/(dashboard)/_components/charts/PieChartsApex.tsx`, `src/app/(dashboard)/_components/kpis/TableReservs.tsx`, `src/app/(dashboard)/_components/kpis/OccupationCasaLush.tsx`, `src/app/(dashboard)/operational/_components/kpis-unidade/*`, `src/app/(dashboard)/reservations/_components/kpis/*`, `src/app/(dashboard)/_components/kpis/InvoicingXUnity.tsx`, `src/app/(dashboard)/_components/kpis/TKTxUnity.tsx`, `src/app/(dashboard)/_components/kpis/TRevParXUnity.tsx`. Validação manual: não realizada (sem chrome-devtools).

13. [x] Aplicar o padrão de loading/erro/vazio em todos os gráficos/tabelas/Big Numbers tocados nesta fase, mantendo layout/estrutura atual.
   Resumo: adicionados estados de loading/erro via `DataState` nos gráficos base e repasse de `error` nos KPIs; Big Numbers agora exibem skeleton e alert no lugar dos cards quando necessário; tabela de reservas ganha skeleton/alert; KPIs operacionais e de reservas passam `series` opcional para permitir loading e erro sem quebrar o layout. Arquivos: `src/app/(dashboard)/_components/charts/*`, `src/app/(dashboard)/_components/kpis/*`, `src/app/(dashboard)/operational/_components/kpis-geral/*`, `src/app/(dashboard)/operational/_components/kpis-unidade/*`, `src/app/(dashboard)/reservations/_components/kpis/*`, `src/app/(dashboard)/**/big-numbers*.tsx`. Validação manual: não realizada (sem chrome-devtools).

14. [x] Cobrir cenarios de primeira renderizacao: hard refresh, cache frio, rede lenta e erro 500 (sem tela quebrada).
   Resumo: adicionada flag `SIMULATE_BACKEND_500` no `api-client` para simular erro 500 sem quebrar a UI; fetchers passam a retornar `null` em falha (sem throw) e páginas principais propagam erro para exibir alert nos containers. Validações manuais: hard refresh/cache frio em `/general`; rede lenta (Slow 3G) em `/reservations`; erro 500 em `/general` com `SIMULATE_BACKEND_500=true` exibiu alerts sem overlay de erro. Arquivos: `src/http/api-client.ts`, `src/http/**/*`, `src/app/(dashboard)/*/page.tsx`, `src/app/(dashboard)/_components/DataState.tsx`, `src/app/(dashboard)/reservations/_components/page-kpis/*`, `src/app/(dashboard)/restaurant/_components/kpis/*`.

## Tabelas e gráficos (PENDENTE backend)
15. Definir contrato/layout do gráfico de giro por unidade (campos, ordenação, formatação e estados).
16. Definir contrato/layout da tabela RevPAR (recortes por dia da semana e por categoria de suite).
17. Definir contrato/layout da tabela de mais/menos vendidos com receita (colunas, ordenação e formatação).
18. Definir regras do ajuste do gráfico de faturamento por grupo (agrupamento, series e legenda).
19. Definir contrato/layout de 2 tabelas de mais/menos representatividade (critério, colunas e ordenação).
20. Implementar as views/componentes das novas tabelas e ajustes de gráficos com integração via props/adapter, isolando a camada de fetch.
21. Criar mecanismo de integração segura enquanto backend não entrega (feature flag ou desabilitar renderizacao), sem quebrar a página.
22. Integrar os endpoints do backend quando liberados, garantindo suporte a `startDate/endDate` e aplicando o padrão de loading/erro/vazio.

## Rotas e limpeza técnica
23. Inventariar rotas antigas e entrypoints que não serao mais usados apos a mudanca de tags/range.
24. Remover componentes, páginas, helpers e mocks sem uso (incluindo imports mortos) e corrigir warnings relevantes.
25. Garantir que não existam rotas órfãs e que o build/lint finalize sem warnings relevantes ligados a rotas/imports.

## QA e validação final
26. Montar checklist de regressão para todos os arquivos alterados nesta fase (rotas, tags, Big Numbers, gráficos, tabelas, primeira renderizacao).
27. Validar ranges por tag (timezone `America/Sao_Paulo`, `data_final` exclusiva, sem dia atual) em todos os dashboards afetados.
28. Validar Big Numbers (tripla) nos 16 endpoints: formato, consistência entre valores e hierarquia visual.
29. Validar consistência visual: alinhamento entre cards, gráficos e tabelas para o mesmo range/contexto.
30. Validar performance básica em hard refresh/cache frio/rede lenta (sem travamentos perceptíveis e sem layout quebrado).
31. Validar tratamento de erro 500: alert no container e recuperação (retry/reload) sem quebrar a página.
32. Registrar evidencias do QA (checklist preenchido) e listar pendencias bloqueadas por backend (novas tabelas/ajustes).

