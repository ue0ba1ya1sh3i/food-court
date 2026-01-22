import { useSetup } from "@/hooks/setup"

export function AdminDashboardPage() {
  useSetup("main", "ダッシュボード")

  return (
    <>It works!</>
  )
}
