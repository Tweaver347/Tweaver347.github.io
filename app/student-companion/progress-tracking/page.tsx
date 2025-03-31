"use client"

import type React from "react"

import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { ShineEffect } from "@/components/shine-effect"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { ArrowLeft, Award, BookOpen, CheckCircle, Clock, Target } from "lucide-react"

export default function ProgressTrackingPage() {
  const { colors } = useTheme()
  const router = useRouter()

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Introduction to Biology",
      progress: 85,
      modules: 12,
      modulesCompleted: 10,
      lastActivity: "2 days ago",
    },
    {
      id: 2,
      title: "Algebra Fundamentals",
      progress: 60,
      modules: 15,
      modulesCompleted: 9,
      lastActivity: "Yesterday",
    },
    {
      id: 3,
      title: "World History: Ancient Civilizations",
      progress: 40,
      modules: 10,
      modulesCompleted: 4,
      lastActivity: "1 week ago",
    },
    {
      id: 4,
      title: "Chemistry Basics",
      progress: 20,
      modules: 14,
      modulesCompleted: 3,
      lastActivity: "3 days ago",
    },
  ]

  // Mock achievements
  const achievements = [
    { id: 1, title: "Fast Learner", description: "Complete 5 modules in a single day", completed: true },
    { id: 2, title: "Perfect Score", description: "Get 100% on any quiz", completed: true },
    { id: 3, title: "Consistent Student", description: "Study for 7 days in a row", completed: false },
    { id: 4, title: "Subject Master", description: "Complete all modules in a course", completed: false },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="student-companion">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center mb-6">
            <AnimatedButton className="mr-4" color={colors.primary} onClick={() => router.push("/student-companion")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </AnimatedButton>
            <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
              Progress Tracking
            </h1>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Courses"
              value="4"
              subtitle="Active courses"
              colors={colors}
            />
            <StatCard
              icon={<CheckCircle className="h-6 w-6" />}
              title="Modules"
              value="26/51"
              subtitle="Modules completed"
              colors={colors}
            />
            <StatCard
              icon={<Clock className="h-6 w-6" />}
              title="Study Time"
              value="32h"
              subtitle="This month"
              colors={colors}
            />
            <StatCard
              icon={<Target className="h-6 w-6" />}
              title="Goals"
              value="2/5"
              subtitle="Goals achieved"
              colors={colors}
            />
          </div>

          {/* Course Progress */}
          <Card className="p-6 bg-white shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Course Progress
            </h2>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm text-gray-500">Last activity: {course.lastActivity}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Progress
                      value={course.progress}
                      className="h-2 flex-grow mr-4"
                      style={{
                        backgroundColor: colors.secondary,
                        "& > div": { backgroundColor: colors.primary },
                      }}
                    />
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.modulesCompleted} of {course.modules} modules completed
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                completed={achievement.completed}
                colors={colors}
              />
            ))}
          </div>

          {/* Learning Goals */}
          <Card className="p-6 bg-white shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Learning Goals
            </h2>
            <div className="space-y-4">
              <GoalItem title="Complete Biology course" deadline="June 15, 2025" progress={85} colors={colors} />
              <GoalItem title="Study 10 hours per week" deadline="Ongoing" progress={70} colors={colors} />
              <GoalItem title="Finish all Algebra assignments" deadline="May 30, 2025" progress={60} colors={colors} />
              <GoalItem title="Read 5 history articles" deadline="April 20, 2025" progress={40} colors={colors} />
              <GoalItem title="Complete Chemistry lab reports" deadline="July 10, 2025" progress={20} colors={colors} />
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

function StatCard({
  icon,
  title,
  value,
  subtitle,
  colors,
}: {
  icon: React.ReactNode
  title: string
  value: string
  subtitle: string
  colors: any
}) {
  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="flex items-start">
        <div className="p-2 rounded-full mr-3" style={{ backgroundColor: colors.secondary, color: colors.primary }}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold" style={{ color: colors.primary }}>
            {value}
          </p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </Card>
  )
}

function AchievementCard({
  title,
  description,
  completed,
  colors,
}: {
  title: string
  description: string
  completed: boolean
  colors: any
}) {
  const { tiltStyle, shadowStyle, elementRef } = useTiltEffect({
    max: 5,
    perspective: 1500,
    scale: 1.02,
    speed: 300,
    shadowIntensity: 10,
  })

  // Combine styles
  const combinedStyle = {
    ...tiltStyle,
    ...shadowStyle,
  }

  return (
    <ShineEffect>
      <Card
        ref={elementRef}
        className="overflow-hidden border h-full transform-gpu"
        style={{
          ...combinedStyle,
          backgroundColor: completed ? colors.secondary : "white",
          borderColor: completed ? colors.primary : colors.secondary,
          opacity: completed ? 1 : 0.7,
        }}
      >
        <div className="p-4 relative h-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium" style={{ color: completed ? colors.primary : "gray" }}>
              {title}
            </h3>
            <Award className="h-5 w-5" style={{ color: completed ? colors.primary : "gray" }} />
          </div>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="mt-2 text-xs font-medium" style={{ color: completed ? colors.primary : "gray" }}>
            {completed ? "Completed" : "In Progress"}
          </div>
        </div>
      </Card>
    </ShineEffect>
  )
}

function GoalItem({
  title,
  deadline,
  progress,
  colors,
}: {
  title: string
  deadline: string
  progress: number
  colors: any
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-gray-500">Deadline: {deadline}</span>
      </div>
      <div className="flex items-center mb-2">
        <Progress
          value={progress}
          className="h-2 flex-grow mr-4"
          style={{
            backgroundColor: colors.secondary,
            "& > div": { backgroundColor: colors.primary },
          }}
        />
        <span className="text-sm font-medium">{progress}%</span>
      </div>
    </div>
  )
}

