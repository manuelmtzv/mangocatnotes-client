import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        robots: './public/robots.txt',
      },
    },
  },
  plugins: [vue()],
})
