import { Calendar, MapPin, ExternalLink } from "lucide-react"

export function EventHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#0097ff]"></div>
        <h1 className="text-[#4c576c] text-2xl font-medium">Sympla'palooza</h1>
        <ExternalLink className="text-[#0097ff]" size={20} />
      </div>

      <div className="flex flex-wrap gap-6 text-[#848c9b] mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Sexta, 15/04/2022, 01h14 - Sábado, 16/04/2022, 01h14</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>QG Sympla BH, Minas Gerais</span>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <button className="bg-[#ff9036] text-white px-6 py-2 rounded-md">EDITAR EVENTO</button>
          <button className="border border-[#0097ff] text-[#0097ff] px-6 py-2 rounded-md">DUPLICAR EVENTO</button>
        </div>
      </div>
    </div>
  )
}
