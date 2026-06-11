/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#070a0e",
        neon: "#39FF14",
      },
      backgroundColor: {
        'obsidian-glass': 'rgba(7, 10, 14, 0.8)',
      },
      borderColor: {
        'neon-glass': 'rgba(57, 255, 20, 0.3)',
      }
    },
  },
  plugins: [],
}
