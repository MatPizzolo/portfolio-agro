# DESIGN.md

El design system completo y vinculante de este proyecto vive en **[`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)**. Leerlo entero antes de cualquier tarea visual. Este archivo es solo un resumen para orientarse rápido.

## Concepto

**"Carta de suelos".** La página se lee como un mapa técnico de lotes: papel de carta topográfica, límites de parcela finos, y el dato (NDVI) como único color protagonista. Referencias: cartas de suelo del INTA, visores satelitales tipo Sentinel Hub, planos catastrales rurales.

## Color

Estrategia **restrained, deliberada**: papel + tinta + límites. El verde aparece solo donde hay dato o acción. Si una pantalla tiene más de ~15% de superficie verde, está mal.

| Token | Hex | Rol |
|---|---|---|
| `--papel` | `#F5F4EE` | Fondo |
| `--tinta` | `#20261F` | Texto principal |
| `--tinta-suave` | `#5A6156` | Texto secundario |
| `--limite` | `#C8CCC0` | Bordes de parcela, hairlines |
| `--cultivo` | `#2F7D3B` | Links, CTA |
| `--cultivo-profundo` | `#0C3D1D` | Hover, extremo denso de la escala NDVI |
| `--rastrojo` | `#B98A3E` | Solo superficie. **Prohibido en texto** (2.82:1) |
| `--rastrojo-tinta` | `#8A6520` | Texto ocre, avisos |
| `--suelo` | `#E9E4D0` | Chips, extremo seco de la escala NDVI |
| `--foco` | `#0C3D1D` | Anillo de foco de teclado |

Se declaran en `@theme` dentro de `globals.css` (Tailwind v4), en OKLCH. Los hex de arriba son la especificación canónica. Único gradiente permitido: la escala NDVI `--suelo → --cultivo → --cultivo-profundo`, y solo sobre datos.

## Tipografía

Las tres familias son de **Omnibus-Type**, fundición argentina. El detalle es intencional.

- **Display:** Archivo Expanded 700-900 — H1 y nombres de proyecto
- **Cuerpo:** Rosario 400/600 — todo el texto corrido
- **Datos:** Chivo Mono 400/500 — metadata, chips, coordenadas

Chivo Mono se eligió por sobre IBM Plex Mono para completar el argumento de la fundición y evitar la mono técnica más vista de Google Fonts.

## Forma

`border-radius: 0` global. **Cero `box-shadow` en toda la página**: los planos no tienen sombras, tienen líneas. Jerarquía por borde, peso tipográfico y espacio. Grilla base de 8px, contenedor máx. 1080px.

## Signature

La **card-parcela**: cada proyecto es una parcela de un plano catastral, con nombre en criollo y una franja NDVI llena de 4px al pie como firma de la página. Todos los proyectos publicados están live: la card no declara estado, lo demuestra con su `▶ Probalo`. En ≥768px las cards forman una grilla catastral de 2 columnas con bordes compartidos de 1px (la primera parcela, destacada, ocupa las dos columnas), no cards flotantes con gap.

## Motion

Un solo momento: al cargar, las parcelas se "dibujan" con stagger de 60ms. CSS puro, sin JS ni librerías. Nada más, salvo transiciones de color en hover. Sin scroll-triggers, sin parallax.

## Restricciones que mandan sobre cualquier default

- Mobile-first real: 390px, Slow 4G, LCP < 2.5s. Es la métrica que gana siempre.
- Cero `'use client'` en el árbol.
- Copy en español rioplatense con voseo. La raya (—) es tipografía correcta acá y se usa a propósito.
- Los anti-patrones de `DESIGN_SYSTEM.md` son vinculantes.
