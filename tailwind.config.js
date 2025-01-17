/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css",
    "./index.html"
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [],
}

