import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

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
          theme_color: "#F3F4F6",
          background_color: "#F3F4F6",
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
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    }
  }
})
