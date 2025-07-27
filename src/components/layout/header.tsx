import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  LinkIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-none tracking-tighter">
          {title}
        </h1>
      </div>
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
    </div>
  );
}
