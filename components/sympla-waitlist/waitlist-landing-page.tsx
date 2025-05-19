"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  placeholder: string
}

interface WaitlistLandingPageProps {
  eventName: string
  eventDate: string
  eventLocation: string
  listName: string
  description: string
  imageUrl: string
  formFields: FormField[]
  isDemo?: boolean
  demoState?: string
}

// Texto padrão para descrição da lista
const DEFAULT_DESCRIPTION = `🎉 Sympla'palooza está chegando. E vai ser épico.
Prepare-se para viver a noite mais insana do ano.

O Sympla'palooza não é apenas uma festa. É um ritual de luz, som e emoção, onde cada batida pulsa com a energia de milhares de pessoas conectadas pelo mesmo desejo: viver o agora.

🚨 Vagas limitadas. Cadastre-se na lista de espera e garanta seu lugar neste espetáculo.

✨ O que é o Sympla'palooza?
Imagine uma atmosfera elétrica, onde as silhuetas dançam em sintonia sob um céu de luzes digitais, envolvidas por visões etéreas de humanóides de vidro em telas glitch. No centro de tudo, um palco moderno, comandado por DJs que não tocam música – eles invocam experiências.

Sympla'palooza é mais que um evento.
É um chamado.
É o encontro dos que querem sair da rotina, se perder na multidão e encontrar a si mesmos no som.

🎶 Por que entrar na lista de espera?
Porque quem está na lista, sai na frente:

Acesso antecipado aos ingressos

Preços promocionais exclusivos

Brindes surpresas para os primeiros confirmados

Spoilers do lineup antes de todo mundo

Convites VIP em sorteios especiais

🔥 O que esperar:
✔ DJs nacionais e internacionais
✔ Telões com visuais interativos e experiências imersivas
✔ Áreas temáticas, lounges secretos e ativações sensoriais
✔ Estrutura de primeira, segurança reforçada, bar premium
✔ Um público vibrante, diverso, pronto pra celebrar

💡 Não fique de fora
Se você sente que esse chamado é pra você, confie no instinto.

Clique no botão abaixo e entre na lista de espera agora.

💥 A festa acontece uma vez por ano. Mas o arrepio de estar lá dura pra sempre.

⏳ Vagas: Extremamente limitadas`

// Lista de emojis que indicam títulos de seção
const SECTION_TITLE_EMOJIS = ["✨", "🎶", "🔥", "💡", "💥", "⏳"]

export function WaitlistLandingPage({
  eventName,
  eventDate,
  eventLocation,
  listName,
  description,
  imageUrl,
  formFields,
  isDemo = false,
  demoState = "active",
}: WaitlistLandingPageProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const isClosed = isDemo && demoState === "closed"
  const displayDescription = description || DEFAULT_DESCRIPTION

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria feita a submissão real dos dados
    setSubmitted(true)
  }

  // Função para determinar a classe CSS com base no conteúdo da linha
  const getLineClass = (line: string) => {
    if (SECTION_TITLE_EMOJIS.some((emoji) => line.startsWith(emoji))) {
      return "text-xl font-semibold text-[#0097ff] mt-8 mb-4"
    }
    if (line.startsWith("✔")) {
      return "ml-6 flex items-start"
    }
    return ""
  }

  // Componente para o formulário de inscrição
  const SignupForm = () => (
    <>
      <h3 className={`text-2xl font-bold mb-6 ${isClosed ? "text-[#848c9b]" : "text-[#0097ff]"}`}>
        {isClosed ? "Lista de espera encerrada" : "Entre na lista de espera"}
      </h3>

      {isClosed && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-700 font-medium mb-2">As inscrições para esta lista foram encerradas</p>
          <p className="text-red-600 text-sm">
            Você ainda pode preencher o formulário abaixo para receber informações sobre futuros eventos.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleInputChange}
                className="w-full"
              />
            ) : (
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleInputChange}
                className="w-full"
              />
            )}
          </div>
        ))}
        <Button
          type="submit"
          className={`w-full text-white text-lg py-6 rounded-md mt-6 ${
            isClosed ? "bg-[#848c9b] hover:bg-[#6e7580]" : "bg-[#ff9036] hover:bg-[#ff8020]"
          }`}
        >
          {isClosed ? "Enviar informações" : "Garantir minha vaga"}
        </Button>
      </form>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Ao se inscrever, você concorda com os Termos de Uso e Política de Privacidade da Sympla.
      </p>
    </>
  )

  // Componente para a confirmação de inscrição
  const SubmissionConfirmation = () => (
    <div className="text-center py-8">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isClosed ? "bg-gray-100" : "bg-green-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 ${isClosed ? "text-gray-600" : "text-green-600"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {isClosed ? "Informações recebidas!" : "Inscrição confirmada!"}
      </h3>
      <p className="text-gray-600 mb-6">
        {isClosed
          ? "Obrigado pelo seu interesse. Entraremos em contato com informações sobre futuros eventos."
          : "Você está na lista de espera do Sympla'palooza. Fique atento ao seu email para novidades!"}
      </p>
      <Button
        className={`${isClosed ? "bg-[#848c9b] hover:bg-[#6e7580]" : "bg-[#0097ff] hover:bg-[#0088e9]"} text-white`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        Voltar ao topo
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a2a] to-[#1a1a4a]">
      {/* Demo Banner - Apenas visível no modo de demonstração */}
      {isDemo && !window.location.pathname.includes("/demo/") && (
        <div
          className={`py-2 px-4 text-white text-center font-medium ${
            demoState === "active" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          MODO DE DEMONSTRAÇÃO - {demoState === "active" ? "LISTA ATIVA" : "LISTA ENCERRADA"}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image src={imageUrl || "/default-event-image.jpg"} alt={eventName} fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{eventName}</h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>{eventLocation}</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{listName}</h2>
          <Button
            size="lg"
            className={`text-white text-lg px-8 py-6 rounded-full ${
              isClosed ? "bg-[#848c9b] hover:bg-[#6e7580]" : "bg-[#ff9036] hover:bg-[#ff8020] animate-pulse"
            }`}
            onClick={() => {
              document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {isClosed ? "Inscrições encerradas" : "Entrar na lista de espera"}
            <ArrowRight className="ml-2" />
          </Button>

          {isClosed && (
            <p className="mt-4 text-white bg-black/30 px-4 py-2 rounded-full text-sm">
              As inscrições foram encerradas em 12/05/2025
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="flex flex-col md:flex-row gap-8 p-6 md:p-12 bg-white">
        <div className="w-full md:w-2/3">
          <div className="prose prose-lg max-w-none">
            {displayDescription.split("\n\n").map((paragraph, index) => (
              <div key={index} className="mb-6">
                {paragraph.split("\n").map((line, lineIndex) => (
                  <p key={lineIndex} className={getLineClass(line)}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div
          id="signup-form"
          className={`w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl border sticky top-24 self-start ${
            isClosed ? "border-gray-300" : "border-gray-200"
          }`}
        >
          {!submitted ? <SignupForm /> : <SubmissionConfirmation />}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a2a] text-white py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image src="/sympla-logo-white.png" alt="Sympla" width={120} height={40} />
              <p className="text-sm mt-2">© 2025 Sympla. Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white hover:text-[#0097ff]">
                Termos de Uso
              </a>
              <a href="#" className="text-white hover:text-[#0097ff]">
                Política de Privacidade
              </a>
              <a href="#" className="text-white hover:text-[#0097ff]">
                Ajuda
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
