import { MainComponent, ButtonComponent } from "@/component"
import { useSetup } from "@/hooks"
import { BrowserMultiFormatReader } from "@zxing/browser"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendError } from "@/lib"

export function QrPage() {
  const navigate = useNavigate()
  const [cameraText, setCameraText] = useState<string>("Chrome Bookに表示されているQRコードを読み込んでください")
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false)

  useSetup("main", "QRチャージ")

  // QR読み取り設定
  const videoRef = useRef<HTMLVideoElement>(null)
  const allowPath = "/public/charge/"
  const allowDomain = window.location.hostname

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
            console.log(url.origin)

            // ドメインが違うなら引き返す
            if (url.origin !== allowDomain) return setCameraText("無効なURLです")

            // パスが違うなら引き返す
            if (!url.pathname.startsWith(allowPath)) return setCameraText("許可されていないパスです")

            // ここでIDを取得し、存在すればカメラを止めて移動！
            const chargeId = url.pathname.replace(allowPath, "")
            if (!chargeId) return setCameraText("IDが存在しません")
            controls?.stop()
            navigate(`/qrCharge/${chargeId}`)
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
    <MainComponent title="QRチャージ" footerType="charge" logout={true} noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-2xl font-bold">QRコードからチャージ</p>
        <video ref={videoRef} className="w-60 aspect-square object-cover rounded-xl bg-gray-300" muted playsInline />
        <p className="text-xs">{cameraText}</p>

        {!isCameraReady && (
          <ButtonComponent onClick={() => setIsCameraReady(true)}>カメラの起動</ButtonComponent>
        )}
      </div>
    </MainComponent>
  )
}
