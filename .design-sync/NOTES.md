# design-sync notes

## Why this repo needed a workaround (read before re-syncing)

This repo is a personal Vite app (`private: true`), not a published component-library package — there's no `module`/`main`/`exports` in `package.json` and no library build. The converter was run in **synth-entry mode**, with two layers of workaround on top:

- **No `.d.ts`** — component discovery comes entirely from `cfg.componentSrcMap` pins (7 names), not from a shipped types tree. `.d.ts` prop extraction is therefore weaker than a real build would give.
- **CSS doesn't compile standalone.** Every component does `import './x.scss'`, but none of those `.scss` files `@use` their own variables — they rely on a Vite-only mechanism (`vite.config.ts`'s `css.preprocessorOptions.scss.additionalData`) that auto-prepends `@use "_variables.scss" as *;` to every `.scss` file at Vite build time. Raw esbuild (what the converter bundles with) has no Sass support and no equivalent auto-injection, so bundling the real `src/components/ui/**` files directly would fail outright.

**The fix**: `.design-sync/scripts/precompile-scss.mjs` reproduces Vite's prepend step and compiles each component's `.scss` (plus the global `reset+typography` stylesheet) to real `.css` via the `sass` package, writing output under `.design-sync/synth-src/`. `.design-sync/synth-src/<name>/index.tsx` are byte-for-byte copies of the real `src/components/ui/<name>/index.tsx` files with only the stylesheet import swapped from `.scss` to the precompiled `.css`. `.design-sync/synth-entry.mjs` re-exports all 7 from there and is the build's `cfg.entry`.

**To re-sync after the real components change**: re-run `node .design-sync/scripts/precompile-scss.mjs`, then re-copy the upstream logic changes into the matching `.design-sync/synth-src/<name>/index.tsx` file (the CSS-fixed copies are NOT auto-regenerated from `src/` — only their stylesheets are). A diff between `src/components/ui/<name>/index.tsx` and `.design-sync/synth-src/<name>/index.tsx` should show nothing but the one import line.

## Scope decisions

- **`TableOfContents`/`SmartToc` is excluded.** It requires three of this app's own context providers (`react-i18next`, `FabProvider`, `ModalProvider`) to render at all — it's page-specific glue (scroll-spy + this site's own modal/FAB), not a portable design-system component. `cfg.componentSrcMap` pins it to `null`.
- **Button's `as="link"`/`as="navlink"` variants aren't demoed.** `Button` ships pre-bundled into `_ds_bundle.js` with its own copy of `react-router-dom`; a preview-local `<MemoryRouter>` is bundled separately by the preview compiler and gets a *different* `react-router-dom` module instance, so the two don't share React context (`useContext(NavigationContext)` resolves to `null` — same class of problem the bundle's `reactShim` solves for `react`/`react-dom`, just not extended to `react-router-dom`). The preview only demos `as="button"` (default) and `as="a"`.

## Known render warns (re-syncs: don't treat these as new)

- **`Icon` glyphs render as empty boxes.** `Icon` renders `<use href="/icons.svg#<id>-icon">` against this site's own `public/icons.svg` sprite. That sprite isn't part of the uploaded bundle and nothing in the claude.ai/design preview iframe serves it at that path, so the glyph is invisible everywhere it's used (the `Icon` preview, and as `Button`'s `icon` prop if anyone authors that composition later). Labels/layout around the icon are real and correct. Graded "good" — see `.design-sync/.cache/review/Icon.grade.json` for the reasoning.
- **`Modal`/`Fab` previews are visually clipped in local validation, by design.** Both are `position: fixed` overlays (`inset: 0` for Modal, viewport-corner-anchored for Fab). The converter's `cardMode: "single"` wrapper makes itself the containing block for `position: fixed` descendants via a CSS transform — but the wrapper has no intrinsic height, so its `align-items: center` / inset math collapses toward a zero-height anchor in `package-validate.mjs`'s local screenshot tool, clipping content above the fold (most visible on Modal's title). The real claude.ai/design card sizes the container from the `viewport` override (`Fab`: 320×160, `Modal`: 480×500 with `primaryStory: "Confirm"`), which a real product card render should size correctly even though the local capture doesn't. Triaged as benign; not re-chased on re-sync. `package-validate.mjs` prints `[RENDER_THIN]` for `Modal` every run — expected.
- **`Carousel`'s photo 404s.** `src/data/projects.json`'s `api-rest` entry references `api.png`/`api-2.png` under `/projects/`, but `public/projects/` isn't populated in this repo yet — this is a real gap in the live site's own data today, not a sync artifact. The preview uses the exact real data; nav arrows/dots/frame render correctly, the `<img>` itself shows the browser's broken-image icon.

## Re-sync risks

- The `.design-sync/synth-src/` copies are **hand-maintained mirrors**, not generated — if `src/components/ui/<name>/index.tsx` changes (new props, new markup), the synth-src copy will silently drift unless someone updates it too. Diff the two on every re-sync.
- `.design-sync/scripts/precompile-scss.mjs` hardcodes the 7 component `.scss` paths plus `src/styles/base/globals.scss` — a new `ui/` component needs a line added there AND a `componentSrcMap`/synth-src entry, or its styles won't ship.
- The font-url rewrite in `precompile-scss.mjs` assumes fonts live under `src/assets/fonts/` and are referenced from `typography.scss` as `/src/assets/fonts/...` — if that path convention changes, the regex needs updating or `[FONT_MISSING]`/dangling `@font-face` will silently degrade brand fonts to system fallbacks.
- No playwright-render-checked confirmation of the *actual* claude.ai/design card sizing behavior for the Modal/Fab overlay clipping noted above — only inferred from how `cardMode`/`viewport` are documented to work. Worth a visual sanity check in the live project after first open.
