"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { useCarrierStore } from "@/stores/use-carriers";
import { useGroupStore } from "@/stores/use-groups";
import type { Stats } from "@/types";

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const { users, fetchUsers } = useUserStore();
  const { carriers, fetchCarriers } = useCarrierStore();
  const { groups, fetchGroups } = useGroupStore();

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        await Promise.all([fetchUsers(), fetchCarriers(), fetchGroups()]);
      } catch (error) {
        console.error("Error loading stats data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [fetchUsers, fetchCarriers, fetchGroups]);

  useEffect(() => {
    // Update stats when data changes
    if (users.length > 0 || carriers.length > 0 || groups.length > 0) {
      setStats({
        members: users.length * 1000, // Scale up for demo
        groups: groups.length * 420, // Scale up for demo
        carriers: carriers.length,
        openDiscrepancies: 89,
        groupConnectionRequests: 24,
        badCarrierConnections: 0,
      });
    }
  }, [users.length, carriers.length, groups.length]);

  return { stats, loading };
}
