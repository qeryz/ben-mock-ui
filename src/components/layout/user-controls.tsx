import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  LinkIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export function UserControls({ actions }: { actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon">
        <BookmarkIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon">
        <LinkIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon">
        <EyeSlashIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="ml-4 bg-gray-200 hover:bg-gray-300 rounded-full"
      >
        AA
      </Button>
      {actions}
    </div>
  );
}
