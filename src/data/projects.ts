/**
 * Single source of truth for project content. Never hardcode any of this in a
 * component (CLAUDE.md → Prioridades §3).
 *
 * Every project published here is LIVE: there is no roadmap state. The card
 * proves it with its "Probalo" CTA, which is why the content gate requires a
 * demoUrl for every entry before a production deploy.
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
  /** Required before production: every card promises "Probalo". */
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
    // TODO(mateo): URL de la demo deployada. Sin esto no hay deploy a producción.
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    id: 'monitor-cultivos',
    nombre: 'Monitor de cultivos por satélite',
    // First NDVI mention on the page carries the inline explanation (DESIGN_SYSTEM.md → Voz).
    descripcion:
      'Mirá la salud de tus lotes campaña tras campaña con NDVI (la salud del cultivo vista desde el satélite), sobre imágenes Sentinel-2.',
    area: 'satelite',
    stack: ['Sentinel-2', 'Google Earth Engine', 'Next.js'],
    // TODO(mateo): URL de la demo deployada.
    demoUrl: undefined,
    repoUrl: undefined,
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
    // TODO(mateo): URL de la demo deployada.
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
    // TODO(mateo): URL de la demo deployada.
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    id: 'pronostico-rindes',
    nombre: 'Pronóstico de rindes',
    descripcion:
      'Cuánto va a rendir cada departamento esta campaña, estimado con las estadísticas del MAGyP y Sentinel-2.',
    area: 'prediccion',
    stack: ['MAGyP', 'Sentinel-2', 'Gradient boosting'],
    // TODO(mateo): URL de la demo deployada.
    demoUrl: undefined,
    repoUrl: undefined,
  },
];

// Runs at build (the page is statically prerendered): a production deploy with
// a card missing its demo, or placeholder text, fails the build instead of
// reaching the frozen QR URL. Warn-only in local/preview.
assertProjectContent(projects);
