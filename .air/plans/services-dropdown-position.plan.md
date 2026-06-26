# Fix Services dropdown (megamenu) positioning

## Context

On desktop, the "Services" navigation item opens a megamenu dropdown that is currently mispositioned — it floats centered on the whole header bar instead of appearing under the Services button.

**Root cause:** The megamenu `<ul>` at `src/components/widgets/Header.astro:103` is `md:absolute` and uses `md:left-1/2 md:-translate-x-1/2`, but its parent `<li class="dropdown">` (`Header.astro:92`) has **no `position: relative`**. With no positioned ancestor on the `<li>` or `<nav>`, the absolute dropdown resolves against the nearest positioned ancestor — the `.relative` grid container at `Header.astro:61` (the full `max-w-7xl` header). So `left: 50%` centers the panel on the entire header rather than on the Services button.

**Intended outcome:** Anchor the megamenu to the Services button and align its **left edge to the button's left edge** (user's chosen alignment), so it opens directly beneath the button.

## Goal

Make the Services dropdown position itself relative to the Services button instead of the whole header.

## Approach

Establish the `<li class="dropdown">` as the positioning context (`md:relative`) so the absolute dropdown anchors to the button's list item. Then switch the megamenu's horizontal anchor from centered-on-container (`md:left-1/2 md:-translate-x-1/2`) to left-aligned (`md:left-0`) and pin it just below the button (`md:top-full`). This is a Tailwind-class-only change in one file; no JS or new CSS.

All changes are gated behind the `md:` prefix to preserve the existing mobile behavior, where the submenu renders inline in normal flow (not absolutely positioned).

## File Changes

**Modify:** `src/components/widgets/Header.astro`

1. **`Header.astro:92`** — add `md:relative` to the dropdown list item so it becomes the containing block for its absolute submenu.
   - From: `<li class={links?.length ? 'dropdown' : ''}>`
   - To:   `<li class={links?.length ? 'dropdown md:relative' : ''}>`
   - This also correctly re-anchors the non-megamenu dropdown (`Header.astro:127`) to its own button.

2. **`Header.astro:103`** — re-anchor the megamenu panel to the button: remove the center-on-container utilities and add left-edge + below-button utilities.
   - Remove: `md:left-1/2 md:-translate-x-1/2`
   - Add: `md:top-full md:left-0`
   - Resulting class list (640px width and grid layout unchanged):
     `dropdown-menu md:backdrop-blur-md dark:md:bg-dark rounded md:absolute md:top-full md:left-0 md:hidden font-medium md:bg-white/90 drop-shadow-xl pl-4 md:w-[640px] md:grid md:grid-cols-2 md:gap-3 md:p-3`

No changes to `src/navigation.ts` or `src/assets/styles/tailwind.css` — the existing `.dropdown:hover/.dropdown:focus-within .dropdown-menu { display: block }` rule (`tailwind.css:95-99`) continues to drive visibility.

## Implementation Steps

1. In `Header.astro:92`, append `md:relative` to the dropdown `<li>` class expression.
2. In `Header.astro:103`, replace `md:left-1/2 md:-translate-x-1/2` with `md:top-full md:left-0`.

## Acceptance Criteria

- On a desktop viewport (≥ `md`), hovering/focusing "Services" shows the megamenu directly **below** the Services button, with the panel's **left edge aligned to the button's left edge**.
- The megamenu is no longer centered on the overall header/page.
- The panel opens flush under the button (`top: 100%`) so moving the cursor from the button into the panel keeps it open (no hover gap).
- Mobile (< `md`) behavior is unchanged: the submenu still renders inline within the expanded menu.
- The other (non-megamenu) dropdown, if present, still appears correctly under its own button.

## Verification

1. Start the dev server: `npm run dev` (Astro) and open the local URL.
2. At a desktop width (e.g. 1280px), hover "Services" → confirm the panel sits directly under the button, left edges aligned, fully visible.
3. Move the mouse from the button down into the panel → it stays open.
4. Shrink toward the `md` breakpoint (~768px) and re-check the right edge does not get clipped (see Risk below).
5. Resize below `md` → confirm the submenu renders inline (mobile layout) as before.
6. Optional sanity: `npm run build` to confirm no template errors.

## Risks & Mitigations

- **Right-edge overflow on narrow desktop widths:** The megamenu is a fixed `md:w-[640px]`. Left-aligning it to a button that sits near the horizontal center of a centered nav can push its right edge past the viewport at the smaller end of the `md` range (~768px). Mitigation if observed during verification: cap/relax the width at the `md` tier (e.g. `md:w-[min(640px,calc(100vw-2rem))]`) or shift alignment on smaller screens. Apply only if step 4 shows clipping; not part of the core change.