import React from "react"
import { color } from "../lib/color"

type Button = {
  children: React.ReactNode,
  onClick: () => void
}

export function Button({ onClick, children }: Button) {
  return (
    <button onClick={onClick} className={`${color.main.normal} px-3 py-2 rounded-md ${color.main.hover} transition cursor-pointer`}>{children}</button>
  )
}
