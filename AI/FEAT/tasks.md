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

7. [x] Criar utilitário único para formatação visual de CPF (`000.000.000-00`) e normalização de valor para envio ao backend.

Resumo da conclusão (2026-02-12):
- Criado utilitário único em `src/lib/cpf.ts` com as funções:
  - `normalizeCpf(value)`: remove caracteres não numéricos e limita em 11 dígitos (payload backend).
  - `formatCpf(value)`: aplica máscara visual progressiva `000.000.000-00` para exibição e digitação.
- Implementação preparada para reaproveitamento nas próximas tasks de CPF (tabela, criação e edição), evitando duplicidade de regra.
- Validação técnica executada:
  - lint do arquivo: `npm run lint -- src/lib/cpf.ts`;
  - smoke test com `tsx` cobrindo casos vazio, parcial, completo, valor mascarado e valor com excesso de dígitos.
- Arquivos atualizados: `src/lib/cpf.ts`, `AI/feat/tasks.md`.

8. [x] Aplicar máscara de CPF na coluna da tabela de usuários em Settings.

Resumo da conclusão (2026-02-12):
- Coluna `CPF` da tabela de usuários em Settings atualizada para usar o utilitário central `formatCpf` criado na task 7.
- Ajuste aplicado em `src/app/(dashboard)/settings/_components/Columns.tsx`, mantendo fallback seguro para valor vazio/nulo.
- Máscara exibida no padrão `000.000.000-00` sem alterar estrutura/ordenação da tabela.
- Validação técnica executada: `npm run lint -- src/app/(dashboard)/settings/_components/Columns.tsx`.
- Arquivos atualizados: `src/app/(dashboard)/settings/_components/Columns.tsx`, `AI/feat/tasks.md`.

9. [x] Aplicar máscara de CPF no formulário de criação de usuário, com formatação em tempo de digitação.

Resumo da conclusão (2026-02-12):
- Campo `CPF` do modal de criação (`ModalCreateUser`) atualizado para aplicar máscara durante digitação usando utilitário central:
  - exibição: `formatCpf(field.value)`;
  - armazenamento no form/payload: `normalizeCpf(event.target.value)` (somente dígitos).
- Ajuste aplicado em `src/app/(dashboard)/settings/_components/ModalCreateUser.tsx`, mantendo integração com `react-hook-form` e validação existente via `zod-br-tax-id`.
- Validação técnica executada:
  - lint do arquivo: `npm run lint -- src/app/(dashboard)/settings/_components/ModalCreateUser.tsx`;
  - verificação por script de que `zod-br-tax-id` aceita CPF com e sem máscara (usando CPFs válidos).
- Arquivos atualizados: `src/app/(dashboard)/settings/_components/ModalCreateUser.tsx`, `AI/feat/tasks.md`.

10. [x] Aplicar máscara de CPF no formulário de edição de usuário, com formatação em tempo de digitação.

Resumo da conclusão (2026-02-12):
- Campo `CPF` do formulário de edição (`FormUpdate`) atualizado para aplicar máscara durante digitação usando utilitário central:
  - exibição: `formatCpf(field.value)`;
  - armazenamento no form/payload: `normalizeCpf(event.target.value)` (somente dígitos).
- `defaultValues.cpf` normalizado com `normalizeCpf(user.cpf)` para garantir consistência de payload mesmo sem edição do campo.
- Validação técnica executada: `npm run lint -- src/app/(dashboard)/settings/_components/formUpdate.tsx`.
- Arquivos atualizados: `src/app/(dashboard)/settings/_components/formUpdate.tsx`, `AI/feat/tasks.md`.

11. [x] Garantir compatibilidade da máscara com as validações existentes e com o payload final enviado nas ações de criar/editar usuário.

Resumo da conclusão (2026-02-12):
- Schemas ajustados para normalizar CPF antes de validar e para tratar string vazia como ausência no update:
  - `src/lib/formSchemaUser.ts`: `cpf` agora é `z.preprocess(...normalizeCpf...)` + validação `zod-br-tax-id`.
  - `src/lib/formSchemaUserUpdate.ts`: `cpf` agora é `z.preprocess` com `normalizeCpf`, convertendo `''` para `undefined` (compatível com `.optional()`).
