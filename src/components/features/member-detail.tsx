import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BuildingOfficeIcon,
  EyeIcon,
  FaceSmileIcon,
  HeartIcon,
  PlusIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { User } from "@/stores/user-store";
import { useUserStore } from "@/stores/user-store";
import { useCarrierStore } from "@/stores/use-carriers";
import { useEffect } from "react";
import Image from "next/image";

interface MemberDetailProps {
  member: User;
}

// Mock coverage data based on your design
const mockCoverageData = [
  {
    carrierId: 3, // Guardian
    coverages: [
      {
        type: "Vision",
        plan: "Vision Plan",
        status: "active",
        effectiveDate: "Sept 1, 2023",
        syncStatus: "synced Tue",
      },
      {
        type: "Dental",
        plan: "Dental Plan",
        status: "active",
        effectiveDate: "Sept 1, 2023",
        syncStatus: "synced Tue",
      },
      {
        type: "Life",
        plan: "Life Insurance",
        status: "terminated",
        effectiveDate: "",
        syncStatus: "synced Tue",
      },
    ],
  },
  {
    carrierId: 1, // Ameritas
    coverages: [
      {
        type: "Medical",
        plan: "Medical Plan",
        status: "active",
        effectiveDate: "Sept 1, 2023",
        syncStatus: "synced Tue",
      },
    ],
  },
];

export function MemberDetail({ member }: MemberDetailProps) {
  const { users, fetchUsers } = useUserStore();
  const { carriers, fetchCarriers, getCarrierById } = useCarrierStore();

  useEffect(() => {
    if (carriers.length === 0) {
      fetchCarriers();
    }
  }, [carriers.length, fetchCarriers]);

  // Get first 3 users as household members (mock data)
  const householdMembers = users.slice(0, 3).map((user, index) => ({
    ...user,
    relationship: index === 0 ? "Self" : index === 1 ? "Spouse" : "Child",
    initials: user.name
      .split(" ")
      .map((n) => n[0])
      .join(""),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-semibold text-lg">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Employee</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {member.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>36</span>
            <span>Female</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              Hired 3y ago
            </span>
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              Michigan
            </span>
          </div>
        </div>
      </div>

      {/* Group Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {member.company.name}
              </h3>
              <p className="text-sm text-gray-600">Renewal in progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Coverage */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockCoverageData.map((carrierData) => {
                const carrier = getCarrierById(carrierData.carrierId);
                if (!carrier) return null;

                return (
                  <div key={carrierData.carrierId} className="space-y-3">
                    {/* Carrier Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Image
                          src={carrier.logo}
                          alt={carrier.name}
                          width={24}
                          height={24}
                          className="rounded-sm object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {carrier.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {carrierData.coverages[0].syncStatus}
                        </p>
                      </div>
                    </div>

                    {/* Coverage Items */}
                    <div className="ml-11 space-y-2">
                      {carrierData.coverages.map((coverage, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {coverage.type === "Vision" && (
                              <EyeIcon className="w-4 h-4 text-blue-500" />
                            )}
                            {coverage.type === "Dental" && (
                              <FaceSmileIcon className="w-4 h-4 text-blue-500" />
                            )}
                            {coverage.type === "Life" && (
                              <HeartIcon className="w-4 h-4 text-gray-400" />
                            )}
                            {coverage.type === "Medical" && (
                              <PlusIcon className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">
                              {coverage.type}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {coverage.plan}
                              </span>
                              {coverage.status === "active" && (
                                <span className="text-xs text-green-600">
                                  {coverage.effectiveDate}
                                </span>
                              )}
                              {coverage.status === "terminated" && (
                                <span className="text-xs text-gray-400">
                                  Terminated
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Household */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Household</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {householdMembers.map((householdMember, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {householdMember.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {householdMember.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {householdMember.relationship}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
