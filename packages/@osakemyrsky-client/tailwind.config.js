/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
module.exports = {
  mode: "jit",
  purge: [
    "./src/atoms/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layouts/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}"
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: "Inter"
    },
    screens: {
      desktop: "1400px"
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
        500: "#575757",
        400: "#7D7D7D",
        300: "#BFBFBF",
        200: "#ECECEC",
        100: "#F5F5F5"
      },
      bronze: {
        300: "#B15730",
        200: "#D48562",
        100: "#E4B5A1"
      },
      blue: {
        200: "#4E5EEA",
        100: "#C1C5EC"
      },
      forest: {
        300: "#486739"
      },
      red: {
        200: "#EA4E4E",
        100: "#F59999"
      }
    },
    extend: {
      fontSize: {
        base: ["0.9375rem", "1.5rem"],
        lg: ["1rem", "1.75rem"],
        "5xl": ["2.6rem", "1"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
