"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface RippleProps {
  x: number
  y: number
  size: number
}

interface AnimatedButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  color?: string
  hoverColor?: string
  rippleColor?: string
}

export function AnimatedButton({
  children,
  className,
  color = "#4f378a",
  hoverColor,
  rippleColor,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<RippleProps[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Default hover color is slightly lighter than the base color
  const defaultHoverColor = hoverColor || lightenColor(color, 10)

  // Default ripple color is white with transparency
  const defaultRippleColor = rippleColor || "rgba(255, 255, 255, 0.7)"

  // Handle button press animation
  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  // Create ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    // Get button dimensions and position
    const rect = buttonRef.current.getBoundingClientRect()

    // Calculate click position relative to button
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create a new ripple
    const size = Math.max(rect.width, rect.height) * 2
    const newRipple = { x, y, size }

    // Add the new ripple to the array
    setRipples([...ripples, newRipple])

    // Call the original onClick handler if provided
    if (onClick) onClick(e)
  }

  // Remove ripples after animation completes
  useEffect(() => {
    if (ripples.length === 0) return

    const timer = setTimeout(() => {
      setRipples(ripples.slice(1))
    }, 600) // Match the CSS animation duration

    return () => clearTimeout(timer)
  }, [ripples])

  return (
    <Button
      ref={buttonRef}
      className={`relative overflow-hidden transition-all duration-200 ${className}`}
      style={{
        backgroundColor: color,
        transform: isPressed ? "scale(0.98)" : "scale(1)",
        boxShadow: isPressed ? `0 2px 5px 0 ${color}50` : `0 4px 14px 0 ${color}50`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="absolute rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: defaultRippleColor,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}

// Helper function to lighten a color
function lightenColor(color: string, percent: number): string {
  // Remove the # if it exists
  const hex = color.replace("#", "")

  // Convert to RGB
  let r = Number.parseInt(hex.substring(0, 2), 16)
  let g = Number.parseInt(hex.substring(2, 4), 16)
  let b = Number.parseInt(hex.substring(4, 6), 16)

  // Lighten
  r = Math.min(255, Math.floor((r * (100 + percent)) / 100))
  g = Math.min(255, Math.floor((g * (100 + percent)) / 100))
  b = Math.min(255, Math.floor((b * (100 + percent)) / 100))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

