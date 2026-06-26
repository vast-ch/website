# Update the home page

## Context
The home page (`src/content/pages/index.md` + `src/pages/index.astro`) advertises **4 services**, includes a **stats band** ("A team with a real track record"), and ends with a **bespoke CTA** ("Have a project in mind?"). Two of those services — *Small tools & prototypes* and *Advisory & digitalization* — have been pulled from the site's navigation: they're commented out of the header megamenu (`src/navigation.ts:22-35`) and absent from the footer. So the home page now over-promises relative to what the site actually offers. The stats band and the home-only CTA are also out of step with the rest of the site, which uses a single shared **banner CTA** on the About and Case Studies pages.

This change trims the home page to the two live services, drops the stats band, and adopts the shared banner CTA so the front door matches the rest of the site. Per your choices, the "office" positioning wording and the placeholder images are left unchanged.

## Goal
Show only the two in-menu services, remove the stats section, and reuse the Case Studies page's banner CTA on the home page.

## Changes

### 1. Remove the two services not in the menu
File: `src/content/pages/index.md` — `services.items` (~lines 24-35)

The header megamenu (`src/navigation.ts:9-21`) and footer (`:54-57`) list only:
- Application development → `/services/app-development`
- Data science and machine learning → `/services/data-science-machine-learning`

*Small tools & prototypes* and *Advisory & digitalization* are commented out (`src/navigation.ts:22-35`).

Action — keep the first two items, delete the last two:
- KEEP "Web and mobile application development" (`tabler:code`)
- KEEP "Data science and machine learning" (`tabler:chart-line`)
- REMOVE "Small tools and rapid prototypes" (`tabler:tool`)
- REMOVE "Advisory and digitalization solutions" (`tabler:bulb`)

The section tagline/subtitle ("A small, senior practice rather than a long menu…") stays accurate with two services — no copy change.

### 2. Remove the Stats section
Files: `src/content/pages/index.md`, `src/pages/index.astro`

- `index.md`: delete the entire `stats:` block (~lines 52-62). `stats` is optional in the schema (`src/content.config.ts:180`), so removal is safe.
- `index.astro`: remove the `<Stats … />` render (line 53), the `import Stats …` line (line 7), and `stats` from the destructure (line 13).

### 3. Replace the final CTA with the Case Studies banner CTA
Files: `src/content/pages/index.md`, `src/pages/index.astro`

The Case Studies page renders a shared banner CTA (`src/pages/case-studies.astro:24`) — identical to the one on About (`src/pages/about.astro:49`):

```yaml
cta:
  title: 'Want to build something together?'
  subtitle: 'Tell us about your project, your data or the decision you are facing — we will tell you honestly whether we can help.'
  actions:
    - variant: primary
      text: 'Contact us'
      href: '/contact'
      icon: 'tabler:mail'
```

- `index.md`: replace the current `cta:` block (~lines 90-97, "Have a project in mind?" / "Get in touch" → `/contact#form`) with the block above.
- `index.astro`: add the `isBanner` prop to `<CallToAction>` (line 63) so it renders as the banner variant, matching the other two pages:
  `<CallToAction isBanner actions={cta.actions} title={cta.title} subtitle={cta.subtitle} />`

This follows the existing convention of duplicating the shared CTA frontmatter per page (see the "Same banner CTA as the about page" note in `case-studies.md:9`).

## Out of scope (per your answers)
- Positioning language: keep "office" / "Offices in…" wording as-is.
- Images: keep `placeholder.png` in hero and why-us.
- No new sections (no case-studies carousel, tech stack, or team).

## Verification
1. `npm run dev` → open http://localhost:4321/ and confirm:
   - Services section shows exactly **2** cards (Application development, Data science & ML).
   - No "A team with a real track record" stats band.
   - The footer CTA reads "Want to build something together?" with a "Contact us" → `/contact` button, rendered as the full-width **banner** (matching `/case-studies` and `/about`).
2. Visually check the 2-card services grid spacing. If sparse, the `featuresGrid` schema supports `columns` (`src/content.config.ts:122`) — set `columns: 2` on `services` (Features3 honors it; verify Features.astro does too). Apply only if needed.
3. `npm run check` (astro check + eslint + prettier) passes — confirms no dangling `stats`/`Stats` references and valid frontmatter.
4. `npm run build` succeeds.
5. Toggle dark mode and check mobile width on the home page.

## Risks
- **Sparse 2-item services grid** if `Features.astro` hard-codes a 4-column layout. Mitigation: visual check (step 2); `columns: 2` available as a fallback.
- **Dangling stats reference** would break the build. Mitigation: only `index.astro` references it; `npm run check` catches any miss.
