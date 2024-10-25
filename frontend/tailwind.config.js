/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat", "ui-serif"],
        poppins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        fuente: ["Fuente", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        lightgray: "#d3d3d3",
        darkgray: "#A9A9A9",
        nbTheme: "#51438b",
        nbDarkTheme: "#3e326e",
        nbLightTheme: "#A8A1C5",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
