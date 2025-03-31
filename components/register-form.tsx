"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function RegisterForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Registration attempt with:", { username, password, confirmPassword })
  }

  return (
    <div className="bg-[#007aff] rounded-lg p-6 text-white shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-lg">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-lg">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-lg">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 text-black"
            required
          />
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <Button
            type="button"
            className="bg-[#4f378a] hover:bg-[#65558f] text-white rounded-full px-6"
            onClick={() => (window.location.href = "/login")}
          >
            Back
          </Button>

          <Button type="submit" className="bg-[#4f378a] hover:bg-[#65558f] text-white rounded-full px-6">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}

