# PRD Fase 2 - Analytics

## Visao geral
Esta fase 2 consolida consistencia de datas, adiciona novas tabelas e graficos, fortalece a resiliencia de UI na primeira renderizacao, remove rotas e codigo morto, e fecha com QA completo. O objetivo e entregar dashboards mais confiaveis, previsiveis e consistentes, reduzindo divergencias de dados e falhas visuais em cenarios reais.

## Objetivos
- Unificar o range de datas para todas as requisicoes e comparacoes.
- Entregar novas visualizacoes de tabelas e ajustes em graficos existentes.
- Garantir fallback consistente na primeira renderizacao e estados de loading/erro.
- Reduzir debito tecnico de rotas e imports mortos.
- Validar a fase com QA e checklist de regressao.

## Nao objetivos
- Criar novas metricas fora das tabelas e graficos listados.
- Redesenhar o layout geral do produto.
- Alterar regras de negocio que nao envolvam datas, comparacoes e os dashboards desta fase.

## Publico alvo
- Operacao e gestao de unidades que usam dashboards para leitura de desempenho.
- Time interno que faz suporte e precisa de consistencia de dados e UX resiliente.

## Escopo por epico

### Epico 1: Date range unificado e consistencia de dados
**Descricao**
Padronizar o envio de data_inicial e data_final em todas as requisicoes, com calculo dinamico por tipo de tag, garantindo consistencia entre periodos atuais e comparacoes.

**Requisitos**
- Garantir que todas as requisicoes enviem data_inicial e data_final (startDate/endDate no backend).
- Cada tag deve calcular dinamicamente data_inicial e data_final com base no tipo da tag.
- Implementar/ajustar tags de periodo: ultimos_7_dias, ultimo_mes_fechado, este_mes, acumulado_do_ano.
- Para Big Numbers, o backend retorna 3 valores: realizado (periodo atual), periodo anterior e previsao do mes.
- O frontend envia apenas data_inicial e data_final referentes ao valor realizado; periodo anterior e previsao do mes vem no mesmo retorno (sem enviar datas adicionais).
- Validar regra de calculo e endpoint usado.
- Conferir se o backend retorna periodo anterior com range correto e a mesma logica de filtros do periodo atual.

**Criterios de aceitacao**
- Todas as chamadas de dados relevantes carregam data_inicial e data_final de forma consistente.
- Para cada tag, existe mapeamento claro entre tipo da tag e calculo do range.
- Para Big Numbers, periodo anterior e previsao do mes respeitam os mesmos filtros do realizado e chegam no mesmo retorno (sem requests extras).
- Nenhum dashboard apresenta divergencia de range entre cards, graficos e tabelas para o mesmo contexto.
- Timezone e regras de corte aplicadas (America/Sao_Paulo, data_final exclusiva, sem dia atual) sem excecoes.
- Quando aplicavel, realizado/periodo anterior/previsao do mes sao coerentes e seguem a hierarquia (realizado com maior relevancia).

**Tipos de tag e regra de calculo**
- Tags (fase 2): ultimos_7_dias, ultimo_mes_fechado, este_mes, acumulado_do_ano.
- Tags descontinuadas: ultimos_6_meses (remover) e ultimos_30_dias (substituir).
- Regra global:
  - Timezone: America/Sao_Paulo.
  - data_final e exclusiva e nao inclui o dia atual (vendas nao fechadas).
  - Range representado como [data_inicial, data_final), preferencialmente com cortes em inicio de dia (00:00).
- Regras por tag (America/Sao_Paulo):
  - ultimos_7_dias: data_final = inicio do dia de hoje; data_inicial = data_final - 7 dias.
  - ultimo_mes_fechado: data_final = inicio do primeiro dia do mes atual; data_inicial = inicio do primeiro dia do mes anterior.
  - este_mes: data_final = inicio do dia de hoje; data_inicial = inicio do primeiro dia do mes atual.
  - acumulado_do_ano: data_final = inicio do dia de hoje; data_inicial = inicio do dia 01/01 do ano atual.

