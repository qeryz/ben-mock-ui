import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { User } from "@/stores/user-store";

interface MemberCardProps {
  user: User;
}

export function MemberCard({ user }: MemberCardProps) {
  return (
    <Link
      href={`/members/${user.id}`}
      aria-label={`View details for ${user.name} (${user.email})`}
      title={`View details for ${user.name}`}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">@{user.username}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.phone}</span>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <div>{user.company.name}</div>
              <div className="truncate">
                {user.address.city}, {user.address.zipcode}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
