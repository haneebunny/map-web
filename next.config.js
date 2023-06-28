/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const URL = "https://kakaomap-web.vercel.app";

const nextConfig = {
    reactStrictMode: true,

    swcMinify: true,
    images: {
        loader: "akamai",
        path: isProd ? URL : "http://localhost:3000",
    },
    assetPrefix: "",
    // basePath: isProd ? "/map-web" : "",
    basePath: "",
};

module.exports = nextConfig;

