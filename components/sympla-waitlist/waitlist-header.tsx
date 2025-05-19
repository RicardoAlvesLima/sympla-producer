"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, MapPin, ExternalLink, Link2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WaitlistHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  hasPublishedPage?: boolean
}

export function WaitlistHeader({ activeTab, onTabChange, hasPublishedPage = false }: WaitlistHeaderProps) {
  const [tooltipText, setTooltipText] = useState("Copiar Link")
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation() // Evita que o clique ative a aba
    navigator.clipboard.writeText("Sympla WaitList MVP")
    setTooltipText("Copiado!")

    // Reset tooltip text after 2 seconds
    setTimeout(() => {
      setTooltipText("Copiar Link")
      setTooltipOpen(false)
    }, 2000)
  }

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
          <span>Terça-feira, 13/05/2025, 14h30 - Quinta-feira, 15/05/2025, 14h30</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>QG Sympla BH, Minas Gerais</span>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <div></div>
        <div className="flex gap-4">
          <button className="bg-[#ff9036] text-white px-6 py-2 rounded-md">EDITAR EVENTO</button>
          <button className="border border-[#0097ff] text-[#0097ff] px-6 py-2 rounded-md">
            EXPORTAR PARTICIPANTES
          </button>
        </div>
      </div>

      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => onTabChange("visao-geral")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "visao-geral" ? "text-[#0097ff] border-b-2 border-[#0097ff]" : "text-[#848c9b]"
            }`}
          >
            VISÃO GERAL
          </button>
          <button
            onClick={() => onTabChange("gerenciar-lista")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "gerenciar-lista" ? "text-[#0097ff] border-b-2 border-[#0097ff]" : "text-[#848c9b]"
            }`}
          >
            GERENCIAR LISTA
          </button>
          <div className="relative">
            <button
              onClick={() => onTabChange("page-preview")}
              className={`px-4 py-3 text-sm font-medium flex items-center ${
                activeTab === "page-preview" ? "text-[#0097ff] border-b-2 border-[#0097ff]" : "text-[#848c9b]"
              }`}
            >
              PAGE PREVIEW
              {hasPublishedPage && (
                <TooltipProvider>
                  <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger asChild>
                      <button
                        className="ml-2 text-[#0097ff] hover:text-[#0088e9] transition-colors"
                        onClick={handleCopyLink}
                      >
                        <Link2 size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      className={`${tooltipText === "Copiado!" ? "bg-green-500" : "bg-gray-800"} text-white py-1 px-2 rounded text-xs transition-all duration-300`}
                    >
                      {tooltipText}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
