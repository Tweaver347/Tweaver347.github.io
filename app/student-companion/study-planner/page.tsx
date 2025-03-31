"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle, Clock, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudyPlannerPage() {
  const { colors } = useTheme()
  const router = useRouter()

  // Mock schedule data
  const todaySchedule = [
    {
      id: 1,
      subject: "Biology",
      topic: "Photosynthesis Review",
      timeSlot: "9:00 AM - 10:30 AM",
      completed: true,
    },
    {
      id: 2,
      subject: "Mathematics",
      topic: "Quadratic Equations",
      timeSlot: "11:00 AM - 12:30 PM",
      completed: false,
    },
    {
      id: 3,
      subject: "History",
      topic: "French Revolution",
      timeSlot: "2:00 PM - 3:30 PM",
      completed: false,
    },
    {
      id: 4,
      subject: "English",
      topic: "Essay Writing",
      timeSlot: "4:00 PM - 5:00 PM",
      completed: false,
    },
  ]

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Biology Lab Report",
      dueDate: "Mar 20, 2025",
      priority: "High",
      course: "Biology 101",
    },
    {
      id: 2,
      title: "Math Problem Set",
      dueDate: "Mar 22, 2025",
      priority: "Medium",
      course: "Algebra II",
    },
    {
      id: 3,
      title: "History Essay",
      dueDate: "Mar 25, 2025",
      priority: "High",
      course: "World History",
    },
    {
      id: 4,
      title: "Chemistry Quiz",
      dueDate: "Mar 28, 2025",
      priority: "Medium",
      course: "Chemistry 101",
    },
  ]

  // Days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="student-companion">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <AnimatedButton className="mr-4" color={colors.primary} onClick={() => router.push("/student-companion")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </AnimatedButton>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
                Study Planner
              </h1>
            </div>
            <AnimatedButton color={colors.primary}>
              <Plus className="h-4 w-4 mr-2" />
              New Study Session
            </AnimatedButton>
          </div>

          {/* Weekly Calendar */}
          <Card className="p-6 bg-white shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                March 15-21, 2025
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 rounded-md border border-gray-200">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-md border border-gray-200">
                  <Calendar className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-md border border-gray-200">
                  <ArrowLeft className="h-4 w-4 transform rotate-180" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium mb-1">{day}</div>
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
                      index === 2 ? "text-white" : "hover:bg-gray-100"
                    }`}
                    style={{
                      backgroundColor: index === 2 ? colors.primary : "transparent",
                    }}
                  >
                    {15 + index}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-3">Today's Schedule</h3>
                  <div className="space-y-3">
                    {todaySchedule.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-md border flex items-start"
                        style={{
                          borderColor: item.completed ? colors.primary : "rgba(0,0,0,0.1)",
                          backgroundColor: item.completed ? `${colors.secondary}50` : "white",
                        }}
                      >
                        <div className="mr-3 mt-1" style={{ color: item.completed ? colors.primary : "gray" }}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.subject}</h4>
                            <span className="text-xs text-gray-500">{item.timeSlot}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.topic}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((item) => (
                      <div key={item.id} className="p-3 rounded-md border flex items-start">
                        <div
                          className="mr-3 mt-1 p-1 rounded-full"
                          style={{
                            backgroundColor: item.priority === "High" ? "#FEE2E2" : "#E0F2FE",
                            color: item.priority === "High" ? "#EF4444" : "#0EA5E9",
                          }}
                        >
                          <Clock className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.title}</h4>
                            <span className="text-xs text-gray-500">{item.dueDate}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.course}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Study Plans */}
          <Card className="bg-white shadow-sm mb-8">
            <Tabs defaultValue="daily">
              <TabsList className="w-full border-b p-0" style={{ backgroundColor: "white" }}>
                <TabsTrigger
                  value="daily"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Daily Plan
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Weekly Plan
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Monthly Plan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Wednesday, March 17, 2025</h3>
                    <AnimatedButton className="text-sm" color={colors.primary}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </AnimatedButton>
                  </div>

                  <div className="space-y-3">
                    <TimeBlock
                      timeSlot="9:00 AM - 10:30 AM"
                      subject="Biology"
                      topic="Photosynthesis Review"
                      completed={true}
                      colors={colors}
                    />
                    <TimeBlock
                      timeSlot="11:00 AM - 12:30 PM"
                      subject="Mathematics"
                      topic="Quadratic Equations"
                      completed={false}
                      colors={colors}
                    />
                    <TimeBlock
                      timeSlot="12:30 PM - 1:30 PM"
                      subject="Lunch Break"
                      topic=""
                      completed={false}
                      colors={colors}
                      isBreak={true}
                    />
                    <TimeBlock
                      timeSlot="2:00 PM - 3:30 PM"
                      subject="History"
                      topic="French Revolution"
                      completed={false}
                      colors={colors}
                    />
                    <TimeBlock
                      timeSlot="3:30 PM - 3:45 PM"
                      subject="Short Break"
                      topic=""
                      completed={false}
                      colors={colors}
                      isBreak={true}
                    />
                    <TimeBlock
                      timeSlot="4:00 PM - 5:00 PM"
                      subject="English"
                      topic="Essay Writing"
                      completed={false}
                      colors={colors}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Your weekly study plan will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="monthly" className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Your monthly study plan will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Study Tips */}
          <Card className="p-6 bg-white shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Study Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-md" style={{ backgroundColor: colors.secondary }}>
                <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                  Pomodoro Technique
                </h3>
                <p className="text-sm text-gray-700">
                  Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.
                </p>
              </div>
              <div className="p-4 rounded-md" style={{ backgroundColor: colors.secondary }}>
                <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                  Active Recall
                </h3>
                <p className="text-sm text-gray-700">
                  Test yourself on what you've learned. Try to recall information without looking at your notes.
                </p>
              </div>
              <div className="p-4 rounded-md" style={{ backgroundColor: colors.secondary }}>
                <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                  Spaced Repetition
                </h3>
                <p className="text-sm text-gray-700">
                  Review material at increasing intervals to improve long-term retention of information.
                </p>
              </div>
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

function TimeBlock({
  timeSlot,
  subject,
  topic,
  completed,
  colors,
  isBreak = false,
}: {
  timeSlot: string
  subject: string
  topic: string
  completed: boolean
  colors: any
  isBreak?: boolean
}) {
  return (
    <div
      className="p-3 rounded-md border flex items-start"
      style={{
        borderColor: completed ? colors.primary : "rgba(0,0,0,0.1)",
        backgroundColor: isBreak ? "#F9FAFB" : completed ? `${colors.secondary}50` : "white",
      }}
    >
      <div className="w-24 flex-shrink-0">
        <span className="text-sm text-gray-500">{timeSlot}</span>
      </div>
      <div className="mr-3 mt-1" style={{ color: completed ? colors.primary : isBreak ? "gray" : "gray" }}>
        <CheckCircle className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{subject}</h4>
        {topic && <p className="text-sm text-gray-600">{topic}</p>}
      </div>
      {!isBreak && (
        <button
          className="text-xs px-2 py-1 rounded border"
          style={{
            borderColor: colors.primary,
            color: colors.primary,
          }}
        >
          Details
        </button>
      )}
    </div>
  )
}

