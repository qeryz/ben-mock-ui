"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: "🏠", active: true },
    { name: "Members", href: "/members", icon: "👥" },
    { name: "Groups", href: "/groups", icon: "👨‍👩‍👧‍👦" },
    { name: "Carriers", href: "/carriers", icon: "📡" },
    { name: "Developer", href: "/developer", icon: "💻" },
  ]

  const savedItems = [
    { name: "Chance Thornkins", type: "user" },
    { name: "Rachel O'Neil", type: "user" },
    { name: "William Forte", type: "user" },
    { name: "Luis Cardosa", type: "user" },
    { name: "Julep", type: "group" },
    { name: "Snapshot f0e12b", type: "snapshot" },
    { name: "Custom view", type: "view" },
  ]

  return (
    <div className={cn("flex h-screen bg-gradient-to-b from-pink-200 via-purple-200 via-40% to-purple-100 to-50%", className)}>
      <div className={cn(
        "bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300",
        collapsed ? "w-16" : "w-80"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <Input
                  placeholder="Search for members or groups"
                  className="bg-white/20 border-white/30 text-gray-700 placeholder:text-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-white/20 text-gray-800"
                    : "text-gray-600 hover:bg-white/10 hover:text-gray-800"
                )}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          {!collapsed && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Saved</h3>
              <div className="space-y-1">
                {savedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-white/10 rounded-lg cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      {item.type === "user" && "👤"}
                      {item.type === "group" && "📁"}
                      {item.type === "snapshot" && "📷"}
                      {item.type === "view" && "👁️"}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapse button */}
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-gray-800"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>
      </div>
    </div>
  )
}
