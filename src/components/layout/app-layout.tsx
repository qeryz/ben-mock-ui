"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { SearchInput } from "@/components/ui/search-input";
import { UserControls } from "./user-controls";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  const handleUserSelect = (user: any) => {
    // Handle user selection, e.g., navigate to user profile
    window.location.href = `/members/${user.id}`;
  };

  // Get page title based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/carriers":
        return "Carriers";
      case "/groups":
        return "Groups";
      case "/members":
        return "Members";
      case "/developer":
        return "Developer";
      default:
        return "Dashboard";
    }
  };

  const getSearchPlaceholder = () => {
    switch (pathname) {
      case "/carriers":
        return "Search carriers...";
      case "/groups":
        return "Search groups...";
      case "/members":
        return "Search members...";
      default:
        return "Search for members or groups";
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-pink-200 via-purple-200 via-40% to-purple-100 to-50%">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4 flex-col gap-2 md:flex-row">
          <SearchInput
            placeholder={getSearchPlaceholder()}
            className="bg-white border-black text-gray-700 placeholder:text-gray-400 min-w-70"
            onUserSelect={handleUserSelect}
          />
          <UserControls />
        </div>

        <Header title={getPageTitle()} />

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
