"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BuildingOfficeIcon,
  CodeBracketIcon,
  CubeTransparentIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="w-4 h-4" />,
      active: true,
    },
    {
      name: "Members",
      href: "/members",
      icon: <UsersIcon className="w-4 h-4" />,
    },
    {
      name: "Groups",
      href: "/groups",
      icon: <BuildingOfficeIcon className="w-4 h-4" />,
    },
    {
      name: "Carriers",
      href: "/carriers",
      icon: <CubeTransparentIcon className="w-4 h-4" />,
    },
    {
      name: "Developer",
      href: "/developer",
      icon: <CodeBracketIcon className="w-4 h-4" />,
    },
  ];

  const savedItems = [
    { name: "Chance Thornkins", type: "user" },
    { name: "Rachel O'Neil", type: "user" },
    { name: "William Forte", type: "user" },
    { name: "Luis Cardosa", type: "user" },
    { name: "Julep", type: "group" },
    { name: "Snapshot f0e12b", type: "snapshot" },
    { name: "Custom view", type: "view" },
  ];

  return (
    <div
      className={cn(
        "flex h-screen bg-gradient-to-b from-pink-200 via-purple-200 via-40% to-purple-100 to-50%",
        className
      )}
    >
      <div
        className={cn(
          "bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300",
          collapsed ? "w-16" : "w-auto"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-7 h-7 bg-transparent rounded-xl flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/noyo-logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  item.active
                    ? "bg-white/20 text-gray-800"
                    : "text-gray-700 hover:bg-white/10 hover:text-gray-800",
                  collapsed && "justify-center"
                )}
              >
                <div className="flex items-center text-gray-800">
                  {item.icon}
                </div>
                {!collapsed && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          {!collapsed && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Saved</h3>
              <div className="space-y-1">
                {savedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-white/10 rounded-lg cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      {item.type === "user" && (
                        <UsersIcon className="w-4 h-4 text-gray-500" />
                      )}
                      {item.type === "group" && (
                        <BuildingOfficeIcon className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapse button */}
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-gray-800"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>
      </div>
    </div>
  );
}
