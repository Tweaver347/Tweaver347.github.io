"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTour } from "./tour-provider"
import { useAccessibility } from "./accessibility-provider"
import { useTheme } from "./theme-provider-custom"

export function TourButton() {
  const { startTour, isTourActive } = useTour()
  const { highContrast } = useAccessibility()
  const { colors } = useTheme()

  return (
    <Button
      variant={isTourActive ? "default" : "outline"}
      size="icon"
      className="rounded-full transition-colors"
      onClick={startTour}
      aria-label="Start guided tour"
      style={{
        backgroundColor: isTourActive ? (highContrast ? "#FFFFFF" : colors.primary) : "transparent",
        borderColor: highContrast ? "#FFFFFF" : colors.primary,
        color: isTourActive ? (highContrast ? "#000000" : "#FFFFFF") : highContrast ? "#FFFFFF" : colors.primary,
        border: isTourActive ? "none" : highContrast ? "2px solid #FFFFFF" : `2px solid ${colors.primary}`,
      }}
    >
      <HelpCircle className="h-4 w-4" />
    </Button>
  )
}

