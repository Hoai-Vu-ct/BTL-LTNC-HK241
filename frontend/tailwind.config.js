/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030391',
        green: '#55BE24',
        grey: '#9D9D9D',
        lightGrey: "#F5F5F5",
        red: "#F51A1A",
        yellow: "#FFAB2D"
      },
    },
  },
  plugins: [],
}

