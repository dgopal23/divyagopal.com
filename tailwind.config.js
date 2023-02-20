/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'powder':'#F2E0E6'
      },
      fontFamily:{
        montserrat: ['"Montserrat"', "sans"],
        miracle:['"Miracle"', "serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
