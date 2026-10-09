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
| Default SEO title and description        | `src/config.yaml`                                          |
| Social preview images                    | `src/assets/images/og/`                                    |

The two dictionaries share one TypeScript type, so a string missing in French fails the type check. `AGENTS.md` has the architecture in more detail.

## Branches

- `main`: production.
- `develop`: the next version. Features are merged here first.
- `agent/<name>`: one branch per piece of work, created from `develop`.

## Deployment

Built and served by Netlify (`netlify.toml`): `npm run build`, publishing `dist/`. Redirects for old URLs are in `astro.config.ts`.

## Credits

- Started from the [AstroWind](https://github.com/arthelokyo/astrowind) template (MIT); little of it remains.
- [Inter](https://rsms.me/inter/) and [Departure Mono](https://departuremono.com) by Helena Zhang, both under the SIL Open Font License.
