# Personal CV - React + TypeScript
[Español](README.es.md)

---
This project is a personal web CV built with React, TypeScript, and Vite, focused on performance, scalability, and clean architecture.

It supports multi-language content using JSON files, making it easy to maintain and extend.

---

## Tech Stack

- React
- Vite
- TypeScript
- Prettier + ESLint
- JSON-based i18n

---

## Project Structure

```
src/
 ├── assets/        # Static files (images, icons, etc.)
 ├── components/    # Reusable UI components
 ├── layouts/       # Layout components
 ├── pages/         # Main pages (Home, About, etc.)
 ├── i18n/          # Language files (en.json, es.json)
 ├── hooks/         # Custom hooks
 ├── types/         # TypeScript types and interfaces
 └── App.tsx
```

---

## Multi-language Strategy

Each language is defined in a JSON file:

```
src/i18n/
 ├── en.json
 └── es.json
```

Example:

```json
{
  "name": "Jeisson Rodriguez",
  "title": "Software Developer",
  "about": "I build scalable systems..."
}
```

This approach provides:

- Easy translation management
- Clear separation between content and logic
- Scalability for additional languages

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

---

## Code Quality

Format all files:

```bash
npm run format
```

Lint project:

```bash
npm run lint
```

---

## VS Code Setup

Recommended extensions:

- Prettier
- ESLint

Recommended settings:

```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

---

## Future Improvements

- Add dark and light theme support
- Implement animations with Framer Motion
- Improve accessibility (a11y)
- Add SEO optimization
- Deploy to GitHub Pages or Vercel

---

## License

This project is open-source and available under the MIT License.

---

## Author

**Jeisson Rodriguez**  
Software Developer

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repository and submit pull requests.