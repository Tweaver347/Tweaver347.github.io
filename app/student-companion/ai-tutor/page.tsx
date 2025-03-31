"use client"

import type React from "react"

import DashboardLayout from "@/components/dashboard-layout"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mic, Plus, Send } from "lucide-react"
import { useState } from "react"

export default function AITutorPage() {
  const { colors } = useTheme()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [activeChat, setActiveChat] = useState<string | null>(null)

  // Mock chat history
  const conversations = [
    {
      id: "photosynthesis",
      name: "Photosynthesis",
      preview: "I need help understanding how plants make food",
      time: "Today, 10:32 AM",
    },
    {
      id: "quadratic",
      name: "Quadratic Equations",
      preview: "How do I solve x² + 5x + 6 = 0?",
      time: "Yesterday, 3:45 PM",
    },
    {
      id: "french-revolution",
      name: "French Revolution",
      preview: "What were the main causes?",
      time: "Mar 12, 2025",
    },
    {
      id: "newtons-laws",
      name: "Newton's Laws",
      preview: "Can you explain the three laws of motion?",
      time: "Mar 10, 2025",
    },
  ]

  // Sample chat messages for photosynthesis
  const photosynthesisChat = [
    {
      sender: "user",
      content: "I'm having trouble understanding photosynthesis. Can you explain it in simple terms?",
      timestamp: "10:32 AM",
    },
    {
      sender: "ai",
      content:
        "Of course! Photosynthesis is how plants make their own food. They use sunlight, water, and carbon dioxide to create glucose (sugar) and oxygen. Think of it like a plant's way of cooking its own meal using sunlight as the energy source. The plant takes in carbon dioxide from the air through tiny holes in its leaves called stomata. It absorbs water through its roots. Then, with the help of chlorophyll (the green pigment in leaves) and sunlight, it converts these ingredients into glucose for energy and releases oxygen as a byproduct. Does that help?",
      timestamp: "10:33 AM",
    },
    {
      sender: "user",
      content: "That makes sense! So what's the chemical equation for photosynthesis?",
      timestamp: "10:35 AM",
    },
    {
      sender: "ai",
      content:
        "The chemical equation for photosynthesis is:\n\n6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nIn words: Six molecules of carbon dioxide plus six molecules of water, with the addition of light energy, produce one molecule of glucose and six molecules of oxygen.\n\nWould you like me to explain any part of this equation in more detail?",
      timestamp: "10:36 AM",
    },
  ]

  // Sample chat messages for quadratic equations with error handling
  const quadraticChat = [
    {
      sender: "user",
      content: "I need help solving quadratic equations for my algebra homework.",
      timestamp: "3:45 PM",
    },
    {
      sender: "ai",
      content: "I'd be happy to help you with quadratic equations! What specific problem are you working on?",
      timestamp: "3:45 PM",
    },
    {
      sender: "user",
      content: "I need to solve x² + 5x + 6 = 0",
      timestamp: "3:46 PM",
    },
    {
      sender: "ai",
      content:
        "Let's solve x² + 5x + 6 = 0 using factoring.\n\nWe need to find two numbers that multiply to give 6 and add up to 5.\nThose numbers are 2 and 3 (2 × 3 = 6 and 2 + 3 = 5).\n\nSo we can rewrite the equation as:\nx² + 5x + 6 = 0\nx² + 2x + 3x + 6 = 0\nx(x + 2) + 3(x + 2) = 0\n(x + 2)(x + 3) = 0\n\nUsing the zero product property, we get:\nx + 2 = 0 or x + 3 = 0\nx = -2 or x = -3\n\nSo the solutions are x = -2 and x = -3.\n\nDoes that make sense?",
      timestamp: "3:47 PM",
    },
    {
      sender: "user",
      content: "Yes, that's clear! Can you also explain how to use the discriminant?",
      timestamp: "3:48 PM",
    },
    {
      sender: "ai",
      content:
        "The discriminant is part of the quadratic formula and helps determine the nature of the solutions to a quadratic equation.\n\nFor a quadratic equation in the form ax² + bx + c = 0, the discriminant is calculated as:\nΔ = b² - 4ac\n\nThe value of the discriminant tells you about the solutions:\n• If Δ > 0: The equation has two distinct real solutions\n• If Δ = 0: The equation has one repeated real solution (a double root)\n• If Δ < 0: The equation has two complex solutions (no real solutions)\n\nFor your equation x² + 5x + 6 = 0, we have a = 1, b = 5, and c = 6.\nSo the discriminant is:\nΔ = 5² - 4(1)(6) = 25 - 24 = 1\n\nSince Δ = 1 > 0, this confirms that the equation has two distinct real solutions, which we found to be x = -2 and x = -3.",
      timestamp: "3:49 PM",
    },
    {
      sender: "user",
      content: "Great! Now can you explain how to use the quadratic formula for non-factorable equations?",
      timestamp: "3:50 PM",
    },
    {
      sender: "ai",
      content:
        "The quadratic formula is especially useful for equations that can't be easily factored.\n\nFor a quadratic equation in the form ax² + bx + c = 0, the quadratic formula is:\n\nx = (-b ± √(b² - 4ac)) / (2a)\n\nHere's how to use it:\n\n1. Identify the values of a, b, and c from your equation\n2. Substitute these values into the formula\n3. Calculate the discriminant (b² - 4ac)\n4. Find both solutions using the plus and minus versions of the formula\n\nLet's try an example: 2x² - 7x + 3 = 0\n\nHere, a = 2, b = -7, and c = 3\n\nx = (-(-7) ± √((-7)² - 4(2)(3))) / (2(2))\nx = (7 ± √(49 - 24)) / 4\nx = (7 ± √25) / 4\nx = (7 ± 5) / 4\n\nSo, x = (7 + 5) / 4 = 12 / 4 = 3 or x = (7 - 5) / 4 = 2 / 4 = 0.5\n\nThe solutions are x = 3 and x = 0.5",
      timestamp: "3:51 PM",
    },
    {
      sender: "user",
      content: "Can you also explain the vertex form and how to find the vertex?",
      timestamp: "3:52 PM",
    },
    {
      sender: "ai",
      content:
        "I'm sorry, but I'm not sure what you mean by 'vertex form' in this context. Could you clarify what aspect of quadratic equations you're asking about? Are you referring to writing a quadratic function in the form f(x) = a(x - h)² + k, where (h, k) is the vertex of the parabola? Or are you asking about something else related to quadratic equations?",
      timestamp: "3:53 PM",
      isError: true,
    },
  ]

  // Mock subject suggestions
  const subjectSuggestions = ["Algebra", "Cell Biology", "World History", "Chemical Reactions", "Literary Analysis"]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Here you would typically add the message to the chat
    console.log("Sending message:", message)

    // Clear the input
    setMessage("")
  }

  // Get the appropriate chat messages based on active chat
  const getChatMessages = () => {
    if (activeChat === "quadratic") {
      return quadraticChat
    }
    return photosynthesisChat
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="student-companion">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center">
              <AnimatedButton
                className="mr-2 p-1"
                color={colors.primary}
                onClick={() => router.push("/student-companion")}
              >
                <ArrowLeft className="h-4 w-4" />
              </AnimatedButton>
              <h2 className="font-medium">AI Tutor</h2>
            </div>

            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium mb-2">New Conversation</h3>
              <AnimatedButton className="w-full flex items-center justify-center text-sm" color={colors.primary}>
                <Plus className="h-4 w-4 mr-2" />
                Start New Chat
              </AnimatedButton>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">Recent Conversations</h3>
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-2 rounded-md ${activeChat === conversation.id ? "bg-gray-100" : "hover:bg-gray-100"} cursor-pointer`}
                    onClick={() => setActiveChat(conversation.id)}
                  >
                    <p className="text-sm font-medium">{conversation.name}</p>
                    <p className="text-xs text-gray-500">{conversation.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
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
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                          {msg.timestamp}
                        </div>
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
                  {subjectSuggestions.map((subject, index) => (
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
                  ))}
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
                      activeChat === "quadratic"
                        ? "Continue your question about quadratic equations..."
                        : "Ask me anything about your studies..."
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
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

