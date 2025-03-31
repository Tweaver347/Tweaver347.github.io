"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { ArrowLeft, BookOpen, Beaker, FileText, LayoutTemplate } from "lucide-react"

// Define template types
interface LessonTemplate {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  template: {
    title: string
    sections: {
      id: string
      type: string
      title: string
      content: string
      order: number
    }[]
  }
}

export default function TemplateSelector({
  onSelectTemplate,
  onBack,
}: {
  onSelectTemplate: (template: any) => void
  onBack: () => void
}) {
  const { colors } = useTheme()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Define available templates
  const templates: LessonTemplate[] = [
    {
      id: "5e-model",
      title: "5E Model",
      description: "Engage, Explore, Explain, Elaborate, Evaluate",
      icon: <LayoutTemplate className="h-6 w-6" />,
      color: "#4299e1", // blue
      template: {
        title: "5E Model Lesson Plan",
        sections: [
          {
            id: `section-${Date.now()}`,
            type: "objective",
            title: "Learning Objectives",
            content: "<p>Add your learning objectives here...</p>",
            order: 0,
          },
          {
            id: `section-${Date.now() + 1}`,
            type: "content",
            title: "Engage",
            content: "<p>How will you capture students' interest and activate prior knowledge?</p>",
            order: 1,
          },
          {
            id: `section-${Date.now() + 2}`,
            type: "content",
            title: "Explore",
            content: "<p>What activities will help students explore the concept?</p>",
            order: 2,
          },
          {
            id: `section-${Date.now() + 3}`,
            type: "content",
            title: "Explain",
            content: "<p>How will you explain the concepts and allow students to explain their understanding?</p>",
            order: 3,
          },
          {
            id: `section-${Date.now() + 4}`,
            type: "content",
            title: "Elaborate",
            content: "<p>How will students apply or extend their understanding?</p>",
            order: 4,
          },
          {
            id: `section-${Date.now() + 5}`,
            type: "assessment",
            title: "Evaluate",
            content: "<p>How will you assess student understanding?</p>",
            order: 5,
          },
        ],
      },
    },
    {
      id: "direct-instruction",
      title: "Direct Instruction",
      description: "Structured, teacher-led approach with clear objectives",
      icon: <BookOpen className="h-6 w-6" />,
      color: "#805ad5", // purple
      template: {
        title: "Direct Instruction Lesson Plan",
        sections: [
          {
            id: `section-${Date.now() + 10}`,
            type: "objective",
            title: "Learning Objectives",
            content: "<p>Add your learning objectives here...</p>",
            order: 0,
          },
          {
            id: `section-${Date.now() + 11}`,
            type: "content",
            title: "Anticipatory Set",
            content: "<p>How will you focus students' attention and prepare them for the lesson?</p>",
            order: 1,
          },
          {
            id: `section-${Date.now() + 12}`,
            type: "content",
            title: "Direct Instruction",
            content: "<p>What information will you present to students?</p>",
            order: 2,
          },
          {
            id: `section-${Date.now() + 13}`,
            type: "activity",
            title: "Guided Practice",
            content: "<p>How will students practice with your guidance?</p>",
            order: 3,
          },
          {
            id: `section-${Date.now() + 14}`,
            type: "activity",
            title: "Independent Practice",
            content: "<p>How will students practice independently?</p>",
            order: 4,
          },
          {
            id: `section-${Date.now() + 15}`,
            type: "assessment",
            title: "Assessment",
            content: "<p>How will you assess student understanding?</p>",
            order: 5,
          },
          {
            id: `section-${Date.now() + 16}`,
            type: "content",
            title: "Closure",
            content: "<p>How will you summarize and conclude the lesson?</p>",
            order: 6,
          },
        ],
      },
    },
    {
      id: "inquiry-based",
      title: "Inquiry-Based",
      description: "Student-led exploration and discovery learning",
      icon: <Beaker className="h-6 w-6" />,
      color: "#48bb78", // green
      template: {
        title: "Inquiry-Based Lesson Plan",
        sections: [
          {
            id: `section-${Date.now() + 20}`,
            type: "objective",
            title: "Learning Objectives",
            content: "<p>Add your learning objectives here...</p>",
            order: 0,
          },
          {
            id: `section-${Date.now() + 21}`,
            type: "content",
            title: "Essential Question",
            content: "<p>What compelling question will guide student inquiry?</p>",
            order: 1,
          },
          {
            id: `section-${Date.now() + 22}`,
            type: "content",
            title: "Background Knowledge",
            content: "<p>What prior knowledge do students need?</p>",
            order: 2,
          },
          {
            id: `section-${Date.now() + 23}`,
            type: "activity",
            title: "Investigation",
            content: "<p>What materials and procedures will students use to investigate?</p>",
            order: 3,
          },
          {
            id: `section-${Date.now() + 24}`,
            type: "content",
            title: "Data Collection",
            content: "<p>How will students collect and organize information?</p>",
            order: 4,
          },
          {
            id: `section-${Date.now() + 25}`,
            type: "content",
            title: "Analysis & Conclusion",
            content: "<p>How will students analyze data and form conclusions?</p>",
            order: 5,
          },
          {
            id: `section-${Date.now() + 26}`,
            type: "assessment",
            title: "Reflection & Assessment",
            content: "<p>How will students reflect on their learning and be assessed?</p>",
            order: 6,
          },
        ],
      },
    },
    {
      id: "project-based",
      title: "Project-Based",
      description: "Extended project with real-world applications",
      icon: <FileText className="h-6 w-6" />,
      color: "#ed8936", // orange
      template: {
        title: "Project-Based Lesson Plan",
        sections: [
          {
            id: `section-${Date.now() + 30}`,
            type: "objective",
            title: "Learning Objectives",
            content: "<p>Add your learning objectives here...</p>",
            order: 0,
          },
          {
            id: `section-${Date.now() + 31}`,
            type: "content",
            title: "Driving Question",
            content: "<p>What authentic, open-ended question will drive the project?</p>",
            order: 1,
          },
          {
            id: `section-${Date.now() + 32}`,
            type: "content",
            title: "Project Overview",
            content: "<p>Describe the project and its real-world relevance.</p>",
            order: 2,
          },
          {
            id: `section-${Date.now() + 33}`,
            type: "activity",
            title: "Entry Event",
            content: "<p>How will you launch the project to engage students?</p>",
            order: 3,
          },
          {
            id: `section-${Date.now() + 34}`,
            type: "content",
            title: "Knowledge & Skills Needed",
            content: "<p>What content knowledge and skills will students need?</p>",
            order: 4,
          },
          {
            id: `section-${Date.now() + 35}`,
            type: "activity",
            title: "Project Milestones",
            content: "<p>What are the key checkpoints throughout the project?</p>",
            order: 5,
          },
          {
            id: `section-${Date.now() + 36}`,
            type: "assessment",
            title: "Assessment & Reflection",
            content: "<p>How will you assess the project and have students reflect?</p>",
            order: 6,
          },
          {
            id: `section-${Date.now() + 37}`,
            type: "resource",
            title: "Resources & Materials",
            content: "<p>What resources and materials will students need?</p>",
            order: 7,
          },
        ],
      },
    },
  ]

  const handleSelectTemplate = (template: LessonTemplate) => {
    setSelectedTemplate(template.id)
    onSelectTemplate(template.template)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <AnimatedButton className="p-2 mr-3" color={colors.primary} onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </AnimatedButton>
        <h1 className="text-xl font-bold">Choose a Template</h1>
      </div>

      {/* Template Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? "ring-2 ring-offset-2" : ""
                }`}
                style={{
                  borderLeft: `4px solid ${template.color}`,
                  ringColor: template.color,
                }}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${template.color}20`, color: template.color }}
                  >
                    {template.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{template.title}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

