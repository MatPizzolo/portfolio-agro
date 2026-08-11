import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // The only image on the page is the NDVI raster. AVIF first, WebP as fallback.
    formats: ['image/avif', 'image/webp'],
  },
  // The page is fully static; nothing here reads request-time state.
  poweredByHeader: false,
  experimental: {
    // The stylesheet is ~4 KB and render-blocking. Inlining it removes a whole
    // round-trip from the critical path, which on a saturated 4G link at a
    // fairground is worth more than the bytes it costs.
    inlineCss: true,
  },
};

export default nextConfig;
