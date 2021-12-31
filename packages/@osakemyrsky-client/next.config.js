// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/auth/:path*",
      destination: `/api/auth/:path*`
    },
    {
      source: "/leagues",
      destination: "/league-browser"
    }
  ]
};

module.exports = config;
