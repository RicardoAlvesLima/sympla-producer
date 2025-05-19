"use client"

import { useState } from "react"
import Image from "next/image"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { EventHeader } from "@/components/event-header"
import { EventTabs } from "@/components/event-tabs"
import { FinancialOverview } from "@/components/financial-overview"
import { QrCodeSection } from "@/components/qr-code-section"
import { GeneralView } from "@/components/general-view"
import { WaitlistDashboard } from "@/components/sympla-waitlist/waitlist-dashboard"
import { WaitlistDemo } from "@/components/sympla-waitlist/waitlist-demo"

export default function ProducerPage() {
  const [currentView, setCurrentView] = useState<"default" | "waitlist" | "demo">("default")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Image src="/sympla-logo.png" alt="Sympla" width={140} height={40} />
          <div className="text-[#0097ff] font-bold">ÁREA DO PRODUTOR</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#848c9b] text-white w-8 h-8 rounded-full flex items-center justify-center">SY</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#848c9b]"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarNavigation
          onWaitlistClick={() => setCurrentView("waitlist")}
          onDemoClick={() => setCurrentView("demo")}
          isWaitlistActive={currentView === "waitlist"}
          isDemoActive={currentView === "demo"}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50">
          {currentView === "default" ? (
            <>
              <EventHeader />
              <EventTabs />

              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="bg-[#0097ff] rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                      <Image src="/placeholder-5wl5z.png" alt="Ícone" width={40} height={40} />
                    </div>
                    <div>
                      <h2 className="text-[#4c576c] text-xl font-medium">Receba as vendas do seu evento</h2>
                      <p className="text-[#848c9b]">Para isso, cadastre agora a conta que receberá o repasse</p>
                    </div>
                  </div>
                  <button className="bg-[#51a800] text-white px-4 py-2 rounded-md font-medium">
                    CADASTRE SUA CONTA BANCÁRIA
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GeneralView />
                <QrCodeSection />
                <FinancialOverview />
              </div>
            </>
          ) : currentView === "waitlist" ? (
            <WaitlistDashboard />
          ) : (
            <WaitlistDemo onBack={() => setCurrentView("default")} />
          )}
        </main>
      </div>
    </div>
  )
}
