/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: './',
  basePath: "/map-web",
};

module.exports = nextConfig;
