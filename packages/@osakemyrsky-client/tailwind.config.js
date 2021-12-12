/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
module.exports = {
  content: [
    "./src/atoms/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layouts/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}"
  ],
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
      2: "2px",
      3: "3px"
    },
    colors: {
      transparent: "transparent",
      black: {
        100: "#263238",
        200: "#171717"
      },
      white: "#FFFFFF",
      gray: {
        600: "#575757",
        500: "#A9A9A9",
        400: "#DADADA",
        300: "#ECECEC",
        200: "#F5F5F5",
        100: "#FAFAFA"
      },
      bronze: {
        300: "#B15730",
        200: "#D48562",
        100: "#E4B5A1"
      },
      blue: {
        300: "#104EDB",
        200: "#407BFF",
        100: "#C5D7FF"
      },
      green: {
        200: "#42BC4E"
      },
      forest: {
        300: "#486739"
      },
      red: {
        200: "#F84646",
        100: "#F59999"
      }
    },
    extend: {
      fontSize: {
        base: ["0.9375rem", "1.5rem"],
        lg: ["1.05rem", "1.75rem"],
        "5xl": ["2.6rem", "1"],
        "6xl": ["3.6rem", "1"]
      },
      boxShadow: {
        md: "0px 2px 21px rgba(0, 0, 0, 0.05)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
