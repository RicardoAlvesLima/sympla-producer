"use client"

import { useState } from "react"
import { ArrowLeft, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WaitlistLandingPage } from "./waitlist-landing-page"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface WaitlistDemoProps {
  onBack: () => void
}

export function WaitlistDemo({ onBack }: WaitlistDemoProps) {
  const [activeTab, setActiveTab] = useState("active")

  // Dados de exemplo para a demonstração
  const demoData = {
    eventName: "Sympla'palooza",
    eventDate: "Terça-feira, 13/05/2025, 14h30 - Quinta-feira, 15/05/2025, 14h30",
    eventLocation: "QG Sympla BH, Minas Gerais",
    listName: "Lista de Espera - Sympla'palooza",
    description: `🎉 Sympla'palooza está chegando. E vai ser épico.
Prepare-se para viver a noite mais insana do ano.

O Sympla'palooza não é apenas uma festa. É um ritual de luz, som e emoção, onde cada batida pulsa com a energia de milhares de pessoas conectadas pelo mesmo desejo: viver o agora.

🚨 Vagas limitadas. Cadastre-se na lista de espera e garanta seu lugar neste espetáculo.

✨ O que é o Sympla'palooza?
Imagine uma atmosfera elétrica, onde as silhuetas dançam em sintonia sob um céu de luzes digitais, envolvidas por visões etéreas de humanóides de vidro em telas glitch. No centro de tudo, um palco moderno, comandado por DJs que não tocam música – eles invocam experiências.

Sympla'palooza é mais que um evento.
É um chamado.
É o encontro dos que querem sair da rotina, se perder na multidão e encontrar a si mesmos no som.`,
    imageUrl: "/default-event-image.jpg",
    formFields: [
      { id: "field_1", type: "text", label: "Nome completo", required: true, placeholder: "Seu nome completo" },
      { id: "field_2", type: "email", label: "Email", required: true, placeholder: "seu@email.com" },
      { id: "field_3", type: "tel", label: "Telefone", required: true, placeholder: "(00) 00000-0000" },
    ],
  }

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4c576c]">Demo - Sympla Waitlist</h1>
          <p className="text-[#848c9b]">Visualize a página de lista de espera em diferentes estados</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={16} />
          Voltar para o dashboard
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-[#4c576c]">Controles de Demonstração</h2>
          <p className="text-[#848c9b]">
            Alterne entre os diferentes estados da página para demonstrar aos stakeholders internos.
          </p>

          <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Lista Ativa</TabsTrigger>
              <TabsTrigger value="closed">Lista Encerrada</TabsTrigger>
            </TabsList>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${activeTab === "active" ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="font-medium">
                  Status atual: {activeTab === "active" ? "Lista ativa e aceitando inscrições" : "Lista encerrada"}
                </span>
              </div>
              <p className="text-sm text-[#848c9b] mt-2">
                {activeTab === "active"
                  ? "Neste estado, a página está coletando inscrições normalmente."
                  : "Neste estado, a página indica que as inscrições foram encerradas, mas ainda permite o preenchimento do formulário."}
              </p>
            </div>
          </Tabs>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <h3 className="font-medium text-[#4c576c]">Abrir em nova aba</h3>
            <div className="flex gap-2">
              <Link href="/demo/active" target="_blank">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
                >
                  <ExternalLink size={16} />
                  Lista Ativa
                </Button>
              </Link>
              <Link href="/demo/closed" target="_blank">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50"
                >
                  <ExternalLink size={16} />
                  Lista Encerrada
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b p-4 flex justify-between items-center bg-gray-50">
          <h3 className="font-medium text-[#4c576c]">Visualização da Página</h3>
          <Button variant="outline" className="flex items-center gap-2" onClick={onBack}>
            <Eye size={16} className="mr-1" />
            Voltar ao Dashboard
          </Button>
        </div>
        <div className="h-[calc(100vh-300px)] overflow-auto">
          <WaitlistLandingPage
            eventName={demoData.eventName}
            eventDate={demoData.eventDate}
            eventLocation={demoData.eventLocation}
            listName={demoData.listName}
            description={demoData.description}
            imageUrl={demoData.imageUrl}
            formFields={demoData.formFields}
            isDemo={true}
            demoState={activeTab}
          />
        </div>
      </div>
    </div>
  )
}
