"use client";

import { useGroupStore } from "@/stores/use-groups";
import { GroupCard } from "./group-card";
import { useState } from "react";

export function GroupGrid() {
  const { groups } = useGroupStore();
  const [filter, setFilter] = useState<
    "all" | "active" | "pending" | "open_enrollment"
  >("all");

  const filteredGroups =
    filter === "all"
      ? groups
      : groups.filter((group) => group.status === filter);

  const activeGroups = groups.filter((g) => g.status === "active");
  const pendingGroups = groups.filter((g) => g.status === "pending");
  const openEnrollmentGroups = groups.filter(
    (g) => g.status === "open_enrollment"
  );

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div
        className="flex gap-4 mb-6"
        role="tablist"
        aria-label="Filter groups"
      >
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "all"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          role="tab"
          aria-selected={filter === "all"}
          aria-controls="groups-content"
          aria-label={`Show all groups (${groups.length} groups)`}
        >
          All Groups ({groups.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "active"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          role="tab"
          aria-selected={filter === "active"}
          aria-controls="groups-content"
          aria-label={`Show active groups (${activeGroups.length} groups)`}
        >
          Active ({activeGroups.length})
        </button>
        <button
          onClick={() => setFilter("open_enrollment")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "open_enrollment"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          role="tab"
          aria-selected={filter === "open_enrollment"}
          aria-controls="groups-content"
          aria-label={`Show open enrollment groups (${openEnrollmentGroups.length} groups)`}
        >
          Open Enrollment ({openEnrollmentGroups.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "pending"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          role="tab"
          aria-selected={filter === "pending"}
          aria-controls="groups-content"
          aria-label={`Show pending groups (${pendingGroups.length} groups)`}
        >
          Pending ({pendingGroups.length})
        </button>
      </div>

      {/* Groups Grid */}
      <div
        id="groups-content"
        role="tabpanel"
        aria-label="Filtered groups"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-8 text-gray-500">No groups found.</div>
      )}
    </div>
  );
}
