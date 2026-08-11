# DESIGN_SYSTEM.md — Portfolio AgTech

## Concepto: "Carta de suelos"

La identidad visual sale del mundo real del proyecto: **cartografía agronómica y teledetección**. La página se lee como un mapa técnico de lotes — papel de carta topográfica, límites de parcela finos, y el dato (NDVI) como único color protagonista. No es una landing de startup: es el informe de un ingeniero que trabaja con satélites y campo, y se tiene que sentir así.

Referencias mentales: cartas de suelo del INTA, visores satelitales (Sentinel Hub), planos catastrales rurales. Precisión, no decoración.

---

## Tokens

### Color

Definir como CSS variables en `globals.css`, exponer en Tailwind con estos nombres:

| Token | Hex | Uso |
|---|---|---|
| `--papel` | `#F5F4EE` | Fondo general (papel de carta, gris-verde muy claro) |
| `--tinta` | `#20261F` | Texto principal (negro-verdoso de tinta de plano) |
| `--tinta-suave` | `#5A6156` | Texto secundario, metadata |
| `--limite` | `#C8CCC0` | Bordes de "parcela", divisores, hairlines |
| `--cultivo` | `#2F7D3B` | Acento primario: links, CTA |
| `--cultivo-profundo` | `#0C3D1D` | Hover del acento, extremo denso de la escala NDVI |
| `--rastrojo` | `#B98A3E` | **Solo superficie**: rellenos ocres, visualizaciones de dato seco. Nunca texto (ver abajo) |
| `--rastrojo-tinta` | `#8A6520` | **Texto ocre**: avisos. Es la versión legible de `--rastrojo` |
| `--suelo` | `#E9E4D0` | Fondos de superficie alternativa (chips, código), extremo seco de la escala NDVI |
| `--foco` | `#0C3D1D` | Anillo de foco de teclado (mismo valor que `--cultivo-profundo`, rol distinto) |

**Contraste (medido sobre `--papel`, fórmula WCAG 2.x):**

| Token | Ratio | Uso permitido |
|---|---|---|
| `--tinta` | 14.03:1 | Todo |
| `--cultivo-profundo` / `--foco` | 11.20:1 | Todo. Anillo de foco |
| `--tinta-suave` | 5.81:1 | Todo texto. **No aclararlo más** |
| `--rastrojo-tinta` | 4.81:1 | Todo texto ocre |
| `--cultivo` | 4.63:1 | Texto y CTA. Margen mínimo sobre AA: no aclarar el verde ni oscurecer el papel |
| `--rastrojo` | 2.82:1 | ❌ **No pasa AA. Prohibido en texto.** Solo relleno |
| `--limite` | 1.48:1 | Solo hairlines y bordes de parcela. Nunca porta información por sí solo |
| `--suelo` | 1.16:1 | Solo superficie (chips). `--tinta` sobre `--suelo` da 12.13:1 ✅ |

**Valores OKLCH** (los hex de arriba son la especificación canónica; esto es su equivalente exacto, que es como se declaran en `globals.css`):

```css
--papel:            oklch(96.63% 0.0080  98.88);
--tinta:            oklch(26.01% 0.0155 141.15);
--tinta-suave:      oklch(48.30% 0.0193 133.97);
--limite:           oklch(83.87% 0.0170 121.82);
--cultivo:          oklch(52.51% 0.1258 146.38);
--cultivo-profundo: oklch(31.89% 0.0760 150.72);
--rastrojo:         oklch(66.44% 0.1090  76.83);
--rastrojo-tinta:   oklch(53.21% 0.0961  79.08);
--suelo:            oklch(91.74% 0.0271  95.36);
```

**Gradiente NDVI** (el único gradiente permitido en toda la página, reservado para datos): `--suelo → --cultivo → --cultivo-profundo`. Se usa en la franja NDVI de las cards y en cualquier visualización de datos. Nunca como fondo decorativo de secciones o botones.

