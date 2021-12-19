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
      destination: `${process.env.API_URL}/auth/:path*`
    },
    {
      source: "/api/:path*",
      destination: `${process.env.API_URL}/:path*`
    },
    {
      source: "/leagues",
      destination: "/league-browser"
    }
  ]
};

module.exports = config;
