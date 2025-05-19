"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Upload,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Plus,
  GripVertical,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WaitlistLandingPage } from "./waitlist-landing-page"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  placeholder: string
}

interface CreateWaitlistProps {
  onBack: () => void
  onComplete: (data: {
    listName: string
    description: string
    imageUrl: string
    formFields: FormField[]
    subscriberLimit?: number
    expirationDate?: Date
  }) => void
}

export function CreateWaitlist({ onBack, onComplete }: CreateWaitlistProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [isEditingName, setIsEditingName] = useState(false)
  const [listName, setListName] = useState("Lista de Espera - Sympla'palooza")
  const [description, setDescription] = useState("")
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [subscriberLimit, setSubscriberLimit] = useState<string>("")
  const [useExpiration, setUseExpiration] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "field_1", type: "text", label: "Campo 1", required: true, placeholder: "Seu nome completo" },
    { id: "field_2", type: "email", label: "Campo 2", required: true, placeholder: "seu@email.com" },
    { id: "field_3", type: "tel", label: "Campo 3", required: true, placeholder: "(00) 00000-0000" },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setImagePreview(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setImageUrl("")
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...formFields]
    if (direction === "up" && index > 0) {
      ;[newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]]
    } else if (direction === "down" && index < newFields.length - 1) {
      ;[newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]]
    }
    setFormFields(newFields)
  }

  const addField = () => {
    const newId = `field_${formFields.length + 1}`
    setFormFields([
      ...formFields,
      {
        id: newId,
        type: "text",
        label: `Campo ${formFields.length + 1}`,
        required: false,
        placeholder: "Digite aqui",
      },
    ])
  }

  const removeField = (index: number) => {
    // Se só tem um campo, não permite remover
    if (formFields.length <= 1) return

    const newFields = [...formFields]
    newFields.splice(index, 1)

    // Se após remover só sobrar um campo, torna-o obrigatório
    if (newFields.length === 1) {
      newFields[0].required = true
    }

    setFormFields(newFields)
  }

  const openEditDialog = (field: FormField) => {
    setEditingField({ ...field })
    setEditDialogOpen(true)
  }

  const saveFieldEdit = () => {
    if (!editingField) return

    const newFields = formFields.map((field) => {
      if (field.id === editingField.id) {
        return editingField
      }
      return field
    })

    setFormFields(newFields)
    setEditDialogOpen(false)
    setEditingField(null)
  }

  const handlePublish = () => {
    // Passa os dados para o componente pai
    onComplete({
      listName,
      description,
      imageUrl: imagePreview || "/default-event-image.jpg",
      formFields,
      subscriberLimit: subscriberLimit ? Number.parseInt(subscriberLimit) : undefined,
      expirationDate: useExpiration ? expirationDate : undefined,
    })
  }

  // Verifica se só tem um campo e o torna obrigatório
  useEffect(() => {
    if (formFields.length === 1 && !formFields[0].required) {
      const updatedFields = [...formFields]
      updatedFields[0].required = true
      setFormFields(updatedFields)
    }
  }, [formFields])

  // Pré-carregar a imagem do evento quando o componente é montado
  useEffect(() => {
    if (!imagePreview) {
      setImagePreview("/default-event-image.jpg")
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4c576c]">Criar Nova Lista</h1>
          <p className="text-[#848c9b]">Configure uma nova lista de espera</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye size={16} />
                Visualizar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Visualização da Landing Page</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <iframe
                  className="w-full h-[70vh] border rounded"
                  srcDoc={`
                    <html>
                      <head>
                        <style>
                          body { margin: 0; padding: 0; }
                          iframe { width: 100%; height: 100%; border: none; }
                        </style>
                      </head>
                      <body>
                        <div id="preview-container"></div>
                        <script>
                          const container = document.getElementById('preview-container');
                          container.innerHTML = window.parent.document.getElementById('preview-content').innerHTML;
                        </script>
                      </body>
                    </html>
                  `}
                />
                <div id="preview-content" className="hidden">
                  <WaitlistLandingPage
                    eventName="Sympla'palooza"
                    eventDate="Terça-feira, 13/05/2025, 14h30 - Quinta-feira, 15/05/2025, 14h30"
                    eventLocation="teste 7, Campinas, SP"
                    listName={listName}
                    description={description}
                    imageUrl={imagePreview || "/default-event-image.jpg"}
                    formFields={formFields}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="flex items-center gap-2" onClick={onBack}>
            <ArrowLeft size={16} />
            Voltar para o dashboard
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-[#4c576c] mb-4">Informações Básicas da Lista - Sympla'palooza</h2>

          <div className="mb-6">
            <Label htmlFor="list-name" className="block text-sm font-medium text-[#4c576c] mb-1">
              Nome da Lista <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center">
              {isEditingName ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    id="list-name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingName(false)} className="text-[#0097ff]">
                    Salvar
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[#4c576c]">{listName}</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)} className="text-[#0097ff]">
                    <Edit size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="subscriber-limit" className="block text-sm font-medium text-[#4c576c] mb-1">
              Limite de inscrições
            </Label>
            <div className="flex items-center">
              <Input
                id="subscriber-limit"
                type="number"
                min="1"
                placeholder="Sem limite"
                value={subscriberLimit}
                onChange={(e) => setSubscriberLimit(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-[#848c9b] mt-1">
              Ao definir esta quantidade a coleta de leads será fechada automaticamente.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="use-expiration"
                checked={useExpiration}
                onCheckedChange={(checked) => setUseExpiration(!!checked)}
              />
              <Label htmlFor="use-expiration" className="text-sm font-medium text-[#4c576c]">
                Definir data de expiração
              </Label>
            </div>
            {useExpiration ? (
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expirationDate && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {expirationDate ? (
                        format(expirationDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <p className="text-xs text-[#848c9b]">
                Se não for escolhida uma data de expiração, a lista será fechada no horário de início do evento
                (Terça-feira, 13/05/2025, 14h30).
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-[#4c576c] mb-1">
              Descrição da Lista
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva sua lista..."
              className="w-full h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Imagens da Lista */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-[#4c576c] mb-4">Imagens da Lista</h2>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
            {imagePreview ? (
              <div className="w-full">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={() => setImagePreview("")}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setImagePreview("")
                      setImageUrl("")
                    }}
                  >
                    Remover imagem
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={triggerFileUpload}>
                    <Upload size={16} />
                    Trocar imagem
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="text-gray-400 mb-4">
                    <ImageIcon size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-[#4c576c] mb-2">Selecione uma imagem para sua lista</h3>
                  <p className="text-[#848c9b] mb-4">
                    Uma boa imagem aumenta o engajamento e as inscrições na sua lista de espera.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div
                    className="border rounded-lg overflow-hidden cursor-pointer hover:border-[#0097ff] transition-colors"
                    onClick={() => setImagePreview("/default-event-image.jpg")}
                  >
                    <div className="relative h-32">
                      <img
                        src="/default-event-image.jpg"
                        alt="Imagem sugerida 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center text-sm text-[#4c576c]">Imagem do evento</div>
                  </div>
                  <div
                    className="border rounded-lg overflow-hidden cursor-pointer hover:border-[#0097ff] transition-colors"
                    onClick={() => setImagePreview("/vibrant-concert-stage.png")}
                  >
                    <div className="relative h-32">
                      <img
                        src="/vibrant-concert-stage.png"
                        alt="Imagem sugerida 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center text-sm text-[#4c576c]">Show</div>
                  </div>
                  <div
                    className="border rounded-lg overflow-hidden cursor-pointer hover:border-[#0097ff] transition-colors"
                    onClick={() => setImagePreview("/business-conference.png")}
                  >
                    <div className="relative h-32">
                      <img
                        src="/business-conference.png"
                        alt="Imagem sugerida 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center text-sm text-[#4c576c]">Conferência</div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full mb-4">
                    <Label htmlFor="image-url" className="block text-sm font-medium text-[#4c576c] mb-1">
                      URL da Imagem
                    </Label>
                    <Input
                      id="image-url"
                      placeholder="Cole a URL da imagem"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4 w-full">
                    <div className="border-t border-gray-200 flex-1"></div>
                    <span className="text-[#848c9b] text-sm">ou</span>
                    <div className="border-t border-gray-200 flex-1"></div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2" onClick={triggerFileUpload}>
                    <Upload size={16} />
                    Fazer upload de imagem
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileUpload}
                  />
                  <p className="text-[#848c9b] text-xs mt-2">Formatos aceitos: PNG, JPG (máx. 5MB)</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Construtor de Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#4c576c]">Construtor de Formulário</h2>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-[#0097ff] text-white hover:bg-[#0088e9]"
              onClick={addField}
            >
              <Plus size={16} />
              Adicionar Campo
            </Button>
          </div>

          <p className="text-[#848c9b] mb-6">
            Arraste e solte os campos para organizar seu formulário de lista de espera.
          </p>

          <div className="space-y-4">
            {formFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <GripVertical className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-[#4c576c]">{field.label}</p>
                    <p className="text-xs text-[#848c9b]">
                      {field.type === "text"
                        ? "Campo de texto"
                        : field.type === "email"
                          ? "Campo de email"
                          : "Campo de telefone"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => moveField(index, "up")} disabled={index === 0}>
                      <ChevronUp size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveField(index, "down")}
                      disabled={index === formFields.length - 1}
                    >
                      <ChevronDown size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(field)}>
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(index)}
                      disabled={formFields.length <= 1}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="pl-8">
                  <Label htmlFor={`preview-${field.id}`} className="text-sm text-[#4c576c]">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  <Input id={`preview-${field.id}`} placeholder={field.placeholder} disabled className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={onBack}>
          Cancelar
        </Button>
        <Button className="bg-[#0097ff] hover:bg-[#0088e9]" onClick={handlePublish}>
          Publicar Lista
        </Button>
      </div>

      {/* Dialog para editar campo */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Campo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {editingField && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="field-label" className="block text-sm font-medium text-[#4c576c] mb-1">
                    Título do Campo
                  </Label>
                  <Input
                    id="field-label"
                    value={editingField.label}
                    onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="field-required" className="text-sm font-medium text-[#4c576c]">
                    Campo Obrigatório
                  </Label>
                  <Switch
                    id="field-required"
                    checked={editingField.required}
                    onCheckedChange={(checked) => setEditingField({ ...editingField, required: checked })}
                    disabled={formFields.length === 1} // Desabilita o toggle se for o único campo
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button className="bg-[#0097ff] hover:bg-[#0088e9]" onClick={saveFieldEdit}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
