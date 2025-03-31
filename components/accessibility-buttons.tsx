"use client"

import { useState } from "react"
import { useAccessibility } from "./accessibility-provider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Type, Eye } from "lucide-react"
import { useTheme } from "./theme-provider-custom"

export function AccessibilityButtons() {
  const { textSize, setTextSize, highContrast, toggleHighContrast } = useAccessibility()
  const { colors } = useTheme()
  const [sliderValue, setSliderValue] = useState(() => {
    switch (textSize) {
      case "small":
        return [0]
      case "medium":
        return [33]
      case "large":
        return [66]
      case "extra-large":
        return [100]
      default:
        return [33]
    }
  })

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)

    // Convert slider value to text size
    const val = value[0]
    if (val <= 25) {
      setTextSize("small")
    } else if (val <= 50) {
      setTextSize("medium")
    } else if (val <= 75) {
      setTextSize("large")
    } else {
      setTextSize("extra-large")
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full transition-colors"
            aria-label="Adjust text size"
            style={{
              borderColor: highContrast ? "#FFFFFF" : colors.primary,
              color: highContrast ? "#FFFFFF" : colors.primary,
              border: highContrast ? "2px solid #FFFFFF" : `2px solid ${colors.primary}`,
            }}
          >
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Text Size</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm">Small</span>
              <span className="text-sm">Extra Large</span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>A</span>
              <span className="text-base">A</span>
              <span className="text-lg">A</span>
              <span className="text-xl">A</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant={highContrast ? "default" : "outline"}
        size="icon"
        className="rounded-full transition-colors"
        onClick={toggleHighContrast}
        aria-label="Toggle high contrast mode"
        style={{
          backgroundColor: highContrast ? (highContrast ? "#FFFFFF" : colors.primary) : "transparent",
          borderColor: highContrast ? "#FFFFFF" : colors.primary,
          color: highContrast ? (highContrast ? "#000000" : "#FFFFFF") : highContrast ? "#FFFFFF" : colors.primary,
          border: highContrast ? "none" : `2px solid ${colors.primary}`,
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  )
}

