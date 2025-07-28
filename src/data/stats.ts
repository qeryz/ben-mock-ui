import { Stats } from "@/types";

export interface IconConfig {
  src: string;
  alt: string;
  size?: number;
}

export interface StatConfig {
  title: string;
  key: keyof Stats;
  unit: string;
  icons?: IconConfig[];
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
    icons: [
      {
        src: "/icons/carriers/ameritas-logo.jpg",
        alt: "Ameritas Logo",
        size: 24,
      },
      {
        src: "/beam-logo.jpg",
        alt: "Beam Logo",
        size: 24,
      },
      {
        src: "/icons/carriers/guardian-logo.png",
        alt: "Guardian Logo",
        size: 24,
      },
      {
        src: "/icons/carriers/principal-logo.png",
        alt: "Principal Logo",
        size: 24,
      },
    ],
  },
];
