import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShortcutItem {
  title: string;
  count?: number;
  icon: string;
  color?: string;
}

interface ShortcutsProps {
  shortcuts: ShortcutItem[];
}

export function Shortcuts({ shortcuts }: ShortcutsProps) {
  return (
    <div>
      <CardHeader>
        <CardTitle>Shortcuts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-6 rounded-2xl ${
                  shortcut.color || "bg-gray-200"
                } flex items-center justify-center text-sm`}
              >
                {shortcut.count && (
                  <span className="text-xs font-semibold text-gray-800">
                    {shortcut.count}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">{shortcut.title}</span>
            </div>
            <div className="text-gray-400">{shortcut.icon}</div>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
