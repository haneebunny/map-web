/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const URL = "https://haneebunny.github.io/map-web/";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: isProd ? URL : "http://localhost:3000",
  },
  assetPrefix: isProd ? URL : " ./",
  basePath: isProd ? "/map-web" : "",
};

module.exports = nextConfig;
