"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SearchInput } from "@/components/ui/search-input";
import { StatsCard } from "@/components/features/stats-card";
import { Shortcuts } from "@/components/features/shortcuts";
import { WhatsNew } from "@/components/features/whats-new";
import { useStats } from "@/hooks/use-stats";
import { shortcuts, news, statsConfig } from "@/data";
import { UserControls } from "@/components/layout/user-controls";
import { User } from "@/types";

export default function Home() {
  const { stats, loading } = useStats();

  const handleUserSelect = (user: User) => {
    console.log("Selected user:", user);
    // Handle user selection (e.g., navigate to user page)
  };
  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-b from-pink-200 via-purple-200 via-40% to-purple-100 to-50%">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden bg-gray-50 p-6 rounded-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-l-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-pink-200 via-purple-200 via-40% to-purple-100 to-50%">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4 flex-col gap-2 md:flex-row">
          <SearchInput
            placeholder="Search for members or groups"
            className="bg-white border-black text-gray-700 placeholder:text-gray-400 min-w-70"
            onUserSelect={handleUserSelect}
          />
          <UserControls />
        </div>

        {/* Header */}
        <Header title="Home" />

        <div className="flex-1 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-3">
            {statsConfig.map((config) => (
              <StatsCard
                key={config.key}
                title={config.title}
                value={stats?.[config.key] || 0}
                unit={config.unit}
                icons={config.icons}
              />
            ))}
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
