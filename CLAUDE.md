# CLAUDE.md — Contexto e instrucciones para Claude Code

## Qué es este proyecto

Portfolio de una sola página de Mateo Pizzolo, ML Engineer especializándose en ML aplicado al agro argentino.

Audiencia: tres perfiles llegan a la misma página — productores agropecuarios (no técnicos), CTOs/ingenieros de startups AgTech, e investigadores de INTA/universidades. La página debe funcionar para los tres sin dividirse en secciones por audiencia.

## Prioridades (en este orden)

1. **Que funcione en un celular con conexión mala.** Performance > estética > features. Ante cualquier trade-off, elegir lo más liviano.
2. **Fidelidad al design system.** `DESIGN_SYSTEM.md` es la fuente de verdad visual. No inventar colores, fuentes ni espaciados fuera de los tokens. Si algo no está definido ahí, preguntar o proponer una extensión del sistema, no improvisar.
3. **Contenido editable en un solo lugar.** Todo texto de proyectos sale de `src/data/projects.ts`. Nunca hardcodear contenido de proyectos en componentes.

## Convenciones de código

- Next.js App Router + TypeScript estricto (`strict: true`). **Cero `'use client'` en todo el árbol**: la página no tiene interactividad real y toda la animación es CSS. Es la única palanca que tenemos sobre el JS de primera carga, así que un `'use client'` nuevo necesita justificación explícita.
- Tailwind v4 para todo el estilado. Los tokens del design system se declaran en `@theme` dentro de `globals.css`; no hay `tailwind.config.ts`. No usar valores mágicos inline (`text-[#2F7D3B]` ❌ → `text-cultivo` ✅).
- Componentes chicos y planos: `Hero`, `ProjectCard`, `ContactFooter`. Sin abstracciones prematuras, sin librerías de componentes (nada de shadcn/MUI — el design system es propio y chico).
- Imágenes siempre con `next/image`, formatos WebP/AVIF, `sizes` correcto para mobile.
- Código y comentarios en inglés; todo string visible al usuario en español rioplatense (voseo: "probalo", "escribime").

## Qué NO hacer

- No agregar dependencias sin justificación explícita de peso/beneficio. Prohibidas por defecto: framer-motion (usar CSS transitions), librerías de íconos completas (importar SVGs sueltos), analytics pesados.
- No agregar secciones que no estén en el brief (blog, testimonios, timeline de carrera, dark mode toggle). Una página, un scroll, un CTA.
- No usar los clichés visuales listados en `DESIGN_SYSTEM.md → Anti-patrones`.
- No cambiar `SITE_URL` sin avisar: es la URL pública del sitio.

## Definición de "hecho" para cualquier tarea

- `pnpm build` pasa sin errores ni warnings nuevos
- Verificado en viewport 390px (iPhone) con throttling Slow 4G
- Contraste AA en cualquier texto nuevo, contra la tabla de `DESIGN_SYSTEM.md → Tokens → Color` (ojo: `--rastrojo` no pasa AA y está prohibido en texto; para texto ocre va `--rastrojo-tinta`)
- Focus visible con el anillo `--foco` en cualquier elemento interactivo nuevo
- `prefers-reduced-motion` respetado si se agregó movimiento
- Los textos nuevos siguen la voz definida en `DESIGN_SYSTEM.md → Voz y copy`
- No apareció ningún `'use client'` nuevo

## Contexto de dominio útil

- NDVI = índice de vegetación normalizado, la métrica satelital estándar de salud de cultivo. Escala típica visualizada de beige (suelo desnudo) a verde oscuro (vegetación densa).
- "Lote" = parcela de campo. "Zona núcleo" = región agrícola principal de Argentina (norte de Bs. As., sur de Santa Fe/Córdoba). "Campaña" = ciclo agrícola anual.
- Los proyectos referencian datasets reales: DeepWeeds (malezas), Sentinel-2 (satélite), MAGyP (estadísticas agrícolas argentinas), Mapa Nacional de Cultivos del INTA.
- Estado de proyectos: 5 proyectos publicados, sin estado roadmap. Los `demoUrl` se cargan en `projects.ts` a medida que cada demo se deploya; **hoy no hay ninguno**, así que ninguna card muestra "▶ Probalo". El content gate solo avisa por las demos faltantes, no bloquea: la card sale sin su botón y la meta de la sección se deriva de los datos para no afirmar que algo anda cuando no se puede mostrar.

## Inputs que aporta Mateo (bloqueantes)

Estas cosas no se pueden inventar. Mientras falten, van como `TODO:` explícito en el código, nunca como texto plausible improvisado:

- Las métricas reales de cada proyecto (precisión, especies, alcance): las descripciones actuales son válidas sin números, pero ningún número entra sin que lo aporte Mateo
- `demoUrl` de los 5 proyectos (sin esto ninguna card muestra "▶ Probalo", que es la única declaración de estado que hace la página)
- `repoUrl` de cada proyecto (de esto depende que el copy "todo el código es abierto" sea cierto)
- `public/ndvi-hero.webp` — raster real exportado de GEE, ≤80 KB (el Hero lo levanta solo en el próximo build; mientras falte, el build avisa)
- Screenshots reales de cada demo → `imagen` en `projects.ts`. Mientras falten, la banda de la card muestra el placeholder rayado con la nota de `imagenNota`. Nunca una foto de stock
- URL de LinkedIn y mail de contacto
- Dominio de producción → `SITE_URL` en `src/lib/site.ts`

## Flujo de trabajo sugerido

1. Ante una tarea de UI nueva, leer primero `DESIGN_SYSTEM.md` completo.
2. Proponer el plan en 2-3 líneas antes de escribir código si la tarea toca más de un componente.
3. Después de implementar, correr build + revisar en mobile viewport y reportar qué se verificó.
