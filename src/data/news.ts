export interface NewsItem {
  title: string;
  description: string;
  date: Date;
  href?: string;
}

export const news: NewsItem[] = [
  {
    title: "The Carrier Page",
    description:
      "Check out available carriers on the Noyo network, who's coming soon. Get the specs for your build - carrier IDs, config notes, etc.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    href: "/carriers",
  },
];