- Actions ajustadas para garantir payload normalizado mesmo fora do fluxo de UI:
  - `src/actions/createUser.ts`: sempre envia `cpf` normalizado (somente dígitos).
  - `src/actions/updateUser.ts`: envia `cpf` normalizado quando existir; quando vazio, omite (fica `undefined`).
- Validação técnica executada:
  - lint: `npm run lint -- src/lib/formSchemaUser.ts`, `npm run lint -- src/lib/formSchemaUserUpdate.ts`, `npm run lint -- src/actions/createUser.ts`, `npm run lint -- src/actions/updateUser.ts`;
  - script `tsx` validando `safeParse` dos schemas (CPF válido com e sem máscara; update aceitando `''` como ausência).
- Arquivos atualizados: `src/lib/formSchemaUser.ts`, `src/lib/formSchemaUserUpdate.ts`, `src/actions/createUser.ts`, `src/actions/updateUser.ts`, `AI/feat/tasks.md`.

## Assunto: Calendário Mobile (iPhone)

12. [x] Corrigir o fluxo de interação do calendário no mobile iPhone (Safari), ajustando abertura, foco, toque e sobreposição do popover quando necessário.

Resumo da conclusão (2026-02-12):
- Ajuste aplicado para evitar conflitos de foco/toque em iOS quando o filtro de datas é renderizado dentro de `Sheet` (Radix Dialog) no mobile.
- `PopoverContent` passou a suportar desativação de portal via prop `portalled`:
  - `src/components/ui/popover.tsx`: adicionada prop `portalled?: boolean` (default `true`).
- `FormFilter` parametrizado para repassar `portalled` e tornar `initialFocus` condicional:
  - `src/app/(dashboard)/_components/FormFilter.tsx`: adicionada prop `popoverPortalled?: boolean` (default `true`).
- No mobile (Sheet), `FormFilter` agora renderiza popovers **sem portal**:
  - `src/app/(dashboard)/_components/filter-mobile.tsx`: `<FormFilter popoverPortalled={false} />`.
- Validação técnica executada:
  - lint: `npm run lint -- src/components/ui/popover.tsx`, `npm run lint -- src/app/(dashboard)/_components/FormFilter.tsx`, `npm run lint -- src/app/(dashboard)/_components/filter-mobile.tsx`.
- Arquivos atualizados: `src/components/ui/popover.tsx`, `src/app/(dashboard)/_components/FormFilter.tsx`, `src/app/(dashboard)/_components/filter-mobile.tsx`, `AI/feat/tasks.md`.

13. [ ] Validar seleção de data inicial/final e aplicação do filtro após o ajuste, confirmando atualização correta da URL e dos dados da página.

## Assunto: Navegação e Permissão da Unidade LIV

14. [x] Incluir a unidade LIV no mapeamento de acesso/rota para os 4 módulos, respeitando as regras de permissão definidas por perfil e unidade.

Resumo da conclusão (2026-02-13):
- Unidade `LIV` adicionada ao mapeamento global de unidades (value/label/slug) e regras de acesso.
- Regra aplicada:
  - `ADMIN/LHG`: acesso total.
  - `GERENTE_GERAL` da própria unidade (`LIV`): acesso aos 4 módulos.
  - Demais perfis na unidade `LIV`: sem acesso aos módulos.
- Normalização de `role`/`unit` passou a ser usada nas checagens de acesso (tolerando valores legados/labels) para evitar bloqueios por variação de payload.
- Validação técnica executada: `npm run lint -- src/lib/access-control.ts src/proxy.ts`.
- Arquivos atualizados: `src/lib/access-control.ts`, `src/proxy.ts`, `AI/feat/tasks.md`.

15. [x] Habilitar navegação da unidade LIV no menu lateral desktop para General, Restaurant, Reservations e Operational.

Resumo da conclusão (2026-02-13):
- Adicionado card/link da unidade `LIV` nas páginas de módulos (desktop), seguindo o padrão das demais unidades:
  - General: `/general/liv?menu=general&set={preSet}`
  - Restaurant: `/restaurant/liv?menu=restaurant&set={preSet}`
  - Reservations: `/reservations/liv?menu={menu}&set={preSet}` (mantido padrão existente dessa página)
  - Operational: `/operational/liv?menu=operational&set={preSet}`
