<!-- @format -->

# PRD - Ajustes de Big Numbers, CPF, Calendário Mobile e Unidade LIV (4 Módulos)

## 1. Resumo

Este documento define o planejamento de produto e técnico para um pacote único de melhorias no LHG Analytics com foco em:

- padronização semântica de comparação temporal nos big numbers;
- melhoria de usabilidade e qualidade de dados de CPF;
- correção de interação do calendário em iPhone;
- habilitação e entrega da unidade LIV em 4 páginas: Visão Geral, Restaurantes, Reservas e Operacional.

## 2. Contexto do Problema

Hoje existem quatro frentes principais:

1. A descrição exibida para `previousDate` nos big numbers está genérica (`Período anterior`) e não comunica explicitamente comparação com ano anterior.
2. O campo CPF não possui máscara visual consistente na tabela e nos formulários (criação/edição), o que reduz legibilidade e aumenta risco de entrada inconsistente.
3. Há falha de uso do calendário em mobile iPhone (Safari), impactando aplicação de filtros por data.
4. A unidade LIV ainda não está disponível nas quatro áreas do dashboard (general, restaurant, reservations e operational).

## 3. Objetivos

- Exibir comparação temporal de big numbers com semântica clara de ano anterior.
- Garantir CPF com formato visual padronizado em todos os pontos de contato.
- Tornar o calendário funcional em iPhone para seleção de período.
- Publicar a unidade LIV funcional nas 4 páginas de módulo, reutilizando componentes existentes e integrando com backend.

## 4. Escopo

### 4.1 Em escopo

- Alteração da descrição de `previousDate` em todos os big numbers para referência a ano anterior.
- Máscara de CPF em:
  - tabela de usuários;
  - formulário de criação de usuário;
  - formulário de edição de usuário.
- Correção de comportamento do calendário no mobile iPhone.
- Habilitação de navegação da unidade LIV nos 4 módulos (desktop e mobile).
- Criação de 4 páginas LIV reaproveitando componentes existentes:
  - `/general/liv`
  - `/restaurant/liv`
  - `/reservations/liv`
  - `/operational/liv`
- Criação/adaptação de fetch para backend LIV no padrão existente de `actions` + `http`.
- Integração completa front/back da unidade LIV com tratamento de estados de carregamento/erro/vazio.

### 4.2 Fora de escopo

- Redesenho visual completo do dashboard.
- Alterações de regras de negócio fora do necessário para incluir a unidade LIV nas páginas existentes.
- Refactor estrutural amplo de arquitetura de dados além do necessário para inclusão da LIV.

## 5. Requisitos Funcionais

### RF-01 - Big Numbers: descrição de `previousDate` para ano anterior

- A descrição exibida abaixo dos KPIs deve comunicar comparação com ano anterior.
- O texto deve ser consistente em todos os módulos que renderizam big numbers.
- Deve haver fallback seguro quando `previousDate` não vier no payload.

Resultado esperado:
- Onde hoje aparece `Período anterior ...`, deve aparecer `Ano anterior ...` (ou semântica equivalente aprovada).

### RF-02 - Máscara de CPF na tabela e formulários

- Exibir CPF no formato `000.000.000-00` na tabela de usuários.
- Aplicar máscara em tempo de digitação no formulário de criação.
- Aplicar máscara em tempo de digitação no formulário de edição.
- Garantir compatibilidade com validação já existente e payload para backend (normalizado conforme contrato da API).

Resultado esperado:
- Usuário visualiza CPF sempre mascarado na UI.
- Sistema mantém consistência de validação e persistência.

### RF-03 - Correção do calendário mobile para iPhone

- O componente de seleção de data deve abrir, permitir navegação e seleção no Safari iOS.
- O popover/calendário não pode ficar bloqueado por camada, foco ou evento de toque.
- Após seleção, o valor deve refletir corretamente no campo e no filtro aplicado.

Resultado esperado:
- Filtro por data utilizável em iPhone sem travamento/interação quebrada.

### RF-04 - Habilitar navegação da unidade LIV

- Incluir acesso à unidade LIV nos módulos de menu existentes (General, Restaurant, Reservations, Operational) em desktop e mobile.
- Garantir rotas funcionais com query params no padrão atual (`menu` e `set`).
- Aplicar regra de acesso por perfil.

Regra de acesso definida (2026-02-12):
- `ADMIN` (unidade `LHG`): acesso total.
- `GERENTE_GERAL`: acesso à LIV apenas da própria unidade.
- `GERENTE_FINANCEIRO`, `GERENTE_OPERACIONAL`, `GERENTE_RESERVAS`, `GERENTE_RESTAURANTE`: sem acesso à LIV.
- Usuário não-admin continua sem acesso a unidade diferente da sua.

Resultado esperado:
- Usuário autorizado consegue navegar para as páginas da unidade LIV em cada módulo.

### RF-05 - Criar 4 páginas da unidade LIV com reaproveitamento de componentes

