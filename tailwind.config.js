/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          default: '#F9F5F6',
        },
        header: {
          default: '#FFF2CC',
        },
        entry: {
          default: '#FFFFFF',
        },
        navigation: {
          default: '#FFD966',
          hover: '#ffe492',
        },
        delete: {
          default: '#eb7d7d',
          hover: '#ee9090',
        },
        edit: {
          default: '#A4D0A4',
          hover: '#b6d9b6',
        },
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
