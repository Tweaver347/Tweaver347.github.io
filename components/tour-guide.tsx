"use client"

import { useEffect, useState } from "react"
import { useTour } from "./tour-provider"
import { AnimatedButton } from "./animated-button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "./theme-provider-custom"
import { useAccessibility } from "./accessibility-provider"

export function TourGuide() {
  const { isTourActive, currentStep, tourSteps, endTour, nextStep, prevStep } = useTour()
  const { colors } = useTheme()
  const { highContrast } = useAccessibility()
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [tooltipSize, setTooltipSize] = useState({ width: 300, height: 200 })

  // Calculate tooltip position based on the current step
  useEffect(() => {
    if (!isTourActive) return

    const currentStepData = tourSteps[currentStep]
    const element = document.querySelector(currentStepData.element)

    if (element) {
      const rect = element.getBoundingClientRect()
      const position = currentStepData.position || "bottom"

      // Calculate tooltip position based on element position and specified position
      let top = 0
      let left = 0

      switch (position) {
        case "top":
          top = rect.top - tooltipSize.height - 10
          left = rect.left + rect.width / 2 - tooltipSize.width / 2
          break
        case "right":
          top = rect.top + rect.height / 2 - tooltipSize.height / 2
          left = rect.right + 10
          break
        case "bottom":
          top = rect.bottom + 10
          left = rect.left + rect.width / 2 - tooltipSize.width / 2
          break
        case "left":
          top = rect.top + rect.height / 2 - tooltipSize.height / 2
          left = rect.left - tooltipSize.width - 10
          break
      }

      // Adjust if tooltip would go off screen
      if (left < 10) left = 10
      if (left + tooltipSize.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipSize.width - 10
      }
      if (top < 10) top = 10
      if (top + tooltipSize.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipSize.height - 10
      }

      setTooltipPosition({ top, left })

      // Add highlight to the current element
      element.classList.add("tour-highlight")

      // Clean up highlight when step changes
      return () => {
        element.classList.remove("tour-highlight")
      }
    }
  }, [isTourActive, currentStep, tourSteps, tooltipSize])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isTourActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        endTour()
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        nextStep()
      } else if (e.key === "ArrowLeft") {
        prevStep()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isTourActive, endTour, nextStep, prevStep])

  if (!isTourActive) return null

  // Add overlay to dim the rest of the page
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-none" aria-hidden="true" />

      <div
        className="fixed z-50 rounded-lg shadow-lg p-4 pointer-events-auto"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: tooltipSize.width,
          backgroundColor: highContrast ? "#000000" : "white",
          border: highContrast ? "2px solid #FFFFFF" : "1px solid rgba(0,0,0,0.1)",
          color: highContrast ? "#FFFFFF" : "inherit",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-full"
          onClick={endTour}
          aria-label="Close tour"
          style={{
            backgroundColor: highContrast ? "#FFFFFF" : "rgba(0,0,0,0.05)",
            color: highContrast ? "#000000" : "rgba(0,0,0,0.5)",
          }}
        >
          <X size={16} />
        </button>

        <div className="mb-4">
          <h3
            id="tour-title"
            className="text-lg font-bold mb-2"
            style={{ color: highContrast ? "#FFFFFF" : colors.primary }}
          >
            {tourSteps[currentStep].title}
          </h3>
          <p className="text-sm">{tourSteps[currentStep].description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            Step {currentStep + 1} of {tourSteps.length}
          </div>

          <div className="flex space-x-2">
            <AnimatedButton
              className="px-3 py-1 text-sm"
              color={highContrast ? "#FFFFFF" : colors.primary}
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                color: highContrast ? "#000000" : "white",
                opacity: currentStep === 0 ? 0.5 : 1,
                borderColor: highContrast ? "#FFFFFF" : "transparent",
              }}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </AnimatedButton>

            <AnimatedButton
              className="px-3 py-1 text-sm"
              color={highContrast ? "#FFFFFF" : colors.primary}
              onClick={nextStep}
              style={{
                color: highContrast ? "#000000" : "white",
                borderColor: highContrast ? "#FFFFFF" : "transparent",
              }}
            >
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
              {currentStep < tourSteps.length - 1 && <ChevronRight size={16} className="ml-1" />}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  )
}

