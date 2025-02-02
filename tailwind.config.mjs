import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes, based on Minecraft design system colours: https://boldscandinavia.com/work/minecraft/
const accent = {
  200: "#fab795",
  600: "#ab4b00",
  900: "#542100",
  950: "#3e1700",
};
const gray = {
  100: "#f9f6f3",
  200: "#f2ece8",
  300: "#c8c0bb",
  400: "#96897e",
  500: "#62554b",
  700: "#41362c",
  800: "#2f241b",
  900: "#1c1713",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
    },
  },
  plugins: [starlightPlugin()],
};
