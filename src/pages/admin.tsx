import { useAuthStore } from "@/hooks/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSetup } from "@/hooks"

export function AdminPage() {
  const { authLoading, user } = useAuthStore()
  const navigate = useNavigate()

  useSetup("main", "判別中...")

  useEffect(() => {
    async function changePass() {
      if (!authLoading) {
        // 強制ロール取得
        const tokenResult = await user?.getIdTokenResult(true)
        const role = tokenResult?.claims.role

        // 判断
        switch (role) {
          case "admin":
            navigate("/admin/dashboard")
            break
          case "cooker":
            navigate("/admin/cook")
            break
          default:
            navigate("/")
        }
      }
    }

    changePass()
  }, [authLoading, user, navigate])

  return null
}
