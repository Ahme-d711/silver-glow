"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { User, LogOut, ChevronDown, Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";

export function UserMenu() {
  const { user } = useAuthStore();
  const t = useTranslations("Navigation");
  const tAuth = useTranslations("Auth");
  const { logout } = useLogout();
  const [imageError, setImageError] = useState(false);
  
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const userName = user?.name || tAuth("user_fallback");
  const userPhoto = getImageUrl(user?.picture);
  const userInitial = userName.charAt(0).toUpperCase();

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <User className="h-5 w-5" />
        <span className="hidden lg:inline">{t("log_in")} / {t("create_account")}</span>
      </Link>
    );
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none cursor-pointer">
            <Avatar className="h-8 w-8 border border-white/20">
              {!imageError && userPhoto ? (
                <AvatarImage
                  src={userPhoto}
                  alt={userName}
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : null}
              <AvatarFallback className="bg-primary text-white text-xs">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:inline text-sm font-medium truncate max-w-[100px]">
              {userName}
            </span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 mt-2 mr-4" align="end">
          <div className="flex flex-col gap-1">
            <Link href="/profile" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer h-9 px-2"
              >
                <div className="h-4 w-4 mr-2 rounded-full overflow-hidden shrink-0 border border-primary/10">
                  <Image 
                    src={getImageUrl(user?.picture) || "/logo.svg"} 
                    alt="Profile" 
                    width={16} 
                    height={16} 
                    className="object-cover h-full w-full" 
                  />
                </div>
                {t("profile")}
              </Button>
            </Link>
            {user?.role === "admin" && (
              <Link href="/dashboard" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start cursor-pointer h-9 px-2"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t("dashboard")}
                </Button>
              </Link>
            )}
            <Link href="/orders" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer h-9 px-2"
              >
                <Package className="h-4 w-4 mr-2" />
                {t("my_orders")}
              </Button>
            </Link>
            <Button
              onClick={() => setConfirmDialogOpen(true)}
              variant="ghost"
              className="w-full justify-start cursor-pointer h-9 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
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