**Valores por dado (tripla - Big Numbers)**
- Realizado: `currentDate` (valor no range do periodo selecionado; startDate/endDate enviados pelo frontend).
- Periodo anterior: `previousDate` (retornado no mesmo payload; frontend nao envia datas adicionais).
- Previsao do mes: `monthlyForecast` (retornado no mesmo payload; frontend apenas exibe).

**Contrato de API (Big Numbers)**
- Endpoints de Big Numbers por dashboard (todos com `startDate/endDate`):
  - General (Company): `GET /api/Company/kpis/date-range?startDate=DD/MM/YYYY&endDate=DD/MM/YYYY`
  - Operational (Governance): `GET /api/Governance/kpis/date-range?startDate=DD/MM/YYYY&endDate=DD/MM/YYYY`
  - Reservations (Bookings): `GET /api/Bookings/bookings/date-range?startDate=DD/MM/YYYY&endDate=DD/MM/YYYY`
  - Restaurant (Restaurants): `GET /api/Restaurants/restaurants/date-range?startDate=DD/MM/YYYY&endDate=DD/MM/YYYY`
- Cobertura atual: 4 dashboards x 4 unidades = 16 endpoints (mesmo contrato para todas as unidades).
 - Estrutura minima (Big Numbers):
  - `BigNumbers` (e/ou `BigNumbersEcommerce`): array de objetos
    - `currentDate`: objeto com as metricas do realizado
    - `previousDate`: objeto com as metricas do periodo anterior (normalmente com sufixo `PreviousData`)
    - `monthlyForecast`: objeto com as metricas de previsao do mes (normalmente com sufixo `Forecast`)
 - Campos adicionais variam por rota (ex: `Company`, series, tabelas, etc).
- Exemplo de campos (podem variar por unidade/rota):
  - `totalAllValue`, `totalAllRentalsApartments`, `totalAllTicketAverage`, `totalAllRevpar`, `totalAllGiro`, `totalAverageOccupationTime` (string `HH:MM:SS`)
  - Correspondentes em `previousDate`: `...PreviousData`
  - Correspondentes em `monthlyForecast`: `...Forecast`

### Epico 2: Adicionar visualizacoes de tabelas
**Descricao**
Adicionar novas tabelas e ajustes de graficos para ampliar leitura operacional e comparativa.

**Status**
- PENDENTE (dependencia de backend).

**Requisitos**
- Grafico de giro por unidade.
- Tabela de RevPAR: recortes por dia da semana e por categoria de suite.
- Tabela de mais/menos vendidos com receita.
- Ajustar grafico de faturamento por grupo.
- Adicionar 2 tabelas de mais/menos representatividade.

**Dependencias**
- PENDENTE: backend precisa expor/atualizar endpoints e payloads para as novas tabelas e ajustes de graficos.

**Criterios de aceitacao**
- Todas as novas tabelas renderizam com dados corretos no range selecionado.
- Os graficos ajustados mantem coerencia com os demais indicadores do dashboard.
- Tabelas de representatividade exibem ordenacao correta e campos esperados.

### Epico 3: Resiliencia de UI na primeira renderizacao
**Descricao**
Fortalecer a primeira renderizacao para suportar cache frio, rede lenta e erros sem quebrar a experiencia.

**Requisitos**
- Loading: skeleton.
- Vazio: componente nao aparece (sem placeholder/mensagem).
- Erro: exibir um alert no mesmo container do grafico/tabela.
- Nao mudar estrutura do layout: apenas conteudo dentro dos containers.
- Teste de render inicial: hard refresh, cache frio, rede lenta, erro 500.

**Criterios de aceitacao**
- Primeira renderizacao nunca exibe tela quebrada; em loading usa skeleton.
- Estados de loading/erro/vazio seguem o padrao em todas as paginas relevantes.
- Em estado vazio, o componente nao renderiza e o layout nao fica "quebrado" (grid/espacamento consistente).
- Cenarios de rede lenta e erro 500 exibem mensagens claras e recuperaveis.

