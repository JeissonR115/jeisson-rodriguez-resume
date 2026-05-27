# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + production build
npm run lint       # ESLint
npm run format     # Prettier
npm run preview    # Preview production build
npm run deploy     # Build and deploy to GitHub Pages
```

## Architecture

**Stack:** React 19 + TypeScript, Vite 8, React Router 7 (hash-based), SCSS, i18next, Lucide React, React Compiler (Babel plugin).

Hash-based routing is required for GitHub Pages compatibility (`/jeisson-rodriguez-resume/` base path).

### Directory layout

```
src/
├── assets/         # Fonts (Inter, JetBrainsMono) and images
├── components/
│   ├── layout/     # Header, Footer
│   └── ui/         # Reusable UI components (Button, Tag, Modal, Icon, FAB, Carousel, Logo, TableOfContents)
├── context/theme/  # ThemeProvider — sets data-theme on <html>, falls back to prefers-color-scheme
├── data/           # Static JSON: profile, social, projects, skills
├── i18n/           # i18next setup
├── locales/en|es/  # Translation files per namespace (home, about, experience, projects, skills, education, nav)
├── services/
│   ├── modal/      # ModalProvider + portal — global modal management
│   └── fab/        # FabProvider + portal — Floating Action Button management
├── pages/          # home/, about/ (skills/education/experience sections), projects/
├── router/         # Route config + forward/backward transition direction logic
├── styles/
│   ├── base/       # CSS reset, typography globals
│   └── _variables.scss  # CSS custom properties (colors, fonts, spacing)
├── helpers/        # Small utilities (typedEntries.ts)
├── App.tsx         # Root layout with animated routing
└── main.tsx        # Entry point — wraps app in ThemeProvider, ModalProvider, FabProvider, i18n
```

### Key patterns

**Global providers** (`main.tsx`): `ThemeProvider`, `ModalProvider`, `FabProvider`, and i18next. Each service (modal, FAB) exposes a context + custom hook (`useModal`, `useFab`) and renders its UI via a React portal.

**Route transitions**: `router/` detects direction (forward/backward) based on route index order and applies `app__content--forward` / `app__content--backward` CSS classes to drive enter/exit animations.

**SCSS variables**: `_variables.scss` is auto-imported into every component stylesheet via Vite's `preprocessorOptions`. Use CSS custom properties for theming; the `data-theme` attribute on `<html>` switches the active theme.

**i18n**: All user-visible strings live in `locales/{en,es}/*.json`. The `AppResources` type in `i18n/` provides TypeScript-safe translation keys. Add new strings to both language files together.

**Path alias**: `@/` resolves to `./src/`.

### Code style

Prettier: 4-space indent, single quotes, trailing commas, 80-char line width. ESLint enforces React Hooks rules and TypeScript types. Prefix intentionally unused variables with `_`.
