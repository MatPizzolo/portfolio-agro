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

Tres roles, **dos familias** — las dos de Omnibus-Type, fundición tipográfica argentina (detalle intencional: hasta las fuentes son del país del proyecto; mencionable en conversación):

| Rol | Familia (Google Fonts) | Uso |
|---|---|---|
| Display | **Archivo** (Expanded, weights 700-900) | H1 del hero, nombres de proyectos. Ancha, técnica, con presencia. Usar con moderación: si todo grita, nada grita. |
| Cuerpo | **Archivo** (400) | Todo el texto corrido. |
| Datos | **Chivo Mono** (400, 500) | Metadata, stack chips, coordenadas, marcadores de sección. Es la voz "telemetría satelital" de la página. |

Display y cuerpo comparten familia por una razón medida, no estética: Archivo ya se carga como fuente
variable con el eje `wdth` (88 KB), así que el peso 400 del cuerpo **no cuesta un byte extra**. Una
tercera familia costaba ~34 KB en el camino que menos margen tiene. La distinción entre display y
cuerpo la hacen el peso, el ancho y la escala, que es contraste suficiente.

Chivo Mono es la mono de la misma fundición que Archivo. Se eligió por sobre IBM Plex Mono para
completar el argumento de la fundición argentina y para no usar la mono técnica más vista de Google
Fonts.

Escala (mobile-first, con `clamp()` para desktop):

- H1 hero: lockup de dos voces de la misma familia. Línea 1 "Machine Learning": `clamp(1.9rem, 7.2vw, 3.25rem)` / Archivo 900 Expanded (`font-stretch: 125%`) / tracking -0.02em. Línea 2 "para el agro argentino.": `clamp(1.5rem, 5.6vw, 2.6rem)` / Archivo 600 ancho normal / tracking -0.01em. Interlineado 1.08. El contraste ancho+peso+escala (ratio ≥1.25) es el impacto; **ninguna línea puede quebrar** — ni a 390px ni dentro de su columna a 1280px. Los topes de la escala salen de esa restricción medida, no del gusto: el Expanded 900 es mucho más ancho de lo que sugiere su cuerpo, y un `clamp` más generoso parte "Machine / Learning" en dos y rompe el lockup.
- H3 nombre de proyecto: `1.35rem` (`1.6rem` en la parcela destacada) / Archivo 700
- H2 de contacto: `clamp(1.5rem, 5.4vw, 2.2rem)` / Archivo 700 / medida máx `20ch`
- Cuerpo: `1rem` / Archivo 400 / interlineado 1.6. Medida máxima `62ch` en las cards: la parcela destacada mide 1080px y una línea sin tope ahí es ilegible
- Metadata/mono: `0.8rem` / Chivo Mono 400 / uppercase con tracking `0.06em` solo en labels
- Marcador de sección: `0.8rem` / Chivo Mono 500 / uppercase, tracking `0.14em`, color `--rastrojo-tinta`

### Espaciado y layout

- Grilla base de 8px. Contenedor máx `1080px`, padding lateral `20px` en mobile.
- Layout de una sola columna en mobile; en ≥768px las cards forman una **grilla catastral**: 2 columnas con bordes compartidos de 1px (`--limite`), como parcelas contiguas en un plano — no cards flotantes con sombra y gap.
- **Se queda en 2 columnas también por encima de 1080px.** Tres columnas achicarían las parcelas hasta perder las proporciones de plano; la parcela destacada (ancho completo) más el 2×2 debajo es la composición canónica con 5 proyectos.
- Los bordes compartidos se logran con `gap: 1px` sobre un contenedor de fondo `--limite` y cards de fondo `--papel`. No con `border` en cada card: eso produce líneas dobles de 2px entre parcelas contiguas.
- **Ese contenedor `--limite` es el de 1080px, nunca el wrapper a sangre.** `--limite` es un token de hairline; puesto en el wrapper full-bleed se convierte en dos franjas grises de ~100px a los costados en ≥1080px — la segunda superficie más grande de la página, y el plano pasa a ser una bandeja.
- **La última parcela ocupa las dos columnas cuando el total es par** (`.parcela:last-child:nth-child(even)`). Como la destacada ya se lleva una fila entera, el resto es impar justo cuando el total es par, y una celda vacía no deja "espacio en blanco": expone la losa `--limite` como un bloque gris sólido.
- Sin sombras (`box-shadow`) en ninguna parte: los planos no tienen sombras, tienen líneas. Jerarquía por borde, peso tipográfico y espacio.
- `border-radius: 0` global. Las parcelas son rectas.

### Jerarquía de reglas

Si la jerarquía la llevan las líneas, las líneas necesitan niveles. Son dos, y no hay un tercero:

| Nivel | Valor | Uso |
|---|---|---|
| Hairline | `1px` `--limite` | Divisores internos, bordes de parcela, separadores de metadata |
| Masthead | `2px` `--tinta` | Solo los dos cortes estructurales de la página: debajo del hero y encima del contacto |

