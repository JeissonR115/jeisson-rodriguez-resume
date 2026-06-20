## Setup

No provider/wrapper is required — every component renders standalone with no required context. Two exceptions to know about:

- `Button` accepts `as="button" | "a" | "link" | "navlink"`. The `link`/`navlink` forms render `react-router-dom`'s `<Link>`/`<NavLink>` and need an ancestor `<Router>` (e.g. `<MemoryRouter>` in a design, `<BrowserRouter>` in the real app) — without one they throw. Default to `as="button"` or `as="a"` unless the design genuinely needs client-side routing.
- Icons are passed in as children, not as a prop string: `<Button icon={<Sun size={16} />} iconOnly aria-label="Light mode" />` using `lucide-react`. There is also a site-specific `Icon` component (`<Icon id="github" size="md" />`) that renders an `<svg><use></use></svg>` against this site's own `/icons.svg` sprite — that sprite isn't part of this bundle, so `Icon` will render an empty box in any design; prefer `lucide-react` icons for new compositions.

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