Regla: la página es papel + tinta + límites. El verde aparece solo donde hay dato o acción. Si una pantalla tiene más de ~15% de superficie verde, está mal.

### Colores de área (leyenda de mapa)

Cada proyecto pertenece a un **área**, y el área se codifica con un cuadrado de color (swatch) estilo leyenda cartográfica, junto a su label mono. Es color con código, no decoración; los swatches son superficie, así que pueden usar `--rastrojo`.

| Área | Swatch | Label |
|---|---|---|
| Visión | `--cultivo` | `VISIÓN` |
| Satélite | `--rastrojo` | `SATÉLITE` |
| Predicción | `--cultivo-profundo` | `PREDICCIÓN` |

Áreas futuras (`edge`, `clima`, `llm` — ver `docs/proyectos-avanzados.md`) se suman a `AREAS` en `projects.ts` con un token de superficie existente; no se inventan colores nuevos.

### Tipografía

Tres roles, tres familias — **las tres de Omnibus-Type**, fundición tipográfica argentina (detalle intencional: hasta las fuentes son del país del proyecto; mencionable en conversación):

| Rol | Familia (Google Fonts) | Uso |
|---|---|---|
| Display | **Archivo** (Expanded, weights 700-900) | H1 del hero, nombres de proyectos. Ancha, técnica, con presencia. Usar con moderación: si todo grita, nada grita. |
| Cuerpo | **Rosario** (400, 600) | Todo el texto corrido. Legible, humanista, y nombrada como la capital del agro argentino. |
| Datos | **Chivo Mono** (400, 500) | Metadata, stack chips, coordenadas, encabezado de sección. Es la voz "telemetría satelital" de la página. |

Chivo Mono es la mono de la misma fundición que Archivo y Rosario. Se eligió por sobre IBM Plex Mono para completar el argumento de la fundición argentina y para no usar la mono técnica más vista de Google Fonts.

Escala (mobile-first, con `clamp()` para desktop):

- H1 hero: lockup de dos voces de la misma familia. Línea 1 "Machine Learning": `clamp(2.1rem, 8.6vw, 4.25rem)` / Archivo 900 Expanded (`font-stretch: 125%`) / tracking -0.02em. Línea 2 "para el agro argentino.": `clamp(1.65rem, 6.7vw, 3.3rem)` / Archivo 600 ancho normal / tracking -0.01em. Interlineado 1.08. El contraste ancho+peso+escala (ratio ≥1.25) es el impacto; ninguna línea puede quebrar a 390px.
- H3 nombre de proyecto: `1.35rem` (`1.6rem` en la parcela destacada) / Archivo 700
- Cuerpo: `1rem` / Rosario 400 / interlineado 1.6
- Metadata/mono: `0.8rem` / Chivo Mono 400 / uppercase con tracking `0.06em` solo en labels

### Espaciado y layout

- Grilla base de 8px. Contenedor máx `1080px`, padding lateral `20px` en mobile.
- Layout de una sola columna en mobile; en ≥768px las cards forman una **grilla catastral**: 2 columnas con bordes compartidos de 1px (`--limite`), como parcelas contiguas en un plano — no cards flotantes con sombra y gap.
- **Se queda en 2 columnas también por encima de 1080px.** Tres columnas achicarían las parcelas hasta perder las proporciones de plano; la parcela destacada (ancho completo) más el 2×2 debajo es la composición canónica con 5 proyectos.
- Los bordes compartidos se logran con `gap: 1px` sobre un contenedor de fondo `--limite` y cards de fondo `--papel`. No con `border` en cada card: eso produce líneas dobles de 2px entre parcelas contiguas.
- Sin sombras (`box-shadow`) en ninguna parte: los planos no tienen sombras, tienen líneas. Jerarquía por borde, peso tipográfico y espacio.
- `border-radius: 0` global. Las parcelas son rectas.
- **Sin header ni navegación.** Una sola pantalla, un solo scroll: no hay a dónde navegar. No agregar una barra superior "porque falta".

