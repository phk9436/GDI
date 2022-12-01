/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
