"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type TextSize = "small" | "medium" | "large" | "extra-large"

interface AccessibilityContextType {
  textSize: TextSize
  setTextSize: (size: TextSize) => void
  highContrast: boolean
  toggleHighContrast: () => void
  textSizeClass: string
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>("medium")
  const [highContrast, setHighContrast] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTextSize = localStorage.getItem("textSize") as TextSize | null
    const savedHighContrast = localStorage.getItem("highContrast")

    if (savedTextSize) {
      setTextSize(savedTextSize)
    }

    if (savedHighContrast) {
      setHighContrast(savedHighContrast === "true")
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("textSize", textSize)
    localStorage.setItem("highContrast", highContrast.toString())
  }, [textSize, highContrast])

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  // Map text size to CSS classes
  const getTextSizeClass = (): string => {
    switch (textSize) {
      case "small":
        return "text-size-small"
      case "medium":
        return "text-size-medium"
      case "large":
        return "text-size-large"
      case "extra-large":
        return "text-size-xl"
      default:
        return "text-size-medium"
    }
  }

  const textSizeClass = getTextSizeClass()

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        toggleHighContrast,
        textSizeClass,
      }}
    >
      <div className={`${textSizeClass} ${highContrast ? "high-contrast" : ""}`}>{children}</div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}

