import type React from "react"
import { FaHome } from "react-icons/fa"
import { FaBowlFood } from "react-icons/fa6"
import { IoMdSettings } from "react-icons/io"
import { Link } from "react-router-dom"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { logout } from "../lib/logout"
import { MdLogout } from "react-icons/md"

type FooterType = "home" | "menu" | "charge" | "settings"

type Main = {
  children: React.ReactNode
  title: string
  footerType: FooterType
}

type FooterMap = {
  footerType: FooterType
  label: string
  to: string
  icon: React.ReactNode
}[]

const footerMap: FooterMap = [
  {
    footerType: "home",
    label: "ホーム",
    to: "/",
    icon: <FaHome size={25} />
  },

  {
    footerType: "menu",
    label: "メニュー",
    to: "/menu",
    icon: <FaBowlFood size={25} />
  },

  {
    footerType: "charge",
    label: "チャージ",
    to: "/charge",
    icon: <RiMoneyDollarCircleFill size={25} />
  },

  {
    footerType: "settings",
    label: "設定",
    to: "/settings",
    icon: <IoMdSettings size={25} />
  }
]

export function Main({ children, title, footerType }: Main) {
  return (
    <>
      <div className="bg-amber-300 px-2 h-12 justify-between items-center flex gap-2 fixed top-0 w-full">
        <p className="text-xl font-bold">{title}</p>
        <MdLogout className="cursor-pointer" size={30} onClick={logout} />
      </div>

      <div className="pt-12 pb-19 md:pb-0">
        {children}
      </div>

      <div className="w-full flex justify-around px-2 h-19 items-center bg-amber-300 md:hidden fixed bottom-0">
        {footerMap.map((item) => (
          <Link key={item.footerType} to={item.to} className={`flex flex-col items-center cursor-pointer w-17 py-1 rounded-md ${footerType === item.footerType ? "bg-amber-400" : ""}`}>
            {item.icon}
            <p className="text-sm">{item.label}</p>
          </Link>
        ))}
      </div>
    </>
  )
}