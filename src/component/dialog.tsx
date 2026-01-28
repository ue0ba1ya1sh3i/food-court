import type React from "react"
import { IoMdClose } from "react-icons/io"

type Dialog = {
  children: React.ReactNode,
  title: string,
  close?: () => void
  type?: "center"
}

export function DialogComponent({ children, title, close, type }: Dialog) {

  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 p-3 rounded-lg bg-side-main flex flex-col gap-2 ${type != "center" && "md:top-auto md:left-auto md:right-2 md:bottom-2 md:translate-x-0 md:translate-y-0"}`}>
      <div className="flex items-center">
        <p className="text-xl truncate">{title}</p>      
        <IoMdClose className="ml-auto cursor-pointer" size={20} onClick={close} />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}
