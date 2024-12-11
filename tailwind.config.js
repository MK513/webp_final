/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sbb: {
          100: "#383838",
          200: "#2C2C2C",
          300: "#202020",
          400: "#191919",
        },
        sbt: {
          100: "#9B9B9B",
          200: "#D4D4D4",
        },
      },
      fontFamily: {
        agro: ["var(--font-agro)", "cursive"],
        chosun: ["var(--font-chosun)", "serif"],
        logy: ["var(--font-logy)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // 사용할 테마 설정 (기본 테마: light, dark)
  },
};
