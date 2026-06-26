/**
 * Shared "What we do" stepper chrome.
 *
 * Draws a full-width segmented progress bar across the top of the card plus a
 * dynamic step label, and wires the Back/Next arrow controls (queried from the
 * component root via [data-prev] / [data-next] / [data-counter]) and the
 * left/right arrow keys. Scene rendering is delegated to `onStage`, which fires
 * whenever the active step changes.
 *
 * The segments are driven by a CSS transform transition (not motion) so their
 * left-anchored transform-origin survives — motion forces transform-origin to
 * 50% 50% on anything it animates, which would grow the bars from the centre.
 */
const NS = 'http://www.w3.org/2000/svg';

export interface StepperHandle {
  goTo(stage: number, anim: boolean): void;
  readonly stage: number;
}

export function mountStepper(opts: {
  root: HTMLElement;
  svg: SVGSVGElement;
  steps: string[];
  reduce: boolean;
  onStage: (stage: number, prev: number, anim: boolean) => void;
}): StepperHandle {
  const { root, svg, steps, reduce, onStage } = opts;
  const n = steps.length;
  const el = (t: string, a: Record<string, any> = {}) => {
    const e = document.createElementNS(NS, t);
    for (const k in a) e.setAttribute(k, a[k]);
    return e;
  };

  // full-width segmented progress bar across the top of the card
  const X0 = 48;
  const X1 = 952;
  const GAP = 12;
  const Y = 74;
  const H = 10;
  const segW = (X1 - X0 - GAP * (n - 1)) / n;
  const segs: any[] = [];
  const hits: any[] = [];
  for (let i = 0; i < n; i++) {
    const x = X0 + i * (segW + GAP);
    svg.appendChild(el('rect', { x, y: Y, width: segW, height: H, rx: H / 2, fill: '#e6e7ea' }));
    const fill: any = el('rect', { x, y: Y, width: segW, height: H, rx: H / 2, fill: '#0b0b0c' });
    fill.style.transformBox = 'fill-box';
    fill.style.transformOrigin = 'left center';
    fill.style.transform = 'scaleX(0)';
    svg.appendChild(fill);
    segs.push(fill);
    const hit: any = el('rect', { x: x - GAP / 2, y: Y - 22, width: segW + GAP, height: H + 44, fill: 'transparent' });
    hit.style.cursor = 'pointer';
    svg.appendChild(hit);
    hits.push(hit);
  }

  // dynamic step label below the bar
  const label: any = el('text', {
    x: X0,
    y: 158,
    fill: '#9aa0a7',
    'font-size': 30,
    'letter-spacing': 4,
    'font-weight': 600,
  });
  svg.appendChild(label);

  const prevB = root.querySelector('[data-prev]') as HTMLButtonElement | null;
  const nextB = root.querySelector('[data-next]') as HTMLButtonElement | null;
  const counter = root.querySelector('[data-counter]') as HTMLElement | null;

  let stage = -1;
  const goTo = (s: number, anim: boolean) => {
    s = Math.max(0, Math.min(n - 1, s));
    const prev = stage;
    segs.forEach((seg, i) => (seg.style.transform = `scaleX(${i <= s ? 1 : 0})`));
    label.textContent = (steps[s] || '').toUpperCase();
    if (counter) counter.textContent = `${s + 1} / ${n}`;
    if (prevB) prevB.disabled = s <= 0;
    if (nextB) nextB.disabled = s >= n - 1;
    onStage(s, prev, anim && !reduce);
    stage = s;
  };

  prevB?.addEventListener('click', () => goTo(stage - 1, true));
  nextB?.addEventListener('click', () => goTo(stage + 1, true));
  hits.forEach((h, i) => h.addEventListener('click', () => goTo(i, true)));
  root.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(stage + 1, true);
    else if (e.key === 'ArrowLeft') goTo(stage - 1, true);
  });

  goTo(0, false);
  // smooth, left-anchored fill on subsequent navigation (kept off the initial state)
  if (!reduce) segs.forEach((seg) => (seg.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)'));

  return {
    goTo,
    get stage() {
      return stage;
    },
  };
}
