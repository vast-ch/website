# vast.ch website: agent instructions

## Project overview

The public website of Vast Switzerland GmbH: a small, static, bilingual (English/French) site built with **Astro 6**. Its look is a full-screen animated sky (a volumetric sea of clouds rendered in WebGL) with corner chrome set in Departure Mono and reading text set in Inter.

**Stack:** Astro 6 (static output) | TypeScript | Tailwind CSS v4 (its CSS reset, and the typography plugin's `prose` for news posts)

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
    SiteLayout.astro    # Page shell: head, theme and menu scripts, view transitions
    MarkdownLayout.astro# Long-form Markdown pages (locale and page key in frontmatter)
  components/
    site/               # Seo (title, description, Open Graph, hreflang), Favicons,
                        # SkyCanvas.astro + sky.ts (cloud shader), SiteHeader, SiteFooter, Pictogram
    views/              # One view per page, shared by the EN and FR route files
  pages/                # Thin route files (EN at the root, FR under fr/), Markdown legal pages
  assets/
    styles/site.css     # Design tokens and all site styles
    styles/tailwind.css # Tailwind: the reset and the typography plugin
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

### The .earth page and the flight

`/earth` (and `/fr/earth`) presents vast.earth, the association. For now the page is only its title and tagline over the landscape, "Coming soon" and a link to the association's Discord (`EXTERNAL_LINKS.discord`); its copy is in the `earth` entry of the dictionaries. (The longer text about the association, based on its statutes, was removed; it is in the git history.) A pixel-art switch in the middle of the header (`RealmSwitch.astro`) links between vast.ch and vast.earth (it stays put on both sides); it is drawn with the pixels of the menu's font (Departure Mono has an 11-pixel em, so one pixel is `1em / 11`, and capitals are 8 pixels tall). On the right the header lists the vast.ch pages; on `.earth`, a single page for now, "Join us" goes to the association's Discord. The links are always visible, except on phones (720px and below), where they fold behind a Menu button (the script is in `SiteLayout.astro`). LinkedIn and GitHub are on the contact page. Where the right margin is narrow (1180px and below), the header scrolls away with reading pages. On `.earth` the footer names the association (as plain text) instead of the company. The page uses the `earth` layout variant (`data-page="earth"` on `<html>`). When that variant appears after a client-side navigation, `sky.ts` flies the camera down into the sea of clouds, through their soft interior (the clouds never dissolve; only the cloud right around the camera gets soft holes so it reads as cotton), out under them and down a ray-marched valley to the shore of a lake, just above the water (10 s down, 6 s back up when leaving); a direct visit starts at the end of the flight. The lake reflects the cloud ceiling and the hills by tracing a second, reflected ray. On the way down, once the camera is out of the clouds (`CLEARING.from`), `uClear` eases to 1 over 5 s, so it is mostly done on arrival (a direct visit starts cleared): the cloud deck thins and opens in many small places, to about 5/8 cover with a soft blue sky between (stars at night), and the scene brightens; it closes again in 1.5 s when leaving. Seen from below, the clouds are a soft ceiling that the hero text sits on, above the far hills: `--earth-horizon` in `site.css` follows the final view (`CAMERA_END`, `CAMERA_PITCH` in `sky.ts`). Between the two sides the text is choreographed: when the switch is used, `SiteLayout.astro` flips it at once, sets `is-leaving` (the page's text drifts up and fades, see `site.css`) and holds the page change back for 420 ms; during the flight `sky.ts` sets `is-flying` on `<html>`, which keeps the destination's hero text, the vast.ch menu and the footer name hidden (`REVEAL` in `sky.ts`: until 80% of the way down, or until the camera is back over the clouds on the way up); then the elements marked `.reveal` come in one after the other (their `--reveal` index sets the delay). At rest on every other page the shader reduces exactly to the plain sea of clouds. Check any change to the flight on a phone: the land is ray-marched too.

### News

`/news` (and `/fr/actualites`) lists the news, one line per post (date and title), newest first; each post reads as a letter (Date, From, To, Subject, then the text). To publish, add a Markdown file to `src/content/news/en/` or `src/content/news/fr/` with `title`, `date` and `description` in its front matter (see `src/content.config.ts`); the folder is its language, a file with the same name in the other folder is its translation, and `draft: true` keeps it out of the build. RSS and Atom feeds are generated per language (`/news/rss.xml`, `/news/atom.xml`, and the same under `/fr/actualites`), with each post in full; every page announces them. Everything is in `src/news.ts`, `src/components/news/` and the two `News*View.astro` views. A post's text is styled with Tailwind's typography plugin (`prose` on the post body), set to the site's ink colours and body size in `site.css` (`.news-body`), so Markdown headings, lists, quotes and images come out styled. There is no email subscription for now (no newsletter service); a signup form would also need a line in the privacy policy.

### Hidden pages

The approach page is hidden for now: its route files are `src/pages/_approach.astro` and `src/pages/fr/_approche.astro` (Astro skips files starting with an underscore), and its menu entry and the links to it are commented out. Its copy and view are kept. The route files explain how to restore it.

### Adding a page

1. Add a route key with both slugs to `ROUTES` in `src/i18n/config.ts`.
2. Add its copy to the `Dictionary` type and to both dictionaries.
3. Create a view in `src/components/views/` and two thin route files (`src/pages/<slug>.astro`, `src/pages/fr/<slug>.astro`).
4. Link it from `SiteHeader.astro` if it belongs in the menu.

### Design notes

- The brand is written `vast`, in lowercase, everywhere in the copy, even at the start of a sentence. Only the registered company name keeps its spelling: `Vast Switzerland GmbH`.
- Page titles read `vast \ page name` (a backslash between thin spaces, page name in lowercase). `Seo.astro` builds them: dictionaries and frontmatter only give the page name.
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
