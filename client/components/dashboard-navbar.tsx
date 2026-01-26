"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { LogOut, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { useAuthStore } from "@/features/dashboard/auth/stores/authStore";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SearchInput } from "./shared/SearchInput";
import { useLogout } from "@/features/dashboard/auth/hooks/useLogout";
import { ConfirmationDialog } from "./shared/ConfirmationDialog";
import LanguageSelector from "./shared/LanguageSelector";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/image.utils";

export function DashboardNavbar() {
  const { user } = useAuthStore();
  const t = useTranslations("Navigation");
  const tAuth = useTranslations("Auth");
  
  const { logout, loading: isLoggingOut } = useLogout();
  console.log(user);

  const userName = user?.name || "Ahmed Elgedawy";
  const userPhoto = getImageUrl(user?.picture);
  const userInitial = userName?.charAt(0).toUpperCase() || "M";
  const userRole = user?.role === "admin" ? "Admin" : "Admin"; // Simplified for now
  const [imageError, setImageError] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const userId = (user && (user._id || user.id)) as string | undefined;

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    if (isLoggingOut) return;
    await logout();
  };

  return (
    <nav className="w-full relative z-50 overflow-visible!">
      <Card className="flex items-center justify-between border-none bg-transparent py-0 flex-row p-0 shadow-none overflow-visible!">
        {/* Left Side: Search */}
        <SearchInput className="w-full" />

        {/* Right Side: Notifications & Profile */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="h-8 w-px bg-divider mx-2" />
          {/* User Profile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-auto p-1 hover:bg-transparent group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary/20 transition-all">
                      {!imageError && userPhoto ? (
                        <AvatarImage
                          src={userPhoto}
                          alt={userName}
                          className="object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-border bg-success" />
                  </div>
                  
                  <div className="hidden sm:flex flex-col items-start gap-0.5">
                    <span className="text-sm font-semibold text-content-primary leading-tight">
                      {userName}
                    </span>
                    <span className="text-xs font-medium text-content-secondary">
                      {userRole}
                    </span>
                  </div>
                  
                  <ChevronDown className="h-4 w-4 text-content-secondary group-hover:text-primary transition-colors" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 mt-2 border-divider" align="end">
              <div className="flex flex-col gap-2">
              <Link href={`/dashboard/users/${userId}`}>
                <Button
                  variant="outline"
                  className="w-full justify-start cursor-pointer"
                >
                  <User className="h-4 w-4 mr-2" />
                  {tAuth("profile")}
                </Button>
                  </Link>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full justify-start cursor-pointer"
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                   {t("logout")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title={t("logout")}
        description={tAuth("sign_in_text")}
        confirmText={t("logout")}
        variant="default"
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </nav>
  );
}

