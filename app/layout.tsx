import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProviderCustom } from "@/components/theme-provider-custom"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { TourProvider } from "@/components/tour-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Education Platform",
  description: "AI-powered education platform for teachers and students",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderCustom>
          <AccessibilityProvider>
            <TourProvider>{children}</TourProvider>
          </AccessibilityProvider>
        </ThemeProviderCustom>
      </body>
    </html>
  )
}



import './globals.css'