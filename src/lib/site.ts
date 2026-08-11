/**
 * Single source of truth for the production URL and contact details.
 *
 * The printed QR captures SITE_URL and nothing else. Once it goes to print on
 * 2026-08-09 this value is immutable, so it must be final by 2026-08-08.
 * See README.md → Deploy y dominio.
 */

// TODO(mateo): dominio de produccion sin definir. Congelar antes del 2026-08-08.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mateopizzolo.vercel.app';

export const SITE = {
  nombre: 'Mateo Pizzolo',
  rol: 'ML Engineer — agro argentino',
  /** Hero identity line: the H1 already says the domain, so the role drops it. */
  rolCorto: 'ML Engineer',
  titulo: 'Mateo Pizzolo — Machine Learning para el agro argentino',
  descripcion:
    'Visión por computadora, datos satelitales y sistemas en producción aplicados al agro argentino. Cinco proyectos andando ahora.',
  lugar: 'BUENOS AIRES, AR',
  coordenadas: '34.6°S 58.4°O',
  evento: 'AGTECH WEEK 2026',
} as const;

// TODO(mateo): confirmar el perfil de LinkedIn y el mail que se muestran.
export const CONTACTO = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mateopizzolo/',
  },
  mail: {
    label: 'matpizzolo@gmail.com',
    href: 'mailto:matpizzolo@gmail.com',
  },
} as const;
