"use client";

import { useUserStore } from "@/stores/user-store";
import { MemberCard } from "./member-card";
import { useState } from "react";

export function MemberGrid() {
  const { users } = useUserStore();
  const [sortBy, setSortBy] = useState<"name" | "email" | "recent">("name");

  const sortedUsers = [...users].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "email":
        return a.email.localeCompare(b.email);
      case "recent":
        return b.id - a.id; // Assuming higher ID = more recent
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "email" | "recent")
            }
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {users.length} members total
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedUsers.map((user) => (
          <MemberCard key={user.id} user={user} />
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">No members found.</div>
      )}
    </div>
  );
}
