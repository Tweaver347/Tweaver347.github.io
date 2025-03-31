"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider-custom"
import { AnimatedButton } from "@/components/animated-button"
import { ShineEffect } from "@/components/shine-effect"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { useState } from "react"
import { Search, Filter, X, FileText, Upload, Download, Copy, ExternalLink, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function ResearchHubPage() {
  const { colors } = useTheme()
  const [activeResearch, setActiveResearch] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const router = useRouter()

  // Research categories
  const categories = [
    "Prompt Structure",
    "Subject-Specific",
    "Lesson Planning",
    "Assessment",
    "Differentiation",
    "Case Studies",
  ]

  // Research data with categories
  const researchData = [
    {
      id: "prompt-structure",
      title: "Effective Prompt Structure",
      description: "Research on how the structure and format of prompts affects AI responses for educational content.",
      category: "Prompt Structure",
      author: "Dr. Emily Chen",
      date: "April 15, 2025",
      readTime: "8 min read",
      image: "structure",
    },
    {
      id: "chain-of-thought",
      title: "Chain of Thought Prompting",
      description:
        "How breaking down complex reasoning into step-by-step prompts improves AI explanations for students.",
      category: "Prompt Structure",
      author: "Prof. James Wilson",
      date: "March 28, 2025",
      readTime: "12 min read",
      image: "chain",
    },
    {
      id: "math-prompting",
      title: "Mathematics Prompting Techniques",
      description:
        "Specialized prompting strategies for generating accurate and grade-appropriate math content and problems.",
      category: "Subject-Specific",
      author: "Dr. Sarah Johnson",
      date: "April 2, 2025",
      readTime: "10 min read",
      image: "math",
    },
    {
      id: "science-prompting",
      title: "Science Experiment Prompts",
      description:
        "How to prompt AI to generate safe, effective science experiments aligned with curriculum standards.",
      category: "Subject-Specific",
      author: "Dr. Michael Rodriguez",
      date: "March 20, 2025",
      readTime: "9 min read",
      image: "science",
    },
    {
      id: "lesson-plan-prompts",
      title: "Lesson Plan Generation",
      description:
        "Research on optimal prompting techniques for creating comprehensive, standards-aligned lesson plans.",
      category: "Lesson Planning",
      author: "Dr. Lisa Thompson",
      date: "April 10, 2025",
      readTime: "15 min read",
      image: "lesson",
    },
    {
      id: "assessment-prompts",
      title: "Assessment Creation Prompts",
      description:
        "How to prompt AI to generate effective formative and summative assessments with proper difficulty scaling.",
      category: "Assessment",
      author: "Prof. Robert Davis",
      date: "March 15, 2025",
      readTime: "11 min read",
      image: "assessment",
    },
    {
      id: "differentiation-prompts",
      title: "Differentiation Strategies",
      description: "Prompting techniques to create materials for diverse learning needs and abilities.",
      category: "Differentiation",
      author: "Dr. Aisha Patel",
      date: "April 5, 2025",
      readTime: "13 min read",
      image: "differentiation",
    },
    {
      id: "case-study-history",
      title: "Case Study: History Curriculum",
      description: "A comprehensive case study on developing an entire history unit using AI prompting techniques.",
      category: "Case Studies",
      author: "Prof. Thomas Anderson",
      date: "March 25, 2025",
      readTime: "20 min read",
      image: "history",
    },
  ]

  // Filter research data based on search query and active filter
  const filteredResearch = researchData.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = activeFilter === null || item.category === activeFilter

    return matchesSearch && matchesFilter
  })

  // If viewing a specific research item
  if (activeResearch) {
    const research = researchData.find((item) => item.id === activeResearch)
    if (!research) return null

    return <ResearchDetail research={research} onBack={() => setActiveResearch(null)} colors={colors} />
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="research-hub">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
              AI Prompting Research Hub
            </h1>
            <p className="text-[#49454f] max-w-3xl">
              Explore our team's research on effective AI prompting techniques for education. Learn how to craft prompts
              that generate high-quality, curriculum-aligned content for your classroom.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2"
                  placeholder="Search prompting techniques..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderColor: colors.accent,
                    "&:focus": {
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 1px ${colors.primary}`,
                    },
                  }}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center mr-2">
                  <Filter className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter:</span>
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      activeFilter === category
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveFilter(activeFilter === category ? null : category)}
                    style={{
                      backgroundColor: activeFilter === category ? colors.primary : "white",
                      borderColor: activeFilter === category ? colors.primary : "#e5e7eb",
                      color: activeFilter === category ? "white" : "inherit",
                    }}
                  >
                    {category}
                  </button>
                ))}
                {activeFilter && (
                  <button
                    className="px-3 py-1 text-sm rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={() => setActiveFilter(null)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Research */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Featured Research
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeaturedResearchCard
                title="Effective Prompt Structure"
                description="Our comprehensive guide to structuring AI prompts for optimal educational content generation. Learn the key components of effective prompts and how they impact AI responses."
                category="Prompt Structure"
                colors={colors}
                onClick={() => setActiveResearch("prompt-structure")}
              />
              <FeaturedResearchCard
                title="Case Study: History Curriculum"
                description="See how a complete history unit was developed using specialized AI prompting techniques. Includes before and after examples, student outcomes, and teacher feedback."
                category="Case Studies"
                colors={colors}
                onClick={() => setActiveResearch("case-study-history")}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Showing {filteredResearch.length} {filteredResearch.length === 1 ? "result" : "results"}
              {activeFilter && ` in ${activeFilter}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Research Grid */}
          {filteredResearch.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {filteredResearch.map((item) => (
                <ResearchCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  author={item.author}
                  date={item.date}
                  readTime={item.readTime}
                  colors={colors}
                  onClick={() => setActiveResearch(item.id)}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                <Search className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any research matching your criteria. Try adjusting your search terms or filters.
              </p>
            </div>
          )}

          {/* Submit Research */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
                  Share Your Prompting Research
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Have you discovered effective prompting techniques for education? Share your findings with our
                  community to help improve AI use in classrooms.
                </p>
              </div>
              <AnimatedButton
                className="mt-4 md:mt-0"
                color={colors.primary}
                onClick={() => alert("This would open a form to submit research")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Research
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-white py-6 px-4 text-center" style={{ backgroundColor: colors.footerBackground }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-2">Research Mission</h3>
            <p className="text-sm">
              Our research team is dedicated to discovering and sharing the most effective AI prompting techniques for
              education. By understanding how to better communicate with AI systems, we can help educators create more
              engaging, accurate, and personalized learning experiences for their students.
            </p>
          </div>
        </footer>
      </DashboardLayout>
    </div>
  )
}

function FeaturedResearchCard({
  title,
  description,
  category,
  colors,
  onClick,
}: {
  title: string
  description: string
  category: string
  colors: any
  onClick: () => void
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

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prompt Structure":
        return "#4299e1" // blue
      case "Subject-Specific":
        return "#805ad5" // purple
      case "Lesson Planning":
        return "#48bb78" // green
      case "Assessment":
        return "#ed8936" // orange
      case "Differentiation":
        return "#f56565" // red
      case "Case Studies":
        return "#667eea" // indigo
      default:
        return "#a0aec0" // gray
    }
  }

  return (
    <ShineEffect>
      <Card
        ref={elementRef}
        className="overflow-hidden border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-md h-full transform-gpu cursor-pointer"
        style={combinedStyle}
        onClick={onClick}
      >
        <div className="p-6 relative h-full">
          {/* Glass highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 pointer-events-none" />

          {/* Category Badge */}
          <div
            className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              backgroundColor: `${getCategoryColor(category)}20`,
              color: getCategoryColor(category),
            }}
          >
            {category}
          </div>

          <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
            {title}
          </h3>
          <p className="text-sm text-gray-700 mb-4">{description}</p>

          <div className="flex justify-end">
            <div className="text-sm font-medium flex items-center" style={{ color: colors.primary }}>
              Read more <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>
      </Card>
    </ShineEffect>
  )
}

