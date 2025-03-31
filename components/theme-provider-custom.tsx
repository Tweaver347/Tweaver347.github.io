"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { type ThemeColors, type ThemeType, getThemeForPage, themeColors } from "@/lib/theme-config"

interface ThemeContextType {
  theme: ThemeType
  colors: ThemeColors
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProviderCustom({
  children,
  defaultTheme = "default",
}: {
  children: React.ReactNode
  defaultTheme?: ThemeType
}) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme)
  const [colors, setColors] = useState<ThemeColors>(themeColors[defaultTheme])
  const pathname = usePathname()

  // Update theme based on current path
  useEffect(() => {
    const newTheme = getThemeForPage(pathname)
    setTheme(newTheme)
    setColors(themeColors[newTheme])
  }, [pathname])

  const value = {
    theme,
    colors,
    setTheme: (newTheme: ThemeType) => {
      setTheme(newTheme)
      setColors(themeColors[newTheme])
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

