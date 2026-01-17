import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),

      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']]
        }
      }),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          name: env.VITE_STORE_NAME,
          short_name: "Food Court",
          description: env.DESCRIPTION,
          theme_color: `#${env.VITE_COLOR}`,
          background_color: `#${env.VITE_COLOR}`,
          display: "standalone",
          start_url: "/",

          icons: [
            {
              "purpose": "maskable",
              "sizes": "48x48",
              "src": "/files/icons/x48.png",
              "type": "image/png"
            },

            {
              "purpose": "maskable",
              "sizes": "96x96",
              "src": "/files/icons/x96.png",
              "type": "image/png"
            },

            {
              "purpose": "maskable",
              "sizes": "192x192",
              "src": "/files/icons/x192.png",
              "type": "image/png"
            },

            {
              "purpose": "maskable",
              "sizes": "512x512",
              "src": "/files/icons/x512.png",
              "type": "image/png"
            }
          ]
        }
      }),

      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT
      })
    ],

    server: {
      host: true,
      port: 5173
    },

    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 1000
    }
  }
})
