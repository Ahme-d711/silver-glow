"use client";

import { Link, usePathname } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";

interface NavItem {
  titleKey: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    titleKey: "overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    titleKey: "advertisements",
    href: "/dashboard/ads",
    icon: Megaphone,
  },
  {
    titleKey: "users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    titleKey: "products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    titleKey: "categories",
    href: "/dashboard/categories",
    icon: Layers,
  },
  {
    titleKey: "subcategories",
    href: "/dashboard/subcategories",
    icon: Tag,
  },
  {
    titleKey: "orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    titleKey: "settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-x border-divider bg-white sticky top-0">
    <h1 className="text-lg font-bold text-primary px-6 py-4">{t("title")}</h1>
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
                  ? "bg-secondary text-primary border-l-4 border-primary rtl:border-l-0 rtl:border-r-4"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <span className="text-base">{t(item.titleKey)}</span>
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


