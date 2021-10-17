/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: "Inter"
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px"
    },
    colors: {
      transparent: "transparent",
      black: {
        100: "#2F2F2F",
        200: "#171717"
      },
      white: "#FFFFFF",
      gray: {
        300: "#7D7D7D",
        200: "#BFBFBF",
        100: "#ECECEC"
      },
      bronze: {
        200: "#CC7752",
        100: "#E4B5A1"
      },
      blue: {
        200: "#4E5EEA",
        100: "#C1C5EC"
      },
      red: {
        200: "#EA4E4E"
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
};