### Epico 4: Refatoracao de rotas e limpeza tecnica
**Descricao**
Remover rotas antigas e artefatos sem uso para reduzir manutencao e erros.

**Requisitos**
- Identificar rotas antigas e pontos de entrada que nao serao mais usados.
- Remover componentes, paginas, helpers e mocks sem uso.
- Sem imports mortos, sem warnings relevantes, sem rotas orfas.

**Criterios de aceitacao**
- Nenhuma rota obsoleta disponivel para navegacao ou acesso direto.
- Build sem warnings relevantes relacionados a imports mortos ou rotas inexistentes.

### Epico 5: QA e validacao final
**Descricao**
Validar fluxos principais, performance basica e consistencia visual, garantindo estabilidade da fase.

**Requisitos**
- Testar fluxos principais, performance basica e validacao visual dos dashboards.
- Checklist de regressao: rotas, tags, comparacoes, previsao, graficos, tabelas, primeira renderizacao.
- Escopo de regressao: todos os arquivos/telas/componentes tocados (alterados) nesta fase.

**Criterios de aceitacao**
- Checklist completo com evidencias de teste.
- Sem regressao nos dashboards existentes e novas tabelas.

## Requisitos nao funcionais
- Consistencia de dados entre cards, graficos e tabelas para o mesmo range.
- Performance aceitavel em rede lenta para primeira renderizacao (sem travamentos).
- Padrao visual unico para loading, erro e vazio.

## UX e UI
- Definir componentes de fallback reutilizaveis seguindo o padrao:
  - Loading: skeleton.
  - Vazio: componente nao aparece.
  - Erro: alert no mesmo container do grafico/tabela.
- Hierarquia tipografica:
  - Dar maior relevancia para o valor realizado (principal).
  - Periodo anterior e previsao do mes devem ser secundarias, sem competir visualmente com o realizado.
- Manter tipografia e layout atuais, evitando mudancas que exijam redesign.
- Mensagens de erro devem orientar o usuario a tentar novamente ou ajustar filtros.

## Dados, regras e validacoes
- Todas as requisicoes relacionadas a dashboards devem carregar data_inicial e data_final.
- Tags devem encapsular regra de calculo de data_inicial/data_final por tipo.
- Periodo anterior e previsao do mes devem vir no mesmo retorno do backend e usar a mesma logica de filtros do realizado (frontend nao recalcula nem envia ranges extras).
- Validar se cada endpoint consumido corresponde ao range esperado.

## Dependencias e integracoes
- PENDENTE: disponibilidade de endpoints para novas tabelas e ajustes de graficos.
- Contrato de Big Numbers no formato triplo (currentDate/previousDate/monthlyForecast) no mesmo retorno.
- Alinhamento com backend para nome de campos, ordenacao e paginacao (se existir).

## Riscos e mitigacoes
- **Risco:** inconsistencias de range entre telas. **Mitigacao:** validar chamadas e padronizar calculo por tag.
- **Risco:** atraso no backend para novas tabelas. **Mitigacao:** planejar mocks temporarios e feature flag.
- **Risco:** regressao de rotas removidas. **Mitigacao:** checklist de QA e monitoramento de erros.

## Metricas de sucesso
- 100% das requisicoes de dashboards com data_inicial e data_final.
- Zero divergencia de range reportada entre comparacoes e periodo atual.
- Reducao de erros de primeira renderizacao em cache frio.
- Checklist de regressao concluido sem bloqueios.

## Plano de QA
- Fluxos principais: filtros, comparacoes e navegacao entre dashboards.
- Performance basica: hard refresh, cache frio e rede lenta.
- Validacao visual: alinhamento entre cards, graficos e tabelas.
- Validacao de dados: ranges (data_final exclusiva, sem dia atual), periodo anterior e previsao do mes.
- Big Numbers (tripla): validar nos 4 dashboards e 4 unidades (16 endpoints) o formato `currentDate/previousDate/monthlyForecast` e consistencia entre valores.
- Erros: simular erro 500 e validar mensagens e recuperacao.

