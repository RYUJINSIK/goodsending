/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#40A6FD",
          light: "#6cb2eb",
          dark: "#2779bd",
        },
        secondary: {
          DEFAULT: "#ad7dff",
          light: "#fff382",
          dark: "#e3ac00",
        },
        // 추가 색상 정의
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
};
