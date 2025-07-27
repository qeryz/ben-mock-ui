interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-none tracking-tighter">
          {title}
        </h1>
      </div>
    </div>
  );
}
