import { ContactFooter } from '@/components/ContactFooter';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

/**
 * Derived from the data, never asserted: with no demoUrl set, no card renders a
 * "Probalo" button, so the page must not claim anything is running
 * (PRODUCT.md → mostrar, no afirmar).
 */
const conDemo = projects.filter((p) => p.demoUrl).length;

const meta =
  conDemo === projects.length
    ? 'todos andando ahora'
    : conDemo > 0
      ? `${conDemo} de ${projects.length} andando ahora`
      : `${projects.length} proyectos`;

export default function Page() {
  return (
    <>
      <Hero />

      <main>
        {/* Numbered section marker in the legible ochre (--rastrojo-tinta,
            4.81:1). --rastrojo stays banned in text. */}
        <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between gap-4 px-5 pb-4 pt-8">
          <h2 className="font-datos text-dato uppercase tracking-[0.14em] text-rastrojo-tinta">
            01 — Proyectos
          </h2>
          {projects.length > 0 ? (
            <p className="font-datos text-dato-sm uppercase tracking-[0.06em] text-tinta-suave">
              {meta}
            </p>
          ) : null}
        </div>

        {/* The cadastral grid. `gap: 1px` over a --limite background is what
            produces genuinely shared 1px lines between contiguous parcels;
            per-card borders would double up to 2px. The first parcel is the
            featured one and spans both columns; the grid stays at two columns
            above 1080px so parcels keep plan-like proportions.

            --limite is a hairline token, so the slab that produces those lines
            is the 1080px container itself — never the full-bleed wrapper, which
            would turn it into a large flat field on wide screens. */}
        <div className="border-y border-limite">
          <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-px bg-limite md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} destacada={i === 0} />
            ))}
          </div>
        </div>
      </main>

      <ContactFooter />
    </>
  );
}