## Entregas e marcos sugeridos
1. Unificacao de datas e validacao de comparacoes.
2. Novas tabelas e ajustes de graficos (PENDENTE backend).
3. Resiliencia de UI + limpeza tecnica.
4. QA completo e fechamento da fase.

## Perguntas em aberto
- Nenhuma (todos os Big Numbers seguem `currentDate/previousDate/monthlyForecast`).

## Registro de tarefas (Fase 2)

### Task 1 - Mapeamento de entrypoints de dados (23/01/2026)

**Escopo mapeado**
- Dashboards (paginas principais) e unidades.
- Actions (server actions) que orquestram os fetches.
- HTTP clients (camada de chamadas a API).
- Nao ha fetch direto em componentes visuais; os dados entram via pages/actions.

**Dashboards (paginas principais)**
- `src/app/(dashboard)/general/page.tsx` -> usa `getGeneralPageData`.
  - Com `startDate/endDate`: `getCompanyCustom` (date-range).
  - Sem `startDate/endDate`: `getCompany` (period) **nao envia startDate/endDate**.
- `src/app/(dashboard)/operational/page.tsx` -> usa `getOperationalPageData`.
  - Com `startDate/endDate`: `getOperationCustom` (date-range).
  - Sem `startDate/endDate`: `getGovernance` (period) **nao envia startDate/endDate**.
- `src/app/(dashboard)/reservations/page.tsx` -> usa `getReservationPageData`.
  - Com `startDate/endDate`: `getReservationsCustom` (date-range).
  - Sem `startDate/endDate`: `getBookings` (period) **nao envia startDate/endDate**.
- `src/app/(dashboard)/restaurant/page.tsx` -> usa `getRestaurantPageData`.
  - Com `startDate/endDate`: `getRestaurantsCustom` (date-range).
  - Sem `startDate/endDate`: `getRestaurants` (period) **nao envia startDate/endDate**.

**Unidades (paginas por unidade)**
- General:
  - `src/app/(dashboard)/general/(unidades)/lushipiranga/page.tsx`
  - `src/app/(dashboard)/general/(unidades)/lushlapa/page.tsx`
  - `src/app/(dashboard)/general/(unidades)/tout/page.tsx`
  - `src/app/(dashboard)/general/(unidades)/andardecima/page.tsx`
  - Padrao: com `startDate/endDate` -> `getCompanyCustomAction`; sem -> `getCompanyAction` (period) **nao envia startDate/endDate**.
- Operational:
  - `src/app/(dashboard)/operational/(unidades)/lushipiranga/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/lushlapa/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/tout/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/andardecima/page.tsx`
  - Padrao: com `startDate/endDate` -> `getOperationCustomAction`; sem -> `getGovernanceAction` (period) **nao envia startDate/endDate**.
- Reservations:
  - `src/app/(dashboard)/reservations/(unidades)/lushipiranga/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/lushlapa/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/tout/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/andardecima/page.tsx`
  - Padrao: com `startDate/endDate` -> `getReservationsCustomAction`; sem -> `getReservationsAction` (period) **nao envia startDate/endDate**.
- Restaurant:
  - `src/app/(dashboard)/restaurant/(unidades)/lushipiranga/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/lushlapa/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/tout/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/andardecima/page.tsx`
  - Padrao: com `startDate/endDate` -> `getRestaurantsCustomAction`; sem -> `getRestaurantsAction` (period) **nao envia startDate/endDate**.

**Actions (server actions)**
- Com `startDate/endDate` (OK):
  - `src/actions/getCompanyCustom.ts`
  - `src/actions/getoperationsCustom.ts`
  - `src/actions/reservations/get-reservations-custom.ts`
  - `src/actions/restaurants/get-restaurant-custom.ts`
