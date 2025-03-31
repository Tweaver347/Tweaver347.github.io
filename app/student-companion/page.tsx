"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"

export default function StudentCompanionPage() {
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="student-companion">
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 shadow-sm" style={{ backgroundColor: "white" }}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                Student Companion
              </h1>
              <p className="text-[#49454f] max-w-2xl mx-auto">
                Tools and resources to help students track their progress, access learning materials, and get
                personalized assistance throughout their educational journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FeatureBox
                title="Progress Tracking"
                description="Monitor your learning journey and track completion of assignments and courses."
                icon="📊"
                colors={colors}
                onClick={() => router.push("/student-companion/progress-tracking")}
              />
              <FeatureBox
                title="Study Resources"
                description="Access a library of study materials, guides, and practice exercises."
                icon="📚"
                colors={colors}
                onClick={() => router.push("/student-companion/study-resources")}
              />
              <FeatureBox
                title="AI Tutor"
                description="Get personalized help with difficult concepts and homework questions."
                icon="🤖"
                colors={colors}
                onClick={() => router.push("/student-companion/ai-tutor")}
              />
              <FeatureBox
                title="Study Planner"
                description="Create and manage study schedules to optimize your learning time."
                icon="📅"
                colors={colors}
                onClick={() => router.push("/student-companion/study-planner")}
              />
            </div>

            <div className="text-center">
              <p className="text-[#49454f] mb-4">Select any feature above to get started with your learning journey.</p>
              <AnimatedButton className="text-white" color={colors.primary} onClick={() => router.push("/")}>
                Return to Dashboard
              </AnimatedButton>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-white py-6 px-4 text-center mt-8" style={{ backgroundColor: colors.footerBackground }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-2">AI Statement</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
          </div>
        </footer>
      </DashboardLayout>
    </div>
  )
}

function FeatureBox({
  title,
  description,
  icon,
  colors,
  onClick,
}: {
  title: string
  description: string
  icon: string
  colors: any
  onClick: () => void
}) {
  return (
    <div
      className="p-6 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
      style={{
        backgroundColor: colors.secondary,
        borderColor: colors.accent,
      }}
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
        {title}
      </h3>
      <p className="text-[#49454f]">{description}</p>
      <div className="mt-4 text-right">
        <span className="text-sm font-medium" style={{ color: colors.primary }}>
          Explore →
        </span>
      </div>
    </div>
  )
}

