# CV Personal - React + TypeScript

[English](README.md)

---

Este proyecto es un CV web personal desarrollado con React, TypeScript y Vite, enfocado en rendimiento, escalabilidad y arquitectura limpia.

Soporta contenido multi-idioma mediante archivos JSON, lo que facilita su mantenimiento y extensión.

---

## Tecnologías

- React
- Vite
- TypeScript
- Prettier + ESLint
- JSON-based i18n

---

## Estructura del Proyecto

```
src/
 ├── assets/        # Archivos estáticos (imágenes, iconos, etc.)
 ├── components/    # Componentes UI reutilizables
 ├── layouts/       # Componentes de estructura
 ├── pages/         # Páginas principales (Inicio, Acerca de, etc.)
 ├── i18n/          # Archivos de idioma (en.json, es.json)
 ├── hooks/         # Hooks personalizados
 ├── types/         # Tipos e interfaces de TypeScript
 └── App.tsx
```

---

## Estrategia Multi-idioma

Cada idioma se define en un archivo JSON:

```
src/i18n/
 ├── en.json
 └── es.json
```

Ejemplo:

```json
{
  "name": "Jeisson Rodriguez",
  "title": "Desarrollador de Software",
  "about": "Construyo sistemas escalables..."
}
```

Este enfoque proporciona:

- Gestión sencilla de traducciones
- Separación clara entre contenido y lógica
- Escalabilidad para agregar más idiomas

---

## Primeros Pasos

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar servidor de desarrollo

```bash
npm run dev
```

---

## Calidad de Código

Formatear todos los archivos:

```bash
npm run format
```

Ejecutar linter:

```bash
npm run lint
```

---

## Configuración de VS Code

Extensiones recomendadas:

- Prettier
- ESLint

Configuración recomendada:

```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

---

## Mejoras Futuras

- Agregar soporte para tema oscuro y claro
- Implementar animaciones con Framer Motion
- Mejorar accesibilidad (a11y)
- Agregar optimización SEO
- Desplegar en GitHub Pages o Vercel

---

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## Autor

**Jeisson Rodriguez**  
Desarrollador de Software

---

## Contribuciones

Las contribuciones, reportes de issues y sugerencias son bienvenidas. Puedes hacer fork del repositorio y enviar pull requests.