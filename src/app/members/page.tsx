"use client";

import { MemberGrid } from "@/components/features/member-grid";
import { Loading } from "@/components/ui/loading";
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";

export default function MembersPage() {
  const { users, loading, fetchUsers } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users.length, fetchUsers]);

  if (loading) {
    return <Loading message="Loading members..." />;
  }

  return <MemberGrid />;
}
