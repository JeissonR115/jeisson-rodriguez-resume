// Workaround for design-sync: this repo's component .scss files rely on a
// Vite-only mechanism (vite.config.ts css.preprocessorOptions.scss.additionalData)
// that auto-prepends `@use "_variables.scss" as *;` to every .scss file. The
// design-sync converter bundles with raw esbuild, which has neither Sass
// support nor that auto-injection, so the original .scss imports would break
// the whole bundle build. This script reproduces Vite's prepend step and
// compiles each file standalone with the real `sass` package, so the
// CSS-fixed component copies under .design-sync/synth-src/ can `import` real
// .css instead of .scss. See .design-sync/NOTES.md "Re-sync risks".
import * as sass from 'sass';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const VARIABLES = join(REPO_ROOT, 'src/styles/_variables.scss');
const SYNTH_SRC = join(REPO_ROOT, '.design-sync/synth-src');

// Vite resolves a leading-`/` Sass URL (e.g. '/src/styles/_variables.scss')
// against the project root. Plain dart-sass has no such convention, so
// reset.scss/typography.scss's `@use '/src/styles/_variables.scss' as *;`
// needs an explicit FileImporter to reproduce that behavior here.
const rootAbsoluteImporter = {
    findFileUrl(url) {
        if (!url.startsWith('/')) return null;
        return pathToFileURL(join(REPO_ROOT, url.slice(1)));
    },
};

function compileWithVariables(scssPath, outCssPath) {
    const original = readFileSync(scssPath, 'utf8');
    const isVariablesFile = scssPath === VARIABLES;
    const prefixed = isVariablesFile
        ? original
        : `@use ${JSON.stringify(VARIABLES)} as *;\n${original}`;
    const result = sass.compileString(prefixed, {
        url: new URL(`file://${scssPath}`),
        loadPaths: [dirname(scssPath), REPO_ROOT],
        importers: [rootAbsoluteImporter],
        style: 'expanded',
    });
    mkdirSync(dirname(outCssPath), { recursive: true });
    writeFileSync(outCssPath, result.css);
    return outCssPath;
}

// ── Component stylesheets: name -> scss path (relative to repo root) ──────
const COMPONENTS = {
    button: 'src/components/ui/button/button.scss',
    tag: 'src/components/ui/tag/tag.scss',
    modal: 'src/components/ui/Modal/modal.scss',
    fab: 'src/components/ui/fab/fab.scss',
    carousel: 'src/components/ui/carousel/carousel.scss',
    logo: 'src/components/ui/logo/logo.scss',
    icon: 'src/components/ui/Icon/icon.scss',
    // TableOfContents/SmartToc is intentionally out of scope — see NOTES.md.
    header: 'src/components/layout/header/header.scss',
    footer: 'src/components/layout/footer/footer.scss',
    home: 'src/pages/home/home.scss',
    projects: 'src/pages/projects/projects.scss',
    aboutSection: 'src/pages/about/aboutSection.scss',
    experienceSection: 'src/pages/about/experienceSection.scss',
    educationSection: 'src/pages/about/educationSection.scss',
    skillsSection: 'src/pages/about/skillsSection.scss',
    // The `About` page wrapper itself is intentionally out of scope — it
    // only adds the excluded TableOfContents around these same 4 sections.
};

for (const [name, relPath] of Object.entries(COMPONENTS)) {
    const scssPath = join(REPO_ROOT, relPath);
    const outCss = join(SYNTH_SRC, name, `${name}.css`);
    compileWithVariables(scssPath, outCss);
    console.log(`compiled ${relPath} -> ${relative(REPO_ROOT, outCss)}`);
}

// ── Global stylesheet: reset + typography (fonts, h1-h6, code, links) ─────
const globalsScss = join(REPO_ROOT, 'src/styles/base/globals.scss');
const globalOutCss = join(SYNTH_SRC, 'global.css');
compileWithVariables(globalsScss, globalOutCss);

// globals.scss pulls in typography.scss, whose @font-face src: url() values
// are root-relative web paths ('/src/assets/fonts/...') that only resolve
// inside the Vite dev/build server. design-sync's extractFonts() resolves
// url()s via Node's path.resolve(srcDir, url) — an absolute-looking url
// short-circuits that and ignores srcDir entirely. Rewrite to a real
// filesystem-relative path from the compiled CSS's own directory so
// extractFonts finds the real .woff2 files and copies them into fonts/.
let css = readFileSync(globalOutCss, 'utf8');
const fontsDir = join(REPO_ROOT, 'src/assets/fonts');
css = css.replace(/url\((["']?)\/src\/assets\/fonts\/([^)"']+?)\1\)/g, (_m, quote, sub) => {
    const target = join(fontsDir, sub);
    if (!existsSync(target)) {
        console.warn(`! font referenced but not found on disk: ${sub}`);
        return `url(${quote}/src/assets/fonts/${sub}${quote})`;
    }
    const rel = relative(dirname(globalOutCss), target).split(sep).join('/');
    return `url(${quote}${rel}${quote})`;
});
writeFileSync(globalOutCss, css);
console.log(`compiled src/styles/base/globals.scss -> ${relative(REPO_ROOT, globalOutCss)} (font urls rewritten to filesystem-relative)`);
