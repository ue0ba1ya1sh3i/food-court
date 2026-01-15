import * as sentry from "@sentry/react"
import type { SeverityLevel } from "@sentry/core"

function sendError(error: Error) {
  if (!import.meta.env.DEV) {
    sentry.captureException(error)
  } else {
    console.error(error)
  }
}

function sendLog(
  category: string,
  message: string,
  level: SeverityLevel
) {
  if (!import.meta.env.DEV) {
    sentry.addBreadcrumb({
      category,
      message,
      level,
    })
  } else {
    console.log(`${category}-${level}: ${message}`)
  }
}

export { sendError, sendLog }
