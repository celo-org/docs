// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"], // my markdown stuff is in ../docs, not /src
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      colors: {
        "dark-varient": "#1f2937",
        "light-varient": "#E5E7EB",
        "darker-varient": "#111827",
        "lighter-varient": "#F3F4F6",
      },
    },
  },
  plugins: [],
};
