import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import { warnIfHeroRasterMissing } from '@/data/assert-content';
import { SITE } from '@/lib/site';

/**
 * No buttons here. The first scroll already shows the parcels: the page IS the
 * call to action (DESIGN_SYSTEM.md → Hero).
 *
 * The NDVI raster activates itself: drop the real GEE export (≤80 KB) at
 * public/ndvi-hero.webp and the next build picks it up at 15% opacity behind
 * the content. No manual uncommenting — a fake or absent raster would undercut
 * the one thing the hero is supposed to prove, so absence just means "no
 * image" and a loud build warning.
 */
const hasRaster = existsSync(join(process.cwd(), 'public', 'ndvi-hero.webp'));
warnIfHeroRasterMissing();

export function Hero() {
  return (
    // `isolate` gives the header its own stacking context so the -z-10 raster
    // sits behind the content but can never slip behind the body background.
    <header className="relative isolate overflow-hidden border-b border-limite">
      {hasRaster ? (
        <Image
          src="/ndvi-hero.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-15"
        />
      ) : null}

      <div className="mx-auto w-full max-w-[1080px] px-5 py-20 sm:py-28">
        {/* Two-voice lockup: the wide 900 cut against the normal-width 600 cut
            of the same family. The contrast (width + weight + a ≥1.25 scale
            step) is the impact — no extra font bytes, the wdth axis is already
            paid for. Verify neither line wraps at 390px. */}
        <h1 className="font-display leading-[1.08]">
          <span className="block text-[clamp(2.1rem,8.6vw,4.25rem)] font-black tracking-[-0.02em] [font-stretch:125%]">
            Machine Learning
          </span>
          <span className="block text-[clamp(1.65rem,6.7vw,3.3rem)] font-semibold tracking-[-0.01em] [font-stretch:100%]">
            para el agro argentino.
          </span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-[1.05rem] text-tinta-suave">
          Visión por computadora, datos satelitales y sistemas en producción — del modelo al
          lote.
        </p>

        {/* The page belongs to a person: name first, in full ink, in the same
            telemetry register as the rest of the metadata. */}
        <p className="mt-10 font-datos text-[0.8rem] uppercase tracking-[0.06em]">
          {SITE.nombre} · {SITE.rolCorto}
        </p>
        <p className="mt-1 font-datos text-[0.8rem] uppercase tracking-[0.06em] text-tinta-suave">
          {SITE.lugar} · {SITE.coordenadas} · {SITE.evento}
        </p>
      </div>
    </header>
  );
}
