import Image from "next/image"
import { Info } from "lucide-react"

export function QrCodeSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-[#848c9b] font-medium">QR CODE</h3>
        <Info size={16} className="text-[#848c9b]" />
      </div>

      <div className="flex justify-center mb-4">
        <Image src="/qr-code.png" alt="QR Code" width={150} height={150} className="border p-2" />
      </div>

      <button className="text-[#0097ff] font-medium w-full">Baixar QR Code</button>
    </div>
  )
}
