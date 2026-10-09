# vast.ch

The website of [Vast Switzerland GmbH](https://vast.ch): software and machine learning, built with our clients. English and French, a static site built with [Astro](https://astro.build).

## Run it locally

Requires Node.js 22.12 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:4321 (English) or http://localhost:4321/fr (French).

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Development server with live reload           |
| `npm run build`   | Production build into `dist/`                 |
| `npm run preview` | Serve the production build locally            |
| `npm run check`   | Type check, lint and formatting check (as CI) |
| `npm run fix`     | Fix lint and formatting issues                |

## Where things live

| To change…                               | Edit                                                       |
| ---------------------------------------- | ---------------------------------------------------------- |
| Any text on the site, in either language | `src/i18n/en.ts` and `src/i18n/fr.ts`                      |
| Page addresses (slugs) per language      | `ROUTES` in `src/i18n/config.ts`                           |
| Styles, colours, fonts                   | `src/assets/styles/site.css`                               |
| The animated cloud background            | `src/components/site/sky.ts`                               |
| Menu and footer                          | `src/components/site/SiteHeader.astro`, `SiteFooter.astro` |
| Page titles and descriptions (SEO)       | `meta` entries in `src/i18n/en.ts` and `fr.ts`             |
| Social preview images                    | `src/assets/images/og/`                                    |

The two dictionaries share one TypeScript type, so a string missing in French fails the type check. `AGENTS.md` has the architecture in more detail.

## Branches

- `main`: production.
- `develop`: the next version. Features are merged here first.
- `agent/<name>`: one branch per piece of work, created from `develop`.

## Deployment

`npm run build` produces a plain static site in `dist/`, which any static host can serve. `netlify.toml` holds the build and cache settings for Netlify.

## Credits

- [Inter](https://rsms.me/inter/) and [Departure Mono](https://departuremono.com) by Helena Zhang, both under the SIL Open Font License.
