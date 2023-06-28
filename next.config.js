/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const URL = "https://haneebunny.github.io/map-web/";
const VercelURL = "https://kakaomap-web.vercel.app";

const nextConfig = {
    reactStrictMode: true,

    swcMinify: true,
    images: {
        loader: "akamai",
        path: isProd ? VercelURL : "http://localhost:3000",
    },
    assetPrefix: isProd ? VercelURL : " ./",
    basePath: isProd ? "/map-web" : "",
};

module.exports = nextConfig;