- Condicionais (com fallback period sem startDate/endDate):
  - `src/actions/initial-pages/general.ts` -> fallback `getCompany`.
  - `src/actions/initial-pages/operation.ts` -> fallback `getGovernance`.
  - `src/actions/reservations/get-reservations-page.ts` -> fallback `getBookings`.
  - `src/actions/restaurants/get-restaurant-page.ts` -> fallback `getRestaurants`.
  - `src/actions/initial-pages/reservation.ts` -> mesmo padrao (nao encontrei uso direto em pages).
- Sempre period (nao envia startDate/endDate):
  - `src/actions/getCompany.ts`
  - `src/actions/getGovernance.tsx`
  - `src/actions/reservations/get-reservations.ts`
  - `src/actions/restaurants/get-restaurants.ts`

**HTTP clients**
- Com `startDate/endDate` (OK):
  - `src/http/company/getCompanyCustom.ts` -> `Company/kpis/date-range?startDate=&endDate=`
  - `src/http/operation/get-governance-custom.ts` -> `Governance/kpis/date-range?startDate=&endDate=`
  - `src/http/reservations/get-bookings-custom.ts` -> `Bookings/bookings/date-range?startDate=&endDate=`
  - `src/http/restaurant/get-restaurant-custom.ts` -> `Restaurants/restaurants/date-range?startDate=&endDate=`
- Period-only (nao envia startDate/endDate):
  - `src/http/company/getCompany.ts` -> `Company/kpis?period=`
  - `src/http/operation/get-governance.ts` -> `Governance/operational?period=`
  - `src/http/reservations/get-bookings.ts` -> `Bookings/bookings?period=`
  - `src/http/restaurant/get-restaurants.ts` -> `Restaurants/restaurants?period=`

**Resumo do que ainda nao envia startDate/endDate**
- Todos os fluxos que usam `period` (actions e http clients listados acima) continuam sem `startDate/endDate`.
- Nas paginas (dashboards/unidades), isso ocorre sempre que `startDate/endDate` nao estao presentes na URL (fallback para `period`).

### Task 2 - Util de calculo de range (23/01/2026)

**O que foi feito**
- Criado util unico de range em `src/lib/date-range.ts`.
- Garante calculo de datas com base em `America/Sao_Paulo`, com `data_final` exclusiva (inicio do dia atual no fuso) e sem incluir o dia atual.
- Inclui helpers para soma/subtracao de dias/meses e `startOfMonth/startOfYear`, preparando as tags da Task 3.
- Formata `DD/MM/YYYY` a partir de partes de data (sem depender de timezone local).

**Arquivos afetados**
- `src/lib/date-range.ts`

**Validacoes**
- Sem validacao via chrome-devtools (nao aplicavel nesta etapa).

### Task 5 - Padronizacao de startDate/endDate (23/01/2026)

**O que foi feito**
- Adicionado helper de formatacao no util de range (`formatDateInput`) para normalizar `startDate/endDate` em `DD/MM/YYYY`.
- FormFilter passa a enviar `startDate/endDate` ja formatados na query.
- Paginas de dashboards e unidades usam o helper para repassar datas ao backend, removendo a formatacao via `date-fns`.

**Arquivos afetados (principais)**
- `src/lib/date-range.ts`
- `src/app/(dashboard)/_components/FormFilter.tsx`
- `src/app/(dashboard)/**/page.tsx` (dashboards e unidades)

**Validacoes**
- Sem validacao via chrome-devtools (nao aplicavel nesta etapa).

### Task 6 - Requisicoes sempre com startDate/endDate (23/01/2026)

**O que foi feito**
- Actions de dashboards/unidades passaram a sempre calcular o range pelo `set` (tag normalizada) e chamar apenas endpoints `date-range`.
- Removido o fallback para endpoints por `period`, garantindo que cada request respeite o range selecionado.

