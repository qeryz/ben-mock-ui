"use client";

import { GroupGrid } from "@/components/features/group-grid";
import { Loading } from "@/components/ui/loading";
import { useGroupStore } from "@/stores/use-groups";
import { useEffect } from "react";

export default function GroupsPage() {
  const { groups, loading, fetchGroups } = useGroupStore();

  useEffect(() => {
    if (groups.length === 0) {
      fetchGroups();
    }
  }, [groups.length, fetchGroups]);

  if (loading) {
    return <Loading message="Loading groups..." />;
  }

  return <GroupGrid />;
}
