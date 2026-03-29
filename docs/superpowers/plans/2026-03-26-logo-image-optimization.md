# Logo Image Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir a renderização dos logos com `next/image` para preservar o tamanho visual atual sem distorção e com tuning explícito de `sizes/priority`.

**Architecture:** Introduzir um wrapper leve para logos com caixa fixa e `Image` em modo `fill`, reutilizado nos pontos above-the-fold do dashboard e login. Validar a mudança com uma regressão E2E focada nos warnings de imagem e reexecutar os testes já existentes das tasks 01-03.

**Tech Stack:** Next.js App Router, React, `next/image`, Playwright, TypeScript, ESLint.

---

## Chunk 1: Regressão e utilitário compartilhado

### Task 1: Cobrir o warning atual e preparar o componente de logo

**Files:**
- Create: `e2e/logo-image-optimization.spec.ts`
- Create: `src/components/ui/logo-image.tsx`
- Modify: `playwright.config.ts` (somente se o spec precisar de configuração nova)

- [ ] **Step 1: Write the failing test**

Adicionar um spec Playwright que abra login/dashboard e capture os warnings de `next/image` ligados ao `logo-analytics`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/logo-image-optimization.spec.ts`
Expected: FAIL com warning de LCP/aspect ratio ainda presente.

- [ ] **Step 3: Write minimal implementation**

Criar um componente de apoio para logos com:
- caixa visual fixa;
- `Image` com `fill`;
- `object-contain`;
- `sizes` obrigatório;
- `priority` opcional.

- [ ] **Step 4: Run focused checks**

Run: `npm run lint -- src/components/ui/logo-image.tsx e2e/logo-image-optimization.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/logo-image.tsx e2e/logo-image-optimization.spec.ts
git commit -m "feat: add shared optimized logo image component"
```

## Chunk 2: Aplicar nos pontos above-the-fold

### Task 2: Migrar sidebar, login e loading para o wrapper otimizado

**Files:**
- Modify: `src/app/(dashboard)/_components/SidebarMenu.tsx`
- Modify: `src/app/(public)/login/page.tsx`
- Modify: `src/app/(dashboard)/loading.tsx`
- Modify: `src/components/ui/logo-image.tsx` (se precisar pequeno ajuste)

- [ ] **Step 1: Write the failing assertion updates**

Ajustar o spec para cobrir:
- logo principal do login;
- logos secundários do login;
- logo da sidebar;
- logo do loading.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/logo-image-optimization.spec.ts`
Expected: FAIL enquanto os componentes ainda usam configuração antiga.

- [ ] **Step 3: Write minimal implementation**

Substituir os usos atuais de `Image` pelos wrappers com:
- mesma largura/altura visual da UI atual;
- `sizes` coerente por contexto;
- `priority` apenas nos logos principais acima da dobra.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/logo-image-optimization.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/(dashboard)/_components/SidebarMenu.tsx src/app/(public)/login/page.tsx src/app/(dashboard)/loading.tsx src/components/ui/logo-image.tsx e2e/logo-image-optimization.spec.ts
git commit -m "fix: optimize above-the-fold logo images"
```

## Chunk 3: Verificação cruzada

### Task 3: Revalidar regressões relacionadas

**Files:**
- Test: `e2e/preset-prefetch.spec.ts`
- Test: `e2e/session-bootstrap.spec.ts`
- Test: `e2e/rsc-navigation-dedup.spec.ts`

- [ ] **Step 1: Run lint**

Run: `npm run lint -- "src/app/(dashboard)/_components/SidebarMenu.tsx" "src/app/(public)/login/page.tsx" "src/app/(dashboard)/loading.tsx" src/components/ui/logo-image.tsx e2e/logo-image-optimization.spec.ts`
Expected: PASS.

- [ ] **Step 2: Run typecheck**

Run: `npx tsc -p tsconfig.json --noEmit`
Expected: PASS.

- [ ] **Step 3: Run focused Playwright suite**

Run: `npx playwright test e2e/logo-image-optimization.spec.ts e2e/preset-prefetch.spec.ts e2e/session-bootstrap.spec.ts e2e/rsc-navigation-dedup.spec.ts`
Expected: PASS.

- [ ] **Step 4: Summarize residual warnings**

Registrar se ainda restar algum warning fora do escopo da task.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-03-26-logo-image-optimization-design.md docs/superpowers/plans/2026-03-26-logo-image-optimization.md
git commit -m "docs: add plan for logo image optimization"
```
