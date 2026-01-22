import { useSetup } from "@/hooks/setup"
import { storeName } from "@/lib/env"

export function OfflinePage() {
  useSetup("main", "オフラインです")

  return (
    <div className="min-h-dvh flex flex-col text-center p-2">
      <div className="flex flex-col items-center justify-center gap-4 flex-1">
        <p className="text-3xl font-bold">OFFLINE</p>
        <p className="text-xl">現在オフラインです。ネット環境の確認をお願いします</p>
      </div>

      <p className="text-md text-center">{storeName}</p>
    </div>
  )
}
