import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  title: string;
  description: string;
  date: Date;
}

interface WhatsNewProps {
  news: NewsItem[];
}

export function WhatsNew({ news }: WhatsNewProps) {
  return (
    <div>
      <CardHeader>
        <CardTitle>What's new</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-100 rounded-xl p-4 pr-12">
          {news.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="text-xs text-gray-500 font-semibold">
                {formatDate(item.date)}
              </div>
              <h4 className="font-semibold text-sm text-slate-600">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
