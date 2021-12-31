// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/leagues",
      destination: "/league-browser"
    }
  ]
};

module.exports = config;