El masthead es lo que separa las tres zonas de la página (identidad / trabajo / contacto). Usarlo en
cualquier otro lado lo devalúa a decoración.
- **Sin header ni navegación.** Una sola pantalla, un solo scroll: no hay a dónde navegar. No agregar una barra superior "porque falta".

---

## Signature: la card-parcela

El elemento por el que se recuerda la página. Cada proyecto es una **parcela de un plano catastral**. La card no declara estado, lo demuestra con su CTA.

```
┌────────────────────────────────────┐
│ ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱ │  ← banda 16:9-ish, alto fijo 200/220px
│ ╱╱╱  [ MAPA NDVI DE UN LOTE ]  ╱╱ │     screenshot real, o placeholder rayado
│ ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱ │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← franja NDVI (4px): la firma
│                                    │
│ ■ SATÉLITE                         │  ← swatch de leyenda + label mono
│ Detector de malezas                │  ← Archivo 700, nombre en criollo
│ ──────────────────────────────────│
│ Sacale una foto a un yuyo y te     │  ← Archivo 400, 1-2 oraciones, máx 62ch
│ dice qué maleza es.                │
│                                    │
│ FastAPI · PyTorch · Docker         │  ← chips mono sobre --suelo
│                                    │
│ [ ▶ Probalo ][ Ver código ]        │  ← par de igual peso, 48px de alto
└────────────────────────────────────┘
```

- **Banda:** encabeza la card, a sangre (sin el padding del contenido). **Alto fijo `200px`, `220px` en ≥640px** — no una relación de aspecto: la parcela destacada mide 1080px de ancho y un 16:9 ahí se convierte en un muro de 600px. Lleva el screenshot real de la demo (`imagen` en `projects.ts`) con `object-cover`.
- **Placeholder de banda:** mientras no haya screenshot, un rayado diagonal a 135° de 9px en `--papel`/`--limite`, con la nota de `imagenNota` centrada entre corchetes. **Alto `96px`, deliberadamente mucho menor que la banda con imagen real**: un placeholder ocupa el lugar, no protagoniza. A altura completa, cinco de estos eran ~30% del scroll mobile y la página se leía como un anuncio de assets faltantes.
  El rayado **no usa `--suelo`**, aunque sea el token de superficie obvio: `--suelo` es el primer stop de la rampa NDVI que va justo abajo, y con la banda en `--suelo` la mitad izquierda de la franja desaparecía contra ella. Dos decisiones correctas por separado que se anulaban.
  **La nota va en `--tinta`**: 14.03:1 sobre `--papel` y 7.05:1 sobre `--limite`; `--tinta-suave` caería a ~3.9:1 y no pasaría AA.
- **Franja NDVI:** 4px con el gradiente NDVI, siempre llena, como **borde inferior de la banda**. No codifica estado: es la **firma** de identidad de la página, se dibuja sola al cargar (ver Motion), y al colgar de la banda se lee como la leyenda de su propio mapa. Un solo ancla visual por card, no dos.
- **Parcela destacada:** el primer proyecto del array ocupa el ancho completo de la grilla en ≥768px (`md:col-span-2`), con el nombre un paso más grande (`1.6rem`). Como en un catastro real, las parcelas no son todas iguales.
- **Sin identificador de nivel, sin badge de estado, sin fecha.** El botón `▶ Probalo` es la única declaración de estado de la card. El content gate **avisa** por cada `demoUrl` faltante pero no bloquea el deploy: la card simplemente sale sin ese botón.

## Hero

- Fondo: el raster NDVI real de zona núcleo (`public/ndvi-hero.webp`) exportado de Google Earth Engine, al 15% de opacidad sobre `--papel`, con los límites de lotes apenas visibles. Es LA prueba silenciosa de que el autor trabaja con estos datos de verdad. Peso máx: 80 KB.
  Se implementa con `next/image` (`fill`, `priority`, `sizes="100vw"`, `aria-hidden`) detrás del contenido. **Se activa solo:** el Hero chequea en build si el archivo existe; si no está, la página sale sin imagen y el build avisa. Nunca un raster falso.
- **Layout: dos columnas desde 768px** (`1.5fr / 1fr`, gap 48px), alineadas al pie (`items-end`). El H1 toma la izquierda; el subtítulo y las líneas de telemetría se apilan a la derecha. En mobile es una sola columna. Esto no es decorativo: apilado, el mismo contenido ocupaba casi el doble de alto y empujaba las parcelas fuera de la primera pantalla. **El hero es una banda de identidad, no una portada** — su trabajo es decir quién sos y dejar ver el trabajo enseguida.
- Padding vertical corto: `48px` arriba / `40px` abajo en mobile, `64px` / `48px` desde 640px. Nada de `py-28`.
- H1 (Archivo 900 + 600, ver escala): `Machine Learning` / `para el agro argentino.` Subtítulo (Archivo 400): `Visión por computadora, datos satelitales y sistemas en producción — del modelo al lote.`
- Debajo, una línea de metadata en mono que ancla el lugar: `BUENOS AIRES, AR · 34.6°S 58.4°O`. Nada que ate la página a una fecha o a un evento: se queda vieja sola.
- Sin botones en el hero: el primer scroll ya muestra las parcelas. La página ES el CTA.

