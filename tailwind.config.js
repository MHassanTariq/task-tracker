/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "0px",
      sm: "640px", // Small screens and up
      md: "768px", // Medium screens and up
      lg: "1024px", // Large screens and up
      xl: "1280px", // Extra large screens and up
      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        "inner-lg":
          "inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 10px 15px rgba(0, 0, 0, 0.05)",
        "inner-xl":
          "inset 0 10px 15px rgba(0, 0, 0, 0.1), inset 0 20px 25px rgba(0, 0, 0, 0.05)",
        "inner-2xl":
          "inset 0 20px 25px rgba(0, 0, 0, 0.1), inset 0 30px 35px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
    colors: {
      duskyBlue: "#535E8A",
      darkTeal: "#1E2336",
      black: "#000000",
      gainsboro: "#DFDFDF",
      lavanderBlue: "#8A8CE2",
      lavanderIndigo: "#A15FE7",
      skyMagenta: "#CE69C0",
      white: "#FFFFFF",
      silver: "#ACACAC",
      ebonyClay: "#363950",
      errorRed: "#E50D09",
      transparent: "rgba(0,0,0,0)",
    },
  },
  plugins: [],
};
