/** @type {import('next').NextConfig} */
const withTwin = require("./withTwin.js");
const isProd = process.env.NODE_ENV === "production";
const URL = "https://haneebunny.github.io/map-web/";

const nextConfig = withTwin({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: isProd ? URL : "http://localhost:3000",
  },
  assetPrefix: isProd ? URL : " ./",
  // basePath: "/",
});

module.exports = nextConfig;
