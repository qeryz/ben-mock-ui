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
          "bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300 ease-in-out overflow-hidden",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-7 h-7 bg-transparent rounded-xl flex items-center justify-center cursor-pointer"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Image
                src="/noyo-logo.png"
                alt="Company logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out",
                  item.active
                    ? "bg-white/20 text-gray-800"
                    : "text-gray-700 hover:bg-white/10 hover:text-gray-800",
                  collapsed && "justify-center"
                )}
                aria-label={`Navigate to ${item.name}`}
                title={item.name}
                aria-current={item.active ? "page" : undefined}
              >
                <div
                  className="flex items-center text-gray-800"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="transition-opacity duration-200 ease-in-out">
                    {item.name}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {!collapsed && (
            <div className="mt-8 transition-all duration-200 ease-in-out">
              <h3 className="text-sm font-medium text-gray-500 mb-4 transition-opacity duration-200 ease-in-out">
                Saved
              </h3>
              <div className="space-y-1" role="list" aria-label="Saved items">
                {savedItems.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-200 ease-in-out w-full text-left"
                    aria-label={`Open saved item: ${item.name}`}
                    title={`${item.name} (${item.type})`}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.type === "user" && (
                        <UsersIcon className="w-4 h-4 text-gray-500" />
                      )}
                      {item.type === "group" && (
                        <BuildingOfficeIcon className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <span className="transition-opacity duration-200 ease-in-out">
                      {item.name}
                    </span>
                  </button>
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
            className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span
              className="transition-transform duration-200 ease-in-out"
              aria-hidden="true"
            >
              {collapsed ? "→" : "←"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
