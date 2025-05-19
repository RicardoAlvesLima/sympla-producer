"use client"

import { useState, useEffect } from "react"
import { FileSpreadsheet, Users, AlertTriangle, Download, Plus, Calendar, Eye, MoreVertical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { WaitlistHeader } from "./waitlist-header"
import { CreateWaitlist } from "./create-waitlist"
import { WaitlistLandingPage } from "./waitlist-landing-page"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

// Adicionar a importação do fetch para buscar o arquivo CSV
// Atualizar a interface Subscriber para corresponder ao esquema do CSV
interface Subscriber {
  id?: number
  Nome: string
  Email: string
  Telefone: string
  data?: string
}

// Dados de exemplo para simular um CSV carregado
const csvData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    data: "13/05/2025 11:30",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    telefone: "(11) 91234-5678",
    data: "13/05/2025 11:45",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
    telefone: "(11) 99876-5432",
    data: "13/05/2025 12:15",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 95678-1234",
    data: "13/05/2025 12:30",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    telefone: "(11) 92345-6789",
    data: "13/05/2025 13:00",
  },
  {
    id: 6,
    nome: "Mariana Lima",
    email: "mariana.lima@email.com",
    telefone: "(11) 93456-7890",
    data: "13/05/2025 13:15",
  },
  {
    id: 7,
    nome: "Rafael Souza",
    email: "rafael.souza@email.com",
    telefone: "(11) 94567-8901",
    data: "13/05/2025 13:30",
  },
  {
    id: 8,
    nome: "Juliana Alves",
    email: "juliana.alves@email.com",
    telefone: "(11) 95678-9012",
    data: "13/05/2025 13:45",
  },
  {
    id: 9,
    nome: "Fernando Gomes",
    email: "fernando.gomes@email.com",
    telefone: "(11) 96789-0123",
    data: "13/05/2025 14:00",
  },
  {
    id: 10,
    nome: "Patrícia Martins",
    email: "patricia.martins@email.com",
    telefone: "(11) 97890-1234",
    data: "13/05/2025 14:15",
  },
  {
    id: 11,
    nome: "Lucas Pereira",
    email: "lucas.pereira@email.com",
    telefone: "(11) 98901-2345",
    data: "13/05/2025 14:30",
  },
  {
    id: 12,
    nome: "Camila Rodrigues",
    email: "camila.rodrigues@email.com",
    telefone: "(11) 99012-3456",
    data: "13/05/2025 14:45",
  },
  {
    id: 13,
    nome: "Gustavo Almeida",
    email: "gustavo.almeida@email.com",
    telefone: "(11) 90123-4567",
    data: "13/05/2025 15:00",
  },
  {
    id: 14,
    nome: "Bianca Cardoso",
    email: "bianca.cardoso@email.com",
    telefone: "(11) 91234-5678",
    data: "13/05/2025 15:15",
  },
  {
    id: 15,
    nome: "Thiago Ribeiro",
    email: "thiago.ribeiro@email.com",
    telefone: "(11) 92345-6789",
    data: "13/05/2025 15:30",
  },
  {
    id: 16,
    nome: "Larissa Barbosa",
    email: "larissa.barbosa@email.com",
    telefone: "(11) 93456-7890",
    data: "13/05/2025 15:45",
  },
  {
    id: 17,
    nome: "Marcelo Oliveira",
    email: "marcelo.oliveira@email.com",
    telefone: "(11) 94567-8901",
    data: "13/05/2025 16:00",
  },
  {
    id: 18,
    nome: "Vanessa Santos",
    email: "vanessa.santos@email.com",
    telefone: "(11) 95678-9012",
    data: "13/05/2025 16:15",
  },
]

// Tipos definidos para melhor tipagem
interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  placeholder: string
}

interface WaitlistItem {
  id: string
  name: string
  description: string
  imageUrl: string
  formFields: FormField[]
  isActive: boolean
  isDeleted: boolean
  createdAt: Date
  subscribersCount: number
  subscribers: Subscriber[]
  subscriberLimit?: number
  expirationDate?: Date
}

// Valores padrão para reutilização
const DEFAULT_FORM_FIELDS = [
  { id: "field_1", type: "text", label: "Campo 1", required: true, placeholder: "Seu nome completo" },
  { id: "field_2", type: "email", label: "Campo 2", required: true, placeholder: "seu@email.com" },
  { id: "field_3", type: "tel", label: "Campo 3", required: true, placeholder: "(00) 00000-0000" },
]

const DEFAULT_IMAGE_URL = "/default-event-image.jpg"
const DEFAULT_LIST_NAME = "Lista de Espera - Sympla'palooza"

