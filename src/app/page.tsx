import { ContactFooter } from '@/components/ContactFooter';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { AREAS, projects } from '@/data/projects';

export default function Page() {
  return (
    <>
      <Hero />

      <main>
        {/* Map-legend section header. Every published project is live, so the
            right side states it plainly; it disappears if the list is empty. */}
        <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between gap-4 px-5 pb-3 pt-8">
          <h2 className="font-datos text-[0.8rem] uppercase tracking-[0.06em]">Proyectos</h2>
          {projects.length > 0 ? (
            <p className="font-datos text-[0.72rem] uppercase tracking-[0.06em] text-tinta-suave">
              todos andando ahora
            </p>
          ) : null}
        </div>

        {/* CSS-only area filter: radios + :has() in globals.css, zero JS.
            Arrow keys move between areas; re-shown parcels re-run the trace
            animation, so every filter change redraws the plan. */}
        <fieldset className="filtro-area mx-auto w-full max-w-[1080px] px-5 pb-4">
          <legend className="sr-only">Filtrar proyectos por área</legend>
          <div className="flex flex-wrap gap-2">
            <span>
              <input
                type="radio"
                name="area"
                id="area-todas"
                defaultChecked
                className="sr-only"
              />
              <label
                htmlFor="area-todas"
                className="inline-flex cursor-pointer items-center gap-2 bg-suelo px-3 py-2 font-datos text-[0.72rem] uppercase tracking-[0.06em] text-tinta transition-colors duration-150"
              >
                Todas
              </label>
            </span>
            {(Object.keys(AREAS) as Array<keyof typeof AREAS>).map((area) => (
              <span key={area}>
                <input type="radio" name="area" id={`area-${area}`} className="sr-only" />
                <label
                  htmlFor={`area-${area}`}
                  className="inline-flex cursor-pointer items-center gap-2 bg-suelo px-3 py-2 font-datos text-[0.72rem] uppercase tracking-[0.06em] text-tinta transition-colors duration-150"
                >
                  <span aria-hidden="true" className={`h-2 w-2 ${AREAS[area].swatch}`} />
                  {AREAS[area].label}
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        {/* The cadastral grid. `gap: 1px` over a --limite background is what
            produces genuinely shared 1px lines between contiguous parcels;
            per-card borders would double up to 2px. The first parcel is the
            featured one and spans both columns; the grid stays at two columns
            above 1080px so parcels keep plan-like proportions. */}
        <div className="border-y border-limite bg-limite">
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
