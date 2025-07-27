import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface NewsItem {
  title: string
  description: string
  date: Date
}

interface WhatsNewProps {
  news: NewsItem[]
}

export function WhatsNew({ news }: WhatsNewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What's new</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-xs text-gray-500">{formatDate(item.date)}</div>
            <h4 className="font-medium text-sm">{item.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
