import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import type { IconConfig } from "@/data/stats";

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icons?: IconConfig[];
}

export function StatsCard({ title, value, unit, icons }: StatsCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icons && (
          <div className="flex space-x-1">
            {icons.map((icon, index) => (
              <Image
                key={index}
                src={icon.src}
                alt={icon.alt}
                width={icon.size || 20}
                height={icon.size || 20}
                className="rounded-sm"
              />
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatNumber(value)}</div>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  );
}
