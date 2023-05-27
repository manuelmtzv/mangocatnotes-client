/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tech: {
          vue: {
            default: '#4FC08D',
          },
          pinia: {
            default: '#FFD756',
          },
          typescript: {
            default: '#007ACC',
          },
        },
      },
    },
  },
  plugins: [],
}
