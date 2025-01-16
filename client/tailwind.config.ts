module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{html,js}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    experimental: {
        optimizeUniversalDefaults: true,
    },
    theme: {
        extend: {},
    },
    plugins: [],

}