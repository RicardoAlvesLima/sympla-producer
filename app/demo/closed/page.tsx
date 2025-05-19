"use client"

import { WaitlistLandingPage } from "@/components/sympla-waitlist/waitlist-landing-page"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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

export default function ClosedDemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-2 flex justify-between items-center">
        <span className="font-bold">DEMO - LISTA ENCERRADA</span>
        <div className="flex gap-2">
          <Link href="/demo/active" target="_blank">
            <Button size="sm" variant="secondary">
              Ver Lista Ativa
            </Button>
          </Link>
          <Link href="/">
            <Button size="sm" variant="secondary" className="flex items-center gap-1">
              <ArrowLeft size={16} />
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <WaitlistLandingPage
          eventName={demoData.eventName}
          eventDate={demoData.eventDate}
          eventLocation={demoData.eventLocation}
          listName={demoData.listName}
          description={demoData.description}
          imageUrl={demoData.imageUrl}
          formFields={demoData.formFields}
          isDemo={true}
          demoState="closed"
        />
      </div>
    </div>
  )
}