- O enable/disable do card fica automaticamente coerente via `CardLink` + `canAccessRoute` (task 14): perfis sem acesso à LIV veem o card desabilitado.
- Validação técnica executada: `npm run lint -- src/app/(dashboard)/general/page.tsx src/app/(dashboard)/restaurant/page.tsx src/app/(dashboard)/reservations/page.tsx src/app/(dashboard)/operational/page.tsx`.
- Arquivos atualizados: `src/app/(dashboard)/general/page.tsx`, `src/app/(dashboard)/restaurant/page.tsx`, `src/app/(dashboard)/reservations/page.tsx`, `src/app/(dashboard)/operational/page.tsx`, `AI/feat/tasks.md`.

16. [x] Habilitar navegação da unidade LIV no menu mobile para General, Restaurant, Reservations e Operational.

Resumo da conclusão (2026-02-13):
- BackBtn (mobile) ajustado para reconhecer unidades dinamicamente pelo slug (2º segmento da URL) usando `UNIT_SLUG_TO_UNIT`, incluindo `liv` sem hardcode.
- Isso garante navegação de retorno ao módulo ao acessar páginas de unidade no mobile (General/Restaurant/Reservations/Operational).
- Validação técnica executada: `npm run lint -- src/components/back-btn.tsx`.
- Arquivos atualizados: `src/components/back-btn.tsx`, `AI/feat/tasks.md`.


## Assunto: Páginas LIV e Integração de Dados

17. [x] Criar tipagens de domínio LIV necessárias para suportar integração segura entre camada HTTP, actions e UI nos 4 módulos.

Resumo da conclusão (2026-02-13):
- Criado pacote de tipagens da unidade LIV em `src/types/liv/`, reaproveitando os tipos de Big Numbers já existentes (`src/types/big-numbers-*.ts`).
- Incluídos tipos compartilhados e 4 contratos de resposta (um por módulo): General, Restaurant, Reservations e Operational.
- Validação técnica executada: `npm run lint -- src/types/liv`.
- Arquivos adicionados: `src/types/liv/shared.ts`, `src/types/liv/company.ts`, `src/types/liv/restaurant.ts`, `src/types/liv/reservations.ts`, `src/types/liv/operational.ts`, `src/types/liv/index.ts`.
- Arquivo atualizado: `AI/feat/tasks.md`.

18. [x] Implementar/adaptar camada HTTP LIV por módulo com autenticação, timeout, retry, cache condicional, tags e logging de erro no padrão do projeto.

Resumo da conclusão (2026-02-13):
- Criado client HTTP dedicado da unidade LIV (`api_liv`) baseado em `ky`, com suporte a `BACKEND_ENDPOINT_LIV` (fallback para a URL homolog `https://analytics-dev.lhgmoteis.com.br/liv/liv/api`).
- Adicionado helper server-side para autenticação via `Authorization: Bearer <access_token>` (e `cookie`), lendo tokens dos cookies: `buildBackendAuthHeaders`.
- Implementados 4 fetchers tipados (um por módulo) com `AbortController` (30s), retry (502/503/504 + TypeError), `withConditionalCache` (tags + keyParts) e logs de erro:
- General: `src/http/liv/get-liv-company.ts` (`Company/kpis/date-range`)
- Restaurant: `src/http/liv/get-liv-restaurant.ts` (`Restaurants/restaurants/date-range`)
- Reservations: `src/http/liv/get-liv-reservations.ts` (`Bookings/bookings/date-range`)
- Operational: `src/http/liv/get-liv-operational.ts` (`Governance/kpis/date-range`)
- Validação técnica executada: `npm run lint -- src/http/liv src/http/api-client.ts src/lib/auth-headers.ts`.
- Arquivos atualizados: `src/http/api-client.ts`, `src/lib/auth-headers.ts`, `AI/feat/tasks.md`.

19. [x] Criar/adaptar actions server-side da LIV retornando contrato padronizado (`ok`, `data`, `error`) para consumo das páginas.

Resumo da conclusão (2026-02-13):
- Criadas actions server-side da unidade LIV com contrato padronizado `{ ok, data, error }`, seguindo o padrão das actions existentes de “page data”.
- Implementadas 4 actions (uma por módulo), com suporte a preset (`period`) e intervalo customizado (`startDate/endDate`) via `normalizeRangeTag/getRangeByTag`:
- General: `src/actions/liv/get-liv-company-page.ts`
- Restaurant: `src/actions/liv/get-liv-restaurant-page.ts`
- Reservations: `src/actions/liv/get-liv-reservations-page.ts`
- Operational: `src/actions/liv/get-liv-operational-page.ts`
- Validação técnica executada: `npm run lint -- src/actions/liv`.
- Arquivo atualizado: `AI/feat/tasks.md`.

