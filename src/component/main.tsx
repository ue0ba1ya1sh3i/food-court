import type React from "react"
import { useMemo } from "react"
import { FaHome } from "react-icons/fa"
import { FaBowlFood } from "react-icons/fa6"
import { IoMdMenu, IoMdSettings } from "react-icons/io"
import { Link } from "react-router-dom"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { logout as logoutFunc } from "../lib/logout"
import { useAuthStore } from "../hooks/store/auth"
import { color } from "../lib/color"

type FooterType = "home" | "menu" | "charge" | "settings"

type Main = {
  children: React.ReactNode
  title: string
  footerType: FooterType,
  logout?: boolean,
  mainClass?: string,
  margin?: boolean
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

const footerMapLogout: FooterMap = [
  {
    footerType: "home",
    label: "ログイン",
    to: "/login",
    icon: <FaHome size={25} />
  },

  {
    footerType: "charge",
    label: "チャージ",
    to: "/qrCharge",
    icon: <RiMoneyDollarCircleFill size={25} />
  }
]

export function Main({ children, title, footerType, logout, mainClass, margin }: Main) {
  const { user, authLoading } = useAuthStore()

  const map = useMemo(() => {
    if (logout && !user && !authLoading) return footerMapLogout
    return footerMap
  }, [logout, user, authLoading])

  if (authLoading) return null

  return (
    <>
      <div className={`${color.main.normal} px-2 h-12 items-center flex gap-2 fixed top-0 w-full`}>
        <IoMdMenu size={35} className={`cursor-pointer p-1 ${color.main.hover} transition rounded-md hidden md:block`} />
        <p className="text-xl p-1 font-bold z-50">{title}</p>

        {(!logout || (logout === true && user)) && (
          <MdLogout
            className={`cursor-pointer p-1 ml-auto ${color.main.hover} transition rounded-md`}
            size={35}
            onClick={logoutFunc}
          />
        )}
      </div>

      <div className={`${!margin && "pt-12 pb-20 md:pb-0"} ${mainClass}`}>
        {children}
      </div>

      <div className={`w-full flex justify-around px-2 h-20 items-center ${color.main.normal} md:hidden fixed bottom-0`}>
        {map.map((item) => (
          <Link key={item.footerType} to={item.to} className={`flex flex-col items-center cursor-pointer w-17 py-2 rounded-md ${footerType === item.footerType ? color.main.thick : ""}`}>
            {item.icon}
            <p className="text-sm">{item.label}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
