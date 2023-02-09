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
    extend: {},
  },
  daisyui: {
    themes: [
      {
        akomedico: {
          "primary": "#6419E6",
          "secondary": "#D926A9",
          "accent": "#1FB2A6",
          "neutral": "#191D24",
          "base-100": "#f5f5f5",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
