import { Main } from "../component/main"
import { useSetup } from "../hooks/setup"
import { BrowserMultiFormatReader } from "@zxing/browser"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendError } from "../lib/sentry"
import { Button } from "../component/button"

export default function App() {
  const navigate = useNavigate()
  const [cameraText, setCameraText] = useState<string>("Chrome Bookに表示されているQRコードを読み込んでください")
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false)

  useSetup("main", "QRチャージ")

  const videoRef = useRef<HTMLVideoElement>(null)
  const allowPath = "/charge/"
  const allowDomain = import.meta.env.VITE_ALLOW_DOMAIN

  useEffect(() => {
    const reader = new BrowserMultiFormatReader()
    let controls: { stop: () => void } | null = null

    const start = async () => {
      try {
        controls = await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result) => {
            // データがなければ引き返す
            if (!result) return

            // データの取得してURL化
            const url = new URL(result.getText())

            // ドメインが違うなら引き返す
            if (url.origin !== allowDomain) return setCameraText("無効なURLです")

            // パスが違うなら引き返す
            if (!url.pathname.startsWith(allowPath)) return setCameraText("許可されていないパスです")

            // ここでIDを取得し、存在すればカメラを止めて移動！
            const chargeId = url.pathname.replace(allowPath, "")
            if (!chargeId) return setCameraText("IDが存在しません")
            controls?.stop()
            navigate(`/charge/id/${chargeId}`)
          }
        )
      } catch(error) {
        if (error instanceof DOMException) {
          switch (error.name) {
            case "NotAllowedError":
              setCameraText("カメラの使用が拒否されました。ブラウザ設定から許可してください。")
              break

            case "NotFoundError":
              setCameraText("カメラが見つかりません")
              break

            default:
              setCameraText("カメラを起動できませんでした")
              sendError(error)
          }
        }
      }
    }

    // QR解析の実行
    if (isCameraReady) start()

    // クリーンアップ
    return () => {
      controls?.stop()
    }
  }, [allowDomain, navigate, isCameraReady])

  return (
    <Main title="QRチャージ" footerType="charge" logout={true} margin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">QRコードからチャージ</p>
        <video ref={videoRef} className="w-60 aspect-square object-cover rounded-xl border" muted playsInline />
        <p className="text-xs">{cameraText}</p>

        {!isCameraReady && (
          <Button onClick={() => setIsCameraReady(true)}>カメラの起動</Button>
        )}
      </div>
    </Main>
  )
}
