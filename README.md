# Portfolio AgTech — Mateo Pizzolo

Web-portfolio de proyectos de Machine Learning aplicado al agro argentino. Una sola página, mobile-first, que muestra los proyectos andando y convierte una conversación técnica en un contacto.

**Objetivo:** que alguien que abre la página desde un celular entienda en 10 segundos quién soy, pruebe un proyecto en 30 segundos, y tenga un solo paso claro para contactarme.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript `strict`
- **Estilos:** Tailwind v4, tokens declarados en `@theme` dentro de `globals.css`. Los valores canónicos están en `DESIGN_SYSTEM.md` — fuente de verdad de todo lo visual. Sin `tailwind.config.ts`.
- **Fuentes:** Archivo (display + cuerpo) y Chivo Mono (datos), self-hosted con `next/font`
- **Deploy:** Vercel (auto-deploy desde `main`)
- **Contenido:** estático, sin CMS. Los proyectos viven en `src/data/projects.ts`
- **Sin backend:** las demos son servicios externos linkeados; esta web es solo la vidriera

## Comandos

```bash
pnpm dev       # desarrollo local
pnpm build     # build de producción — debe pasar sin warnings nuevos antes de mergear
pnpm lint
```

> `pnpm lint` está roto por una incompatibilidad entre `@eslint/eslintrc` y el flat config de Next
> (`TypeError: Converting circular structure to JSON`). El chequeo de tipos igual corre dentro de
> `pnpm build`.

## Estructura

```
src/
  app/
    layout.tsx           # fuentes, metadata, lang="es-AR"
    page.tsx             # landing única (hero → proyectos → contacto)
    globals.css          # tokens (@theme), filtro CSS-only, utilities, motion
    opengraph-image.tsx  # imagen para compartir (next/og), generada en build
  components/
    Hero.tsx             # H1 a dos voces + metadata; raster NDVI opcional de fondo
    ProjectCard.tsx      # la "parcela" (ver DESIGN_SYSTEM.md → Signature)
    ContactFooter.tsx    # el único CTA de la página
  data/
    projects.ts          # ÚNICA fuente de verdad del contenido de proyectos
    assert-content.ts    # content gate: corre en build desde projects.ts
  lib/
    site.ts              # SITE_URL, datos del sitio y contacto
public/                  # ndvi-hero.webp cuando exista (todavía no)
```

Ningún archivo lleva `'use client'`: la página no tiene interactividad real y toda la animación —
incluido el filtro por área— es CSS.

## Modelo de contenido (`projects.ts`)

```ts
type Project = {
  id: string;                              // 'detector-malezas', ...
  nombre: string;                          // criollo descriptivo, nunca marca técnica
  descripcion: string;                     // 1-2 oraciones, sin métricas inventadas
  area: 'vision' | 'satelite' | 'prediccion';   // define swatch de leyenda y filtro
  stack: string[];
  imagen?: { src: string; alt: string };   // screenshot real; si falta va el placeholder rayado
  imagenNota?: string;                     // qué va a mostrar la banda mientras no haya imagen
  demoUrl?: string;                        // sin esto la card no muestra "▶ Probalo"
  repoUrl?: string;                        // sin esto la card no muestra "Ver código"
};
```

El **primer** proyecto del array es la parcela destacada: ocupa el ancho completo en ≥768px.

Las áreas se declaran en `AREAS` en el mismo archivo. Ojo: los selectores del filtro están
hardcodeados en `globals.css` (`#area-vision`, `#area-satelite`, `#area-prediccion`) — agregar un
área nueva a `AREAS` renderiza un chip que no filtra hasta extender esa regla a mano.

### Content gate

`assert-content.ts` corre en cada build. Tira error (y voltea el build) con `VERCEL_ENV=production`
o `STRICT_CONTENT=1` si: el array está vacío, hay ids duplicados, quedó un `TODO(` en texto que se
renderiza, un `area` desconocido, una URL que no es `https://`, o una `imagen` con `src` no
root-relative o `alt` vacío. En local solo avisa.

Las demos faltantes **nunca** bloquean: solo emiten un warning y la card sale sin su botón.

## Requisitos no negociables

1. **Mobile-first real:** el grueso del tráfico es celular con conexión mala. Probar con Chrome
   DevTools en throttling "Slow 4G". **LCP < 2.5s en esa condición es LA métrica: ante cualquier duda,
   gana el LCP.**
2. **Peso:** techo de **420 KB** transferidos.

   | | KB | |
   |---|---:|---|
   | HTML (gzip, CSS inlineado) | 9.6 | |
   | JS | 180.9 | framework; la página no tiene un solo evento |
   | Fuentes (subset `latin`) | 113.8 | Archivo 88.0 · Chivo Mono 25.8 |
   | Raster NDVI | 80.0 | presupuestado, todavía no existe |
   | **Total** | **384.3** | |

   `next/font` emite tres archivos por familia (`latin`, `latin-ext`, `vietnamese`), pero el
   `unicode-range` hace que un navegador en español baje **solo el `latin`**. Los otros cuatro
   archivos quedan en disco sin pedirse nunca.

   **Camino crítico al LCP: 97.6 KB** (HTML + CSS inlineado + Archivo precargado). El resto va
   diferido y no bloquea el primer pintado. Por eso el requisito duro es el punto 1 y no este.

   Los 180 KB de JS son el costo de Next.js en una página estática y no hay flag que los baje.
   Archivo pesa 88 KB porque lleva el eje `wdth` que habilita el Expanded: es una decisión de diseño
   consciente, medida (34.1 KB sin el eje) y documentada en `layout.tsx`. Como Archivo es variable,
   usarla también para el cuerpo no cuesta bytes extra.
3. **Español primero:** todo el contenido en español rioplatense. El código y los comentarios en inglés.
4. **Accesibilidad base:** contraste AA, focus visible, `prefers-reduced-motion` respetado.
5. **Un solo CTA final:** contacto (mail + LinkedIn). No formularios, no newsletter, no chat.

## Deploy

Vercel, auto-deploy desde `main`. La URL de producción vive en `src/lib/site.ts` como `SITE_URL`:
un solo lugar, y de ahí salen `metadataBase`, la URL de OpenGraph y cualquier link absoluto.

## Pendientes

- `demoUrl` de los proyectos — sin esto ninguna card muestra "▶ Probalo"
- `public/ndvi-hero.webp` — export real de GEE, ≤80 KB. El Hero lo levanta solo en el próximo build
- Screenshots reales por proyecto (`imagen` en `projects.ts`) para reemplazar el placeholder rayado
- Dominio de producción en `SITE_URL`

## Documentos relacionados

- `CLAUDE.md` — contexto e instrucciones para trabajar en este repo con Claude Code
- `DESIGN_SYSTEM.md` — tokens, componentes, voz y criterios visuales (fuente de verdad del diseño)
- `PRODUCT.md` — audiencia, tono y anti-referencias (lo lee el skill `impeccable`)
- `DESIGN.md` — puntero corto a `DESIGN_SYSTEM.md` para el mismo skill
