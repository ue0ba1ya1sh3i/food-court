/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  
  plugins: [],

  theme: {
    extend: {
      colors: {
        theme: {
          main: "var(--theme-main)",
          sub: "var(--theme-sub)",
          font: "var(--theme-font)"
        },

        main: {
          main: "var(--main-main)",
          font: "var(--main-font)"
        },

        side: {
          main: "var(--side-main)",
          sub: "var(--side-sub)",
          font: "var(--side-font)"
        },

        test: "#ff00ff"
      }
    }
  }
}
