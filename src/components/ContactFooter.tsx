import { projects } from '@/data/projects';
import { CONTACTO } from '@/lib/site';

/**
 * The single CTA of the page. No form, no newsletter, no chat.
 *
 * The open-source sentence is derived from the data instead of asserted: it
 * only renders while every project ships a repoUrl (DESIGN_SYSTEM.md →
 * ContactFooter). Whether each repo carries a LICENSE still has to be checked
 * by hand before flipping the last repoUrl on.
 */
const abiertos = projects.filter((p) => p.repoUrl).length;

const cierre =
  abiertos === projects.length
    ? 'Todo el código es abierto. Si algo de esto te sirve en tu operación, escribime.'
    : abiertos > 0
      ? 'Parte del código es abierto. Si algo de esto te sirve en tu operación, escribime.'
      : 'Si algo de esto te sirve en tu operación, escribime.';

export function ContactFooter() {
  return (
    <footer className="border-t border-limite">
      <div className="mx-auto w-full max-w-[1080px] px-5 py-16 sm:py-20">
        <p className="max-w-[52ch] text-[1.05rem]">{cierre}</p>

        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
          {[CONTACTO.linkedin, CONTACTO.mail].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener' })}
                className="-my-2 inline-block py-2 font-datos text-[0.8rem] uppercase tracking-[0.06em] text-cultivo underline underline-offset-4 transition-colors duration-150 hover:text-cultivo-profundo"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
