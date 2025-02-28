/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "cmyk",
      "business",
      "night",
      "coffee",
      "winter",
      "dracula",
      "acid",
      "lemonade",
      "procyon",
      "neon",
      "corporate",
      "minimalist",
      "cosmic",
      "vintage",
    ],
  },
};
