/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        Orange: "#f8b229",
        Green: "#165b33",
        DarkGreen: "#146b3a",
        Red: "#bb2528",
      },
    },
  },
  plugins: [],
};
