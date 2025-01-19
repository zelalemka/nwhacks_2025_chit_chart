/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'app-background': "url('/img/bg.svg')",
        'custom-noise': "url('/img/noise.svg')",
      },
    },
  },
  plugins: [],
}