<!-- @format -->

# Tasks - PRD Ajustes de Big Numbers, CPF, Calendário Mobile e Unidade LIV (4 Módulos)

## Assunto: Alinhamentos de Escopo e Contrato

1. [x] Validar com backend se o campo `previousDate` representa comparação com ano anterior em todos os endpoints de KPIs usados no dashboard.

Resumo da conclusão (2026-02-12):
- Semântica de `previousDate` confirmada como **ano anterior** por definição de produto/backlog (confirmação direta do time + evidência de payload real compartilhada na conversa).
- Base de backend validada para LIV: `https://analytics-dev.lhgmoteis.com.br/liv/liv/api`.
- Rotas de KPI identificadas e mapeadas via Swagger dessa base:
  - `/Company/kpis/date-range`
  - `/Governance/kpis/date-range`
  - `/Bookings/bookings/date-range`
  - `/Restaurants/restaurants/date-range`
- Verificação técnica complementar: endpoints ativos e protegidos por token (`401` sem autenticação).
- Arquivo atualizado: `AI/feat/tasks.md`.

2. [x] Definir e registrar regra de acesso da unidade LIV por perfil (incluindo comportamento para ADMIN e demais gerências).

Resumo da conclusão (2026-02-12):
- Regra de acesso da LIV definida com base no padrão já aplicado às outras unidades/módulos:
  - `ADMIN` (`LHG`): acesso total;
  - `GERENTE_GERAL`: acesso à LIV da própria unidade;
  - `GERENTE_FINANCEIRO`, `GERENTE_OPERACIONAL`, `GERENTE_RESERVAS`, `GERENTE_RESTAURANTE`: sem acesso.
- Restrição por unidade mantida para não-admin (mesma política atual do projeto).
- Regra registrada no PRD em `AI/feat/prd.md`.
- Validação por consistência com matriz de acesso em `src/lib/access-control.ts` e proteção de rotas em `src/proxy.ts`.
- Arquivo atualizado: `AI/feat/tasks.md`.

3. [x] Confirmar endpoint(s), parâmetros e contrato de resposta do backend LIV para períodos preset (`set`) e intervalo customizado (`startDate`/`endDate`).

Resumo da conclusão (2026-02-12):
- Base backend LIV confirmada: `https://analytics-dev.lhgmoteis.com.br/liv/liv/api`.
- Endpoints por módulo confirmados:
  - General: `GET /Company/kpis/date-range`
  - Restaurant: `GET /Restaurants/restaurants/date-range`
  - Reservations: `GET /Bookings/bookings/date-range`
  - Operational: `GET /Governance/kpis/date-range`
- Contrato de parâmetros confirmado:
  - `startDate` obrigatório (`DD/MM/YYYY`)
  - `endDate` obrigatório (`DD/MM/YYYY`)
  - autenticação `Bearer` obrigatória (`401` sem token).
- Contrato funcional para período confirmado:
  - preset (`set`): convertido no front para `startDate/endDate` (backend não recebe `set`);
  - customizado: envio direto de `startDate/endDate` formatado.
- Contrato de resposta definido por referência às APIs atuais (tipagem adaptada conforme necessidade).
- Registro consolidado no PRD em `AI/feat/prd.md`.

4. [x] Definir o conjunto mínimo de KPIs e blocos de dados da primeira versão da unidade LIV (4 páginas: General, Restaurant, Reservations e Operational).

Resumo da conclusão (2026-02-12):
- Escopo funcional da LIV alterado para 4 páginas, uma por módulo, seguindo a mesma estrutura das outras unidades.
- Conjunto mínimo de blocos definido por página, espelhando os blocos já em produção:
  - General/LIV: `BigNumbers`, `BillingRentalType`, `RevenueBySuiteCategory`, `TrevparByDate`, `RevparByDate`, `RevenueByDate`, `RentalsByDate`, `TicketAverageByDate`, `OccupancyRateByDate`, `OccupancyRateBySuiteCategory`, `DataTableSuiteCategory` + `TotalResult`, `DataTableGiroByWeek`, `DataTableRevparByWeek`, `DataTableOccupancyRateByWeek`.
  - Restaurant/LIV: `BigNumbers`, `RevenueAbByPeriod`, `RevenueAbByPeriodPercent`, `TicketAverageByPeriod`, `BestSellingFood`, `LeastSellingFood`, `BestSellingDrinks`, `LeastSellingDrinks`, `RevenueByGroupPeriod`, `RevenueFoodByPeriod`, `RevenueDrinksByPeriod`, `ReportByFood`, `ReportByDrinks`, `ReportByOthers`.
  - Reservations/LIV: `BigNumbers`, `ReservationsByRentalType`, `PaymentMethods`, `BillingPerChannel`, `BillingOfReservationsByPeriod`, `RepresentativenessOfReservesByPeriod`, `NumberOfReservationsPerPeriod`, `KpiTableByChannelType`, `BigNumbersEcommerce`, `ReservationsOfEcommerceByPeriod`, `BillingOfEcommerceByPeriod`.
  - Operational/LIV: `BigNumbers`, `SupervisorsPerformance`, `ShiftCleaning`, `CleaningByDate`, `EmployeeCleaningByShift`, `EmployeeReport`, `TeamSizing`.