function ResearchCard({
  title,
  description,
  category,
  author,
  date,
  readTime,
  colors,
  onClick,
  image,
}: {
  title: string
  description: string
  category: string
  author: string
  date: string
  readTime: string
  colors: any
  onClick: () => void
  image: string
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

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prompt Structure":
        return "#4299e1" // blue
      case "Subject-Specific":
        return "#805ad5" // purple
      case "Lesson Planning":
        return "#48bb78" // green
      case "Assessment":
        return "#ed8936" // orange
      case "Differentiation":
        return "#f56565" // red
      case "Case Studies":
        return "#667eea" // indigo
      default:
        return "#a0aec0" // gray
    }
  }

  // Get image based on type
  const getImage = (imageType: string) => {
    switch (imageType) {
      case "structure":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-8 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-24 h-8 bg-gray-400 rounded-lg mb-2"></div>
            <div className="w-28 h-8 bg-gray-300 rounded-lg"></div>
          </div>
        )
      case "chain":
        return (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-400 mb-2"></div>
              <div className="w-2 h-8 bg-gray-300"></div>
              <div className="w-12 h-12 rounded-full bg-gray-400 mb-2"></div>
              <div className="w-2 h-8 bg-gray-300"></div>
              <div className="w-12 h-12 rounded-full bg-gray-400"></div>
            </div>
          </div>
        )
      case "math":
        return (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">x² + y² = z²</div>
              <div className="text-xl font-bold text-gray-300 mt-2">f(x) = 2x + 3</div>
            </div>
          </div>
        )
      case "science":
        return (
          <div className="flex items-center justify-center">
            <div className="flex space-x-4">
              <div className="w-8 h-16 bg-gray-300 rounded-t-lg"></div>
              <div className="w-8 h-12 bg-gray-400 rounded-t-lg"></div>
              <div className="w-8 h-20 bg-gray-300 rounded-t-lg"></div>
            </div>
          </div>
        )
      case "lesson":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-6 bg-gray-400 rounded mb-2"></div>
            <div className="w-28 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        )
      case "assessment":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-2"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-2"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-2"></div>
              <div className="w-28 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        )
      case "differentiation":
        return (
          <div className="flex items-center justify-center">
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="w-12 h-12 rounded-full bg-gray-400"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        )
      case "history":
        return (
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 flex flex-col items-center justify-center border-2 border-gray-400 rounded">
              <div className="text-sm font-bold text-gray-400">CASE</div>
              <div className="text-sm font-bold text-gray-400">STUDY</div>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-400"></div>
          </div>
        )
    }
  }

  return (
    <ShineEffect>
      <Card
        ref={elementRef}
        className="overflow-hidden border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-md h-full transform-gpu cursor-pointer"
        style={combinedStyle}
        onClick={onClick}
      >
        <div className="p-6 relative h-full">
          {/* Glass highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 pointer-events-none" />

          {/* Category Badge */}
          <div
            className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              backgroundColor: `${getCategoryColor(category)}20`,
              color: getCategoryColor(category),
            }}
          >
            {category}
          </div>

          {/* Card Image */}
          <div className="mb-4 bg-white rounded-lg w-full h-40 flex items-center justify-center border border-gray-200">
            {getImage(image)}
          </div>

          <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
            {title}
          </h3>
          <p className="text-sm text-gray-700 mb-4">{description}</p>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>{author}</div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {readTime}
            </div>
          </div>
        </div>
      </Card>
    </ShineEffect>
  )
}

