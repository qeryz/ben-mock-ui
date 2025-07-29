"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { Loading } from "@/components/ui/loading";
import { MemberDetail } from "@/components/features/member-detail";
import { useEffect } from "react";

export default function MemberDetailPage() {
  const params = useParams();
  const { users, loading, fetchUsers } = useUserStore();

  const memberId = Number(params.id);
  const member = users.find((user) => user.id === memberId);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users.length, fetchUsers]);

  if (loading) {
    return <Loading message="Loading member details..." />;
  }

  if (!member) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Member Not Found
        </h2>
        <p className="text-gray-600">
          The member you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return <MemberDetail member={member} />;
}