// Alterar o componente WaitlistDashboard para buscar os dados do CSV
export function WaitlistDashboard() {
  const [activeTab, setActiveTab] = useState("visao-geral")
  const [isCreating, setIsCreating] = useState(false)
  const [hasPublishedPage, setHasPublishedPage] = useState(false)
  const [listName, setListName] = useState(DEFAULT_LIST_NAME)
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL)
  const [formFields, setFormFields] = useState<FormField[]>(DEFAULT_FORM_FIELDS)
  const [isListActive, setIsListActive] = useState(true)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [waitlists, setWaitlists] = useState<WaitlistItem[]>([])
  const [deletedWaitlists, setDeletedWaitlists] = useState<WaitlistItem[]>([])
  const [selectedWaitlists, setSelectedWaitlists] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentWaitlistId, setCurrentWaitlistId] = useState<string | null>(null)

  // Função para carregar os dados do CSV
  const fetchCsvData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lista_symplapalooza-5YsyaCB1Xf6aQ6Iug7skkXKw7V3g8H.csv",
      )
      const csvText = await response.text()

      // Realizar o parsing manual do CSV (simplificado)
      const lines = csvText.split("\n")
      const headers = lines[0].split(",")

      const parsedData: Subscriber[] = []

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue // Ignorar linhas vazias

        const values = lines[i].split(",")
        const entry: any = {}

        headers.forEach((header, index) => {
          entry[header.trim()] = values[index]?.trim() || ""
        })

        // Adicionar uma data fictícia e um ID para compatibilidade
        entry.data = `13/05/2025 ${11 + (i % 8)}:${(i * 5) % 60}`
        entry.id = i

        parsedData.push(entry as Subscriber)
      }

      setSubscribers(parsedData)
      setSubscribersCount(parsedData.length)

      // Atualizar as waitlists existentes com os novos dados
      if (waitlists.length > 0 && currentWaitlistId) {
        const updatedWaitlists = waitlists.map((list) => {
          if (list.id === currentWaitlistId) {
            return {
              ...list,
              subscribers: parsedData,
              subscribersCount: parsedData.length,
            }
          }
          return list
        })
        setWaitlists(updatedWaitlists)
      }
    } catch (error) {
      console.error("Erro ao carregar o CSV:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Carregar o CSV quando a página for publicada
  useEffect(() => {
    if (hasPublishedPage) {
      fetchCsvData()
    }
  }, [hasPublishedPage])

  // Inicializar com uma lista de exemplo quando o componente é montado
  useEffect(() => {
    if (waitlists.length === 0 && hasPublishedPage) {
      const newWaitlist: WaitlistItem = {
        id: "1",
        name: listName,
        description,
        imageUrl,
        formFields,
        isActive: isListActive,
        isDeleted: false,
        createdAt: new Date(),
        subscribersCount: subscribers.length,
        subscribers: subscribers,
        subscriberLimit: undefined,
        expirationDate: undefined,
      }
      setWaitlists([newWaitlist])
      setCurrentWaitlistId("1")
    }
  }, [hasPublishedPage])

  // Função para criar um nome único para uma nova lista
  const createUniqueName = (baseName: string) => {
    const existingLists = [...waitlists, ...deletedWaitlists].filter((list) => list.name.startsWith(baseName))
    return existingLists.length > 0 ? `${baseName} (${existingLists.length})` : baseName
  }

  const handleCreateWaitlistComplete = (data: {
    listName: string
    description: string
    imageUrl: string
    formFields: FormField[]
    subscriberLimit?: number
    expirationDate?: Date
  }) => {
    const newName = createUniqueName(data.listName)

    const newWaitlist: WaitlistItem = {
      id: (waitlists.length + deletedWaitlists.length + 1).toString(),
      name: newName,
      description: data.description,
      imageUrl: data.imageUrl || DEFAULT_IMAGE_URL,
      formFields: data.formFields,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      subscribersCount: subscribers.length,
      subscribers: subscribers,
      subscriberLimit: data.subscriberLimit,
      expirationDate: data.expirationDate,
    }

    setWaitlists([...waitlists, newWaitlist])
    setCurrentWaitlistId(newWaitlist.id)

    // Atualizar o estado com os dados da nova lista
    setListName(newName)
    setDescription(data.description)
    setImageUrl(data.imageUrl || DEFAULT_IMAGE_URL)
    setFormFields(data.formFields)
    setHasPublishedPage(true)
    setIsCreating(false)
    setActiveTab("page-preview") // Redireciona para a aba PAGE PREVIEW após publicar
    setSubscribersCount(0) // Inicialmente sem inscritos
    setSubscribers([])
  }

  const handleDeleteWaitlist = () => {
    if (!currentWaitlistId) return

    const waitlistToDelete = waitlists.find((list) => list.id === currentWaitlistId)
    if (!waitlistToDelete) return

    // Mover para a lista de excluídos
    setDeletedWaitlists([...deletedWaitlists, { ...waitlistToDelete, isDeleted: true }])

    // Remover da lista ativa
    const updatedWaitlists = waitlists.filter((list) => list.id !== currentWaitlistId)
    setWaitlists(updatedWaitlists)

    // Se não houver mais listas ativas, resetar o estado
    if (updatedWaitlists.length === 0) {
      setHasPublishedPage(false)
      setCurrentWaitlistId(null)
    } else {
      // Selecionar a primeira lista disponível
      const nextList = updatedWaitlists[0]
      setCurrentWaitlistId(nextList.id)
      setListName(nextList.name)
      setDescription(nextList.description)
      setImageUrl(nextList.imageUrl)
      setFormFields(nextList.formFields)
      setIsListActive(nextList.isActive)
      setSubscribersCount(nextList.subscribersCount)
      setSubscribers(nextList.subscribers)
    }

    setShowDeleteDialog(false)
    setActiveTab("visao-geral")
  }

  const handleToggleWaitlistSelection = (id: string) => {
    setSelectedWaitlists((prev) => (prev.includes(id) ? prev.filter((listId) => listId !== id) : [...prev, id]))
  }

  // Componente para o botão "Criar nova lista"
  const CreateListButton = () => (
    <Button className="bg-[#0097ff] hover:bg-[#0088e9]" onClick={() => setIsCreating(true)}>
      <Plus size={16} className="mr-2" />
      Criar nova lista
    </Button>
  )

  // Componente para mensagem de nenhuma lista criada
  const NoListsMessage = () => (
    <div className="text-center py-8">
      <p className="text-[#848c9b] mb-4">Você ainda não criou nenhuma lista de espera.</p>
      <CreateListButton />
    </div>
  )

  if (isCreating) {
    return <CreateWaitlist onBack={() => setIsCreating(false)} onComplete={handleCreateWaitlistComplete} />
  }

  return (
    <div>
      <WaitlistHeader activeTab={activeTab} onTabChange={setActiveTab} hasPublishedPage={hasPublishedPage} />

      {activeTab === "visao-geral" && (
        <div className="space-y-8">
          {/* Visão Geral */}
          <section>
            <h2 className="text-2xl font-semibold text-[#4c576c] mb-4">Visão Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#848c9b] mb-1">Status da Lista</p>
                    <h3 className="text-4xl font-bold text-[#4c576c]">
                      {!hasPublishedPage ? "Nenhuma lista criada" : isListActive ? "Lista ativa" : "Lista inativa"}
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileSpreadsheet className="text-[#0097ff]" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#848c9b] mb-1">Pessoas em Lista de Espera</p>
                    <h3 className="text-4xl font-bold text-[#4c576c]">{subscribersCount}</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="text-[#0097ff]" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Listas de Espera */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-[#4c576c]">Listas de Espera</h2>
            </div>
            {hasPublishedPage ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="h-40 w-full relative">
                    <Image src={imageUrl || "/placeholder.svg"} alt={listName} fill className="object-cover" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        isListActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isListActive ? "Ativa" : "Inativa"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      {subscribersCount} {subscribersCount === 1 ? "inscrito" : "inscritos"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsListActive(!isListActive)}>
                          {isListActive ? "Desativar lista" : "Ativar lista"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setShowDeleteDialog(true)}
                          className="text-red-600 hover:text-red-700 focus:text-red-700"
                        >
                          Excluir lista
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#4c576c]">{listName}</h3>
                  <div className="flex items-center text-[#848c9b] text-sm mt-1 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>13 de maio, 2025 às 11:13</span>
                  </div>
                  <div className="flex items-center text-[#848c9b] text-sm mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>QG Sympla BH, Minas Gerais</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => setActiveTab("gerenciar-lista")}
                    >
                      <Users size={16} className="mr-2" />
                      Inscrições
                    </Button>
                    <Button
                      className="bg-[#0097ff] hover:bg-[#0088e9] flex items-center justify-center"
                      onClick={() => setActiveTab("page-preview")}
                    >
                      <Eye size={16} className="mr-2" />
                      Page Preview
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <div className="text-gray-300 mb-4">
                  <AlertTriangle size={48} />
                </div>
                <h3 className="text-xl font-semibold text-[#4c576c] mb-2">Nenhuma lista criada</h3>
                <p className="text-[#848c9b] mb-6">Você ainda não criou nenhuma lista de espera para este evento</p>
                <CreateListButton />
              </div>
            )}
          </section>

          {/* Ações Rápidas */}
          <section>
            <h2 className="text-2xl font-semibold text-[#4c576c] mb-4">Ações Rápidas</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-4 w-full text-left">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Download className="text-[#0097ff]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#4c576c]">Exportar Dados</h3>
                      <p className="text-[#848c9b]">Baixe listas de espera em formato CSV</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Exportar dados</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4c576c] mb-1">Intervalo de datas</label>
                        <div className="flex gap-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateRange.from && "text-muted-foreground",
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {dateRange.from ? (
                                  format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione a data inicial</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={dateRange.from}
                                onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateRange.to && "text-muted-foreground",
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {dateRange.to ? (
                                  format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione a data final</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={dateRange.to}
                                onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {(waitlists.length > 0 || deletedWaitlists.length > 0) && (
                        <div>
                          <label className="block text-sm font-medium text-[#4c576c] mb-3">
                            Selecione as listas para exportar
                          </label>
                          <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-3">
                            {[...waitlists, ...deletedWaitlists].map((list) => (
                              <div key={list.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`list-${list.id}`}
                                  checked={selectedWaitlists.includes(list.id)}
                                  onCheckedChange={() => handleToggleWaitlistSelection(list.id)}
                                />
                                <label
                                  htmlFor={`list-${list.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {list.name} {list.isDeleted && <span className="text-red-500">(cancelado)</span>}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button className="bg-[#0097ff] hover:bg-[#0088e9]">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar CSV
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      )}

      {/* Modificar o código da seção "gerenciar-lista" para exibir os dados corretamente */}
      {activeTab === "gerenciar-lista" && (
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-[#4c576c] mb-4">Gerenciar Lista</h2>
          {hasPublishedPage ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-[#4c576c]">{listName}</h3>
                  <p className="text-[#848c9b]">Publicada em {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Editar</Button>
                  <Button
                    variant={isListActive ? "destructive" : "outline"}
                    onClick={() => setIsListActive(!isListActive)}
                  >
                    {isListActive ? "Desativar" : "Ativar"}
                  </Button>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-[#848c9b] mb-4">
                  {subscribersCount === 0
                    ? "Nenhum inscrito até o momento."
                    : `${subscribersCount} ${subscribersCount === 1 ? "inscrito" : "inscritos"} até o momento.`}
                </p>
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-[#4c576c]">Carregando dados...</span>
                  </div>
                ) : subscribersCount > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border px-4 py-2 text-left text-sm font-medium text-[#4c576c]">Nome</th>
                          <th className="border px-4 py-2 text-left text-sm font-medium text-[#4c576c]">Email</th>
                          <th className="border px-4 py-2 text-left text-sm font-medium text-[#4c576c]">Telefone</th>
                          <th className="border px-4 py-2 text-left text-sm font-medium text-[#4c576c]">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber, index) => (
                          <tr key={subscriber.id || index} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                            <td className="border px-4 py-2 text-sm text-[#4c576c]">{subscriber.Nome}</td>
                            <td className="border px-4 py-2 text-sm text-[#4c576c]">{subscriber.Email}</td>
                            <td className="border px-4 py-2 text-sm text-[#4c576c]">{subscriber.Telefone}</td>
                            <td className="border px-4 py-2 text-sm text-[#4c576c]">{subscriber.data}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <NoListsMessage />
          )}
        </div>
      )}

      {activeTab === "page-preview" && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {hasPublishedPage ? (
            <div className="h-[calc(100vh-200px)] overflow-auto border">
              <WaitlistLandingPage
                eventName="Sympla'palooza"
                eventDate="Terça-feira, 13/05/2025, 14h30 - Quinta-feira, 15/05/2025, 14h30"
                eventLocation="QG Sympla BH, Minas Gerais"
                listName={listName}
                description={description}
                imageUrl={imageUrl}
                formFields={formFields}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4">
                <AlertTriangle size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[#4c576c] mb-2">Nenhuma página publicada</h3>
              <p className="text-[#848c9b] mb-6">Você ainda não criou nenhuma lista de espera para este evento</p>
              <CreateListButton />
            </div>
          )}
        </div>
      )}

      {/* Dialog de confirmação para excluir lista */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir lista de espera</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta lista de espera? Esta ação não pode ser desfeita, mas os dados ficarão
              disponíveis para exportação.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteWaitlist}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
