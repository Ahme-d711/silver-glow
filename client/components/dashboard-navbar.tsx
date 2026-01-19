"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SearchInput } from "./shared/SearchInput";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { ConfirmationDialog } from "./shared/ConfirmationDialog";
import Link from "next/link";

export function DashboardNavbar() {
  const { user } = useAuthStore();
  console.log(user);
  
  const router = useRouter();
  const { logout, loading: isLoggingOut } = useLogout();

  console.log(user);
  

  const userName = user?.name || user?.username || "Ahmed Elgedawy";
  const userPhoto = user?.photo || user?.profileImage;
  const userInitial = userName?.charAt(0).toUpperCase() || "M";
  const userRole = user?.role === "admin" ? "Admin" : "Admin"; // Simplified for now
  const [imageError, setImageError] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const userId = (user && (user._id || user.id)) as string | undefined;

  const handleEditProfile = () => {
    if (!userId) return;
    router.push(`/users/${userId}`);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    if (isLoggingOut) return;
    await logout();
  };

  return (
    <nav className="w-full">
      <Card className="flex items-center justify-between border-none bg-transparent py-0 flex-row p-0 shadow-none">
        {/* Left Side: Search */}
        <SearchInput className="w-full" />

        {/* Right Side: Notifications & Profile */}
        <div className="flex items-center gap-4">
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
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success" />
                  </div>
                  
                  <div className="hidden sm:flex flex-col items-start gap-0.5">
                    <span className="text-sm font-bold text-content-primary leading-tight">
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
              <Link href={`/users/${userId}`}>
                <Button
                  onClick={handleEditProfile}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                  </Link>
                {/* <Button
                  onClick={toggleTheme}
                  variant="outline"
                  className={cn(
                    "w-full justify-start relative transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  )}
                  aria-label="Toggle theme"
                  suppressHydrationWarning
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 mr-2" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 mr-2" />
                  <span className="ml-2">Change Theme</span>
                </Button> */}

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full justify-start"
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                   Logout
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
        title="Logout"
        description="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        variant="default"
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </nav>
  );
}
