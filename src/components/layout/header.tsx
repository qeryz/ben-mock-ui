import { Button } from "@/components/ui/button";

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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          📌
        </Button>
        <Button variant="ghost" size="icon">
          🔗
        </Button>
        <Button variant="ghost" size="icon">
          📎
        </Button>
        <Button variant="ghost" size="icon">
          🔤
        </Button>
        {actions}
      </div>
    </div>
  );
}
