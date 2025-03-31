"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ShineEffectProps {
  children: React.ReactNode
  className?: string
}

export function ShineEffect({ children, className = "" }: ShineEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      // Calculate mouse position relative to the element (0 to 1)
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setPosition({ x, y })
      setOpacity(0.15) // Show shine effect
    }

    const handleMouseLeave = () => {
      setOpacity(0) // Hide shine effect
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Calculate the position of the shine based on mouse position
  const shineStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    backgroundImage: `radial-gradient(
      circle at ${position.x * 100}% ${position.y * 100}%,
      rgba(255, 255, 255, ${opacity}) 0%,
      rgba(255, 255, 255, 0) 50%
    )`,
    transition: "background-image 0.2s ease-out",
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      <div style={shineStyle} />
    </div>
  )
}

