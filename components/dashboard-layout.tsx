"use client"

import type React from "react"
import { useState } from "react"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider-custom"
import { AccessibilityButtons } from "@/components/accessibility-buttons"
import { useAccessibility } from "@/components/accessibility-provider"
import { TourButton } from "@/components/tour-button"
import { TourGuide } from "@/components/tour-guide"

export default function DashboardLayout({
  children,
  activePage,
}: {
  children: React.ReactNode
  activePage?: string
}) {
  const { colors } = useTheme()
  const { highContrast } = useAccessibility()

  // Adjust colors for high contrast mode
  const headerBgColor = highContrast ? "#000000" : `${colors.primary}CC`

  const headerTextColor = highContrast ? "#FFFFFF" : "white"

  const [showMission, setShowMission] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header
        className="p-4 backdrop-blur-md shadow-md z-10"
        style={{
          backgroundColor: headerBgColor,
          borderBottom: highContrast ? "1px solid white" : "1px solid rgba(255, 255, 255, 0.1)",
          color: headerTextColor,
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">
            <Link href="/" className={activePage === "dashboard" ? "underline" : ""}>
              Dashboard
            </Link>
          </div>

          <nav className="hidden md:flex space-x-0 flex-1 justify-center">
            <div className="flex space-x-12">
              <NavLink href="/lesson-builder" active={activePage === "lesson-builder"}>
                Lesson Builder
              </NavLink>
              <NavLink href="/student-companion" active={activePage === "student-companion"}>
                Student Companion
              </NavLink>
              <NavLink href="/research-hub" active={activePage === "research-hub"}>
                Research Hub
              </NavLink>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <TourButton />
            <AccessibilityButtons />

            <Link href="/profile">
              <div
                className="h-10 px-4 rounded-full flex items-center justify-center gap-2"
                style={{
                  backgroundColor: highContrast ? "#FFFFFF" : colors.secondary,
                  color: highContrast ? "#000000" : colors.primary,
                  border: highContrast ? "2px solid #FFFFFF" : `1px solid ${colors.primary}`,
                  fontWeight: "medium",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-0" style={{ backgroundColor: "transparent" }}>
        {children}
      </main>

      {/* Mission Statement Footer - Conditionally rendered */}
      {showMission && (
        <footer
          className="text-white py-6 px-4 text-center relative"
          style={{
            backgroundColor: highContrast ? "#000000" : colors.footerBackground,
            color: highContrast ? "#FFFFFF" : "white",
            borderTop: highContrast ? "2px solid white" : "none",
          }}
        >
          <button
            onClick={() => setShowMission(false)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
            aria-label="Hide mission statement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-2">Mission Statement</h3>
            <p className="text-sm">
              Empowering educators with AI-driven tools to create engaging lessons, support student learning, and access
              valuable resources - all while saving time and enhancing educational outcomes.
            </p>
          </div>
        </footer>
      )}

      {/* Show mission button - appears when mission is hidden */}
      {!showMission && (
        <button
          onClick={() => setShowMission(true)}
          className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg z-10"
          style={{
            backgroundColor: highContrast ? "#FFFFFF" : colors.primary,
            color: highContrast ? "#000000" : "white",
          }}
          aria-label="Show mission statement"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      )}

      {/* Tour Guide */}
      <TourGuide />
    </div>
  )
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
}) {
  const { highContrast } = useAccessibility()

  return (
    <Link
      href={href}
      className={`text-xl font-medium hover:underline transition-all ${
        active ? "underline font-bold" : ""
      } ${highContrast ? "text-white" : ""}`}
    >
      {children}
    </Link>
  )
}

