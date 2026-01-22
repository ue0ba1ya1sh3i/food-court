import React from "react"

type Button = {
  children: React.ReactNode,
  onClick: () => void
}

export function ButtonComponent({ onClick, children }: Button) {
  return (
    <button onClick={onClick} className={`bg-side-main text-side-font hover:bg-side-sub px-3 py-2 rounded-md transition cursor-pointer`}>{children}</button>
  )
}
