/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/components/**/*.{js,jsx}",
    "./src/helpers/*.{js,jsx}",
    "./src/routes/*.{js,jsx}",
    "./src/routes/**/*.{js,jsx}",
    "./src/routes/**/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "root": "url('./src/assets/images/root.jpg')",
        "register": "url('./src/assets/images/register.jpg')",
        "login": "url('./src/assets/images/login.jpg')",
        "layout-pattern": "url('./src/assets/images/hexagons.svg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        akomedico: {
          "primary": "#fbbf24",
          "secondary": "#fcd34d",
          "accent": "#d4d4d4",
          "neutral": "#292524",
          "base-100": "#f5f5f5",
          "info": "#3ABFF8",
          "success": "#22c55e",
          "warning": "#FBBD23",
          "error": "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