20. [x] Implementar as 4 páginas da unidade LIV reaproveitando estrutura/componentes das páginas de unidade já existentes:
  - `src/app/(dashboard)/general/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/liv/page.tsx`

Resumo da conclusão (2026-02-13):
- Criadas as 4 páginas da unidade `LIV` nos módulos General, Restaurant, Reservations e Operational, reaproveitando layout/estrutura e componentes já usados nas outras unidades.
- Validação técnica executada: `npm run lint -- src/app/(dashboard)/general/(unidades)/liv/page.tsx src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx src/app/(dashboard)/reservations/(unidades)/liv/page.tsx src/app/(dashboard)/operational/(unidades)/liv/page.tsx`.
- Arquivos adicionados: `src/app/(dashboard)/general/(unidades)/liv/page.tsx`, `src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`, `src/app/(dashboard)/reservations/(unidades)/liv/page.tsx`, `src/app/(dashboard)/operational/(unidades)/liv/page.tsx`.
- Arquivo atualizado: `AI/feat/tasks.md`.

21. [x] Integrar as 4 páginas LIV às actions de dados com suporte a filtros por preset e por intervalo customizado.

Resumo da conclusão (2026-02-13):
- As 4 páginas `/.../liv` foram integradas às actions LIV (`src/actions/liv/*`), suportando:
- preset: query `set` (UI) -> `period` (action) -> `getRangeByTag`;
- custom: query `startDate/endDate` -> `formatDateInput` -> action.
- Validações executadas:
- `npm run lint -- src/actions/liv src/app/(dashboard)/general/(unidades)/liv/page.tsx src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx src/app/(dashboard)/reservations/(unidades)/liv/page.tsx src/app/(dashboard)/operational/(unidades)/liv/page.tsx`
- `npx tsc -p tsconfig.json --noEmit`
- Arquivo atualizado: `AI/feat/tasks.md`.

22. [x] Mapear e renderizar todos os KPIs/blocos definidos para a unidade LIV, garantindo estabilidade da UI em cenários de sucesso, vazio e falha.

Resumo da conclusão (2026-02-13):
- Conferida a cobertura do PRD: as 4 páginas da unidade `LIV` (General, Restaurant, Reservations e Operational) renderizam os blocos/KPIs definidos na v1.
- Hardenings aplicados para evitar crash em payload parcial/ausente (mantendo padrão das outras unidades):
- Operational/LIV: resolução dinâmica da chave do turno “manhã” (compatível com variações de encoding), fallback `null` para séries ausentes e estado de erro quando `TeamSizing` não vier.
- Reservations/LIV: proteção de acesso a `series/categories` com fallback `null` e tabela com fallback seguro para o primeiro item de `KpiTableByChannelType`.
- Restaurant/LIV: defaults (arrays/objetos vazios) para todos os blocos que alimentam charts/tabelas, evitando `data.map`/`data.series.map` com `undefined`.
- Validações executadas:
- `npm run lint -- src/app/(dashboard)/operational/(unidades)/liv/page.tsx src/app/(dashboard)/reservations/(unidades)/liv/page.tsx src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`
- `npx tsc -p tsconfig.json --noEmit`
- Arquivos atualizados: `src/app/(dashboard)/operational/(unidades)/liv/page.tsx`, `src/app/(dashboard)/reservations/(unidades)/liv/page.tsx`, `src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`, `AI/feat/tasks.md`.

## Assunto: Validação Final e Fechamento

23. [ ] Executar regressão funcional dos módulos com big numbers para confirmar consistência da nova descrição e ausência de impacto colateral.
24. [ ] Executar regressão do fluxo de usuários em Settings (tabela, criação e edição) validando máscara e persistência de CPF.
25. [ ] Validar navegação e carregamento da unidade LIV nos 4 módulos (desktop e mobile) para perfis autorizados e não autorizados.
26. [ ] Registrar evidências de validação (incluindo teste em iPhone/Safari) e concluir entrega quando todos os critérios de aceite do PRD forem atendidos.






