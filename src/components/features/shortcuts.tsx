import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Shortcut } from "@/data";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShortcutsProps {
  shortcuts: Shortcut[];
}

export function Shortcuts({ shortcuts }: ShortcutsProps) {
  return (
    <div>
      <CardHeader>
        <CardTitle>Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        {shortcuts.map((shortcut, index) => {
          const IconComponent = shortcut.icon;
          const isLast = index === shortcuts.length - 1;

          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-between h-auto p-3 hover:bg-gray-50",
                !isLast && "border-b-2 border-slate-100"
              )}
              aria-label={`${shortcut.title}${
                shortcut.count !== undefined ? ` (${shortcut.count})` : ""
              }`}
              title={shortcut.title}
            >
              <div className="flex items-center justify-between w-full cursor-pointer">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-6 rounded-xl flex items-center justify-center",
                      shortcut.color || "bg-transparent"
                    )}
                  >
                    {shortcut.count !== undefined ? (
                      <span
                        className={cn(
                          "text-xs px-2 py-1 text-slate-600 font-semibold"
                        )}
                      >
                        {shortcut.count}
                      </span>
                    ) : (
                      <IconComponent
                        className="w-4 h-4 text-gray-700"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {shortcut.title}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </Button>
          );
        })}
      </CardContent>
    </div>
  );
}
