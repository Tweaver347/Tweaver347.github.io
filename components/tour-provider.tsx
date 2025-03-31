"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface TourStep {
  element: string
  title: string
  description: string
  position?: "top" | "right" | "bottom" | "left"
}

interface TourContextType {
  isTourActive: boolean
  currentStep: number
  startTour: () => void
  endTour: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  tourSteps: TourStep[]
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Define tour steps
  const tourSteps: TourStep[] = [
    {
      element: "#lesson-builder-card",
      title: "Lesson Builder",
      description:
        "Create engaging, standards-aligned lessons in minutes with our AI assistant. Save time and focus on what matters most - your students.",
      position: "right",
    },
    {
      element: "#student-companion-card",
      title: "Student Companion",
      description:
        "Track progress, access resources, and provide personalized assistance to help every student succeed in their learning journey.",
      position: "left",
    },
    {
      element: "#research-hub-card",
      title: "Research Hub",
      description:
        "Discover and share teaching materials, academic papers, and educational resources to enhance your teaching practice.",
      position: "right",
    },
    {
      element: "#profile-card",
      title: "Profile",
      description:
        "View your activity, track your created lessons, and manage your account settings all in one convenient place.",
      position: "left",
    },
  ]

  // Start the tour
  const startTour = () => {
    setCurrentStep(0)
    setIsTourActive(true)
  }

  // End the tour
  const endTour = () => {
    setIsTourActive(false)
  }

  // Go to next step
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTour()
    }
  }

  // Go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Go to specific step
  const goToStep = (step: number) => {
    if (step >= 0 && step < tourSteps.length) {
      setCurrentStep(step)
    }
  }

  // Scroll to the current element when step changes
  useEffect(() => {
    if (isTourActive && tourSteps[currentStep]) {
      const element = document.querySelector(tourSteps[currentStep].element)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentStep, isTourActive, tourSteps])

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStep,
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
        tourSteps,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}

