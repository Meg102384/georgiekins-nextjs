/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      '/api/stripe/webhook': ['./fulfillment-pdfs/**/*.pdf'],
    },
  },
};

module.exports = nextConfig;