## Componentes restantes

- **Marcadores de sección:** `01 — PROYECTOS`, `02 — CONTACTO`. Mono, uppercase, tracking `0.14em`, color `--rastrojo-tinta`. Son el único uso editorial del ocre; `--rastrojo` sigue prohibido en texto.
- **Chips de stack:** mono `0.72rem`, fondo `--suelo`, sin borde, padding `2px 8px`.
- **Botón primario:** fondo `--cultivo`, texto `--papel`, mono, sin radius, hover → `--cultivo-profundo`. Nombre = acción exacta — nunca "Click aquí" ni "Más info".
  **Siempre tiene que haber exactamente uno visible en la página.** El relleno verde es el mecanismo de jerarquía, y estuvo asignado solo a `▶ Probalo`: como ningún proyecto tiene `demoUrl` todavía, la página quedó sin un solo botón relleno y el CTA de contacto se veía igual que cuatro "Ver código". Por eso el mail del footer lleva el tratamiento primario. Si algún día todas las cards tienen demo, revisar que el footer no compita con ellas.
- **Botón secundario ("Ver código", contacto):** borde `1px --tinta`, fondo transparente, texto `--tinta`, mono, sin radius, hover → `--tinta` al 6%.
- **Par de CTAs:** los dos botones de una card van lado a lado, `flex-1`, **`min-height: 48px`** los dos, con la fila topeada a `420px` de ancho. El ranking lo hace el relleno verde, no el tamaño. Si solo hay uno, ocupa todo el ancho disponible.
- **CTAs válidos:** `▶ Probalo` (solo si hay `demoUrl`) y `Ver código` (solo si hay `repoUrl`). Nada más.
- **Sin filtro de áreas.** Existió una versión CSS-only con chips-radio y `:has()`. Se sacó, y la razón queda escrita para que no vuelva por inercia: con 5 proyectos que entran en un scroll, costaba ~90px arriba del fold en mobile, era el elemento relleno de más contraste del primer pintado, sus labels quedaban en ~32px de alto (bajo el mínimo táctil de 44px), y —lo peor— el conteo de la sección se calcula en build mientras el filtro esconde cards en runtime, así que filtrar por un área dejaba el encabezado afirmando "5 proyectos" sobre una sola card. El área ya se comunica con el swatch de leyenda en cada parcela. Si algún día hay >12 proyectos, se re-evalúa; antes no.
- **Foco de teclado:** `:focus-visible` → `outline: 2px solid var(--foco)` + `outline-offset: 2px`, sin radius. Aplica a todo link y botón. Nunca `outline: none` sin reemplazo.
- **ContactFooter:** marcador `02 — CONTACTO`, un H2 con el pedido (`Si algo de esto te sirve en tu operación, escribime.`), una línea de apoyo con el estado del código, y los dos botones secundarios (mail, LinkedIn). Cierra con una línea mono `Mateo Pizzolo · Buenos Aires, AR` sobre una hairline. En ≥768px, split de dos columnas: texto a la izquierda, botones a la derecha. Nada más — sin formulario, sin newsletter.
  La línea de apoyo **se deriva de los datos**, no se escribe: `Todo el código es abierto.` solo si **todos** los proyectos tienen `repoUrl`; si no, `Parte del código es abierto.`; si ninguno, no se renderiza. Que cada repo tenga `LICENSE` sigue siendo un chequeo manual.

## Motion

Un solo momento orquestado: al cargar, el plano ya existe (la grilla y sus líneas de 1px están desde el primer frame) y lo que se "traza" sobre él es el **contenido** de cada parcela, con stagger de 60ms (opacity, 300ms, ease-out-quint) — y al final la franja NDVI se dibuja de izquierda a derecha (`clip-path`, 500ms, arranca 180ms después del contenido de su parcela), como dato llegando de una pasada satelital. Un solo eco del mismo gesto: en hover de una parcela la franja se re-escanea (700ms, solo el elemento interno para no replicar la entrada). Fuera de eso, solo hovers de color (150ms). Con `prefers-reduced-motion`: todo visible de entrada, sin animación. Sin scroll-triggers, sin parallax, sin contadores animados.

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
- Fotos de stock de campos/tractores/manos con tierra. Las únicas imágenes permitidas son **reales**: el raster NDVI del hero y screenshots de las demos andando. Si no hay screenshot real, va el placeholder rayado — nunca una foto comprada ni una ilustración generada.

## Checklist de calidad por pantalla

- [ ] ¿Funciona y se lee perfecto a 390px de ancho?
- [ ] ¿Contraste AA en todo texto? (ver la tabla de contraste en Tokens → Color; en particular: nada de texto en `--rastrojo`)
- [ ] ¿Todo link y botón tiene `:focus-visible` con el anillo `--foco`?
- [ ] ¿Hay algo verde que no sea dato ni acción? → sacarlo
- [ ] ¿Hay alguna sombra o radius que se escapó? → sacarlo
- [ ] ¿Sigue sin haber ningún `'use client'` en el árbol?
- [ ] Regla Chanel: antes de dar por terminada una vista, eliminar un elemento decorativo.
