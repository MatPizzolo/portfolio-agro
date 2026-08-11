/**
 * Single source of truth for the production URL and contact details.
 *
 * SITE_URL lives here and nowhere else: metadataBase, the OpenGraph URL and any
 * absolute link all derive from it. See README.md → Deploy.
 */

// Production domain: the Vercel project is named `mateopizzolo`, so the
// fallback is the real URL; NEXT_PUBLIC_SITE_URL overrides it if a custom
// domain ever lands.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mateopizzolo.vercel.app';

export const SITE = {
  nombre: 'Mateo Pizzolo',
  rol: 'ML Engineer — agro argentino',
  /** Hero identity line: the H1 already says the domain, so the role drops it. */
  rolCorto: 'ML Engineer',
  titulo: 'Mateo Pizzolo — Machine Learning para el agro argentino',
  // No afirma cuántos proyectos están andando: eso depende de los demoUrl y se
  // deriva en la página (PRODUCT.md → mostrar, no afirmar).
  descripcion:
    'Visión por computadora, datos satelitales y sistemas en producción aplicados al agro argentino.',
  lugar: 'BUENOS AIRES, AR',
  coordenadas: '34.6°S 58.4°O',
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