---

## Signature: la card-parcela

El elemento por el que se recuerda la página. Cada proyecto es una **parcela de un plano catastral**. Todos los proyectos publicados están andando: la card no declara estado, lo demuestra con su CTA.

```
┌────────────────────────────────────┐
│ Detector de malezas                │  ← Archivo 700, nombre en criollo
│ ──────────────────────────────────│
│ Sacale una foto a un yuyo y te     │  ← Rosario, 1-2 oraciones
│ dice qué maleza es.                │
│                                    │
│ FastAPI · PyTorch · Docker         │  ← chips mono sobre --suelo
│                                    │
│ ▶ Probalo   Ver código             │  ← CTAs
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← franja NDVI llena (4px): la firma
└────────────────────────────────────┘
```

- **Franja NDVI:** borde inferior de 4px con el gradiente NDVI, siempre llena. Ya no codifica estado: es la **firma** de identidad de la página, y se dibuja sola al cargar (ver Motion).
- **Parcela destacada:** el primer proyecto del array ocupa el ancho completo de la grilla en ≥768px (`md:col-span-2`), con el nombre un paso más grande (`1.6rem`). Como en un catastro real, las parcelas no son todas iguales.
- **Sin identificador de nivel, sin badge de estado, sin fecha.** El botón `▶ Probalo` es la única declaración de estado de la card; por eso el content gate exige `demoUrl` en todos los proyectos antes de un deploy a producción.

## Hero

- Fondo: el raster NDVI real de zona núcleo (`public/ndvi-hero.webp`) exportado de Google Earth Engine, al 15% de opacidad sobre `--papel`, con los límites de lotes apenas visibles. Es LA prueba silenciosa de que el autor trabaja con estos datos de verdad. Peso máx: 80 KB.
  Se implementa con `next/image` (`fill`, `priority`, `sizes="100vw"`, `aria-hidden`) detrás del contenido. **Se activa solo:** el Hero chequea en build si el archivo existe; si no está, la página sale sin imagen y el build avisa. Nunca un raster falso.
- H1 (Archivo 800): `Machine Learning para el agro argentino.` Subtítulo (Rosario): `Visión por computadora, datos satelitales y sistemas en producción — del modelo al lote.`
- Debajo, una línea de metadata en mono que ancla lugar y momento: `BUENOS AIRES, AR · 34.6°S 58.4°O · AGTECH WEEK 2026`.
- Sin botones en el hero: el primer scroll ya muestra las parcelas. La página ES el CTA.

## Componentes restantes

- **Chips de stack:** mono `0.72rem`, fondo `--suelo`, sin borde, padding `2px 8px`.
- **Botón primario ("Probalo"):** fondo `--cultivo`, texto `--papel`, mono, sin radius, hover → `--cultivo-profundo`. Nombre = acción exacta — nunca "Click aquí" ni "Más info".
- **CTAs válidos:** `▶ Probalo` (obligatorio: todo proyecto publicado tiene demo, el gate lo exige) y `Ver código` (solo si hay `repoUrl`). Nada más.
- **Filtro de áreas (CSS-only):** chips-radio (`TODAS · VISIÓN · SATÉLITE · PREDICCIÓN`) entre el encabezado de sección y la grilla. Implementación: radios accesibles + `main:has(#area-x:checked)` ocultando las parcelas que no matchean — **cero JavaScript**, coherente con la regla de cero `'use client'`. Chip seleccionado: fondo `--tinta`, texto `--papel`. Foco: anillo `--foco` sobre el label. Ningún área deja la grilla vacía (toda área publicada tiene ≥1 proyecto).
- **Foco de teclado:** `:focus-visible` → `outline: 2px solid var(--foco)` + `outline-offset: 2px`, sin radius. Aplica a todo link y botón. Nunca `outline: none` sin reemplazo.
- **ContactFooter:** cierre en una línea, Rosario: `Todo el código es abierto. Si algo de esto te sirve en tu operación, escribime.` + dos links mono (LinkedIn, mail). Nada más.
  Esa frase solo es válida si **todos** los proyectos tienen `repoUrl` público y el repo tiene `LICENSE`. Si algún proyecto queda cerrado, cambiar el copy en vez de dejar el reclamo falso.