- Registro consolidado no PRD em `AI/feat/prd.md`.
- Arquivo atualizado: `AI/feat/tasks.md`.

## Assunto: Big Numbers (Descrição de Ano Anterior)

5. [x] Atualizar a origem da descrição de comparação temporal para exibir semântica de ano anterior (substituindo "Período anterior" por "Ano anterior", ou texto aprovado).

Resumo da conclusão (2026-02-12):
- Fonte única de descrição temporal ajustada em `src/lib/date-range.ts`, na função `getRangeDescription`, com troca de `Período anterior` para `Ano anterior`.
- Como os módulos e páginas de unidade consomem essa função compartilhada, a mudança foi propagada de forma global para os big numbers.
- Validação técnica realizada com busca em `src` para garantir ausência de ocorrências remanescentes de `Período anterior`.
- Arquivos atualizados: `src/lib/date-range.ts`, `AI/feat/tasks.md`.

6. [x] Garantir que todos os componentes de big numbers exibam a nova descrição de forma consistente sem quebrar fallback quando `previousDate` não existir.

Resumo da conclusão (2026-02-12):
- Fallback ajustado em `src/utils/generate-description.ts` para tratar `0` como valor válido de comparação (agora retorna vazio apenas para `null`/`undefined`).
- Com isso, cards que usam `generateDescription` em Operational e Restaurant deixam de omitir a descrição quando o valor de ano anterior é `0`.
- Consistência global confirmada: páginas de módulos/unidades continuam recebendo `rangeDescription` via `getRangeDescription`.
- Validação estática executada:
  - sem ocorrências de `Período anterior` em `src`;
  - usos de `getRangeDescription` e `generateDescription` mapeados nos componentes de big numbers.
- Arquivos atualizados: `src/utils/generate-description.ts`, `AI/feat/tasks.md`.

## Assunto: CPF (Tabela + Formulários)

7. [ ] Criar utilitário único para formatação visual de CPF (`000.000.000-00`) e normalização de valor para envio ao backend.
8. [ ] Aplicar máscara de CPF na coluna da tabela de usuários em Settings.
9. [ ] Aplicar máscara de CPF no formulário de criação de usuário, com formatação em tempo de digitação.
10. [ ] Aplicar máscara de CPF no formulário de edição de usuário, com formatação em tempo de digitação.
11. [ ] Garantir compatibilidade da máscara com as validações existentes e com o payload final enviado nas ações de criar/editar usuário.

## Assunto: Calendário Mobile (iPhone)

12. [ ] Corrigir o fluxo de interação do calendário no mobile iPhone (Safari), ajustando abertura, foco, toque e sobreposição do popover quando necessário.
13. [ ] Validar seleção de data inicial/final e aplicação do filtro após o ajuste, confirmando atualização correta da URL e dos dados da página.

## Assunto: Navegação e Permissão da Unidade LIV

14. [ ] Incluir a unidade LIV no mapeamento de acesso/rota para os 4 módulos, respeitando as regras de permissão definidas por perfil e unidade.
15. [ ] Habilitar navegação da unidade LIV no menu lateral desktop para General, Restaurant, Reservations e Operational.
16. [ ] Habilitar navegação da unidade LIV no menu mobile para General, Restaurant, Reservations e Operational.

## Assunto: Páginas LIV e Integração de Dados

17. [ ] Criar tipagens de domínio LIV necessárias para suportar integração segura entre camada HTTP, actions e UI nos 4 módulos.
18. [ ] Implementar/adaptar camada HTTP LIV por módulo com autenticação, timeout, retry, cache condicional, tags e logging de erro no padrão do projeto.
19. [ ] Criar/adaptar actions server-side da LIV retornando contrato padronizado (`ok`, `data`, `error`) para consumo das páginas.
20. [ ] Implementar as 4 páginas da unidade LIV reaproveitando estrutura/componentes das páginas de unidade já existentes:
  - `src/app/(dashboard)/general/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/liv/page.tsx`
21. [ ] Integrar as 4 páginas LIV às actions de dados com suporte a filtros por preset e por intervalo customizado.
22. [ ] Mapear e renderizar todos os KPIs/blocos definidos para a unidade LIV, garantindo estabilidade da UI em cenários de sucesso, vazio e falha.

## Assunto: Validação Final e Fechamento

23. [ ] Executar regressão funcional dos módulos com big numbers para confirmar consistência da nova descrição e ausência de impacto colateral.
24. [ ] Executar regressão do fluxo de usuários em Settings (tabela, criação e edição) validando máscara e persistência de CPF.
25. [ ] Validar navegação e carregamento da unidade LIV nos 4 módulos (desktop e mobile) para perfis autorizados e não autorizados.
26. [ ] Registrar evidências de validação (incluindo teste em iPhone/Safari) e concluir entrega quando todos os critérios de aceite do PRD forem atendidos.
