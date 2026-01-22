import * as sentry from "@sentry/react"

function sendError(error: unknown) {
  if (!import.meta.env.DEV) {
    sentry.captureException(error)
  } else {
    console.error(error)
  }
}

function sendLog(message: string) {
  if (!import.meta.env.DEV) {
    sentry.addBreadcrumb({
      category: "main",
      message
    })
  } else {
    console.log(message)
  }
}

export { sendError, sendLog }
