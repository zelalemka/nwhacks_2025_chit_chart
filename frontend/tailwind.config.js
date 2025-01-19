/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'app-background': "url('/src/assets/bg.svg')",
        'custom-noise': "url('/src/assets/noise.svg')",
      },
    },
  },
  plugins: [],
}