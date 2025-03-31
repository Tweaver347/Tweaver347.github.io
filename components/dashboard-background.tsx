"use client"

import { useEffect, useRef } from "react"

export function DashboardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial size
    updateCanvasSize()

    // Update on resize
    window.addEventListener("resize", updateCanvasSize)

    // Animation variables
    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 50
    const colors = ["#4f378a33", "#2196f333", "#ff572233", "#4caf5033"]

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(
          "33",
          Math.floor(particle.opacity * 100)
            .toString(16)
            .padStart(2, "0"),
        )
        ctx.fill()

        // Move particles
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Random slight changes in direction
        if (Math.random() > 0.99) {
          particle.vx += (Math.random() - 0.5) * 0.1
          particle.vy += (Math.random() - 0.5) * 0.1
        }

        // Limit velocity
        const maxVel = 0.2
        particle.vx = Math.max(Math.min(particle.vx, maxVel), -maxVel)
        particle.vy = Math.max(Math.min(particle.vy, maxVel), -maxVel)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ opacity: 0.7 }} />
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  opacity: number
}

