import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuildingOfficeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Group } from "@/stores/use-groups";
import { useCarrierStore } from "@/stores/use-carriers";
import Image from "next/image";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const { getCarrierById } = useCarrierStore();

  const statusColor =
    group.status === "active"
      ? "bg-green-100 text-green-800"
      : group.status === "open_enrollment"
      ? "bg-blue-100 text-blue-800"
      : group.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  const carriers = group.carrierIds
    .map((id) => getCarrierById(id))
    .filter(Boolean);

  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle className="text-sm font-medium text-gray-900 line-clamp-1">
                  {group.name}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  {group.companyName}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className={statusColor}>
              {group.status
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Members */}
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {group.memberCount} members
            </span>
          </div>

          {/* Plan Types */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Plan Types:</p>
            <div className="flex flex-wrap gap-1">
              {group.planTypes.slice(0, 3).map((type) => (
                <span
                  key={type}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {type}
                </span>
              ))}
              {group.planTypes.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{group.planTypes.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Carriers */}
          {carriers.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Carriers:</p>
              <div className="flex gap-1">
                {carriers.slice(0, 4).map((carrier) => (
                  <div
                    key={carrier!.id}
                    className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"
                  >
                    <Image
                      src={carrier!.logo}
                      alt={carrier!.name}
                      width={16}
                      height={16}
                      className="rounded-sm object-contain"
                    />
                  </div>
                ))}
                {carriers.length > 4 && (
                  <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      +{carriers.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Renewal Date */}
          <div className="text-xs text-gray-500">
            Renewal: {group.renewalDate.toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
