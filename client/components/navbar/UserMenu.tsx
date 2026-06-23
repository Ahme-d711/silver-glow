"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import {
  User,
  LogOut,
  ChevronDown,
  Package,
  LayoutDashboard,
  UserCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { cn } from "@/lib/utils";

interface UserMenuItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
}

function UserMenuItem({
  href,
  icon,
  label,
  onClick,
  variant = "default",
}: UserMenuItemProps) {
  const isDestructive = variant === "destructive";

  const content = (
    <div
      className={cn(
        "group/item flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium transition-all duration-200",
        isDestructive
          ? "text-destructive hover:bg-destructive/8"
          : "text-content-primary hover:bg-primary/8 hover:text-primary"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
          isDestructive
            ? "bg-destructive/10 group-hover/item:bg-destructive/15"
            : "bg-primary/8 text-primary group-hover/item:bg-primary/12"
        )}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block w-full text-start">
      {content}
    </button>
  );
}

export function UserMenu() {
  const { user } = useAuthStore();
  const t = useTranslations("Navigation");
  const tAuth = useTranslations("Auth");
  const { logout } = useLogout();
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const userName = user?.name || tAuth("user_fallback");
  const userPhoto = getImageUrl(user?.picture);
  const userInitial = userName.charAt(0).toUpperCase();

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-white/10 transition-all"
      >
        <User className="h-5 w-5" />
        <span className="hidden lg:inline">
          {t("log_in")} / {t("create_account")}
        </span>
      </Link>
    );
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-2 rounded-full ps-1 pe-2.5 py-1 hover:bg-white/10 transition-all outline-none cursor-pointer"
          >
            <Avatar className="h-8 w-8 border-2 border-white/30 shadow-sm ring-2 ring-white/10">
              {!imageError && userPhoto ? (
                <AvatarImage
                  src={userPhoto}
                  alt={userName}
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : null}
              <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:inline text-sm font-medium truncate max-w-[110px]">
              {userName}
            </span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 opacity-70 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-72 p-0 mt-2 rounded-2xl border-divider/60 shadow-xl shadow-primary/10 overflow-hidden"
          align="end"
          sideOffset={10}
        >
          <div className="relative overflow-hidden bg-linear-to-br from-primary/12 via-primary/6 to-transparent px-4 pt-4 pb-3.5">
            <div className="absolute -top-6 -end-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-2 ring-primary/15">
                {!imageError && userPhoto ? (
                  <AvatarImage
                    src={userPhoto}
                    alt={userName}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-start">
                <p className="font-semibold text-content-primary truncate leading-tight">
                  {userName}
                </p>
                {user.email && (
                  <p className="mt-0.5 text-xs text-content-tertiary truncate">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-2">
            <UserMenuItem
              href="/profile"
              icon={<UserCircle2 className="h-4 w-4" />}
              label={t("profile")}
            />
            {user.role === "admin" && (
              <UserMenuItem
                href="/dashboard"
                icon={<LayoutDashboard className="h-4 w-4" />}
                label={t("dashboard")}
              />
            )}
            <UserMenuItem
              href="/orders"
              icon={<Package className="h-4 w-4" />}
              label={t("my_orders")}
            />
          </div>

          <div className="mx-3 h-px bg-divider/80" />

          <div className="p-2">
            <UserMenuItem
              icon={<LogOut className="h-4 w-4" />}
              label={t("logout")}
              variant="destructive"
              onClick={() => {
                setOpen(false);
                setConfirmDialogOpen(true);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title={t("logout_confirm_title")}
        description={t("logout_confirm_desc")}
        confirmText={t("confirm_logout")}
        cancelText={t("cancel")}
        onConfirm={logout}
        variant="destructive"
      />
    </>
  );
}