- Criar páginas de unidade LIV no grupo `(dashboard)` para os 4 módulos:
  - General (`/general/liv`)
  - Restaurant (`/restaurant/liv`)
  - Reservations (`/reservations/liv`)
  - Operational (`/operational/liv`)
- Reutilizar componentes já consolidados (header, estados de erro/vazio/loading, blocos de KPI/tabela/charts já usados pelas páginas de unidade atuais).
- Manter padrão visual, de layout e interação das demais unidades.

Conjunto mínimo de KPIs/blocos da v1 (Task 4 - 2026-02-12):
- General/LIV:
  - `BigNumbers`
  - `BillingRentalType`
  - `RevenueBySuiteCategory`
  - `TrevparByDate`
  - `RevparByDate`
  - `RevenueByDate`
  - `RentalsByDate`
  - `TicketAverageByDate`
  - `OccupancyRateByDate`
  - `OccupancyRateBySuiteCategory`
  - `DataTableSuiteCategory` + `TotalResult`
  - `DataTableGiroByWeek`
  - `DataTableRevparByWeek`
  - `DataTableOccupancyRateByWeek`
- Restaurant/LIV:
  - `BigNumbers`
  - `RevenueAbByPeriod`
  - `RevenueAbByPeriodPercent`
  - `TicketAverageByPeriod`
  - `BestSellingFood`
  - `LeastSellingFood`
  - `BestSellingDrinks`
  - `LeastSellingDrinks`
  - `RevenueByGroupPeriod`
  - `RevenueFoodByPeriod`
  - `RevenueDrinksByPeriod`
  - `ReportByFood`
  - `ReportByDrinks`
  - `ReportByOthers`
- Reservations/LIV:
  - `BigNumbers`
  - `ReservationsByRentalType`
  - `PaymentMethods`
  - `BillingPerChannel`
  - `BillingOfReservationsByPeriod`
  - `RepresentativenessOfReservesByPeriod`
  - `NumberOfReservationsPerPeriod`
  - `KpiTableByChannelType`
  - `BigNumbersEcommerce`
  - `ReservationsOfEcommerceByPeriod`
  - `BillingOfEcommerceByPeriod`
- Operational/LIV:
  - `BigNumbers`
  - `SupervisorsPerformance`
  - `ShiftCleaning`
  - `CleaningByDate`
  - `EmployeeCleaningByShift`
  - `EmployeeReport`
  - `TeamSizing`

Resultado esperado:
- As 4 páginas da unidade LIV disponíveis e consistentes com as demais unidades.

### RF-06 - Criar/adaptar fetch para backend LIV

- Criar/adaptar camadas HTTP e actions para LIV seguindo padrão existente:
  - autenticação;
  - retry para falhas transitórias;
  - timeout e tratamento de erro;
  - cache condicional/tag de revalidação.
- Normalizar retorno server-side (`ok`, `data`, `error`) para consumo das páginas.

Contrato técnico confirmado (Task 3 - 2026-02-12):
- Base backend LIV: `https://analytics-dev.lhgmoteis.com.br/liv/liv/api`.
- Endpoints por módulo:
  - `GET /Company/kpis/date-range` (General)
  - `GET /Restaurants/restaurants/date-range` (Restaurant)
  - `GET /Bookings/bookings/date-range` (Reservations)
  - `GET /Governance/kpis/date-range` (Operational)
- Autenticação: `Bearer token` obrigatório (`401` sem token).
- Parâmetros obrigatórios:
  - `startDate` (`DD/MM/YYYY`)
  - `endDate` (`DD/MM/YYYY`)
- Regras de período:
  - `set` é parâmetro de UI/front-end e não é enviado ao backend;
  - preset (`set`) converte para `startDate/endDate`;
  - customizado envia `startDate/endDate` diretamente.
- Contrato de resposta:
  - seguir padrão das APIs já consumidas no projeto;
  - tipagem evolutiva por necessidade, sem bloquear entrega inicial.

Resultado esperado:
- Endpoints LIV consumidos de forma resiliente e padronizada para os 4 módulos.

### RF-07 - Integrar backend e frontend da unidade LIV

- Conectar actions LIV às 4 páginas da unidade.
- Aplicar filtros por preset e por intervalo customizado no mesmo padrão dos módulos atuais.
- Mapear resposta do backend para os componentes da tela.
- Exibir estados de erro/vazio sem quebrar renderização.

Resultado esperado:
- Fluxo completo LIV operacional com dados reais do backend em General, Restaurant, Reservations e Operational.

## 6. Requisitos Não Funcionais

- Compatibilidade mobile: Safari iOS (iPhone) deve ser suportado no filtro de datas.
- Consistência de UX: textos, máscaras e navegação alinhados ao padrão do dashboard.
- Resiliência: fetch LIV com timeout, retry e fallback de erro.
- Observabilidade mínima: logs de erro no server para falhas de integração.

## 7. Impacto Técnico Esperado (Arquivos/Áreas)

### Base já existente a ser ajustada

