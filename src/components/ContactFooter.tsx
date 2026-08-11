import { projects } from '@/data/projects';
import { CONTACTO, SITE } from '@/lib/site';

/**
 * The single CTA of the page. No form, no newsletter, no chat.
 *
 * The open-source sentence is derived from the data instead of asserted: it
 * only claims everything is open while every project ships a repoUrl
 * (DESIGN_SYSTEM.md → ContactFooter). Whether each repo carries a LICENSE still
 * has to be checked by hand before flipping the last repoUrl on.
 */
const abiertos = projects.filter((p) => p.repoUrl).length;

const apertura =
  abiertos === projects.length
    ? 'Todo el código es abierto.'
    : abiertos > 0
      ? 'Parte del código es abierto.'
      : null;

export function ContactFooter() {
  return (
    <footer className="border-t-2 border-tinta">
      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-5 py-16 sm:py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-20">
        <div>
          <p className="font-datos text-dato uppercase tracking-[0.14em] text-rastrojo-tinta">
            02 — Contacto
          </p>

          <h2 className="mt-4 max-w-[20ch] text-pretty font-display text-[clamp(1.5rem,5.4vw,2.2rem)] font-bold leading-tight">
            Si algo de esto te sirve en tu operación, escribime.
          </h2>

          {apertura ? (
            <p className="mt-4 max-w-[44ch] text-pretty text-tinta-suave">{apertura}</p>
          ) : null}
        </div>

        {/* The page's one primary action, and the only green fill on it.
            "El verde aparece solo donde hay acción" cuts both ways: with no
            demoUrl set, no card renders a filled button, so without this the
            page would ship with no primary treatment anywhere and the contact
            ask would look identical to four "Ver código" links.
            No uppercase here — an address is content, not a label. */}
        <div className="flex flex-col gap-2 md:pt-9">
          <a
            href={CONTACTO.mail.href}
            className="flex min-h-12 items-center justify-center bg-cultivo px-4 font-datos text-dato tracking-[0.06em] text-papel transition-colors duration-150 hover:bg-cultivo-profundo"
          >
            {CONTACTO.mail.label}
          </a>
          <a
            href={CONTACTO.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center border border-tinta px-4 font-datos text-dato uppercase tracking-[0.06em] text-tinta transition-colors duration-150 hover:bg-tinta/6"
          >
            {CONTACTO.linkedin.label}
          </a>

          <p className="mt-4 border-t border-limite pt-4 font-datos text-dato-sm uppercase tracking-[0.06em] text-tinta-suave">
            {SITE.nombre} · {SITE.lugar}
          </p>
        </div>
      </div>
    </footer>
  );
}
