"use client"

import DashboardLayout from "@/components/dashboard-layout"
import LessonBuilderContent from "@/components/lesson-builder-content"
import { useTheme } from "@/components/theme-provider-custom"

export default function LessonBuilderPage() {
  const { colors } = useTheme()

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="lesson-builder">
        <div className="flex h-[calc(100vh-64px)]">
          <LessonBuilderContent />
        </div>
      </DashboardLayout>
    </div>
  )
}

