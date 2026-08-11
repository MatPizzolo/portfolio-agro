import { AREAS, type Project } from '@/data/projects';

/**
 * The signature element: each project is a parcel on a cadastral plan.
 *
 * The card carries no border of its own — the 1px lines between parcels come
 * from the grid's `gap` over a --limite background, so contiguous parcels share
 * a single line instead of stacking two (DESIGN_SYSTEM.md → Espaciado y layout).
 *
 * There is no status UI: every published project is live, and the "Probalo"
 * button is the only claim the card makes. The featured parcel (`destacada`)
 * spans the full grid width, like the unequal parcels of a real survey plan.
 */
export function ProjectCard({
  project,
  destacada = false,
}: {
  project: Project;
  destacada?: boolean;
}) {
  const { nombre, descripcion, area, stack, demoUrl, repoUrl } = project;

  return (
    <article
      className={`parcela area-${area} flex flex-col bg-papel p-5 sm:p-6 ${destacada ? 'md:col-span-2' : ''}`}
    >
      {/* Map-legend overline: the swatch is cartographic coding (one token
          surface per area), the same language as a soil-survey legend. */}
      <p className="flex items-center gap-2 font-datos text-[0.72rem] uppercase tracking-[0.06em] text-tinta-suave">
        <span aria-hidden="true" className={`h-2 w-2 ${AREAS[area].swatch}`} />
        {AREAS[area].label}
      </p>

      <h3
        className={`mt-1 font-display font-bold leading-tight ${destacada ? 'text-[1.6rem]' : 'text-[1.35rem]'}`}
      >
        {nombre}
      </h3>

      <hr className="my-4 border-0 border-t border-limite" />

      {/* Primary reading content in full --tinta: under fair-ground sunlight
          this is the text the producer must actually be able to read. */}
      <p className="text-pretty">{descripcion}</p>

      <ul aria-label="Tecnologías y fuentes de datos" className="mt-5 flex flex-wrap gap-2">
        {stack.map((item) => (
          <li
            key={item}
            className="bg-suelo px-2 py-0.5 font-datos text-[0.72rem] text-tinta"
          >
            {item}
          </li>
        ))}
      </ul>

      {(demoUrl ?? repoUrl) ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {demoUrl ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener"
              className="bg-cultivo px-5 py-3 font-datos text-[0.8rem] uppercase tracking-[0.06em] text-papel transition-colors duration-150 hover:bg-cultivo-profundo"
            >
              <span aria-hidden="true">▶</span> Probalo
              <span className="sr-only"> {nombre}</span>
            </a>
          ) : null}
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener"
              className="-my-2 inline-block py-2 font-datos text-[0.8rem] uppercase tracking-[0.06em] text-cultivo underline underline-offset-4 transition-colors duration-150 hover:text-cultivo-profundo"
            >
              Ver código
              <span className="sr-only"> de {nombre}</span>
            </a>
          ) : null}
        </div>
      ) : null}

      {/* NDVI strip, always full: it no longer encodes status — it is the
          page's signature, and it still draws itself in on load. */}
      <div className="mt-auto pt-6" aria-hidden="true">
        <div className="franja-dibujo">
          <div className="ndvi-franja h-1 w-full" />
        </div>
      </div>
    </article>
  );
}
