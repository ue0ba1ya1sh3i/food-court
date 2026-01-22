import { MainComponent } from "@/component/main"
import { QRCodeSVG } from "qrcode.react"
import { useNavigate } from "react-router-dom"

export function ChargePage() {
  const navigate = useNavigate()

  return (
    <MainComponent title="チャージ" footerType="charge">
      <QRCodeSVG value="https://food-court-ue0ba1ya1sh3i.web.app/qrCharge/id" className="size-64" bgColor="transparent" level="L" />
      <button onClick={() => navigate("/public/qr")}>QR charge</button>
    </MainComponent>
  )
}
