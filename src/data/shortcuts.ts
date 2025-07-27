import {
  ExclamationTriangleIcon,
  UserGroupIcon,
  LinkIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export interface Shortcut {
  title: string;
  count?: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  href?: string;
}

export const shortcuts: Shortcut[] = [
  {
    title: "Open discrepancies",
    count: 89,
    icon: ExclamationTriangleIcon,
    color: "bg-yellow-100",
    href: "/discrepancies",
  },
  {
    title: "Groups in open enrollment",
    count: 166,
    icon: UserGroupIcon,
    color: "bg-yellow-100",
    href: "/groups/enrollment",
  },
  {
    title: "Group connection requests",
    count: 24,
    icon: LinkIcon,
    color: "bg-yellow-100",
    href: "/groups/requests",
  },
  {
    title: "Bad carrier connections",
    count: 0,
    icon: XCircleIcon,
    color: "bg-green-100",
    href: "/carriers/connections",
  },
  {
    title: "Search for anything",
    icon: MagnifyingGlassIcon,
    href: "/search",
  },
  {
    title: "Get support",
    icon: QuestionMarkCircleIcon,
    href: "/support",
  },
  {
    title: "Give feedback",
    icon: ChatBubbleLeftRightIcon,
    href: "/feedback",
  },
];
