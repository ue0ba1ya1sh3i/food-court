import * as sentry from "@sentry/react"
import { devMode } from "@/lib/env"

// 開発モードならSentryを立ち上げない
if (!devMode) {
  sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true
  })
}
