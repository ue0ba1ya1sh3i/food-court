import { sentryVitePlugin } from "@sentry/vite-plugin"
import { defineConfig, loadEnv } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"
import path from "path"
import fs from "fs"

// ちなみにJSONを明示的に示さなくてもこれはViteがやってくれるらしい
import reqireEnv from "./settings/reqireEnv.json"

export default defineConfig(({ mode }) => {
  // アイコンサイズの指定とenv
  const sizes = ["x48", "x96", "x192", "x512"]
  const env = loadEnv(mode, process.cwd(), "")

  // アイコンパスの指定
  const iconDir = path.resolve(
    __dirname,
    "public/files/icons"
  )
  
  // envに必要な変数がない場合はエラー
  for (const key of reqireEnv) {
    if (!env[key.name]) {
      throw new Error(`Environment variable ${key.name} is required but not defined.`)
    }
  }

  // アイコンに必要なサイズの画像がなければエラー
  for (const size of sizes) {
    const iconPath = path.join(iconDir, `${size}.png`)
    if (!fs.existsSync(iconPath)) {
      throw new Error(
        `Icon file missing: ${iconPath}`
      )
    }
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]]
        }
      }),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          name: env.VITE_STORE_NAME,
          short_name: env.VITE_STORE_NAME,
          description: env.VITE_DESCRIPTION,
          theme_color: env.COLOR,
          background_color: env.COLOR,
          display: "standalone",
          start_url: "/",

          icons: sizes.flatMap(size => ([
            { purpose: "maskable", sizes: size, src: `/files/icons/${size}.png`, type: "image/png" },
            { purpose: "any", sizes: size, src: `/files/icons/${size}.png`, type: "image/png" },
          ]))
        }
      }),

      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT
      })
    ],

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
