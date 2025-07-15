/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/ml/:path*',
        destination: `${mlServiceUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;