"use client";

import { useCarrierStore } from "@/stores/use-carriers";
import { CarrierCard } from "./carrier-card";
import { useState } from "react";

export function CarrierGrid() {
  const { carriers } = useCarrierStore();
  const [filter, setFilter] = useState<"all" | "live" | "available">("all");

  // Mock additional carriers to match the image
  const mockAdditionalCarriers = [
    {
      id: 5,
      name: "Unum",
      slug: "unum",
      status: "inactive" as const,
      logo: "/icons/carriers/unum-logo.png",
      description: "Leading disability insurance provider",
      website: "https://unum.com",
      supportEmail: "support@unum.com",
      apiVersion: "v2.4",
      connectionStatus: "connected" as const,
      lastSync: new Date(Date.now() - 1 * 60 * 60 * 1000),
      totalMembers: 19000,
      totalGroups: 19,
      features: ["Dental", "Vision", "Life", "+4"],
      syncStatus: "Sync",
    },
    {
      id: 6,
      name: "VSP Vision Care",
      slug: "vsp",
      status: "inactive" as const,
      logo: "/icons/carriers/vsp-logo.jpg",
      description: "Vision care benefits provider",
      website: "https://vsp.com",
      supportEmail: "support@vsp.com",
      apiVersion: "v1.8",
      connectionStatus: "disconnected" as const,
      lastSync: new Date(Date.now() - 48 * 60 * 60 * 1000),
      totalMembers: 0,
      totalGroups: 0,
      features: ["Vision"],
      syncStatus: "Send",
    },
    {
      id: 7,
      name: "Aetna",
      slug: "aetna",
      status: "pending" as const,
      logo: "/icons/carriers/aetna-logo.jpg",
      description: "Comprehensive health benefits",
      website: "https://aetna.com",
      supportEmail: "support@aetna.com",
      apiVersion: "v3.1",
      connectionStatus: "disconnected" as const,
      lastSync: new Date(Date.now() - 72 * 60 * 60 * 1000),
      totalMembers: 0,
      totalGroups: 0,
      features: ["Medical", "Dental", "Vision"],
      syncStatus: "Send",
      category: "Snapshot",
    },
    {
      id: 8,
      name: "Blue 20/20",
      slug: "blue2020",
      status: "pending" as const,
      logo: "/icons/carriers/blue2020-logo.jpg",
      description: "Vision insurance solutions",
      website: "https://blue2020.com",
      supportEmail: "support@blue2020.com",
      apiVersion: "v2.0",
      connectionStatus: "disconnected" as const,
      lastSync: new Date(Date.now() - 96 * 60 * 60 * 1000),
      totalMembers: 0,
      totalGroups: 0,
      features: ["Vision"],
      syncStatus: "Send",
      category: "Snapshot",
    },
  ];

  const allCarriers = [...carriers, ...mockAdditionalCarriers];

  const liveCarriers = allCarriers.filter(
    (c) => c.connectionStatus === "connected"
  );
  const availableCarriers = allCarriers.filter(
    (c) => c.connectionStatus === "disconnected"
  );

  const filteredCarriers =
    filter === "live"
      ? liveCarriers
      : filter === "available"
      ? availableCarriers
      : allCarriers;

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "all"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Carriers
        </button>
        <button
          onClick={() => setFilter("live")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "live"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Live ({liveCarriers.length})
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "available"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Available ({availableCarriers.length})
        </button>
      </div>

      {/* Live Section */}
      {(filter === "all" || filter === "live") && liveCarriers.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {liveCarriers.map((carrier) => (
              <CarrierCard key={carrier.id} carrier={carrier} />
            ))}
          </div>
        </div>
      )}

      {/* Available Section */}
      {(filter === "all" || filter === "available") &&
        availableCarriers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableCarriers.map((carrier) => (
                <CarrierCard key={carrier.id} carrier={carrier} />
              ))}
            </div>
          </div>
        )}

      {filteredCarriers.length === 0 && (
        <div className="text-center py-8 text-gray-500">No carriers found.</div>
      )}
    </div>
  );
}
