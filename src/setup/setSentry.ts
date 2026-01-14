import * as sentry from "@sentry/react"

// 開発モードならSentryを立ち上げない
if (!import.meta.env.DEV) {
  sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true
  })
}
