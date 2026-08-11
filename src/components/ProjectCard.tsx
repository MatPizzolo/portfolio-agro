import Image from 'next/image';
import { AREAS, type Project } from '@/data/projects';

/**
 * The signature element: each project is a parcel on a cadastral plan.
 *
 * The card carries no border of its own — the 1px lines between parcels come
 * from the grid's `gap` over a --limite background, so contiguous parcels share
 * a single line instead of stacking two (DESIGN_SYSTEM.md → Espaciado y layout).
 *
 * Two direct children only: a full-bleed 16:9 band and the padded content. The
 * band is what the project actually looks like; the NDVI strip is its bottom
 * edge, reading as a map legend under its own map.
 *
 * There is no status UI: the "Probalo" button is the only claim the card makes.
 * The featured parcel (`destacada`) spans the full grid width, like the unequal
 * parcels of a real survey plan.
 */
export function ProjectCard({
  project,
  destacada = false,
}: {
  project: Project;
  destacada?: boolean;
}) {
  const { nombre, descripcion, area, stack, imagen, imagenNota, demoUrl, repoUrl } = project;

  return (
    <article className={`parcela flex flex-col bg-papel ${destacada ? 'md:col-span-2' : ''}`}>
      {/* Fixed band height, not an aspect ratio: the featured parcel spans the
          full 1080px grid, where 16:9 would balloon into a 600px wall of image.
          The placeholder branch is deliberately much shorter than this. */}
      <div>
        {imagen ? (
          <div className="relative h-[200px] sm:h-[220px]">
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              // The featured parcel spans the grid; the rest take half of it.
              sizes={
                destacada
                  ? '(min-width: 1080px) 1080px, 100vw'
                  : '(min-width: 768px) 540px, 100vw'
              }
              className="object-cover"
            />
          </div>
        ) : (
          // Deliberately far shorter than the real-image band: a placeholder
          // should hold the slot, not dominate the page. At full height, five
          // of these were ~30% of the mobile scroll and the page read as an
          // announcement of missing assets.
          <div className="banda-placeholder flex h-24 items-center justify-center px-5">
            {/* --tinta, not --tinta-suave: the caption sits on two surfaces and
                has to clear AA on the darker one (see globals.css). */}
            <p className="text-balance text-center font-datos text-dato-sm uppercase tracking-[0.06em] text-tinta">
              [ {imagenNota ?? AREAS[area].label} ]
            </p>
          </div>
        )}

        {/* NDVI strip: the page's signature, drawn left to right on load as the
            bottom edge of the band. */}
        <div className="franja-dibujo" aria-hidden="true">
          <div className="ndvi-franja h-1 w-full" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Map-legend overline: the swatch is cartographic coding (one token
            surface per area), the same language as a soil-survey legend. */}
        <p className="flex items-center gap-2 font-datos text-dato-sm uppercase tracking-[0.06em] text-tinta-suave">
          <span aria-hidden="true" className={`h-2 w-2 ${AREAS[area].swatch}`} />
          {AREAS[area].label}
        </p>

        <h3
          className={`mt-1 font-display font-bold leading-tight ${destacada ? 'text-[1.6rem]' : 'text-[1.35rem]'}`}
        >
          {nombre}
        </h3>

        <hr className="my-4 border-0 border-t border-limite" />

        {/* Primary reading content in full --tinta: under direct sunlight this
            is the text the producer must actually be able to read. */}
        {/* Capped measure: the featured parcel is 1080px wide and an uncapped
            line there is unreadable. */}
        <p className="max-w-[62ch] text-pretty">{descripcion}</p>

        <ul aria-label="Tecnologías y fuentes de datos" className="mt-5 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="bg-suelo px-2 py-0.5 font-datos text-dato-sm text-tinta"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Equal-weight pair, both 48px tall: the green fill does the ranking,
            not the size. A lone button simply takes the full width. */}
        {(demoUrl ?? repoUrl) ? (
          <div className="mt-auto flex max-w-[420px] gap-2 pt-6">
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 flex-1 items-center justify-center bg-cultivo px-4 font-datos text-dato uppercase tracking-[0.06em] text-papel transition-colors duration-150 hover:bg-cultivo-profundo"
              >
                <span aria-hidden="true">▶</span>&nbsp;Probalo
                <span className="sr-only"> {nombre}</span>
              </a>
            ) : null}
            {repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 flex-1 items-center justify-center border border-tinta px-4 font-datos text-dato uppercase tracking-[0.06em] text-tinta transition-colors duration-150 hover:bg-tinta/6"
              >
                Ver código
                <span className="sr-only"> de {nombre}</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
