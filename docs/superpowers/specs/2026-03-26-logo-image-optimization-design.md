# Task 04 Design: Logo Image Optimization

## Goal

Corrigir o uso de `next/image` nos logos visíveis acima da dobra para:
- preservar exatamente o footprint visual atual;
- eliminar distorção por proporção incorreta;
- reduzir variantes desnecessárias geradas pelo `Image`;
- resolver os warnings atuais de LCP/aspect ratio ligados aos logos.

## Findings

- `logo-analytics.png` tem proporção real `960x410`, mas hoje é renderizado em múltiplas caixas com proporções diferentes:
  - dashboard sidebar: `120x100`
  - login desktop: `280x80`
  - login mobile: `140x80`
  - dashboard loading: `360x200`
- Os logos secundários do login também têm caixas manuais independentes da proporção real do arquivo.
- Os warnings observados nos testes E2E apontam:
  - logo above-the-fold sem prioridade/LCP tuning adequado;
  - redimensionamento CSS que altera um eixo sem preservar explicitamente o outro.

## Scope

Arquivos em escopo:
- `src/app/(dashboard)/_components/SidebarMenu.tsx`
- `src/app/(public)/login/page.tsx`
- `src/app/(dashboard)/loading.tsx`

Arquivos candidatos de apoio:
- um componente pequeno compartilhado para renderizar logos com caixa fixa e `object-contain`;
- testes E2E ou ajustes nos existentes para validar que os warnings do logo deixam de aparecer.

Fora de escopo:
- alterar layout, spacing ou hierarquia da tela;
- mexer na arte dos assets;
- otimizações de imagens não relacionadas aos logos.

## Design

### 1. Caixa visual fixa, imagem proporcional

Cada logo continuará ocupando a mesma caixa visual que ocupa hoje. Em vez de forçar a proporção pelo par `width/height` direto no `Image`, a renderização passará a usar uma caixa posicionada (`relative`) com largura/altura fixas e um `Image` com `fill` + `object-contain`.

Isso mantém o footprint visual e evita esticar/comprimir a arte.

### 2. Tuning explícito de `sizes`

Cada logo terá `sizes` coerente com o tamanho efetivamente renderizado:
- sidebar do dashboard: largura pequena e fixa;
- login desktop: logo principal maior, logos secundários pequenos;
- login mobile: largura pequena e fixa;
- loading: logo central largo, mas ainda limitado.

Isso reduz downloads acima do necessário e evita variantes exageradas.

### 3. `priority` apenas onde existe disputa de LCP

Receberão `priority`:
- logo principal do login desktop;
- logo principal do login mobile;
- logo principal da sidebar;
- logo do loading.

Não receberão `priority`:
- logos secundários do login (`Lush`, `Tout`, `Andar de Cima`, `Liv`).

### 4. Acessibilidade

- Logo principal com `alt` descritivo.
- Logos secundários tratados como decorativos se não adicionarem informação útil além do contexto visual do branding.

## Testing Strategy

1. Reproduzir o warning atual com Playwright, preferencialmente no login e na dashboard.
2. Implementar o ajuste mínimo para passar no cenário de regressão.
3. Validar que:
   - o layout visível dos logos não mudou;
   - os warnings do `logo-analytics` deixam de aparecer;
   - não surgem regressões nas tasks 01-03.

## Risks

- Pequenas diferenças perceptivas de alinhamento interno quando `object-contain` passar a respeitar a proporção real da arte.
- `priority` excessivo, se aplicado em logos secundários, poderia piorar a rede inicial; por isso ficará restrito aos principais.
