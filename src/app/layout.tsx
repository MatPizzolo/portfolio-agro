import type { Metadata, Viewport } from 'next';
import { Archivo, Chivo_Mono } from 'next/font/google';
import { SITE, SITE_URL } from '@/lib/site';
import './globals.css';

/**
 * Two families, both Omnibus-Type, an Argentine foundry. That is the point:
 * even the type comes from the country the work is about.
 *
 * Archivo carries display AND body — it is a variable font, so the 400 weight
 * the body needs costs nothing on top of the display cuts already loaded. Only
 * Archivo is preloaded: it renders the H1, which is the LCP element. Chivo Mono
 * is swap-only so it never blocks first paint on bad 4G.
 */
// The `wdth` axis is what makes Expanded possible, and it is the single most
// expensive thing on the page: 88.0 KB with it, 34.1 KB without. Kept on
// purpose — the wide display cut is the hero's character, and it sits on the
// LCP path where it is preloaded and paid for once.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  preload: true,
  variable: '--font-archivo',
});

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-chivo-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.titulo,
  description: SITE.descripcion,
  applicationName: SITE.nombre,
  authors: [{ name: SITE.nombre }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: SITE.nombre,
    title: SITE.titulo,
    description: SITE.descripcion,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.titulo,
    description: SITE.descripcion,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F5F4EE',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${archivo.variable} ${chivoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
