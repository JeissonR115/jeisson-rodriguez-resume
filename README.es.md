# CV Personal - React + TypeScript
[English](README.md)
---

Portafolio web personal desarrollado con React, TypeScript y Vite, enfocado en rendimiento, escalabilidad y arquitectura limpia.
Soporta múltiples idiomas y temas mediante archivos de configuración JSON.

---

## Tecnologías

- React
- Vite
- TypeScript
- SCSS
- Prettier + ESLint

---

## Estructura del Proyecto
```
src/
├── assets/           # Archivos estáticos (imágenes, iconos)
├── components/       # Componentes UI reutilizables
├── config/           # Configuración global
│   ├── pages/        # Textos por página (home.json, ...)
│   ├── navigation.json
│   ├── projects.json
│   └── social.json
├── context/          # Contextos globales
│   ├── theme/        # ThemeContext, ThemeProvider, useTheme
│   └── language/     # LanguageContext, LanguageProvider, useLanguage
├── hooks/            # Hooks personalizados (usePageConfig, ...)
├── pages/            # Páginas principales
├── styles/           # SCSS global
│   ├── base/
│   ├── utilities/
│   └── _variables.scss
└── App.tsx
```

---

## Estrategia Multi-idioma

Los textos viven en `config/pages/` con la estructura `i18n` embebida:
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

El hook `usePageConfig` resuelve automáticamente el idioma activo:
```tsx
const { hero, about } = usePageConfig(homeConfig);
```

---

## Temas

El cambio de tema usa CSS variables + `data-theme` en el `<html>`:
```scss
:root { --color-bg: #ece7e5; }
[data-theme='dark'] { --color-bg: #242426; }
```

---

## Primeros Pasos
```bash
npm install
npm run dev
```

---

## Calidad de Código
```bash
npm run format   # Prettier
npm run lint     # ESLint
```

---

## Configuración de VS Code
```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

---

## Mejoras Futuras

- Animaciones con Framer Motion
- Mejoras de accesibilidad (a11y)
- SEO con meta tags dinámicos
- Despliegue en GitHub Pages o Vercel

---

## Licencia

MIT

---

## Autor

**Jeisson Rodriguez** — Desarrollador de Software