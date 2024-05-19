/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
    screen: {
      'sm': '640px',
      'md': '768px',
      'lg': '1050px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    colors: {
      'main-dark': '#111827'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
