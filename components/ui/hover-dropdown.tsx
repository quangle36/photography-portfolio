"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Position = {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

interface HoverDropdownProps extends Position {
  triggerText?: string
  children: React.ReactNode
}

export default function HoverDropdown({
  side = "bottom",
  align = "center",
  triggerText = "Hover over me",
  children,
}: HoverDropdownProps) {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align} className="w-80">
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}
