"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  ShoppingCart,
  Settings,
  Sun,
  Moon,
  Package,
  Layers,
  Tag,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Advertisements",
    href: "/dashboard/ads",
    icon: Megaphone,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: Layers,
  },
  {
    title: "SubCategories",
    href: "/dashboard/subcategories",
    icon: Tag,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-divider bg-white sticky top-0">
    <h1 className="text-lg font-bold text-primary px-6 py-4">Dashboard</h1>
      {/* Navigation Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 relative",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}
              
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <span className="text-base">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-6">
        <div className="flex w-fit items-center gap-1 rounded-lg border border-divider p-1">
          <button
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              "bg-primary text-white shadow-sm" // Active state for Light (as per image)
            )}
          >
            <Sun className="h-4 w-4" />
          </button>
          <button
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              "text-gray-400 hover:bg-gray-50"
            )}
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

