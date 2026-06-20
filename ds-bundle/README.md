## Setup

**Wrap any composition that uses `Header`, `Home`, or `Button`'s `as="link"`/`as="navlink"` forms in `<MemoryRouter>`** (from `react-router-dom`, bundled into this DS — see the provider chain in the auto-generated section below). Every other component renders standalone with no required context — `Footer`, `Projects`, and the About sub-sections (`AboutSection`, `ExperienceSection`, `EducationSection`, `SkillsSection`) take no props and read their content straight from real site data and i18next, no provider needed.

Two more things to know:

- Page-level content (`Header`'s nav labels, `Home`'s hero copy, all four About sub-sections, `Projects`) comes from this site's real i18next instance (default language: Spanish, `es`) — it is already initialized when the bundle loads, nothing to wrap or configure. There's no language-switching prop; `Header`'s own language button calls `i18n.changeLanguage()` internally.
- Icons are passed in as children, not as a prop string: `<Button icon={<Sun size={16} />} iconOnly aria-label="Light mode" />` using `lucide-react`. There is also a site-specific `Icon` component (`<Icon id="github" size="md" />`, used by `Footer`) that renders an `<svg><use></use></svg>` against this site's own `/icons.svg` sprite — that sprite isn't part of this bundle, so `Icon` renders an empty box in any design; prefer `lucide-react` icons for new compositions.

## Styling: CSS custom properties + BEM-style component classes

There is no utility-class system. Each component owns a small set of BEM-ish classes (`.btn`, `.btn--primary`, `.btn--sm`, `.btn__icon`, …) that read color/spacing/type from CSS custom properties defined once on `:root` (light) and overridden under `[data-theme='dark']`:

| Token | Use |
|---|---|
| `--color-primary` / `--color-primary-light` | brand orange — primary actions, links, accents |
| `--color-bg` / `--color-bg-secondary` / `--color-bg-elevated` | page background, secondary surface, raised surface (cards, modals) |
| `--color-text` / `--color-text-strong` | body text, headings/emphasis |
| `--color-border` | borders on outlined elements (secondary buttons, FAB) |
| `--color-black` / `--color-white` | fixed black/white, theme-independent |
| `--header-height` | layout offset used by sticky elements |

Don't invent new component classes or utility classes — style new layout glue with inline styles or plain CSS reading these same `var(--color-*)` tokens, and toggle `data-theme="dark"` on an ancestor element to preview the dark theme.

## Where the truth lives

- `styles.css` — the single stylesheet to link; it `@import`s the tokens/fonts and `_ds_bundle.css` (every component's compiled styles).
- `fonts/fonts.css` — the two brand families (`Inter` for body text, `JetBrains Mono` for headings/UI chrome/buttons — see `--font-mono`/`--font-sans` usage in each component's source).
- `components/general/<Name>/<Name>.prompt.md` — per-component usage notes and the real `<Name>Props` contract in `<Name>.d.ts`.

## Example

```tsx
import { Button, Tag } from 'jeisson-rodriguez-resume';

function ProjectCard() {
    return (
        <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <Tag label="React" />
                <Tag label="TypeScript" />
            </div>
            <Button variant="primary">View project</Button>
        </div>
    );
}
```

# JeissonRodriguezResume (jeisson-rodriguez-resume@0.0.0)

This design system is the published jeisson-rodriguez-resume React library, bundled as a single
browser global. All 15 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.JeissonRodriguezResume`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.JeissonRodriguezResume.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { AboutSection } = window.JeissonRodriguezResume;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<AboutSection />);
```

Wrap the tree in the provider — most components read theme/i18n from context:

```jsx
<MemoryRouter>{children}</MemoryRouter>
```

## Tokens

11 CSS custom properties from jeisson-rodriguez-resume. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (10): `--color-primary`, `--color-primary-light`, `--color-bg`, …
- **other** (1): `--header-height`

## Components

### about
- `AboutSection`
- `EducationSection`
- `ExperienceSection`
- `SkillsSection`

### general
- `Button`
- `Carousel`
- `Fab`
- `Icon`
- `Logo`
- `Modal`
- `Tag`

### layout
- `Footer`
- `Header`

### pages
- `Home`
- `Projects`
