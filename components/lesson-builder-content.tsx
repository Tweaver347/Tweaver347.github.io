"use client"

import type React from "react"

import { useState } from "react"
import {
  Mic,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Beaker,
  Globe,
  Calculator,
  Music,
  Edit,
  FileText,
  Sparkles,
  LayoutTemplate,
  Upload,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useAccessibility } from "@/components/accessibility-provider"
import LessonEditor from "@/components/lesson-editor"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import TemplateSelector from "@/components/template-selector"
import { useRouter } from "next/navigation"

export default function LessonBuilderContent() {
  const [message, setMessage] = useState("")
  const [showConversations, setShowConversations] = useState(true)
  const { colors } = useTheme()
  const { highContrast } = useAccessibility()
  const [editingLesson, setEditingLesson] = useState<{
    title: string
    sections: any[]
  } | null>(null)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const router = useRouter()

  // Example lesson plans for the conversations sidebar
  const conversations = [
    {
      name: "Photosynthesis",
      text: "5th grade science lesson on plant energy processes",
      time: "10 min ago",
      icon: <Beaker className="h-4 w-4" />,
    },
    {
      name: "Fractions",
      text: "3rd grade math lesson on equivalent fractions",
      time: "1 hour ago",
      icon: <Calculator className="h-4 w-4" />,
    },
    {
      name: "World Geography",
      text: "6th grade social studies on continents and oceans",
      time: "Yesterday",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      name: "Poetry Analysis",
      text: "8th grade English lesson on rhyme and meter",
      time: "2 days ago",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Music Theory",
      text: "7th grade music lesson on basic notation",
      time: "3 days ago",
      icon: <Music className="h-4 w-4" />,
    },
    {
      name: "Cell Biology",
      text: "High school lesson on cell structures and functions",
      time: "1 week ago",
      icon: <Beaker className="h-4 w-4" />,
    },
    {
      name: "Algebra Basics",
      text: "Middle school introduction to variables and equations",
      time: "1 week ago",
      icon: <Calculator className="h-4 w-4" />,
    },
    {
      name: "Ancient Egypt",
      text: "4th grade history lesson on pyramids and pharaohs",
      time: "2 weeks ago",
      icon: <Globe className="h-4 w-4" />,
    },
  ]

  // Sample chat messages
  const chatMessages = [
    {
      sender: "user",
      content: "I need to create a lesson about photosynthesis for 5th graders",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "10:32 AM",
    },
    {
      sender: "ai",
      content:
        "I can help you create a lesson about photosynthesis for 5th graders. What specific aspects would you like to focus on?",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "10:33 AM",
    },
    {
      sender: "user",
      content: "I want to focus on the process and why it's important for plants and our ecosystem",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "10:35 AM",
    },
    {
      sender: "ai",
      content:
        "Great choice! Here's a draft lesson plan on photosynthesis for 5th graders focusing on the process and its importance:",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "10:36 AM",
      attachment: {
        type: "lesson-preview",
        title: "Photosynthesis: How Plants Make Food",
      },
    },
  ]

  // Sample chat messages for Fractions conversation
  const fractionsChatMessages = [
    {
      sender: "user",
      content: "I need to create a lesson about fractions for 3rd graders",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:15 PM",
    },
    {
      sender: "ai",
      content:
        "I'd be happy to help you create a lesson about fractions for 3rd graders. What specific aspects of fractions would you like to focus on?",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:15 PM",
    },
    {
      sender: "user",
      content: "I want to teach them about equivalent fractions using pizza slices",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:16 PM",
    },
    {
      sender: "ai",
      content:
        "That's a great approach! Using pizza slices is a visual and relatable way to teach equivalent fractions. I'll help you create that lesson.",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:16 PM",
    },
    {
      sender: "user",
      content: "Can you also include something about improper fractions?",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:17 PM",
    },
    {
      sender: "ai",
      content:
        "I'm sorry, but I'm not sure what you mean by 'improper fractions' in this context. Could you clarify what aspects of improper fractions you'd like to include in the lesson? This will help me create a more relevant and accurate lesson plan for your 3rd graders.",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "1:17 PM",
      isError: true,
    },
  ]

  // Sample chat messages for World Geography conversation with error handling
  const worldGeographyChatMessages = [
    {
      sender: "user",
      content: "I need to create a lesson about world geography for 6th graders",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:15 AM",
    },
    {
      sender: "ai",
      content:
        "I'd be happy to help you create a world geography lesson for 6th graders! What specific aspects of world geography would you like to focus on? For example, we could cover continents and oceans, countries and capitals, landforms, climate zones, or cultural geography.",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:15 AM",
    },
    {
      sender: "user",
      content: "Let's focus on continents and oceans. I want them to learn the basics.",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:16 AM",
    },
    {
      sender: "ai",
      content:
        "Great choice! A lesson on continents and oceans provides an excellent foundation for world geography. Here's a basic outline for your 6th-grade lesson:",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:17 AM",
    },
    {
      sender: "user",
      content: "Can you include something about the pacific?",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:18 AM",
    },
    {
      sender: "ai",
      content:
        "I'm not entirely sure what specific aspect of 'the pacific' you'd like me to include. Are you referring to the Pacific Ocean, Pacific Islands, Pacific Rim countries, or something else? The Pacific region covers many different geographical features and cultures. Could you please clarify what aspects of the Pacific you'd like to include in the lesson so I can provide more relevant and accurate information for your 6th graders?",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "9:19 AM",
      isError: true,
      researchLink: {
        text: "Learn about writing effective prompts",
        url: "/research-hub",
        section: "prompt-formatting",
      },
    },
  ]

  // Sample lesson data for the editor
  const sampleLesson = {
    title: "Photosynthesis: How Plants Make Food",
    sections: [
      {
        id: "section-1",
        type: "objective",
        title: "Learning Objectives",
        content:
          "<ul><li>Explain the process of photosynthesis in simple terms</li><li>Identify the key components needed for photosynthesis</li><li>Describe why photosynthesis is important for plants and our ecosystem</li></ul>",
        order: 0,
      },
      {
        id: "section-2",
        type: "content",
        title: "What is Photosynthesis?",
        content:
          '<p>Photosynthesis is the process plants use to convert light energy into chemical energy. Plants take in carbon dioxide from the air and water from the soil to create glucose (sugar) and oxygen.</p><p>The word "photosynthesis" comes from two Greek words: "photo" meaning light, and "synthesis" meaning putting together.</p>',
        order: 1,
      },
      {
        id: "section-3",
        type: "content",
        title: "Key Components",
        content:
          "<p><strong>For photosynthesis to occur, plants need:</strong></p><ul><li>Sunlight - captured by chlorophyll in the plant's leaves</li><li>Water - absorbed through the plant's roots</li><li>Carbon dioxide - taken in through tiny holes in leaves called stomata</li></ul>",
        order: 2,
      },
      {
        id: "section-4",
        type: "activity",
        title: "Classroom Activity: Photosynthesis in Action",
        content:
          "<p><strong>Materials needed:</strong></p><ul><li>Clear plastic cups</li><li>Water</li><li>Elodea (water plant)</li><li>Baking soda</li><li>Lamp</li></ul><p><strong>Procedure:</strong></p><ol><li>Fill cups with water</li><li>Add a small amount of baking soda (carbon dioxide source)</li><li>Place Elodea in the cups</li><li>Position one cup in direct light and one in darkness</li><li>Observe over 24 hours - look for oxygen bubbles forming on the plant in light</li></ol>",
        order: 3,
      },
      {
        id: "section-5",
        type: "assessment",
        title: "Check for Understanding",
        content:
          "<p><strong>Questions to ask students:</strong></p><ol><li>What three things do plants need for photosynthesis?</li><li>What two things do plants produce during photosynthesis?</li><li>Why is photosynthesis important for all living things?</li><li>What would happen if plants couldn't perform photosynthesis?</li></ol>",
        order: 4,
      },
      {
        id: "section-6",
        type: "resource",
        title: "Additional Resources",
        content:
          '<ul><li><a href="#">Photosynthesis Diagram Worksheet</a></li><li><a href="#">Interactive Photosynthesis Animation</a></li><li><a href="#">Plant Life Cycle Video</a></li></ul>',
        order: 5,
      },
    ],
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Here you would typically add the message to the chat
    console.log("Sending message:", message)

    // Clear the input
    setMessage("")
  }

  const toggleConversations = () => {
    setShowConversations(!showConversations)
  }

  const handleEditLesson = () => {
    setEditingLesson(sampleLesson)
  }

  const handleSaveLesson = (lesson: any) => {
    console.log("Saving lesson:", lesson)
    // Here you would typically save the lesson to your backend
    setEditingLesson(null)
  }

  const handleCreateLesson = (type: "blank" | "ai" | "template" | "import") => {
    // Create a new blank lesson
    if (type === "blank") {
      const blankLesson = {
        title: "New Lesson Plan",
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
            title: "Lesson Content",
            content: "<p>Add your lesson content here...</p>",
            order: 1,
          },
        ],
      }
      setEditingLesson(blankLesson)
    }
    // For AI-generated, we'll simulate asking the AI
    else if (type === "ai") {
      setMessage("Create a lesson plan about ")
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Enter your lesson idea!"]')
        if (input) {
          ;(input as HTMLInputElement).focus()
        }
      }, 100)
    }
    // For template, we'll show the template selector
    else if (type === "template") {
      setShowTemplateSelector(true)
    }
    // For import, we would typically show a file picker or URL input
    else if (type === "import") {
      // For now, we'll just simulate an imported lesson
      alert("Import functionality would open a file picker or URL input dialog here.")
    }
  }

  const handleSelectTemplate = (template: any) => {
    setEditingLesson(template)
    setShowTemplateSelector(false)
  }

  const handleConversationClick = (conversationName: string) => {
    setActiveConversation(conversationName)
    // Always ensure the conversations sidebar is shown when selecting a conversation
    setShowConversations(true)
  }

  // If we're editing a lesson, show the lesson editor
  if (editingLesson) {
    return (
      <LessonEditor initialLesson={editingLesson} onSave={handleSaveLesson} onBack={() => setEditingLesson(null)} />
    )
  }

  // If we're showing the template selector
  if (showTemplateSelector) {
    return <TemplateSelector onSelectTemplate={handleSelectTemplate} onBack={() => setShowTemplateSelector(false)} />
  }

  // Get the appropriate chat messages based on active chat
  const getChatMessages = () => {
    if (activeConversation === "World Geography") {
      return worldGeographyChatMessages
    } else if (activeConversation === "Fractions") {
      return fractionsChatMessages
    }
    return chatMessages
  }

  return (
    <>
      {/* Conversations Sidebar with toggle functionality */}
      <div
        className={`${showConversations ? "w-64" : "w-0"} bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out relative`}
      >
        {showConversations && (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium text-lg">Lesson Plans</h2>
              <AnimatedButton className="p-1" color={colors.primary} onClick={() => setShowConversations(false)}>
                <ChevronLeft className="h-4 w-4" />
              </AnimatedButton>
            </div>
            <div className="p-4 border-b border-gray-200">
              <Popover>
                <PopoverTrigger asChild>
                  <AnimatedButton className="w-full flex items-center justify-center text-sm" color={colors.primary}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Lesson Plan
                  </AnimatedButton>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="start">
                  <div className="grid gap-1">
                    <div className="p-3 border-b border-gray-100">
                      <h4 className="font-medium">Create New Lesson Plan</h4>
                      <p className="text-xs text-gray-500">Choose how you want to start</p>
                    </div>
                    <button
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => handleCreateLesson("blank")}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Blank Lesson</p>
                        <p className="text-xs text-gray-500">Start from scratch</p>
                      </div>
                    </button>
                    <button
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => handleCreateLesson("ai")}
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">AI-Generated</p>
                        <p className="text-xs text-gray-500">Let AI create a lesson for you</p>
                      </div>
                    </button>
                    <button
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => handleCreateLesson("template")}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <LayoutTemplate className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">From Template</p>
                        <p className="text-xs text-gray-500">Use a pre-designed template</p>
                      </div>
                    </button>
                    <button
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => handleCreateLesson("import")}
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Import</p>
                        <p className="text-xs text-gray-500">Import from file or URL</p>
                      </div>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-[calc(100vh-180px)]">
              {conversations.map((conversation, index) => (
                <div
                  key={index}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${activeConversation === conversation.name ? "bg-gray-100" : ""}`}
                  onClick={() => handleConversationClick(conversation.name)}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {conversation.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{conversation.name}</p>
                      <p className="text-xs text-gray-500 truncate">{conversation.text}</p>
                    </div>
                    <div className="text-xs text-gray-400">{conversation.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Toggle button to show conversations when hidden */}
        {!showConversations && (
          <>
            {/* Small toggle button at the top */}
            <button
              className="absolute top-4 -right-10 p-2 rounded-r-md bg-white border border-l-0 border-gray-200"
              onClick={toggleConversations}
              aria-label="Show conversations"
            >
              <ChevronRight className="h-4 w-4" style={{ color: colors.primary }} />
            </button>

            {/* More prominent button that floats at the bottom left */}
            <div className="absolute bottom-20 left-4 z-10">
              <AnimatedButton
                className="flex items-center shadow-lg"
                color={colors.primary}
                onClick={toggleConversations}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Show Lesson Plans
              </AnimatedButton>
            </div>
          </>
        )}
      </div>

      {/* Chatbot Interface */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: colors.cardBackground }}>
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {getChatMessages().map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white overflow-hidden"
                      style={{
                        backgroundColor: msg.sender === "user" ? colors.primary : "#6B7280",
                      }}
                    >
                      {msg.sender === "user" ? "U" : "AI"}
                    </div>
                  </div>
                  <div className={`mx-2 ${msg.sender === "user" ? "mr-0" : "ml-0"}`}>
                    <div
                      className={`p-3 rounded-lg ${msg.sender === "user" ? "rounded-tr-none" : "rounded-tl-none"} ${msg.isError ? "border-2 border-orange-300" : ""}`}
                      style={{
                        backgroundColor: msg.sender === "user" ? colors.primary : "white",
                        color: msg.sender === "user" ? "white" : "black",
                      }}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Error recovery options */}
                      {msg.isError && (
                        <div className="mt-3 pt-3 border-t border-orange-200">
                          <p className="text-sm text-orange-600 mb-2">Try one of these options:</p>
                          <div className="flex flex-wrap gap-2">
                            {activeConversation === "Fractions" ? (
                              <>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage(
                                      "I want to teach them about fractions where the numerator is larger than the denominator",
                                    )
                                  }
                                >
                                  Explain improper fractions
                                </button>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage("Let's skip improper fractions and focus on equivalent fractions only")
                                  }
                                >
                                  Skip this topic
                                </button>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage("Can you suggest age-appropriate fraction topics for 3rd graders?")
                                  }
                                >
                                  Get suggestions
                                </button>
                              </>
                            ) : activeConversation === "quadratic" ? (
                              <>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage(
                                      "Yes, I'm asking about the form f(x) = a(x - h)² + k where (h, k) is the vertex of the parabola",
                                    )
                                  }
                                >
                                  Clarify vertex form
                                </button>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() => setMessage("Let's move on to completing the square instead")}
                                >
                                  Try different topic
                                </button>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() => setMessage("Can you show me how to graph a quadratic equation?")}
                                >
                                  Ask about graphing
                                </button>
                              </>
                            ) : activeConversation === "World Geography" ? (
                              <>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage(
                                      "I'd like to include information about the Pacific Ocean, its size, and major features",
                                    )
                                  }
                                >
                                  Specify Pacific Ocean
                                </button>
                                <button
                                  className="px-3 py-1 text-xs rounded-full border border-orange-400 text-orange-600 hover:bg-orange-50"
                                  onClick={() =>
                                    setMessage(
                                      "Let's focus on major Pacific Island nations that 6th graders should know",
                                    )
                                  }
                                >
                                  Focus on Pacific Islands
                                </button>
                                {msg.researchLink && (
                                  <a
                                    href={msg.researchLink.url}
                                    className="px-3 py-1 text-xs rounded-full border border-blue-400 text-blue-600 hover:bg-blue-50 flex items-center"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      router.push(msg.researchLink.url)
                                    }}
                                  >
                                    {msg.researchLink.text}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 ml-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                      {msg.timestamp}
                    </div>

                    {msg.attachment && msg.attachment.type === "lesson-preview" && (
                      <div className="mt-2 bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-lg mb-2">{msg.attachment.title}</h3>
                        <div className="bg-gray-100 p-4 rounded">
                          <div className="w-full h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200 mb-4">
                            <div className="text-center">
                              <div className="mx-auto w-32 h-32 mb-4 relative">
                                {/* Stylized plant/sun illustration for photosynthesis */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-yellow-400 opacity-80"></div>
                                <div className="absolute bottom-0 w-full flex justify-center">
                                  <div className="w-4 h-16 bg-green-600 rounded-t"></div>
                                </div>
                                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-10">
                                  <div className="w-8 h-4 bg-green-500 absolute left-0 top-0 rounded-tl-full"></div>
                                  <div className="w-8 h-4 bg-green-500 absolute right-0 top-0 rounded-tr-full"></div>
                                  <div className="w-8 h-4 bg-green-500 absolute left-0 bottom-0 rounded-bl-full"></div>
                                  <div className="w-8 h-4 bg-green-500 absolute right-0 bottom-0 rounded-br-full"></div>
                                </div>
                              </div>
                              <h4 className="text-lg font-semibold text-green-700">Photosynthesis</h4>
                              <p className="text-sm text-gray-600">5th Grade Science Lesson</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                              <p className="text-sm font-medium">Learning Objectives</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                              <p className="text-sm font-medium">Key Vocabulary</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                              <p className="text-sm font-medium">Activities & Materials</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                              <p className="text-sm font-medium">Assessment Methods</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <AnimatedButton
                            className="hover:bg-opacity-80"
                            color={colors.secondary}
                            style={{ color: colors.primary }}
                            onClick={handleEditLesson}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </AnimatedButton>
                          <AnimatedButton className="text-white hover:bg-opacity-80" color={colors.primary}>
                            Use This
                          </AnimatedButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Suggestions */}
        <div className="px-4 py-2 border-t border-gray-200" style={{ backgroundColor: colors.secondary }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-600 mb-2">Suggested topics:</p>
            <div className="flex flex-wrap gap-2">
              {["Science Experiments", "Math Games", "History Timeline", "Language Arts", "STEM Projects"].map(
                (subject, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 text-xs rounded-full border"
                    style={{
                      backgroundColor: "white",
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                  >
                    {subject}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200" style={{ backgroundColor: colors.cardBackground }}>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <button
                type="button"
                className="absolute left-3 p-1 rounded-full bg-white text-gray-500 hover:text-gray-700"
              >
                <Plus className="h-5 w-5" />
              </button>
              <input
                type="text"
                className="pl-12 pr-24 py-3 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-1"
                placeholder={
                  activeConversation === "Fractions"
                    ? "Continue the conversation about fractions..."
                    : "Enter your lesson idea!"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  backgroundColor: "white",
                  "&:focus": {
                    borderColor: colors.primary,
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                  },
                }}
              />
              <div className="absolute right-3 flex items-center space-x-2">
                <button type="button" className="p-1 text-gray-500 hover:text-gray-700">
                  <Mic className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  className="p-2 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    color: "white",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

