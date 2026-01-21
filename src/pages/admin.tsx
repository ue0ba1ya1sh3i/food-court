import { useAuthStore } from "../hooks/store/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSetup } from "../hooks/setup"

export function AdminPage() {
  const { authLoading, user } = useAuthStore()
  const navigate = useNavigate()

  useSetup("main", "判別中...")

  useEffect(() => {
    async function changePass() {
      if (!authLoading) {
        // ロールの取得
        const tokenResult = await user?.getIdTokenResult(true)
        const role = tokenResult?.claims.role

        console.log(role)

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
