import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

/**
 * Share preview (WhatsApp and LinkedIn are how the URL travels). Generated at
 * build time; ships zero client JS.
 *
 * Satori only interpolates gradients in sRGB, which drags the NDVI ramp
 * through grey — so the stops below are precomputed in OKLab from the
 * canonical suelo → cultivo → cultivo-profundo tokens.
 */

export const alt = SITE.titulo;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NDVI =
  'linear-gradient(to right, #e9e4d0 0%, #bccaa9 12.5%, #8fb084 25%, #62975f 37.5%, #2f7d3b 50%, #266c33 62.5%, #1d5c2c 75%, #154c24 87.5%, #0c3d1d 100%)';

/**
 * Google Fonts css2 without a browser UA answers with TTF sources, which is
 * what satori accepts. Any failure returns null: the image must still build
 * offline or if the font CDN hiccups on the one deploy that matters.
 */
async function fetchFont(css2Url: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(css2Url).then((r) => (r.ok ? r.text() : ''));
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [archivo, chivoMono] = await Promise.all([
    fetchFont('https://fonts.googleapis.com/css2?family=Archivo:wght@800'),
    fetchFont('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400'),
  ]);

  const fonts = [
    ...(archivo
      ? [{ name: 'Archivo', data: archivo, weight: 800 as const, style: 'normal' as const }]
      : []),
    ...(chivoMono
      ? [{ name: 'Chivo Mono', data: chivoMono, weight: 400 as const, style: 'normal' as const }]
      : []),
  ];

  const mono = {
    fontFamily: chivoMono ? 'Chivo Mono' : 'monospace',
    fontSize: 24,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: '#5A6156',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F4EE',
          color: '#20261F',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: '56px 64px 48px',
          }}
        >
          <div style={mono}>{`${SITE.lugar} · ${SITE.coordenadas}`}</div>
          <div
            style={{
              fontFamily: archivo ? 'Archivo' : 'sans-serif',
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 980,
            }}
          >
            Machine Learning para el agro argentino.
          </div>
          <div style={mono}>{`${SITE.nombre} · ${SITE.rol}`}</div>
        </div>
        <div style={{ height: 20, backgroundImage: NDVI }} />
      </div>
    ),
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
