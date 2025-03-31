"use client"

import { Card } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { AnimatedGradientWithFallback } from "@/components/animated-gradient"
import { DashboardBackground } from "@/components/dashboard-background"
import { useTheme } from "@/components/theme-provider-custom"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { ShineEffect } from "@/components/shine-effect"
import { AnimatedButton } from "@/components/animated-button"
import { useAccessibility } from "@/components/accessibility-provider"

export default function Home() {
  const { colors } = useTheme()
  const { highContrast } = useAccessibility()

  return (
    <div className="min-h-screen">
      {!highContrast && <DashboardBackground />}
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
          {/* Lesson Builder Card */}
          <div id="lesson-builder-card">
            <FeatureCard
              title="Lesson Builder"
              subtitle="AI-Powered Lesson Creation"
              description="Create engaging, standards-aligned lessons in minutes with our AI assistant. Save time and focus on what matters most - your students."
              actionLabel="Try it out!"
              gradientType="lesson"
              actionLink="/lesson-builder"
            />
          </div>

          {/* Student Companion Card */}
          <div id="student-companion-card">
            <FeatureCard
              title="Student Companion"
              subtitle="Learning Support Tools"
              description="Track progress, access resources, and provide personalized assistance to help every student succeed in their learning journey."
              actionLabel="Try it out!"
              gradientType="student"
              actionLink="/student-companion"
            />
          </div>

          {/* Research Hub Card */}
          <div id="research-hub-card">
            <FeatureCard
              title="Research Hub"
              subtitle="Educational Resources"
              description="Discover and share teaching materials, academic papers, and educational resources to enhance your teaching practice."
              actionLabel="Try it out!"
              gradientType="research"
              actionLink="/research-hub"
            />
          </div>

          {/* Profile Card */}
          <div id="profile-card">
            <FeatureCard
              title="Profile"
              subtitle="Your Teaching Dashboard"
              description="View your activity, track your created lessons, and manage your account settings all in one convenient place."
              actionLabel="View Profile"
              gradientType="profile"
              actionLink="/profile"
            />
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

function FeatureCard({
  title,
  subtitle,
  description,
  actionLabel,
  gradientType,
  actionLink,
}: {
  title: string
  subtitle: string
  description: string
  actionLabel: string
  gradientType: "lesson" | "student" | "research" | "profile"
  actionLink: string
}) {
  const { tiltStyle, shadowStyle, elementRef } = useTiltEffect({
    max: 10, // Limit tilt to 10 degrees for subtlety
    perspective: 1500, // Higher perspective for less dramatic effect
    scale: 1.03, // Subtle scale effect
    speed: 400, // Slightly faster transition
    shadowIntensity: 15, // Shadow intensity
  })

  // Combine styles
  const combinedStyle = {
    ...tiltStyle,
    ...shadowStyle,
  }

  // Get button color based on gradient type
  const buttonColor = getButtonColor(gradientType)

  const { highContrast } = useAccessibility()

  // Adjust card styles for high contrast mode
  const cardStyle = highContrast
    ? {
        backgroundColor: "#000000",
        border: "2px solid #FFFFFF",
        color: "#FFFFFF",
      }
    : {
        ...combinedStyle,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }

  return (
    <div className="h-full" style={{ perspective: "1500px" }}>
      <ShineEffect>
        <Card ref={elementRef} className="overflow-hidden h-full transform-gpu" style={cardStyle}>
          <div className="p-6 relative h-full flex flex-col">
            {/* Glass highlight effect - only show in normal mode */}
            {!highContrast && (
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 pointer-events-none" />
            )}

            {/* Full-width gradient image or high contrast alternative */}
            <div className="w-full mb-6">
              {highContrast ? (
                <div
                  className="h-[120px] rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: "#000000",
                    border: "2px solid #FFFFFF",
                  }}
                >
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
              ) : (
                <AnimatedGradientWithFallback
                  type={gradientType}
                  height={120}
                  className="shadow-lg rounded-2xl"
                  fullWidth={true}
                />
              )}
            </div>

            <h3 className="text-xl font-bold" style={{ color: highContrast ? "#FFFFFF" : "#1f2937" }}>
              {title}
            </h3>
            <p className="text-sm mb-2" style={{ color: highContrast ? "#FFFFFF" : "#4b5563" }}>
              {subtitle}
            </p>
            <p className="text-sm mb-6" style={{ color: highContrast ? "#FFFFFF" : "#374151" }}>
              {description}
            </p>

            <div className="flex justify-start mt-auto">
              <AnimatedButton
                className="rounded-full px-6"
                color={highContrast ? "#FFFFFF" : buttonColor}
                onClick={() => (window.location.href = actionLink)}
                style={{
                  color: highContrast ? "#000000" : "#FFFFFF",
                  border: highContrast ? "2px solid #FFFFFF" : "none",
                }}
              >
                {actionLabel}
              </AnimatedButton>
            </div>
          </div>
        </Card>
      </ShineEffect>
    </div>
  )
}

function getButtonColor(type: "lesson" | "student" | "research" | "profile"): string {
  const colors = {
    lesson: "#4f378a",
    student: "#2196f3",
    research: "#ff5722",
    profile: "#4caf50",
  }
  return colors[type]
}

