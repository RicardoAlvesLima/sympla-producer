import { cn } from "@/lib/utils"

const tabs = [
  { id: "visao-geral", label: "VISÃO GERAL", isActive: true },
  { id: "formulario", label: "FORMULÁRIO DE INSCRIÇÃO", isActive: false },
  { id: "niveis", label: "NÍVEIS DE ACESSO", isActive: false },
  { id: "integracoes", label: "INTEGRAÇÕES", isActive: false },
  { id: "configuracoes", label: "CONFIGURAÇÕES ADICIONAIS", isActive: false },
]

export function EventTabs() {
  return (
    <div className="border-b mb-6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-3 text-sm font-medium",
              tab.isActive ? "text-[#0097ff] border-b-2 border-[#0097ff]" : "text-[#848c9b]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
