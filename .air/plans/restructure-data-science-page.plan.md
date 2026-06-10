# Restructure the Forecasting & Data Science service page

## Context

The hero of `src/content/pages/services/data-science.md` was just rewritten (uncommitted) to a two-part positioning: *"Specialised in forecasting. Fluent across machine learning."* The page body no longer matches that claim — a single flat 4-item grid mixes three forecasting items with one toolbox item. Meanwhile the app-development page (`web-development.md` + `app-development.astro`) was recently reworked into the site's most evolved pattern: segmented offer sections, a concrete case study, and a `QuickStart` ending instead of the generic CTA. This plan brings the data-science page up to that pattern, as agreed:

1. Split the offer into **Forecasting (the specialism)** + **the data-science toolbox around it**
2. Add a **case study** on the published foundation-model benchmark
3. Replace the generic CTA (with its `example.com/book-a-call` placeholder) by **nextSteps + QuickStart**
4. Move **TechLogos** to sit with the offer instead of between two trust sections

## Goal

Make the page structure mirror the new hero positioning, add a concrete proof story, and align the page with the app-dev page pattern.

## Approach

Pure content + template restructure following the in-repo app-dev precedent — no new components. The target section order becomes:

**Hero → Forecasting (Content) → Toolbox (Content) → TechLogos → Proof (Features2) → Case study (Content) → How we work (Content) → QuickStart**

Narrative: offer → stack → claims → story → process → action. "What we do" stays before proof, consistent with advisory and small-tools.

## File Changes

### 1. `src/content.config.ts` — **Modify**

Add two keys to `pageSchema` (lines 178–215), next to `capabilities` (line 204), following the established pattern of page-specific keys (`web`, `mobile`, `backend`):

```ts
forecasting: content.optional(),
toolbox: content.optional(),
```

Additive only — no other page is affected.

### 2. `src/content/pages/services/data-science.md` — **Modify** (main work)

Keep `metadata`, `hero`, `proof`, `tech`, `howWeWork` content as-is.

**a. Replace `capabilities` (lines 9–28) with two sections:**

- `forecasting:` — `isReversed: true`, contentHeading like **"Forecasting — the specialism"**, contentBody carries the existing energy-waste line ("Forecasting work that survives contact with production — and cuts energy waste in the process…"). Items = the 3 existing forecasting items verbatim (Time-series forecasting, Foundation models for time series, Classical statistical methods). Keep the placeholder image.
- `toolbox:` — `isAfterContent: true`, contentHeading like **"Around it, the data science toolbox"**, contentBody echoing the hero ("pipelines, models and infrastructure that earn their place in production"). Items:
  - "ML pipelines for production" — existing copy verbatim (lines 23–25)
  - "Sensor and IoT data" — drafted from on-record facts (energy page cites IoT/sensor platforms and Big Building Data); marked `# TODO: review claim`
  - One more toolbox item drafted for review (e.g. exploratory analysis / model evaluation), marked `# TODO`
  - Placeholder image so the Content widget alternates like web/mobile on app-dev

**b. Add `caseStudy:` section** (modeled on `web-development.md:94–113`), placed after `tech`:

- `isReversed: true`, tagline 'Case study'
- contentHeading like **"Foundation models vs. classical baselines — measured, not assumed"**
- contentBody: peer-reviewed comparison on real building-energy data, benchmarked with the open-source onTime library
- Items (brief/built/result shape):
  - **"The question"** — do modern time-series foundation models actually beat classical methods on real building-energy data?
  - **"What we did"** — independent benchmark of foundation models against classical baselines on real building-energy data, run on onTime, peer-reviewed and published (ties to the PhD, HES-SO 2025)
  - **"The result"** — `# TODO: supply the headline finding + publication link` (the paper's conclusion is not invented)
- Image: placeholder + `# TODO: replace with a figure from the publication`

All factual statements stay within what's already on record in the repo (`industries/research.md:32–43`, `industries/energy.md:32–40`, `about.md:51–56`).

**c. Replace `cta` (lines 77–88) with `nextSteps` + `quickStart`** (modeled on `web-development.md:114–134`), reusing the existing CTA copy:

- `nextSteps:` tagline 'Get started', title 'What happens next', items: "Send the question you are actually trying to answer" / "An honest read on whether modelling is the right tool — and what kind, with what data, at what cost" / "A small first study before a big bet"
- `quickStart:` title 'Start a conversation', categories `['Forecasting', 'Machine learning', 'Data pipelines', 'Not sure yet']`, button 'Send', consent line copied from `web-development.md:134`

### 3. `src/pages/services/data-science.astro` — **Modify**

Mirror `src/pages/services/app-development.astro`:

- Imports: drop `CallToAction`, add `QuickStart` (`~/components/widgets/QuickStart.astro`)
- Destructure `{ metadata, hero, forecasting, toolbox, tech, proof, caseStudy, howWeWork, nextSteps, quickStart }`
- Render order: Hero → Content(forecasting) → Content(toolbox) → TechLogos → Features2(proof) → Content(caseStudy, with `tagline` prop as in `app-development.astro:45–55`) → Content(howWeWork) → QuickStart (props as in `app-development.astro:57–66`)
- `howWeWork` keeps `isAfterContent: true` (it now follows a Content widget)

## Implementation Steps

**Task 1 — Schema**
1. Add `forecasting` and `toolbox` keys to `pageSchema` in `src/content.config.ts` (~line 204)

**Task 2 — Content** (`src/content/pages/services/data-science.md`)
2. Split `capabilities` into `forecasting` + `toolbox` sections as specified above
3. Add the `caseStudy` section with TODO markers for the result metric and publication link
4. Replace `cta` with `nextSteps` + `quickStart`

**Task 3 — Template** (`src/pages/services/data-science.astro`)
5. Update imports and destructuring; render the 8 sections in the target order

**Task 4 — Verify**
6. Run `npm run check` and `npm run build`; view the page in dev

## Reused existing components (no new code)

- `Content`, `Features2`, `TechLogos` widgets — already imported by the page
- `QuickStart` widget (`src/components/widgets/QuickStart.astro`) — props: tagline/title/subtitle/steps/formTitle/categories/button/consent
- Schema types `content`, `steps`, `quickStart` already defined in `content.config.ts:125–176`

## Acceptance Criteria

- `/services/data-science` renders 8 sections in the target order
- Forecasting section shows exactly the 3 existing forecasting items; toolbox shows ML pipelines + the drafted items
- Case study renders with 3 items and contains **no invented publication results** (TODOs in YAML instead)
- The page no longer renders `CallToAction`; QuickStart shows the 4 category chips
- No `example.com` link remains on this page
- `npm run check` passes; `npm run build` succeeds

## Verification Steps

1. `npm run check` (astro check + ESLint + Prettier)
2. `npm run build`
3. `npm run dev` → open `http://localhost:4321/services/data-science`; verify section order, image/text alternation (reversed → after-content, like app-dev), and that the QuickStart form renders
4. Spot-check the app-dev page still builds (schema change is additive only)

## Risks & Mitigations

- **Inventing facts about the publication** — the paper's actual finding and link are not in the repo. Mitigation: `# TODO` comments (same convention as `web-development.md:106,111`) and explicit copy review by Fred before commit.
- **New toolbox items over-claiming services** — drafted only from claims already on record elsewhere on the site, flagged with TODOs for review.