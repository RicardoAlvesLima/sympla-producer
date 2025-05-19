"use client"

import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Ticket, Megaphone, Users, CheckSquare, DollarSign, HelpCircle, Lightbulb } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  href?: string
  isNew?: boolean
  hasDropdown?: boolean
}

interface SidebarNavigationProps {
  onWaitlistClick?: () => void
  onDemoClick?: () => void
  isWaitlistActive?: boolean
  isDemoActive?: boolean
}

function NavItem({ icon, label, isActive = false, href = "#", isNew = false, hasDropdown = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center py-4 text-xs text-white relative",
        isActive ? "bg-[#191f28]" : "hover:bg-[#191f28]",
      )}
    >
      <div className="mb-1">{icon}</div>
      <span>{label}</span>
      {isNew && <span className="absolute top-2 right-2 bg-[#ff6a00] text-white text-[10px] px-1 rounded">Novo!</span>}
    </Link>
  )
}

function NavItemWithDropdown({ icon, label, isActive = false, isNew = false, onWaitlistClick, onDemoClick }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex flex-col items-center justify-center py-4 text-xs text-white w-full relative",
            isActive ? "bg-[#191f28]" : "hover:bg-[#191f28]",
          )}
        >
          <div className="mb-1">{icon}</div>
          <span className="text-center px-1">Funcionalidades Beta</span>
          {isNew && (
            <span className="absolute top-2 right-2 bg-[#ff6a00] text-white text-[10px] px-1 rounded">Novo!</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-48">
        <DropdownMenuItem onClick={onWaitlistClick}>SymplaWaitlist</DropdownMenuItem>
        <DropdownMenuItem onClick={onDemoClick}>Demo</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SidebarNavigation({
  onWaitlistClick,
  onDemoClick,
  isWaitlistActive = false,
  isDemoActive = false,
}: SidebarNavigationProps) {
  return (
    <nav className="bg-[#4c576c] w-[128px] shrink-0">
      <NavItem icon={<LayoutDashboard size={20} />} label="Painel" isActive={!isWaitlistActive && !isDemoActive} />
      <NavItem icon={<Ticket size={20} />} label="Ingressos" />
      <NavItem icon={<Megaphone size={20} />} label="Divulgue" />
      <NavItem icon={<Users size={20} />} label="Participantes" />
      <NavItem icon={<CheckSquare size={20} />} label="Check-in" />
      <NavItem icon={<DollarSign size={20} />} label="Financeiro" />
      <NavItemWithDropdown
        icon={<Lightbulb size={20} />}
        label="Funcionalidades Beta"
        isActive={isWaitlistActive || isDemoActive}
        isNew={true}
        onWaitlistClick={onWaitlistClick}
        onDemoClick={onDemoClick}
      />
      <NavItem icon={<HelpCircle size={20} />} label="Ajuda" />
    </nav>
  )
}
