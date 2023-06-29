/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.scss'],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/typography'],
}
