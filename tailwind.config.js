/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/images/background.png')",
        "haifa-photo": "url('/src/images/haifa.jpg')",
        "telaviv-photo": "url('/src/images/tel-aviv')",
        "herzliya-photo": "url('/src/images/herzeliya.jpg')",
        "jerusalem-photo": "url('/src/images/jerusalem.jpg')",
      },

      colors: {
        oliveGreen: "hsl(118, 36%, 42%)",
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        darkGreen: "#6A994E",
        lightGreen: "#A7C957",
        veryLightGreen: "#F2E8CF",
        lightGray: "#919191",
        veryLightGray: "#BFBFBF",
        hostBtn: "#a7c957",
        hostedBtn: "#f2e8cf",
        lightBorder: "#BFBFBF",
        mediumGray: "#757575",
      },
    },
  },
  plugins: [],
};
