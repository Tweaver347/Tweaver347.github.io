"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TiltOptions {
  max?: number
  perspective?: number
  scale?: number
  speed?: number
  shadowIntensity?: number
}

export function useTiltEffect(options: TiltOptions = {}) {
  const {
    max = 10, // Maximum tilt rotation (degrees)
    perspective = 2000, // Perspective value for 3D space
    scale = 1.05, // Scale on hover
    speed = 50, // Transition speed
    shadowIntensity = 10, // Shadow intensity (px)
  } = options

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [shadowStyle, setShadowStyle] = useState<React.CSSProperties>({})
  const elementRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      // Get element dimensions and position
      const rect = element.getBoundingClientRect()

      // Calculate mouse position relative to the element
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate rotation based on mouse position
      // When mouse is at center, tilt is 0
      // When mouse is at edge, tilt is at max value
      const xRotation = ((max * (y - rect.height / 2)) / (rect.height / 2)) * -1
      const yRotation = (max * (x - rect.width / 2)) / (rect.width / 2)

      // Calculate shadow position based on tilt
      const shadowX = (yRotation / max) * shadowIntensity * -1
      const shadowY = (xRotation / max) * shadowIntensity

      // Apply the tilt effect
      setTiltStyle({
        transform: `
          perspective(${perspective}px)
          rotateX(${xRotation}deg)
          rotateY(${yRotation}deg)
          scale3d(${scale}, ${scale}, ${scale})
        `,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      })

      // Apply shadow effect
      setShadowStyle({
        boxShadow: `
          ${shadowX}px ${shadowY}px ${shadowIntensity * 2}px rgba(0, 0, 0, 0.1),
          0 10px 20px rgba(0, 0, 0, 0.07)
        `,
        transition: `box-shadow ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setTiltStyle({
        transform: `
          perspective(${perspective}px)
          rotateX(0deg)
          rotateY(0deg)
          scale3d(1, 1, 1)
        `,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      })
      setShadowStyle({
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.07)",
        transition: `box-shadow ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [max, perspective, scale, speed, shadowIntensity, isHovering])

  return { tiltStyle, shadowStyle, elementRef }
}