**Arquivos afetados (principais)**
- `src/actions/getCompany.ts`
- `src/actions/getGovernance.tsx`
- `src/actions/reservations/get-reservations.ts`
- `src/actions/restaurants/get-restaurants.ts`
- `src/actions/initial-pages/*`
- `src/actions/reservations/get-reservations-page.ts`
- `src/actions/restaurants/get-restaurant-page.ts`

**Validacoes**
- Sem validacao via chrome-devtools (nao aplicavel nesta etapa).

### Task 7 - Validacao de consistencia de filtros (23/01/2026)

**O que foi feito**
- Validacao confirmada para a consistencia de filtros do realizado.

**Pendencias relacionadas**
- Enviar cookies de auth nas rotas de `Governance/Bookings/Restaurants` (hoje apenas `Company` envia), para manter consistencia entre todos os dashboards.

**Validacoes**
- Sem validacao via chrome-devtools (pendente auth local).

### Task 3 - Tags de periodo e labels (23/01/2026)

**O que foi feito**
- Centralizadas as tags de periodo e labels em `src/lib/date-range.ts` (`DATE_RANGE_TAGS`, `DEFAULT_RANGE_TAG`, `getRangeLabel/getRangeDescription`, `getRangeByTag`).
- UI de filtros atualizada para usar as novas tags e labels (Header e filtro mobile), com default `ultimos_7_dias`.
- Paginas de dashboards e unidades passaram a usar `rangeDescription` (label unico) em Big Numbers.
- Actions passaram a interpretar as novas tags e calcular `startDate/endDate` via util, chamando endpoints `date-range` quando o `set` for uma tag nova.
- Charts ajustados para habilitar data labels apenas em ranges curtos (tag de 7 dias), evitando excesso de labels em periodos longos.

**Arquivos afetados (principais)**
- `src/lib/date-range.ts`
- `src/app/(dashboard)/_components/HeaderClient.tsx`
- `src/app/(dashboard)/_components/filter-mobile.tsx`
- `src/app/(dashboard)/_components/FormFilter.tsx`
- `src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`
- `src/app/(dashboard)/_components/charts/AreaChartsApexDouble.tsx`
- `src/app/(dashboard)/_components/charts/LineChart.tsx`
- `src/app/(dashboard)/**/page.tsx` (dashboards e unidades)
- `src/actions/getCompany.ts`, `src/actions/getGovernance.tsx`, `src/actions/reservations/get-reservations.ts`, `src/actions/restaurants/get-restaurants.ts`
- `src/actions/initial-pages/*`, `src/actions/reservations/get-reservations-page.ts`, `src/actions/restaurants/get-restaurant-page.ts`
- `src/middleware.ts`, `src/app/(public)/login/_components/formLogin.tsx`, `src/app/(dashboard)/_components/SidebarMenu.tsx`, `src/app/(dashboard)/_components/menu-mobile.tsx`

**Validacoes**
- Sem validacao via chrome-devtools (nao aplicavel nesta etapa).

### Task 4 - Remocao/substituicao de tags descontinuadas (23/01/2026)

**O que foi feito**
- Normalizacao de tags legadas no util: 30days/6months e ultimos_30_dias/ultimos_6_meses agora mapeiam para ultimo_mes_fechado e acumulado_do_ano.
- Middleware redireciona URLs com `set` legado para as tags novas, evitando inconsistencias de filtro.
- Limpeza de referencias a tags legadas em actions e ajuste no grafico de unidade (LineChartsApexUnity).

**Arquivos afetados (principais)**
- `src/lib/date-range.ts`
- `src/middleware.ts`
- `src/actions/initial-pages/*`, `src/actions/getCompany.ts`, `src/actions/getGovernance.tsx`, `src/actions/reservations/*`, `src/actions/restaurants/*`
- `src/app/(dashboard)/_components/charts/LineChartsApexUnity.tsx`

**Validacoes**
- Sem validacao via chrome-devtools (nao aplicavel nesta etapa).
