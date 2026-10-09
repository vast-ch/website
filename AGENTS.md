# vast.ch website: agent instructions

## Project overview

The public website of Vast Switzerland GmbH: a small, static, bilingual (English/French) site built with **Astro 6**. Its look is a full-screen animated sky (a volumetric sea of clouds rendered in WebGL) with corner chrome set in Departure Mono and reading text set in Inter.

**Stack:** Astro 6 (static output) | TypeScript | Tailwind CSS v4 (used only for its CSS reset)

## Quick reference

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server at localhost:4321  |
| `npm run build`   | Production build to `./dist/`       |
| `npm run preview` | Preview production build locally    |
| `npm run check`   | Run astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier issues   |

**Node.js requirement:** >= 22.12.0

## Architecture

```
src/
  i18n/                 # Locales, routes and all page copy
    config.ts           # LOCALES, ROUTES (translated slugs), contact email, external links
    types.ts            # Dictionary type: every locale must provide every string
    en.ts, fr.ts        # The copy, one dictionary per locale
  layouts/
    SiteLayout.astro    # Page shell: head, theme + menu scripts, view transitions
    MarkdownLayout.astro# Long-form Markdown pages (locale and page key in frontmatter)
  components/
    site/               # Seo (title, description, Open Graph, hreflang), Favicons,
                        # SkyCanvas.astro + sky.ts (cloud shader), SiteHeader, SiteFooter, Pictogram
    views/              # One view per page, shared by the EN and FR route files
  pages/                # Thin route files (EN at the root, FR under fr/), Markdown legal pages
  assets/
    styles/site.css     # Design tokens and all site styles
    styles/tailwind.css # Tailwind import (reset only)
    images/og/          # Social preview cards, one per locale (1200×630 JPEG)
    favicons/
public/                 # robots.txt, _headers (Cloudflare cache rules), Departure Mono (SIL OFL)
astro.config.ts         # Site URL, trailing-slash policy, sitemap, compression
.node-version           # Node.js version for the Cloudflare build
wrangler.jsonc          # Cloudflare Worker serving dist/ (404 page for unknown paths)
```

### Internationalisation

- Every page exists in each locale. Slugs are translated (`/approach` ↔ `/fr/approche`), so pages are resolved through their route key in `ROUTES`, never by prefixing a path.
- All copy lives in `src/i18n/en.ts` and `fr.ts`. The `Dictionary` type makes a missing translation a type error.
- French: write a plain space before `; : ! ?`. It becomes a narrow no-break space automatically.
- Strings documented as HTML in `types.ts` are rendered with `set:html`. They are authored in this repo only.

### Adding a page

1. Add a route key with both slugs to `ROUTES` in `src/i18n/config.ts`.
2. Add its copy to the `Dictionary` type and to both dictionaries.
3. Create a view in `src/components/views/` and two thin route files (`src/pages/<slug>.astro`, `src/pages/fr/<slug>.astro`).
4. Link it from `SiteHeader.astro` if it belongs in the menu.

### Design notes

- Departure Mono (uppercase, `.mono`) is for UI chrome and labels; Inter is for reading.
- Colours are tokens on `:root` / `:root.dark` in `site.css`. Muted text must keep at least 4.5:1 contrast on the veil.
- The sky shader runs at reduced resolution and at most 30 fps. A governor lowers the resolution further on slow devices, and with `prefers-reduced-motion` it draws a single still frame. Keep it cheap: test on a phone after changing it.
- Avoid the class name `prose`; the site uses `copy` for running text.

### Path alias

Use `~/` to import from `src/`.

## Git workflow

- Work on a branch named `agent/<name>` created from `develop`.
- Merge into `develop` only when asked. Never merge into `main` without an explicit instruction.

## Verification checklist

After changes, always verify:

1. `npm run check` passes (astro check + ESLint + Prettier). CI runs it on PRs to `main`.
2. `npm run build` succeeds.
3. In the browser: every page in EN and FR, light and dark, desktop and mobile, the menu, the language switch and the 404 page.
