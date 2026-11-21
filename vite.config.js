import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The site is served from https://rushab-rayalwar.github.io/video-editing-portfolio/
  // If you move to a custom domain or a <username>.github.io repository, change this back to '/'
  base: '/video-editing-portfolio/',
})
