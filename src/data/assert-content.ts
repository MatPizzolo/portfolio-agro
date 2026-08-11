import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AREAS, type Project } from './projects';

/**
 * Build-time content gate.
 *
 * The hard invariant is: no placeholder text or malformed URL ever reaches
 * production. The page is statically prerendered, so throwing here fails
 * `next build`. A missing demoUrl is a warning, never a blocker: the card
 * renders without its "Probalo" CTA until the demo deploys.
 *
 * Strict (throws) on Vercel production deploys, or locally with
 * STRICT_CONTENT=1. Everywhere else it only warns, so a work-in-progress
 * placeholder never breaks the local build.
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

    // Everything that reaches the DOM, including the band's caption and the
    // alt text of a real screenshot.
    const rendered = [p.nombre, p.descripcion, ...p.stack];
    if (p.imagenNota !== undefined) rendered.push(p.imagenNota);
    if (p.imagen !== undefined) rendered.push(p.imagen.alt);
    if (rendered.some((s) => TODO_MARKER.test(s))) {
      errors.push(`${at}: rendered text still contains a TODO() placeholder`);
    }

    if (!(p.area in AREAS)) {
      errors.push(`${at}: unknown area "${p.area}" — add it to AREAS or fix the typo`);
    }

    for (const url of [p.demoUrl, p.repoUrl]) {
      if (url !== undefined && !url.startsWith('https://')) {
        errors.push(`${at}: "${url}" is not an https:// URL`);
      }
    }

    // next/image needs a root-relative path, and an empty alt on a content
    // image would leave a screen reader with nothing to announce.
    if (p.imagen !== undefined) {
      if (!p.imagen.src.startsWith('/')) {
        errors.push(`${at}: imagen.src "${p.imagen.src}" must be a root-relative path`);
      }
      if (p.imagen.alt.trim() === '') {
        errors.push(`${at}: imagen.alt is empty — describe what the screenshot shows`);
      }
    }
  }

  return errors;
}

export function assertProjectContent(projects: readonly Project[]): void {
  const missingDemos = projects.filter((p) => !p.demoUrl).map((p) => p.id);
  if (missingDemos.length > 0) {
    console.warn(
      `[content gate] ${missingDemos.length} card(s) without live demo yet (render without "Probalo"): ${missingDemos.join(', ')}`,
    );
  }

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
 * without it, but shipping without its one act of "mostrar, no afirmar" should
 * not happen silently.
 */
export function warnIfHeroRasterMissing(): void {
  if (!existsSync(join(process.cwd(), 'public', 'ndvi-hero.webp'))) {
    console.warn(
      '[content gate] public/ndvi-hero.webp missing — the hero ships without the NDVI raster (export it from GEE, ≤80 KB)',
    );
  }
}
