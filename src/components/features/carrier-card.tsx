import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Carrier } from "@/stores/use-carriers";

interface CarrierCardProps {
  carrier: Carrier & {
    syncStatus?: string;
    category?: string;
  };
}

export function CarrierCard({ carrier }: CarrierCardProps) {
  const isLive = carrier.connectionStatus === "connected";

  const statusColor =
    carrier.status === "active"
      ? "bg-green-100 text-green-800"
      : carrier.status === "inactive"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  const syncColor =
    carrier.syncStatus === "Sync" ? "text-green-600" : "text-gray-500";

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <CardContent className="p-4">
        {/* Header with groups count and status */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {carrier.totalGroups} group{carrier.totalGroups !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className={cn("flex items-center gap-1", syncColor)}>
                <div className="w-2 h-2 rounded-full bg-current"></div>
                <span className="text-xs">{carrier.syncStatus || "Sync"}</span>
              </div>
              <span className="text-xs text-gray-500">
                {carrier.features.slice(0, 3).join(", ")}
                {carrier.features.length > 3 &&
                  `, +${carrier.features.length - 3}`}
              </span>
            </div>
          </div>
          {carrier.status !== "active" && (
            <Badge variant="secondary" className={statusColor}>
              {carrier.status === "inactive" ? "Inactive" : "Active"}
            </Badge>
          )}
        </div>

        {/* Logo and Name */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className="w-16 h-16 mb-3 rounded-lg bg-gray-100 flex items-center justify-center">
            <Image
              src={carrier.logo}
              alt={`${carrier.name} logo`}
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {carrier.name}
          </h3>
        </div>

        {/* Bottom info */}
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {carrier.totalGroups} group{carrier.totalGroups !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className={cn("flex items-center gap-1", syncColor)}>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <span className="text-xs">{carrier.syncStatus || "Sync"}</span>
            </div>
            <span className="text-xs text-gray-500">
              {carrier.features.slice(0, 2).join(", ")}
              {carrier.features.length > 2 &&
                `, +${carrier.features.length - 2}`}
            </span>
          </div>
          {carrier.category && (
            <div className="text-xs text-gray-500 mt-1">{carrier.category}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
