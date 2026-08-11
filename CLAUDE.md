# CLAUDE.md — Contexto e instrucciones para Claude Code

## Qué es este proyecto

Portfolio de una sola página de Mateo Pizzolo, ML Engineer especializándose en ML aplicado al agro argentino. Es la página destino de un QR impreso que se reparte en eventos AgTech (AgTech Week Río Cuarto, 12-13 ago 2026).

**Deadline: el QR se imprime el domingo 9 de agosto de 2026 y a partir de ahí la URL es inmutable.** Por eso la URL y el contenido tienen fechas distintas: contenido y build terminados el **viernes 7**, URL congelada + deploy de producción + verificación en celular real el **sábado 8**, impresión el 9. El contenido se puede seguir puliendo hasta el 11; la URL no. Cronograma completo en `README.md → Deploy y dominio`.

Audiencia: tres perfiles escanean el QR — productores agropecuarios (no técnicos), CTOs/ingenieros de startups AgTech, e investigadores de INTA/universidades. La página debe funcionar para los tres sin dividirse en secciones por audiencia.

## Prioridades (en este orden)

1. **Que funcione en un celular con 4G malo.** Performance > estética > features. Ante cualquier trade-off, elegir lo más liviano.
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
- No tocar el QR/URL de producción sin avisar: una vez impreso el QR, la URL es inmutable.

## Definición de "hecho" para cualquier tarea

- `npm run build` pasa sin errores ni warnings nuevos
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
- Estado de proyectos: 5 proyectos publicados, todos con demo live externa (no hay estado roadmap). Los `demoUrl` se cargan en `projects.ts` cuando estén deployados; el content gate no deja pasar a producción una card sin demo.

## Inputs que aporta Mateo (bloqueantes)

Estas cosas no se pueden inventar. Mientras falten, van como `TODO:` explícito en el código, nunca como texto plausible improvisado:

- Las métricas reales de cada proyecto (precisión, especies, alcance): las descripciones actuales son válidas sin números, pero ningún número entra sin que lo aporte Mateo
- `demoUrl` de los 5 proyectos (si al 7 de agosto alguna demo no está deployada, ese proyecto se saca del array; el gate no deja deployar sin demo)
- `repoUrl` de cada proyecto (de esto depende que el copy "todo el código es abierto" sea cierto)
- `public/ndvi-hero.webp` — raster real exportado de GEE, ≤80 KB (el Hero lo levanta solo en el próximo build; mientras falte, el build avisa)
- URL de LinkedIn y mail de contacto
- Dominio de producción → `SITE_URL` en `src/lib/site.ts`

## Flujo de trabajo sugerido

1. Ante una tarea de UI nueva, leer primero `DESIGN_SYSTEM.md` completo.
2. Proponer el plan en 2-3 líneas antes de escribir código si la tarea toca más de un componente.
3. Después de implementar, correr build + revisar en mobile viewport y reportar qué se verificó.
