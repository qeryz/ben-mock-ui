"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/features/stats-card"
import { Shortcuts } from "@/components/features/shortcuts"
import { WhatsNew } from "@/components/features/whats-new"
import { useStats } from "@/hooks/use-stats"

export default function Home() {
  const { stats, loading } = useStats()

  const shortcuts = [
    { title: "Open discrepancies", count: 89, icon: "→", color: "bg-orange-500" },
    { title: "Groups in open enrollment", count: 166, icon: "→", color: "bg-blue-500" },
    { title: "Group connection requests", count: 24, icon: "→", color: "bg-green-500" },
    { title: "Bad carrier connections", count: 0, icon: "→", color: "bg-gray-500" },
    { title: "Search for anything", icon: "🔍" },
    { title: "Get support", icon: "❓" },
    { title: "Give feedback", icon: "💬" },
  ]

  const news = [
    {
      title: "The Carrier Page",
      description: "Check out available carriers on the Noyo network, who's coming soon. Get the specs for your build - carrier IDs, config notes, etc.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ]

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Home" />
        
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Members"
              value={stats?.members || 0}
              unit="Members"
            />
            <StatsCard
              title="Groups"
              value={stats?.groups || 0}
              unit="Groups"
            />
            <StatsCard
              title="Carriers"
              value={stats?.carriers || 0}
              unit="Carriers"
              icons={["🏥", "🏢", "📱", "🌐"]}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Shortcuts shortcuts={shortcuts} />
            <WhatsNew news={news} />
          </div>
        </div>
      </div>
    </div>
  )
}
