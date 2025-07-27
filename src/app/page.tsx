"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/features/stats-card";
import { Shortcuts } from "@/components/features/shortcuts";
import { WhatsNew } from "@/components/features/whats-new";
import { useStats } from "@/hooks/use-stats";
import { shortcuts, news } from "@/data";

export default function Home() {
  const { stats, loading } = useStats();

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
    );
  }

  return (
    <div className="flex h-screen bg-gray-500">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 p-6">
        <Input
          placeholder="Search for members or groups"
          className="bg-white border-black text-gray-700 placeholder:text-gray-400 max-w-100"
        />
        <Header title="Home" />

        <div className="flex-1 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-3">
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
  );
}