## Motion

Un solo momento orquestado: al cargar, el plano ya existe (la grilla y sus líneas de 1px están desde el primer frame) y lo que se "traza" sobre él es el **contenido** de cada parcela, con stagger de 60ms (opacity, 300ms, ease-out-quint) — y al final la franja NDVI se dibuja de izquierda a derecha (`clip-path`, 500ms, arranca 180ms después del contenido de su parcela), como dato llegando de una pasada satelital. Dos ecos del mismo gesto, nada más: al filtrar por área, las parcelas que reaparecen re-ejecutan el trazado (gratis: `display` reinicia animaciones CSS); y en hover de una parcela la franja se re-escanea (700ms, solo el elemento interno para no replicar la entrada). Fuera de eso, solo hovers de color (150ms). Con `prefers-reduced-motion`: todo visible de entrada, sin animación. Sin scroll-triggers, sin parallax, sin contadores animados.

Implementación: CSS puro, `@keyframes` + `--retraso` escalonado con `:nth-child()`, solo `opacity` y `clip-path`. Nada de JS ni librerías de animación. La animación va envuelta en `@media (prefers-reduced-motion: no-preference)`, no al revés: así el estado por defecto de la card es "visible y quieta" y reduced-motion no depende de que un override llegue a tiempo.

## Voz y copy

- Español rioplatense con voseo natural: "probalo", "escribime", "mirá tu lote".
- Frases cortas, verbos activos, cero jerga de marketing ("soluciones innovadoras" ❌, "revolucionando el agro" ❌). Específico gana a inteligente: "Detecta 8 especies de malezas con 95% de precisión" ✅.
- El vocabulario del dominio se usa con naturalidad y sin explicar de más: lote, campaña, rinde, NDVI. Esta última se aclara **con un paréntesis breve inline en su primera aparición**: "NDVI (salud del cultivo visto desde el satélite)". No un tooltip: en mobile no hay hover, y sería el único componente interactivo de la página.
- **Los nombres de proyecto van en criollo descriptivo** ("Detector de malezas", "Pronóstico de rindes"), nunca en marca técnica ("WeedAPI"). El nombre técnico vive en el repo.
- Sin métricas inventadas: una descripción sin números es válida; un número que no salió de Mateo, jamás.

## Anti-patrones (prohibido)

- Fondo crema + serif de alto contraste + acento terracota (look genérico de IA #1)
- Fondo negro + un acento verde ácido/flúor (look genérico de IA #2 — ojo: nuestro verde vive sobre papel claro, nunca sobre negro)
- Cards flotantes con sombras suaves y bordes redondeados (Bootstrap-core)
- Gradientes decorativos en fondos o botones (el único gradiente es el NDVI, y es dato)
- Emojis como sistema visual (el único glifo permitido es el `▶` del CTA, y es un carácter tipográfico)
- Fotos de stock de campos/tractores/manos con tierra. La única imagen es el raster NDVI real.

## Checklist de calidad por pantalla

- [ ] ¿Funciona y se lee perfecto a 390px de ancho?
- [ ] ¿Contraste AA en todo texto? (ver la tabla de contraste en Tokens → Color; en particular: nada de texto en `--rastrojo`)
- [ ] ¿Todo link y botón tiene `:focus-visible` con el anillo `--foco`?
- [ ] ¿Hay algo verde que no sea dato ni acción? → sacarlo
- [ ] ¿Hay alguna sombra o radius que se escapó? → sacarlo
- [ ] ¿Sigue sin haber ningún `'use client'` en el árbol?
- [ ] Regla Chanel: antes de dar por terminada una vista, eliminar un elemento decorativo.
