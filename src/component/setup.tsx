import React from "react"
import { useBackgroundClass } from "../hooks/store/background"

export default function App({ children }: { children: React.ReactNode }) {
  const { backgroundClass } = useBackgroundClass()

  return (
    <div className={backgroundClass}>
      {children}
    </div>
  )
}
