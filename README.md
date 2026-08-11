# Portfolio AgTech — Mateo Pizzolo

Web-portfolio de proyectos de Machine Learning aplicado al agro argentino. Es la página destino del QR que se reparte en eventos (AgTech Week Río Cuarto, 12-13 ago 2026): una sola página, mobile-first, que muestra la escalera de proyectos (2 live + roadmap) y convierte una conversación de pasillo en un contacto técnico.

**Objetivo de la página:** que alguien que escanea el QR desde un celular con 4G entienda en 10 segundos quién soy, pruebe un proyecto en 30 segundos, y tenga un solo paso claro para contactarme.

## Stack

- **Framework:** Next.js (App Router) + TypeScript `strict`. La major se pinea en `package.json` al scaffoldear y no se sube antes del evento.
- **Estilos:** Tailwind v4, tokens declarados en `@theme` dentro de `globals.css` (los valores canónicos están en `DESIGN_SYSTEM.md` — fuente de verdad de todo lo visual). Sin `tailwind.config.ts`.
- **Deploy:** Vercel (auto-deploy desde `main`)
- **Contenido:** estático, sin CMS. Los proyectos viven en `src/data/projects.ts`
- **Sin backend:** las demos live (WeedAPI, Monitor NDVI) son servicios externos linkeados; esta web es solo la vidriera.

## Estructura

```
src/
  app/
    layout.tsx           # fuentes, metadata, lang="es"
    page.tsx             # landing única (hero → proyectos → contacto)
    globals.css          # tokens del design system (@theme de Tailwind v4)
    opengraph-image.tsx  # imagen para compartir en LinkedIn/WhatsApp (next/og)
  components/
    Hero.tsx
    ProjectCard.tsx      # la "parcela" (ver DESIGN_SYSTEM.md → Signature)
    StatusBadge.tsx      # ● LIVE / ◐ ROADMAP con metadata estilo pasada satelital
    ContactFooter.tsx
  data/
    projects.ts          # ÚNICA fuente de verdad del contenido de proyectos
  lib/
    site.ts              # SITE_URL, contacto. Un solo lugar para la URL de producción
  assets/
    ndvi-hero.webp       # raster NDVI real de zona núcleo exportado de GEE
public/
```

Ningún archivo lleva `'use client'`: la página no tiene interactividad y toda la animación es CSS.

## Modelo de contenido (`projects.ts`)

Cada proyecto es un objeto tipado:

```ts
type Project = {
  id: string;              // 'weedapi', 'ndvi-monitor', ...
  nivel: 1 | 2 | 3 | 4 | 5 | 6;
  nombre: string;
  descripcion: string;     // 1-2 oraciones, lenguaje llano (ver voz en DESIGN_SYSTEM.md)
  status: 'live' | 'roadmap';
  stack: string[];         // ['FastAPI', 'MLflow', 'Docker', ...]
  actualizado: string;     // 'YYYY-MM-DD' — subtexto del StatusBadge. No es la fecha de build
  demoUrl?: string;        // solo si status === 'live'
  repoUrl?: string;
  specNote?: string;       // para roadmap: qué va a hacer y con qué datos. Es texto, no un link
};
```

Los 6 proyectos (orden = nivel): WeedAPI (live), Monitor NDVI (live), Mapa de Cultivos con AlphaEarth (roadmap), Alerta de Anomalías Hídricas (roadmap), RindeCast (roadmap), WeedAPI Edge en Jetson (roadmap).

## Comandos

```bash
npm run dev      # desarrollo local
npm run build    # build de producción — debe pasar sin warnings antes de mergear
npm run lint
```

## Requisitos no negociables

1. **Mobile-first real:** el 95% del tráfico es celular en un predio ferial con 4G. Probar con Chrome DevTools en throttling "Slow 4G". **LCP < 2.5s en esa condición es LA métrica: ante cualquier duda, gana el LCP.**
2. **Peso:** techo de **420 KB** transferidos. Este número reemplaza al objetivo original de 300 KB, que era inalcanzable y medía lo que no importa. Medición real (2026-08-04, build de producción):

   | | KB | |
   |---|---:|---|
   | HTML (gzip, CSS inlineado) | 9.6 | |
   | JS | 180.9 | framework; la página no tiene un solo evento |
   | Fuentes (3 archivos `latin`) | 147.7 | Archivo 88.0 · Rosario 33.9 · Chivo Mono 25.8 |
   | Raster NDVI | 80.0 | presupuestado, todavía no existe |
   | **Total** | **418.2** | |

   **Camino crítico al LCP: 97.6 KB** (HTML + CSS inlineado + Archivo precargado). El resto va diferido y no bloquea el primer pintado. Por eso el requisito duro es el punto 1 y no este.

   Los 180 KB de JS son el costo de Next.js en una página estática y no hay flag que los baje. Archivo pesa 88 KB porque lleva el eje `wdth` que habilita el Expanded: es una decisión de diseño consciente, medida (34.1 KB sin el eje) y documentada en `layout.tsx`.
3. **Español primero:** todo el contenido en español rioplatense. El código y los comentarios en inglés.
4. **Accesibilidad base:** contraste AA, focus visible, `prefers-reduced-motion` respetado.
5. **Un solo CTA final:** contacto (LinkedIn + mail). No formularios, no newsletter, no chat.

## Deploy y dominio

Vercel con dominio propio (o subruta `/agro`). La URL vive en `src/lib/site.ts` como `SITE_URL`: un solo lugar.

**La URL y el contenido tienen deadlines distintos.** El QR solo captura la URL, así que:

| Fecha | Hito |
|---|---|
| **vie 7 ago** | Contenido y build terminados |
| **sáb 8 ago** | URL de producción **congelada** + deploy real + verificación en celular real contra esa URL |
| **dom 9 ago** | Se imprime el QR (la URL ya no se puede tocar) |
| **lun 10-11 ago** | Margen para pulir contenido. La URL ya no cambia |
| **mié 12-13 ago** | Evento |

El contenido se puede seguir editando después de imprimir el QR. La URL no.

## Documentos relacionados

- `CLAUDE.md` — contexto e instrucciones para trabajar en este repo con Claude Code
- `DESIGN_SYSTEM.md` — tokens, componentes, voz y criterios visuales (fuente de verdad del diseño)
- `PRODUCT.md` — audiencia, tono y anti-referencias (lo lee el skill `impeccable`)
- `DESIGN.md` — puntero corto a `DESIGN_SYSTEM.md` para el mismo skill
