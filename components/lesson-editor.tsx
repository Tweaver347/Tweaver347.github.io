"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { Card } from "@/components/ui/card"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  GripVertical,
  Plus,
  X,
  Save,
  ArrowLeft,
  FileText,
  CheckSquare,
  BookOpen,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Section types for the lesson
type SectionType = "objective" | "content" | "activity" | "assessment" | "resource"

interface LessonSection {
  id: string
  type: SectionType
  title: string
  content: string
  order: number
}

const sectionTypeInfo = {
  objective: {
    label: "Learning Objectives",
    color: "#4299e1", // blue
    icon: <BookOpen className="h-4 w-4" />,
  },
  content: {
    label: "Content",
    color: "#805ad5", // purple
    icon: <FileText className="h-4 w-4" />,
  },
  activity: {
    label: "Activities",
    color: "#48bb78", // green
    icon: <CheckSquare className="h-4 w-4" />,
  },
  assessment: {
    label: "Assessment",
    color: "#ed8936", // orange
    icon: <ListOrdered className="h-4 w-4" />,
  },
  resource: {
    label: "Resources",
    color: "#f56565", // red
    icon: <Link className="h-4 w-4" />,
  },
}

export default function LessonEditor({
  initialLesson,
  onSave,
  onBack,
}: {
  initialLesson: { title: string; sections: LessonSection[] }
  onSave: (lesson: { title: string; sections: LessonSection[] }) => void
  onBack: () => void
}) {
  const { colors } = useTheme()
  const [lessonTitle, setLessonTitle] = useState(initialLesson.title)
  const [sections, setSections] = useState<LessonSection[]>(initialLesson.sections)
  const [editingTitle, setEditingTitle] = useState(false)
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Handle drag and drop reordering
  const handleDragStart = (id: string) => {
    setDraggedSection(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (!draggedSection || draggedSection === id) return

    // Reorder sections
    const draggedIndex = sections.findIndex((section) => section.id === draggedSection)
    const targetIndex = sections.findIndex((section) => section.id === id)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newSections = [...sections]
    const [removed] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, removed)

    // Update order property
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }))

    setSections(updatedSections)
  }

  const handleDragEnd = () => {
    setDraggedSection(null)
  }

  // Update section content
  const updateSectionContent = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  // Update section title
  const updateSectionTitle = (id: string, title: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, title } : section)))
  }

  // Add new section
  const addSection = (type: SectionType) => {
    const newSection: LessonSection = {
      id: `section-${Date.now()}`,
      type,
      title: `New ${sectionTypeInfo[type].label}`,
      content: "",
      order: sections.length,
    }
    setSections([...sections, newSection])
  }

  // Delete section
  const deleteSection = (id: string) => {
    const newSections = sections.filter((section) => section.id !== id)
    // Update order property
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }))
    setSections(updatedSections)
  }

  // Save lesson
  const saveLesson = () => {
    onSave({
      title: lessonTitle,
      sections: sections,
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AnimatedButton className="p-2" color={colors.primary} onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </AnimatedButton>

          {editingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              className="text-xl font-bold px-2 py-1 border border-gray-300 rounded"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h1
              className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => {
                setEditingTitle(true)
                setTimeout(() => titleInputRef.current?.focus(), 0)
              }}
            >
              {lessonTitle}
            </h1>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <AnimatedButton className="text-white" color={colors.primary} onClick={saveLesson}>
            <Save className="h-4 w-4 mr-2" />
            Save Lesson
          </AnimatedButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Lesson sections */}
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                key={section.id}
                className="mb-4"
                draggable
                onDragStart={() => handleDragStart(section.id)}
                onDragOver={(e) => handleDragOver(e, section.id)}
                onDragEnd={handleDragEnd}
              >
                <EditorSection
                  section={section}
                  updateContent={(content) => updateSectionContent(section.id, content)}
                  updateTitle={(title) => updateSectionTitle(section.id, title)}
                  onDelete={() => deleteSection(section.id)}
                  colors={colors}
                />
              </div>
            ))}

          {/* Add section button */}
          <div className="mt-6 text-center">
            <Popover>
              <PopoverTrigger asChild>
                <AnimatedButton className="text-white" color={colors.primary}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </AnimatedButton>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium mb-2">Add Section</h4>
                  {Object.entries(sectionTypeInfo).map(([type, info]) => (
                    <button
                      key={type}
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded text-left"
                      onClick={() => addSection(type as SectionType)}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                        style={{ backgroundColor: info.color, color: "white" }}
                      >
                        {info.icon}
                      </div>
                      <span>{info.label}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

// Editor Section Component
function EditorSection({
  section,
  updateContent,
  updateTitle,
  onDelete,
  colors,
}: {
  section: LessonSection
  updateContent: (content: string) => void
  updateTitle: (title: string) => void
  onDelete: () => void
  colors: any
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const typeInfo = sectionTypeInfo[section.type]

  // Handle formatting
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (contentRef.current) {
      updateContent(contentRef.current.innerHTML)
    }
  }

  return (
    <Card className="overflow-hidden">
      {/* Section header */}
      <div
        className="p-3 flex items-center justify-between"
        style={{ backgroundColor: typeInfo.color, color: "white" }}
      >
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 mr-2 cursor-move opacity-70" />
          <div className="flex items-center">
            {typeInfo.icon}
            <span className="ml-2 font-medium">{typeInfo.label}</span>
          </div>
        </div>
        <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded" onClick={onDelete}>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Section title */}
      <div className="px-4 pt-3 pb-1 border-b border-gray-200">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            className="w-full px-2 py-1 text-lg font-medium border border-gray-300 rounded"
            value={section.title}
            onChange={(e) => updateTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
            autoFocus
          />
        ) : (
          <h3
            className="text-lg font-medium cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => {
              setIsEditingTitle(true)
              setTimeout(() => titleInputRef.current?.focus(), 0)
            }}
          >
            {section.title}
          </h3>
        )}
      </div>

      {/* Formatting toolbar */}
      <div className="px-4 py-2 border-b border-gray-200 flex flex-wrap gap-1">
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("bold")}>
          <Bold className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("italic")}>
          <Italic className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => {
            const url = prompt("Enter link URL:")
            if (url) applyFormat("createLink", url)
          }}
        >
          <Link className="h-4 w-4" />
        </button>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => {
            const url = prompt("Enter image URL:")
            if (url) applyFormat("insertImage", url)
          }}
        >
          <Image className="h-4 w-4" />
        </button>
        <div className="border-l border-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("justifyLeft")}>
          <AlignLeft className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("justifyCenter")}>
          <AlignCenter className="h-4 w-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => applyFormat("justifyRight")}>
          <AlignRight className="h-4 w-4" />
        </button>
      </div>

      {/* Content editable area */}
      <div
        ref={contentRef}
        className="p-4 min-h-[100px] focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: section.content }}
        onBlur={(e) => updateContent(e.currentTarget.innerHTML)}
        style={{ borderLeft: `4px solid ${typeInfo.color}` }}
      />
    </Card>
  )
}

