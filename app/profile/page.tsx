"use client"

import type React from "react"
import { useState } from "react"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, Settings, User } from "lucide-react"
import { useTheme } from "@/components/theme-provider-custom"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function ProfilePage() {
  const { colors } = useTheme()
  const [show2FASetup, setShow2FASetup] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <DashboardLayout activePage="profile">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Sidebar */}
            <div className="md:col-span-1">
              <Card className="p-6 shadow-sm" style={{ backgroundColor: "white" }}>
                <div className="flex flex-col items-center text-center mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    <User className="h-12 w-12" style={{ color: colors.primary }} />
                  </div>
                  <h2 className="text-xl font-bold">Teacher Name</h2>
                  <p className="text-[#49454f]">Science Teacher</p>
                  <p className="text-sm text-[#79747e]">Springfield Elementary</p>
                </div>

                <div className="space-y-4">
                  <ProfileStat
                    icon={<BookOpen className="h-5 w-5" />}
                    label="Lessons Created"
                    value="24"
                    colors={colors}
                  />
                  <ProfileStat icon={<Clock className="h-5 w-5" />} label="Hours Saved" value="18" colors={colors} />
                  <ProfileStat
                    icon={<Calendar className="h-5 w-5" />}
                    label="Member Since"
                    value="Jan 2025"
                    colors={colors}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    style={{
                      color: colors.primary,
                      borderColor: colors.primary,
                      "&:hover": { backgroundColor: colors.secondary },
                    }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Account Settings</span>
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium mb-4">Security</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center">
                      <Switch
                        id="2fa"
                        className="mr-2"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            // This would typically open a 2FA setup flow
                            setShow2FASetup(true)
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShow2FASetup(true)}
                        style={{
                          color: colors.primary,
                          borderColor: colors.primary,
                        }}
                      >
                        Setup
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Card className="p-6 shadow-sm" style={{ backgroundColor: "white" }}>
                <Tabs defaultValue="recent">
                  <TabsList className="mb-6" style={{ backgroundColor: colors.secondary }}>
                    <TabsTrigger
                      value="recent"
                      style={{
                        "&[data-state=active]": {
                          backgroundColor: colors.primary,
                          color: "white",
                        },
                      }}
                    >
                      Recent Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="lessons"
                      style={{
                        "&[data-state=active]": {
                          backgroundColor: colors.primary,
                          color: "white",
                        },
                      }}
                    >
                      My Lessons
                    </TabsTrigger>
                    <TabsTrigger
                      value="saved"
                      style={{
                        "&[data-state=active]": {
                          backgroundColor: colors.primary,
                          color: "white",
                        },
                      }}
                    >
                      Saved Resources
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="recent" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                      Recent Activity
                    </h3>

                    <ActivityItem
                      title="Created a new lesson"
                      description="Photosynthesis for 5th Grade"
                      time="2 hours ago"
                    />
                    <ActivityItem title="Modified lesson" description="States of Matter" time="Yesterday" />
                    <ActivityItem title="Saved resource" description="Interactive Periodic Table" time="3 days ago" />

                    <div className="text-center mt-6">
                      <Button
                        variant="outline"
                        style={{
                          color: colors.primary,
                          borderColor: colors.primary,
                          "&:hover": { backgroundColor: colors.secondary },
                        }}
                      >
                        View All Activity
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="lessons">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                      My Lessons
                    </h3>
                    <p className="text-[#49454f] italic">
                      This tab will display all your created lessons. Feature coming soon!
                    </p>
                  </TabsContent>

                  <TabsContent value="saved">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                      Saved Resources
                    </h3>
                    <p className="text-[#49454f] italic">
                      This tab will display all your saved resources. Feature coming soon!
                    </p>
                  </TabsContent>
                </Tabs>
              </Card>

              <div className="mt-6">
                <Card className="p-6 shadow-sm" style={{ backgroundColor: "white" }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                    Usage Statistics
                  </h3>
                  <div
                    className="h-48 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    <p className="text-[#49454f]">Usage charts and statistics will appear here</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-white py-6 px-4 text-center mt-8" style={{ backgroundColor: colors.footerBackground }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-2">AI Statement</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
          </div>
        </footer>
      </DashboardLayout>
      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6" style={{ backgroundColor: "white" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                Setup Two-Factor Authentication
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShow2FASetup(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex justify-center">
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 mx-auto w-32 h-32 border-4 border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-4 grid-rows-4 gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-gray-400"></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">QR Code</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code with your authenticator app, or enter the code manually:
                </p>
                <div className="bg-gray-100 p-2 rounded text-center font-mono">ABCD-EFGH-IJKL-MNOP</div>
              </div>

              <div>
                <label htmlFor="verification-code" className="block text-sm font-medium mb-1">
                  Verification Code
                </label>
                <input
                  id="verification-code"
                  type="text"
                  className="w-full p-2 rounded border border-gray-300"
                  placeholder="Enter 6-digit code"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShow2FASetup(false)}
                  style={{
                    color: colors.primary,
                    borderColor: colors.primary,
                  }}
                >
                  Cancel
                </Button>
                <AnimatedButton
                  className="text-white"
                  color={colors.primary}
                  onClick={() => {
                    // This would typically verify the code and enable 2FA
                    setShow2FASetup(false)
                    // Show success message or notification
                  }}
                >
                  Verify and Enable
                </AnimatedButton>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function ProfileStat({
  icon,
  label,
  value,
  colors,
}: {
  icon: React.ReactNode
  label: string
  value: string
  colors: any
}) {
  return (
    <div className="flex items-center">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: colors.secondary, color: colors.primary }}
      >
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm text-[#79747e]">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string
  description: string
  time: string
}) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-[#49454f]">{description}</p>
        </div>
        <span className="text-xs text-[#79747e]">{time}</span>
      </div>
    </div>
  )
}