function ResearchDetail({
  research,
  onBack,
  colors,
}: {
  research: any
  onBack: () => void
  colors: any
}) {
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prompt Structure":
        return "#4299e1" // blue
      case "Subject-Specific":
        return "#805ad5" // purple
      case "Lesson Planning":
        return "#48bb78" // green
      case "Assessment":
        return "#ed8936" // orange
      case "Differentiation":
        return "#f56565" // red
      case "Case Studies":
        return "#667eea" // indigo
      default:
        return "#a0aec0" // gray
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="research-hub">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <AnimatedButton className="mb-4" color={colors.primary} onClick={onBack}>
              Back to Research Hub
            </AnimatedButton>

            <div
              className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-3"
              style={{
                backgroundColor: `${getCategoryColor(research.category)}20`,
                color: getCategoryColor(research.category),
              }}
            >
              {research.category}
            </div>

            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {research.title}
            </h1>

            <div className="flex items-center text-sm text-gray-600 mb-6">
              <div className="mr-4">{research.author}</div>
              <div className="mr-4">{research.date}</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {research.readTime}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white shadow-sm mb-6">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="methodology">Methodology</TabsTrigger>
                    <TabsTrigger value="findings">Findings</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                      Research Overview
                    </h2>
                    <p className="text-gray-700">
                      This research explores how the structure and format of prompts significantly impacts the quality,
                      accuracy, and educational value of AI-generated content. Through systematic testing of various
                      prompting techniques across different educational contexts, we've identified key patterns and best
                      practices for educators.
                    </p>
                    <p className="text-gray-700">
                      Our findings indicate that well-structured prompts with clear parameters consistently produce more
                      curriculum-aligned, age-appropriate, and pedagogically sound content than vague or unstructured
                      prompts. This research provides practical guidelines for educators to maximize the effectiveness
                      of AI tools in their teaching practice.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                      <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                        Key Takeaways
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Specific, detailed prompts yield more accurate and relevant educational content</li>
                        <li>
                          Including grade level and prior knowledge context significantly improves appropriateness
                        </li>
                        <li>
                          Structured formats (e.g., "Create a lesson plan that includes X, Y, Z") outperform open-ended
                          requests
                        </li>
                        <li>Iterative prompting with refinement produces the highest quality educational materials</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="methodology" className="space-y-4">
                    <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                      Research Methodology
                    </h2>
                    <p className="text-gray-700">
                      Our research employed a mixed-methods approach combining quantitative analysis of AI responses
                      with qualitative assessment by experienced educators. We tested over 500 different prompt
                      variations across multiple AI models, subject areas, and grade levels.
                    </p>

                    <h3 className="font-medium mt-4" style={{ color: colors.primary }}>
                      Research Process
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>
                        <strong>Prompt Design:</strong> We created a taxonomy of prompt structures, varying in
                        specificity, format, context inclusion, and complexity
                      </li>
                      <li>
                        <strong>Response Generation:</strong> Each prompt was submitted to multiple AI systems to
                        generate educational content
                      </li>
                      <li>
                        <strong>Evaluation:</strong> Responses were evaluated by a panel of 25 educators across
                        different subject specialties and grade levels
                      </li>
                      <li>
                        <strong>Analysis:</strong> Statistical analysis identified correlations between prompt
                        characteristics and response quality
                      </li>
                      <li>
                        <strong>Validation:</strong> Findings were validated through classroom implementation and
                        student learning outcome assessment
                      </li>
                    </ol>
                  </TabsContent>

                  <TabsContent value="findings" className="space-y-4">
                    <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                      Key Findings
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-medium mb-2 text-blue-700">Finding 1: Specificity Impact</h3>
                        <p className="text-gray-700">
                          Prompts with specific parameters (e.g., grade level, learning objectives, format requirements)
                          produced content that was 78% more likely to be rated as "highly appropriate" by educators
                          compared to vague prompts. Specificity particularly improved alignment with curriculum
                          standards and age-appropriateness.
                        </p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="font-medium mb-2 text-purple-700">Finding 2: Context Enrichment</h3>
                        <p className="text-gray-700">
                          Including student background knowledge and prior learning in prompts resulted in content that
                          built more effectively on existing knowledge. Educators reported 65% higher ratings for
                          "pedagogical soundness" when context was provided in the prompt.
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="font-medium mb-2 text-green-700">Finding 3: Format Structuring</h3>
                        <p className="text-gray-700">
                          Prompts that specified output format (e.g., "Create a lesson plan with objectives, activities,
                          and assessment") produced more complete and usable educational materials than open-ended
                          requests. Structured outputs were 83% more likely to be implemented without modification.
                        </p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="font-medium mb-2 text-orange-700">Finding 4: Iterative Refinement</h3>
                        <p className="text-gray-700">
                          Multi-step prompting, where initial outputs were refined through follow-up prompts, produced
                          the highest quality educational materials. This approach improved content quality by an
                          average of 42% compared to single-prompt approaches.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                      Example Prompts
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                          Poor Prompt Example
                        </h3>
                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <p className="text-gray-800 mb-2 font-medium">❌ "Create a lesson about photosynthesis"</p>
                          <p className="text-gray-600 text-sm">
                            This prompt lacks grade level, learning objectives, format requirements, and context about
                            student prior knowledge. The resulting content is likely to be generic and may not match
                            curriculum needs.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                          Effective Prompt Example
                        </h3>
                        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                          <p className="text-gray-800 mb-2 font-medium">
                            ✅ "Create a 5th-grade science lesson plan about photosynthesis. Students have already
                            learned about plant parts and their functions. The lesson should align with NGSS standard
                            5-LS1-1 and include: 1) Clear learning objectives, 2) A hands-on experiment using household
                            materials, 3) Visual aids to explain the process, 4) A formative assessment, and 5)
                            Differentiation options for advanced and struggling learners."
                          </p>
                          <p className="text-gray-600 text-sm">
                            This prompt specifies grade level, prior knowledge, standards alignment, and required
                            components. It provides clear parameters that result in curriculum-aligned, classroom-ready
                            content.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2" style={{ color: colors.primary }}>
                          Iterative Prompting Example
                        </h3>
                        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                          <p className="text-gray-800 mb-2 font-medium">Initial Prompt:</p>
                          <p className="text-gray-700 mb-4">
                            "Create a 7th-grade math lesson on solving two-step equations. Include objectives, examples,
                            and practice problems."
                          </p>

                          <p className="text-gray-800 mb-2 font-medium">Follow-up Prompt:</p>
                          <p className="text-gray-700 mb-4">
                            "The examples are good, but could you add a real-world application for each one? Also,
                            please include 3 differentiated practice problems (basic, intermediate, advanced)."
                          </p>

                          <p className="text-gray-800 mb-2 font-medium">Final Refinement Prompt:</p>
                          <p className="text-gray-700">
                            "This looks great. Now add a 5-minute formative assessment exit ticket and suggestions for
                            addressing common misconceptions about negative coefficients."
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              <Card className="p-6 bg-white shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
                  Implementation Guide
                </h2>
                <p className="text-gray-700 mb-4">
                  Based on our research findings, we've developed a practical framework for educators to create
                  effective AI prompts:
                </p>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.primary }}>
                        Specify Context
                      </h3>
                      <p className="text-gray-700">
                        Include grade level, subject area, standards alignment, and student prior knowledge
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.primary }}>
                        Define Format
                      </h3>
                      <p className="text-gray-700">
                        Clearly outline the structure and components you need in the output
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.primary }}>
                        Set Parameters
                      </h3>
                      <p className="text-gray-700">
                        Specify length, complexity level, vocabulary considerations, and any content restrictions
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.primary }}>
                        Request Differentiation
                      </h3>
                      <p className="text-gray-700">Ask for variations or adaptations for different learning needs</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.primary }}>
                        Iterate and Refine
                      </h3>
                      <p className="text-gray-700">Use follow-up prompts to enhance and improve initial outputs</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 bg-white shadow-sm mb-6">
                <h3 className="font-medium mb-4" style={{ color: colors.primary }}>
                  Prompt Template
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                    Create a [grade level] [subject] lesson on [topic]. Context: - Standards: [specific standards] -
                    Prior knowledge: [what students already know] - Time available: [lesson duration] Please include: 1.
                    Learning objectives 2. Key vocabulary 3. [specific components needed] 4. Assessment method 5.
                    Differentiation options
                  </p>
                </div>
                <button
                  className="w-full flex items-center justify-center text-sm p-2 border rounded-md hover:bg-gray-50"
                  onClick={() => {
                    navigator.clipboard.writeText(`Create a [grade level] [subject] lesson on [topic].
                    
Context:
- Standards: [specific standards]
- Prior knowledge: [what students already know]
- Time available: [lesson duration]

Please include:
1. Learning objectives
2. Key vocabulary
3. [specific components needed]
4. Assessment method
5. Differentiation options`)
                    alert("Template copied to clipboard!")
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Template
                </button>
              </Card>

              <Card className="p-6 bg-white shadow-sm mb-6">
                <h3 className="font-medium mb-4" style={{ color: colors.primary }}>
                  Related Research
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <a href="#" className="text-sm hover:underline" style={{ color: colors.primary }}>
                      Chain of Thought Prompting
                    </a>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <a href="#" className="text-sm hover:underline" style={{ color: colors.primary }}>
                      Mathematics Prompting Techniques
                    </a>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <a href="#" className="text-sm hover:underline" style={{ color: colors.primary }}>
                      Lesson Plan Generation
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <h3 className="font-medium mb-4" style={{ color: colors.primary }}>
                  Download Resources
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Full Research Paper</span>
                    </div>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Prompt Templates (PDF)</span>
                    </div>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Implementation Guide</span>
                    </div>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-white py-6 px-4 text-center mt-8" style={{ backgroundColor: colors.footerBackground }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-2">Research Mission</h3>
            <p className="text-sm">
              Our research team is dedicated to discovering and sharing the most effective AI prompting techniques for
              education. By understanding how to better communicate with AI systems, we can help educators create more
              engaging, accurate, and personalized learning experiences for their students.
            </p>
          </div>
        </footer>
      </DashboardLayout>
    </div>
  )
}

