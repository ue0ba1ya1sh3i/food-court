import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [
    tailwindcss(),

    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),

    sentryVitePlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_PROJECT
    })],

    build: {
      sourcemap: true
    }
  }
})
