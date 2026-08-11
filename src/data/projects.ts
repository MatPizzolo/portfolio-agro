/**
 * Single source of truth for project content. Never hardcode any of this in a
 * component (CLAUDE.md → Prioridades §3).
 *
 * Every project links its public repo via repoUrl ("Ver código"). demoUrl is
 * added as each demo deploys: the content gate warns about missing demos but
 * no longer blocks production — the card simply renders without "Probalo".
 *
 * The FIRST project in the array is the featured parcel (full-width on md+).
 * Names are plain Rioplatense Spanish; technical names live in the repos.
 */

import { assertProjectContent } from './assert-content';

/**
 * Map-legend areas. The swatch colors are cartographic coding, not decoration:
 * each area gets one token surface (DESIGN_SYSTEM.md → Áreas). New areas
 * (edge, clima, llm) join here when their project ships a live demo.
 */
export const AREAS = {
  vision: { label: 'Visión', swatch: 'bg-cultivo' },
  satelite: { label: 'Satélite', swatch: 'bg-rastrojo' },
  prediccion: { label: 'Predicción', swatch: 'bg-cultivo-profundo' },
} as const;

export type Area = keyof typeof AREAS;

export type Project = {
  id: string;
  /** Plain-Spanish descriptive name ("Detector de malezas"), never a brand name. */
  nombre: string;
  /** 1-2 sentences, plain language, no invented metrics. See DESIGN_SYSTEM.md → Voz y copy. */
  descripcion: string;
  /** Drives the card's legend overline and the CSS-only area filter. */
  area: Area;
  stack: string[];
  /**
   * Real screenshot of the running demo, or a real raster. Until it exists the
   * card's band falls back to the hatched placeholder — never a stock photo
   * (DESIGN_SYSTEM.md → Anti-patrones).
   */
  imagen?: { src: string; alt: string };
  /** What the band will eventually show, in mono, while `imagen` is missing. */
  imagenNota?: string;
  /** Optional until each demo deploys; the card hides "Probalo" without it. */
  demoUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'detector-malezas',
    nombre: 'Detector de malezas',
    descripcion:
      'Sacale una foto a un yuyo y te dice qué maleza es, desde el celular en el lote. Entrenado con imágenes reales de campo del dataset DeepWeeds.',
    area: 'vision',
    stack: ['FastAPI', 'PyTorch', 'MLflow', 'Docker'],
    imagenNota: 'Foto de un yuyo con la especie detectada',
    demoUrl: 'https://detector-malezas.vercel.app',
    repoUrl: 'https://github.com/MatPizzolo/detector-malezas',
  },
  {
    id: 'monitor-cultivos',
    nombre: 'Monitor de cultivos por satélite',
    // First NDVI mention on the page carries the inline explanation (DESIGN_SYSTEM.md → Voz).
    descripcion:
      'Mirá la salud de tus lotes campaña tras campaña con NDVI (la salud del cultivo vista desde el satélite), sobre imágenes Sentinel-2.',
    area: 'satelite',
    stack: ['Sentinel-2', 'Google Earth Engine', 'Next.js'],
    imagenNota: 'Mapa NDVI de un lote, campaña a campaña',
    demoUrl: 'https://monitor-cultivos-ndvi.vercel.app',
    repoUrl: 'https://github.com/MatPizzolo/monitor-cultivos-ndvi',
  },
  {
    id: 'mapa-cultivos',
    nombre: 'Mapa de cultivos',
    descripcion:
      'Qué se sembró en cada lote de la zona núcleo, campaña por campaña. Combina AlphaEarth con el Mapa Nacional de Cultivos del INTA.',
    area: 'satelite',
    // The chip names the dataset, not the institution: an INTA researcher
    // reading "INTA" listed as a technology would flag it as sloppy.
    stack: ['AlphaEarth', 'Sentinel-2', 'Mapa Nacional de Cultivos'],
    imagenNota: 'Lotes de la zona núcleo por cultivo',
    demoUrl: 'https://mapa-cultivos.vercel.app',
    repoUrl: 'https://github.com/MatPizzolo/mapa-cultivos',
  },
  // Sits before "Alerta de estrés hídrico" on purpose: it is the only project
  // with neither demo nor repo, so its card renders no CTA at all. Last
  // position would end the whole section on the one parcel you can neither try
  // nor inspect, immediately before the contact ask.
  {
    id: 'pronostico-rindes',
    nombre: 'Pronóstico de rindes',
    descripcion:
      'Cuánto va a rendir cada departamento esta campaña, estimado con las estadísticas del MAGyP y Sentinel-2.',
    area: 'prediccion',
    stack: ['MAGyP', 'Sentinel-2', 'Gradient boosting'],
    imagenNota: 'Rindes estimados por departamento',
    // TODO(mateo): demo y repo cuando el proyecto arranque.
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    id: 'estres-hidrico',
    nombre: 'Alerta de estrés hídrico',
    descripcion:
      'Avisa temprano qué lotes están sufriendo falta de agua, comparando la campaña actual contra el histórico satelital.',
    area: 'prediccion',
    stack: ['Sentinel-2', 'Series temporales'],
    imagenNota: 'Lotes marcados por falta de agua',
    // TODO(mateo): URL de la demo deployada.
    demoUrl: undefined,
    repoUrl: 'https://github.com/MatPizzolo/alerta-estres-hidrico',
  },
];

// Runs at build (the page is statically prerendered): a production deploy with
// placeholder text or a malformed URL fails the build instead of shipping.
// Missing demos only warn. Warn-only in local/preview.
assertProjectContent(projects);
