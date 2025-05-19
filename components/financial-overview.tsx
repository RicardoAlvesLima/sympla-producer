import { Info } from "lucide-react"

export function FinancialOverview() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-[#848c9b] font-medium mb-6">FINANCEIRO</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#4c576c] mb-1">Vendas totais</div>
            <div className="text-[#0097ff] text-xl font-medium">R$ 0,00</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#4c576c]">Em processamento (pendentes)</span>
              <Info size={16} className="text-[#848c9b]" />
            </div>
            <div className="text-[#ff9036] text-xl font-medium">R$ 0,00</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#4c576c] mb-1">Total a receber</div>
            <div className="text-[#4c576c] text-xl font-medium">R$ 0,00</div>
          </div>
          <div>
            <div className="text-[#4c576c] mb-1">Total recebido</div>
            <div className="text-[#4c576c] text-xl font-medium">R$ 0,00</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#4c576c]">Ticket médio (bruto)</span>
              <Info size={16} className="text-[#848c9b]" />
            </div>
            <div className="text-[#4c576c] text-xl font-medium">R$ 150,00</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#4c576c]">Ticket médio (líquido)</span>
              <Info size={16} className="text-[#848c9b]" />
            </div>
            <div className="text-[#4c576c] text-xl font-medium">R$ 135,00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
