import { Main } from "../component/main"
import { QRCodeSVG } from "qrcode.react"
import { useNavigate } from "react-router-dom"

export default function App() {
  const navigate = useNavigate()

  return (
    <Main title="チャージ" footerType="charge">
      <QRCodeSVG value="https://food-court-ue0ba1ya1sh3i.web.app/charge/id" className="size-64" bgColor="transparent" level="L" />
      <button onClick={() => navigate("/qrCharge")}>QR charge</button>
    </Main>
  )
}
