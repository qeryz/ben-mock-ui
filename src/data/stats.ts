import { Stats } from "@/types";

export interface StatConfig {
  title: string;
  key: keyof Stats;
  unit: string;
  icons?: string[];
}

export const statsConfig: StatConfig[] = [
  {
    title: "Members",
    key: "members",
    unit: "Members",
  },
  {
    title: "Groups",
    key: "groups",
    unit: "Groups",
  },
  {
    title: "Carriers",
    key: "carriers",
    unit: "Carriers",
    icons: ["🏥", "🏢", "📱", "🌐"],
  },
];
