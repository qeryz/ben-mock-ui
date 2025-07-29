import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  LinkIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export function UserControls({ actions }: { actions?: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1"
      role="toolbar"
      aria-label="User controls"
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Bookmark this page"
        title="Bookmark"
      >
        <BookmarkIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Copy link to this page"
        title="Copy link"
      >
        <LinkIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Hide sensitive information"
        title="Hide sensitive info"
      >
        <EyeSlashIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="ml-4 bg-gray-200 hover:bg-gray-300 rounded-full"
        aria-label="User account menu"
        title="Account menu"
      >
        <span aria-hidden="true">AA</span>
      </Button>
      {actions}
    </div>
  );
}
