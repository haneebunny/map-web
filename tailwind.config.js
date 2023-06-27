/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: { max: "767px" }, // mobile
            md: { min: "768px", max: "991px" }, // tablet
        },
        extend: {
            fontSize: {
                sm: "0.9rem",
                md: "1rem",
            },
            "overflow-touch": "",
        },
    },
    plugins: [],
};

