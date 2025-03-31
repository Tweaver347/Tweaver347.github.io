"use client"

import type React from "react"

import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"
import { ShineEffect } from "@/components/shine-effect"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { ArrowLeft, BookOpen, FileText, Film, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudyResourcesPage() {
  const { colors } = useTheme()
  const router = useRouter()

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
              Study Resources
            </h1>
          </div>

          {/* Search Bar */}
          <Card className="p-4 bg-white shadow-sm mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none"
                placeholder="Search for study materials, guides, practice exercises..."
                style={{
                  borderColor: colors.accent,
                  "&:focus": {
                    borderColor: colors.primary,
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                  },
                }}
              />
            </div>
          </Card>

          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <CategoryCard icon={<BookOpen className="h-6 w-6" />} title="Textbooks" count={24} colors={colors} />
            <CategoryCard icon={<FileText className="h-6 w-6" />} title="Study Guides" count={42} colors={colors} />
            <CategoryCard icon={<Film className="h-6 w-6" />} title="Video Lessons" count={18} colors={colors} />
            <CategoryCard icon={<FileText className="h-6 w-6" />} title="Practice Tests" count={36} colors={colors} />
          </div>

          {/* Resource Tabs */}
          <Card className="bg-white shadow-sm mb-8">
            <Tabs defaultValue="recommended">
              <TabsList className="w-full border-b p-0" style={{ backgroundColor: "white" }}>
                <TabsTrigger
                  value="recommended"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Recommended
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Recently Added
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Most Popular
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="flex-1 rounded-none py-3"
                  style={{
                    "&[data-state=active]": {
                      borderBottom: `2px solid ${colors.primary}`,
                      color: colors.primary,
                    },
                  }}
                >
                  Saved
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ResourceCard
                    title="Biology Fundamentals"
                    type="Textbook"
                    author="Dr. Jane Smith"
                    rating={4.8}
                    colors={colors}
                  />
                  <ResourceCard
                    title="Algebra Study Guide"
                    type="Study Guide"
                    author="Math Learning Center"
                    rating={4.5}
                    colors={colors}
                  />
                  <ResourceCard
                    title="World History: Ancient Egypt"
                    type="Video Lesson"
                    author="History Channel"
                    rating={4.7}
                    colors={colors}
                  />
                  <ResourceCard
                    title="Chemistry Lab Techniques"
                    type="Video Lesson"
                    author="Science Academy"
                    rating={4.6}
                    colors={colors}
                  />
                  <ResourceCard
                    title="English Literature Review"
                    type="Study Guide"
                    author="Literary Studies Group"
                    rating={4.3}
                    colors={colors}
                  />
                  <ResourceCard
                    title="Physics Practice Problems"
                    type="Practice Test"
                    author="Dr. Robert Chen"
                    rating={4.9}
                    colors={colors}
                  />
                </div>
              </TabsContent>

              <TabsContent value="recent" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ResourceCard
                    title="Modern Poetry Analysis"
                    type="Study Guide"
                    author="Literary Arts Institute"
                    rating={4.2}
                    colors={colors}
                  />
                  <ResourceCard
                    title="Calculus Made Easy"
                    type="Textbook"
                    author="Dr. Michael Thompson"
                    rating={4.7}
                    colors={colors}
                  />
                  <ResourceCard
                    title="Spanish Conversation Practice"
                    type="Audio Lesson"
                    author="Language Learning Center"
                    rating={4.5}
                    colors={colors}
                  />
                </div>
              </TabsContent>

              <TabsContent value="popular" className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Popular resources will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Your saved resources will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Subject Areas */}
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
            Browse by Subject
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <SubjectButton label="Mathematics" colors={colors} />
            <SubjectButton label="Science" colors={colors} />
            <SubjectButton label="History" colors={colors} />
            <SubjectButton label="English" colors={colors} />
            <SubjectButton label="Languages" colors={colors} />
            <SubjectButton label="Arts" colors={colors} />
            <SubjectButton label="Computer Science" colors={colors} />
            <SubjectButton label="Physical Education" colors={colors} />
            <SubjectButton label="Social Studies" colors={colors} />
            <SubjectButton label="Economics" colors={colors} />
            <SubjectButton label="Psychology" colors={colors} />
            <SubjectButton label="Music" colors={colors} />
          </div>
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

function CategoryCard({
  icon,
  title,
  count,
  colors,
}: {
  icon: React.ReactNode
  title: string
  count: number
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
        className="overflow-hidden border cursor-pointer transform-gpu"
        style={{
          ...combinedStyle,
          backgroundColor: "white",
          borderColor: colors.secondary,
        }}
      >
        <div className="p-4 relative h-full">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: colors.secondary, color: colors.primary }}
          >
            {icon}
          </div>
          <h3 className="font-medium" style={{ color: colors.primary }}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">{count} resources</p>
        </div>
      </Card>
    </ShineEffect>
  )
}

function ResourceCard({
  title,
  type,
  author,
  rating,
  colors,
}: {
  title: string
  type: string
  author: string
  rating: number
  colors: any
}) {
  return (
    <Card className="overflow-hidden border hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {type === "Textbook" && <BookOpen className="h-12 w-12 text-gray-400" />}
        {type === "Study Guide" && <FileText className="h-12 w-12 text-gray-400" />}
        {(type === "Video Lesson" || type === "Audio Lesson") && <Film className="h-12 w-12 text-gray-400" />}
        {type === "Practice Test" && <FileText className="h-12 w-12 text-gray-400" />}
      </div>
      <div className="p-4">
        <div className="text-xs font-medium mb-1" style={{ color: colors.primary }}>
          {type}
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">By {author}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  fill={i < Math.floor(rating) ? colors.primary : "none"}
                  stroke={colors.primary}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">{rating}</span>
          </div>
          <AnimatedButton className="text-xs px-2 py-1" color={colors.primary}>
            View
          </AnimatedButton>
        </div>
      </div>
    </Card>
  )
}

function SubjectButton({
  label,
  colors,
}: {
  label: string
  colors: any
}) {
  return (
    <button
      className="py-2 px-4 rounded-md text-sm font-medium transition-colors"
      style={{
        backgroundColor: colors.secondary,
        color: colors.primary,
        "&:hover": { backgroundColor: colors.accent },
      }}
    >
      {label}
    </button>
  )
}

