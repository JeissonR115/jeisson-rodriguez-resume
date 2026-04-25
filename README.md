# Personal CV - React + TypeScript
[Español](README.es.md)
---

Personal portfolio built with React, TypeScript, and Vite, focused on performance, scalability, and clean architecture.
Supports multiple languages and themes via JSON configuration files.

---

## Tech Stack

- React
- Vite
- TypeScript
- SCSS
- Prettier + ESLint

---

## Project Structure

```
src/
├── assets/           # Static files (images, icons)
├── components/       # Reusable UI components
├── config/           # Global configuration
│   ├── pages/        # Page content (home.json, ...)
│   ├── navigation.json
│   ├── projects.json
│   └── social.json
├── context/          # Global contexts
│   ├── theme/        # ThemeContext, ThemeProvider, useTheme
│   └── language/     # LanguageContext, LanguageProvider, useLanguage
├── hooks/            # Custom hooks (usePageConfig, ...)
├── pages/            # Main pages
├── styles/           # Global SCSS
│   ├── base/
│   ├── utilities/
│   └── _variables.scss
└── App.tsx
```

---

## Multi-language Strategy

Texts live in `config/pages/` with embedded `i18n` structure:

```json
{
  "hero": {
    "i18n": {
      "es": { "greeting": "Hola, soy" },
      "en": { "greeting": "Hi, I'm" }
    }
  }
}
```

The `usePageConfig` hook resolves the active language automatically:

```tsx
const { hero, about } = usePageConfig(homeConfig);
```

---

## Theming

Theme switching uses CSS variables + `data-theme` on `<html>`:

```scss
:root { --color-bg: #ece7e5; }
[data-theme='dark'] { --color-bg: #242426; }
```

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Code Quality

```bash
npm run format   # Prettier
npm run lint     # ESLint
```

---

## VS Code Setup

```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

---

## Future Improvements

- Animations with Framer Motion
- Accessibility improvements (a11y)
- Dynamic SEO meta tags
- Deploy to GitHub Pages or Vercel

---

## License

MIT

---

## Author

**Jeisson Rodriguez** — Software Developer