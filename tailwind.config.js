/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3490dc",
          light: "#6cb2eb",
          dark: "#2779bd",
        },
        secondary: {
          DEFAULT: "#ffed4a",
          light: "#fff382",
          dark: "#e3ac00",
        },
        // 추가 색상 정의
      },
    },
  },
  plugins: [],
};
