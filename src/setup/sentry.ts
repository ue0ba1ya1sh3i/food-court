import * as sentry from "@sentry/react"
import { isDevMode } from "@/lib/env"

// 開発モードならSentryを立ち上げない
if (!isDevMode) {
  sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,

    // Sentryのリプレイ機能の有効化
    integrations: [
      sentry.replayIntegration()
    ],

    replaysSessionSampleRate: 0.05, // 通常時は5%
    replaysOnErrorSampleRate: 1.0 // エラー発生時は100%
  })
}
