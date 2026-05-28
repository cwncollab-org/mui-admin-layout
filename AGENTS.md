# AGENTS.md — mui-admin-layout

> This document is written for AI coding agents integrating `@cwncollab-org/mui-admin-layout` into a consumer project. For human-oriented documentation (overview, screenshots, publishing), see [`README.md`](README.md).

This guide gives an AI coding agent the minimum facts needed to integrate this library into a consumer project — either via the published npm package (Option A) or by copying the source files directly (Option B).

## Project facts

- Package: `@cwncollab-org/mui-admin-layout`, version `1.2.0`.
- Module format: ESM only (`"type": "module"`). Entry: `./dist/index.js`. Types: `./dist/index.d.ts`.
- License: MIT.
- Source of truth for the public API: `src/lib/index.ts`.
- Source of truth for the version and peer-dep versions: `package.json`.
- Peer dependencies (exact versions expected in the host app):
  - `react@19.2.5`
  - `react-dom@19.2.5`
  - `@mui/material@9.0.0`
  - `@emotion/react@11.14.0`
  - `@emotion/styled@11.14.0`
  - `@tanstack/react-router@1.168.23`
- Public API (re-exported from `src/lib/index.ts`):
  - Components: `AdminLayout`, `AdminLayoutProvider`, `AppBar`, `NotFoundPage`
  - Hooks: `useAppBarStateValue`, `useIsMobile`, `useLayoutState`, `useLayoutStateValue`
  - Utilities: `isPlaceholderNavList`
  - Types: `NavItem`, `NavList`, `PlaceholderNavList`
- Required provider wrapping order: `ThemeProvider` → `CssBaseline` → `AdminLayoutProvider` → `AdminLayout`.
- Routing assumption: the host app uses TanStack Router. `AdminLayout` renders its children inside the layout shell; pages are typically rendered via `<Outlet />`.

## Option A — Install via npm (recommended)

Prerequisite: the host project's `.npmrc` must map the `@cwncollab-org` scope to the AWS CodeArtifact registry:

```
@cwncollab-org:registry=https://cwncollab-619005574504.d.codeartifact.ap-southeast-1.amazonaws.com/npm/cwncollab/
```

Authentication to that registry is the consumer's responsibility (typically `aws codeartifact login --tool npm ...`).

```bash
# Install the library
npm install @cwncollab-org/mui-admin-layout

# Install peer dependencies (skip any the host already has at matching versions)
npm install react@19.2.5 react-dom@19.2.5 \
  @mui/material@9.0.0 @emotion/react@11.14.0 @emotion/styled@11.14.0 \
  @tanstack/react-router@1.168.23
```

Minimal integration sketch:

```tsx
import {
  AdminLayout,
  AdminLayoutProvider,
} from '@cwncollab-org/mui-admin-layout'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Outlet } from '@tanstack/react-router'

const theme = createTheme()

const navList = {
  items: [{ label: 'Dashboard', path: '/dashboard' }],
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminLayoutProvider mobileMaxWidth={600}>
        <AdminLayout title="My App" navList={navList}>
          <Outlet />
        </AdminLayout>
      </AdminLayoutProvider>
    </ThemeProvider>
  )
}
```

See the Usage section of [`README.md`](README.md) for a fuller example with avatar and menu items.

## Option B — Vendor the source (no npm access)

Use this when the consumer project cannot reach AWS CodeArtifact (no AWS credentials, air-gapped environment, etc.).

1. Plain-copy the entire `src/lib/` directory from this repository into the consumer project, e.g. to `<consumer>/src/mui-admin-layout/`. The tree to copy:

   ```
   src/lib/
     AdminLayout.tsx
     AdminLayoutProvider.tsx
     index.ts
     hooks/
     layout/
     pages/
     provider/
   ```

2. Install the same peer dependencies listed in [Project facts](#project-facts) into the consumer project.

3. Replace any import of the package specifier with a relative path to the vendored folder:

   ```ts
   // Before (Option A)
   import { AdminLayout } from '@cwncollab-org/mui-admin-layout'

   // After (Option B)
   import { AdminLayout } from './mui-admin-layout'
   ```

4. Notes:
   - The vendored files are `.tsx` ESM sources — no build step is required. Any TS-aware bundler (Vite, Next.js, etc.) will transpile them.
   - Preserve the MIT `LICENSE` notice when redistributing the copied code.
   - Keep the folder structure intact; internal imports within `src/lib/` are relative.

## Common pitfalls

- Calling `useAppBarStateValue` / `useLayoutStateValue` / `useLayoutState` outside an `AdminLayoutProvider` subtree throws at runtime.
- Omitting `<CssBaseline />` causes incorrect spacing and scrolling behavior.
- Mismatched peer-dep major versions (especially MUI v9, React 19, TanStack Router) will cause type errors and/or runtime failures.
- Hooks used outside the `AdminLayout` tree will not see the expected layout context.
