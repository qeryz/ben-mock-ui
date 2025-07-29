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
  const handleClick = (title: string) => {
    window.location.href = `/${title.toLowerCase()}`;
  };

  return (
    <Card
      className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      onClick={() => handleClick(title)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"></CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{formatNumber(value)}</div>
            <p className="text-xs text-muted-foreground">{unit}</p>
          </div>
          {icons && (
            <div className="flex flex-wrap gap-1 max-w-[120px] justify-end">
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
        </div>
      </CardContent>
    </Card>
  );
}
