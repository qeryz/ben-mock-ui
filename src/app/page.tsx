"use client";

import { StatsCard } from "@/components/features/stats-card";
import { Shortcuts } from "@/components/features/shortcuts";
import { WhatsNew } from "@/components/features/whats-new";
import { Loading } from "@/components/ui/loading";
import { useStats } from "@/hooks/use-stats";
import { shortcuts, news, statsConfig } from "@/data";

export default function HomePage() {
  const { stats, loading } = useStats();

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <>
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
    </>
  );
}
