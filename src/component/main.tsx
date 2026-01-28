import type React from "react"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { logout as logoutFunc } from "@/lib"
import { useAuthStore } from "@/hooks/store"

// アイコン
import { FaHome } from "react-icons/fa"
import { FaBowlFood } from "react-icons/fa6"
import { IoMdMenu, IoMdSettings } from "react-icons/io"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { MdLogout } from "react-icons/md"

type FooterType = "home" | "menu" | "charge" | "settings"

type Main = {
  children: React.ReactNode
  title: string
  footerType: FooterType,
  logout?: boolean,
  noMargin?: boolean,
  className?: string
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

export function MainComponent({ children, title, footerType, logout, noMargin, className }: Main) {
  const { user, authLoading } = useAuthStore()

  const map = useMemo(() => {
    if (logout && !user && !authLoading) return footerMapLogout
    return footerMap
  }, [logout, user, authLoading])

  if (authLoading) return null

  return (
    <>
      <div className="bg-side-main text-side-font px-2 h-12 items-center flex gap-2 fixed top-0 w-full">
        <IoMdMenu size={30} className="cursor-pointer bg-side-main hidden md:block" />
        <p className="text-xl font-bold z-50">{title}</p>

        {(!logout || (logout === true && user)) && (
          <MdLogout className="cursor-pointer ml-auto bg-side-main" size={30} onClick={logoutFunc} />
        )}
      </div>

      {/* 実質py-2になっている... */}
      <div className={`${!noMargin && "felx flex-col pt-14 pb-22 md:pb-0 gap-2"} ${className}`}>
        {children}
      </div>

      <div className="w-full flex justify-around px-2 h-20 items-center md:hidden fixed bottom-0 bg-side-main text-side-font">
        {map.map((item) => (
          <Link key={item.footerType} to={item.to} className={`flex flex-col items-center cursor-pointer py-1 w-16 rounded-md ${footerType === item.footerType ? "bg-side-sub" : ""}`}>
            {item.icon}
            <p className="text-sm">{item.label}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