- `src/lib/date-range.ts`.
- `src/app/(dashboard)/settings/_components/Columns.tsx`.
- `src/app/(dashboard)/settings/_components/ModalCreateUser.tsx`.
- `src/app/(dashboard)/settings/_components/formUpdate.tsx`.
- `src/components/ui/calendar.tsx`.
- `src/app/(dashboard)/_components/FormFilter.tsx`.
- `src/app/(dashboard)/_components/SidebarMenu.tsx`.
- `src/app/(dashboard)/_components/menu-mobile.tsx`.
- `src/lib/access-control.ts`.

### Novos arquivos previstos para LIV

- Páginas:
  - `src/app/(dashboard)/general/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/restaurant/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/reservations/(unidades)/liv/page.tsx`
  - `src/app/(dashboard)/operational/(unidades)/liv/page.tsx`
- Actions e HTTP (por módulo, com reaproveitamento do padrão existente).
- Tipagens LIV (apenas onde necessário para suportar v1).

## 8. Critérios de Aceitação

### CA-01 Big Numbers

- Em todas as telas com big numbers, a descrição do comparativo exibe "Ano anterior".
- Não há regressão quando `previousDate` não existe.

### CA-02 CPF

- CPF é exibido mascarado na tabela.
- CPF é digitado e exibido com máscara nos formulários de criar/editar.
- Submit de criar/editar continua funcionando sem erro de validação.

### CA-03 Calendário iPhone

- Em iPhone (Safari), usuário consegue abrir calendário, trocar mês, selecionar intervalo e aplicar filtro.

### CA-04 Navegação LIV

- Link/unidade LIV aparece e funciona nos 4 módulos para usuários autorizados.
- Navegação desktop e mobile funcionando com query params válidos.

### CA-05 Páginas LIV

- As 4 páginas da unidade LIV renderizam layout completo sem quebrar navegação global.
- Componentes reaproveitados mantêm consistência visual e funcional.

### CA-06 Fetch LIV

- Requisições LIV retornam dados com tratamento de timeout/erro.
- Em falha, UI mostra estado de erro sem crash.

### CA-07 Integração LIV

- Com backend disponível, dados aparecem corretamente na UI em cada módulo.
- Filtros por preset e intervalo customizado funcionam em todas as páginas LIV.

## 9. Plano de Implementação (Fases)

### Fase 1 - Ajustes transversais

1. Ajustar descrição de `previousDate` para "Ano anterior".
2. Implementar máscara/normalização de CPF e aplicar em tabela + forms.
3. Corrigir calendário para Safari iOS e validar.

### Fase 2 - Estruturação da unidade LIV

1. Definir rotas LIV por módulo e permissões de acesso.
2. Habilitar navegação LIV no desktop e mobile.
3. Criar páginas LIV (4 módulos) reaproveitando estrutura das páginas de unidade existentes.

### Fase 3 - Dados LIV ponta a ponta

1. Criar/adaptar camada HTTP LIV por módulo.
2. Criar/adaptar actions server-side LIV com contrato padronizado.
3. Integrar dados nas 4 páginas com estados de loading/erro/vazio.
4. Validar presets e filtro customizado por data em todas as páginas LIV.

### Fase 4 - Validação e estabilização

1. Testes manuais de regressão nos módulos existentes.
2. Testes focados em iPhone Safari e navegação LIV.
3. Ajustes finais de tipagem, mensagens de erro e consistência visual.

## 10. Estratégia de Testes

- Regressão funcional:
  - páginas com big numbers (General, Restaurant, Reservations, Operational);
  - fluxo de usuários em Settings (criar/editar/listar CPF).
- Teste mobile:
  - iPhone/Safari para calendário e filtros.
- Teste funcional LIV:
  - navegação para `/general/liv`, `/restaurant/liv`, `/reservations/liv`, `/operational/liv`;
  - carregamento com preset;
  - carregamento com intervalo customizado;
  - cenários de falha de API.

## 11. Riscos e Mitigações

- Risco: divergência de payload entre LIV e demais unidades.
  - Mitigação: manter integração por referência de módulos existentes e adaptar tipagem incrementalmente.
- Risco: máscara de CPF conflitar com validação Zod existente.
  - Mitigação: normalizar valor antes de persistir/validar, com testes de borda.
- Risco: bug iPhone estar ligado a Popover e não ao Calendar.
  - Mitigação: validar fluxo completo em `FormFilter` com foco em eventos touch/z-index/foco.

## 12. Dependências

- Disponibilidade de token/autenticação para chamadas backend LIV em ambiente dev/homologação.
- Ambiente de teste com acesso ao backend LIV.

## 13. Itens em Aberto para Fechamento

- Definir se a primeira entrega da unidade LIV entrará de uma vez com os 4 módulos ou com feature flag por módulo.

## 14. Definition of Done

A entrega será considerada concluída quando:

- todos os requisitos deste PRD estiverem implementados;
- critérios de aceitação forem atendidos;
- navegação LIV e integração de dados estiverem funcionando para os 4 módulos em homologação;
- validação em iPhone Safari estiver registrada sem bloqueios.
