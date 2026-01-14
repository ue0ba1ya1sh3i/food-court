import * as sentry from "@sentry/react"

function sendError(error: Error) {
  if (!import.meta.env.DEV) {
    sentry.captureException(error)
  }
}

export { sendError }
