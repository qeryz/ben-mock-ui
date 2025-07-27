import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  unit: string
  icons?: string[]
}

export function StatsCard({ title, value, unit, icons }: StatsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{formatNumber(value)}</div>
            <p className="text-xs text-gray-600">{unit}</p>
          </div>
          {icons && (
            <div className="flex gap-1">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm"
                >
                  {icon}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
