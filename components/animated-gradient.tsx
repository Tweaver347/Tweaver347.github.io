"use client"

import type React from "react"

import { useEffect, useRef } from "react"

type GradientType = "lesson" | "student" | "research" | "profile"

interface AnimatedGradientProps {
  type: GradientType
  width?: number | string
  height?: number
  className?: string
  fullWidth?: boolean
}

export function AnimatedGradient({
  type,
  width = 150,
  height = 150,
  className = "",
  fullWidth = false,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (fullWidth && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = typeof height === "number" ? height : 150
      } else {
        canvas.width = typeof width === "number" ? width : 150
        canvas.height = typeof height === "number" ? height : 150
      }
    }

    // Initial size
    updateCanvasSize()

    // Update on resize if fullWidth
    if (fullWidth) {
      const resizeObserver = new ResizeObserver(updateCanvasSize)
      if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement)
      }

      // Cleanup
      return () => {
        if (canvas.parentElement) {
          resizeObserver.unobserve(canvas.parentElement)
        }
        resizeObserver.disconnect()
      }
    }

    // Define gradient colors based on type
    const gradientConfigs = {
      lesson: {
        colors: ["#4f378a", "#9c27b0", "#673ab7", "#3f51b5"],
        speed: 0.002,
      },
      student: {
        colors: ["#2196f3", "#03a9f4", "#00bcd4", "#009688"],
        speed: 0.0015,
      },
      research: {
        colors: ["#ff9800", "#ff5722", "#f44336", "#e91e63"],
        speed: 0.0025,
      },
      profile: {
        colors: ["#4caf50", "#8bc34a", "#cddc39", "#ffeb3b"],
        speed: 0.0018,
      },
    }

    const config = gradientConfigs[type]
    let time = 0

    // Animation function
    const animate = () => {
      time += config.speed

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * (0.6 + Math.sin(time) * 0.1)

      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time * 2) * (canvas.width * 0.1),
        centerY + Math.cos(time * 3) * (canvas.height * 0.1),
        0,
        centerX,
        centerY,
        radius,
      )

      // Add color stops
      config.colors.forEach((color, index) => {
        const offset = (index / (config.colors.length - 1) + time) % 1
        gradient.addColorStop(offset, color)
      })

      // Draw gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some circles for added effect
      for (let i = 0; i < 5; i++) {
        const x = centerX + Math.sin(time * (i + 1)) * radius * 0.5
        const y = centerY + Math.cos(time * (i + 1)) * radius * 0.5
        const size = canvas.width / 15 + Math.sin(time * 2 + i) * (canvas.width / 30)

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [type, width, height, fullWidth])

  const canvasStyle: React.CSSProperties = fullWidth
    ? { width: "100%", height: `${height}px` }
    : { width: `${width}px`, height: `${height}px` }

  return <canvas ref={canvasRef} className={`rounded-lg ${className}`} style={canvasStyle} />
}

export function AnimatedGradientWithFallback({
  type,
  width = 150,
  height = 150,
  className = "",
  fullWidth = false,
}: AnimatedGradientProps) {
  // Static gradient colors for fallback
  const gradientColors = {
    lesson: "from-purple-600 to-indigo-600",
    student: "from-blue-500 to-cyan-500",
    research: "from-orange-500 to-red-500",
    profile: "from-green-500 to-lime-500",
  }

  const containerStyle: React.CSSProperties = fullWidth
    ? { width: "100%", height: `${height}px` }
    : { width: `${width}px`, height: `${height}px` }

  return (
    <div className="relative" style={containerStyle}>
      {/* Fallback gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[type]} rounded-2xl`}
        style={{ opacity: 0.9 }}
      />

      {/* Canvas animation */}
      <AnimatedGradient
        type={type}
        width={width}
        height={height}
        className={`${className} rounded-2xl shadow-inner`}
        fullWidth={fullWidth}
      />

      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-white bg-opacity-10 rounded-2xl pointer-events-none" />
    </div>
  )
}

