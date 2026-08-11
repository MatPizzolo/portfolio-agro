import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AREAS, type Project } from './projects';

/**
 * Build-time content gate.
 *
 * Every published project is live and its card promises "Probalo", so the
 * hard invariant is: no project ships without a working demoUrl, and no
 * placeholder text ever reaches the URL the printed QR points to. The page is
 * statically prerendered, so throwing here fails `next build`.
 *
 * Strict (throws) on Vercel production deploys, or locally with
 * STRICT_CONTENT=1. Everywhere else it only warns: placeholders are expected
 * to exist until 2026-08-07 and the daily build must keep passing.
 */

const TODO_MARKER = /TODO\(/;

function violations(projects: readonly Project[]): string[] {
  const errors: string[] = [];

  if (projects.length === 0) {
    errors.push('no projects published — the page has no content');
  }

  const ids = projects.map((p) => p.id);
  if (new Set(ids).size !== ids.length) {
    errors.push(`duplicate project ids: [${ids.join(', ')}]`);
  }

  for (const p of projects) {
    const at = `project "${p.id}"`;

    const rendered = [p.nombre, p.descripcion, ...p.stack];
    if (rendered.some((s) => TODO_MARKER.test(s))) {
      errors.push(`${at}: rendered text still contains a TODO() placeholder`);
    }

    if (!p.demoUrl) {
      errors.push(`${at}: missing demoUrl — every published card promises a live demo`);
    }

    if (!(p.area in AREAS)) {
      errors.push(`${at}: unknown area "${p.area}" — add it to AREAS or fix the typo`);
    }

    for (const url of [p.demoUrl, p.repoUrl]) {
      if (url !== undefined && !url.startsWith('https://')) {
        errors.push(`${at}: "${url}" is not an https:// URL`);
      }
    }
  }

  return errors;
}

export function assertProjectContent(projects: readonly Project[]): void {
  const errors = violations(projects);
  if (errors.length === 0) return;

  const strict =
    process.env.VERCEL_ENV === 'production' || process.env.STRICT_CONTENT === '1';
  const report = errors.map((e) => `  - ${e}`).join('\n');

  if (strict) {
    throw new Error(
      `Content gate: the page cannot ship to production with ${errors.length} unresolved issue(s):\n${report}`,
    );
  }
  console.warn(`[content gate] ${errors.length} issue(s) block the production deploy:\n${report}`);
}

/**
 * The hero raster is a warning, never a blocker: the page is designed to work
 * without it, but shipping the QR without its one act of "mostrar, no afirmar"
 * should not happen silently.
 */
export function warnIfHeroRasterMissing(): void {
  if (!existsSync(join(process.cwd(), 'public', 'ndvi-hero.webp'))) {
    console.warn(
      '[content gate] public/ndvi-hero.webp missing — the hero ships without the NDVI raster (export it from GEE, ≤80 KB)',
    );
  }
}
