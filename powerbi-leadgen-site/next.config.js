/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker multi-stage build — produces a minimal standalone server
  output: 'standalone',

  images: {
    domains: [
      'images.unsplash.com',
      'localhost',
      // Strapi container serves media on this domain in production
      'cms.datazeb.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
