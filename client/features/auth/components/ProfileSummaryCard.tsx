"use client";

import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileSummaryCardProps {
  userName: string;
  userEmail?: string;
  userPhoto: string | null;
  userInitial: string;
  totalOrders: number;
  walletBalance: number;
  imageError: boolean;
  onImageError: () => void;
  onAvatarClick: () => void;
}

export function ProfileSummaryCard({
  userName,
  userEmail,
  userPhoto,
  userInitial,
  totalOrders,
  walletBalance,
  imageError,
  onImageError,
  onAvatarClick,
}: ProfileSummaryCardProps) {
  const t = useTranslations("Auth");

  return (
    <Card className="bg-white border-slate-200 shadow-xl text-slate-900 border-none overflow-hidden">
      <div className="h-1.5 bg-linear-to-r from-primary/80 to-primary" />
      <CardContent className="pt-10 pb-10 flex flex-col items-center">
        <div className="relative group mb-6">
          <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-xl">
            {!imageError && userPhoto ? (
              <AvatarImage
                src={userPhoto}
                alt={userName}
                className="object-cover"
                onError={onImageError}
              />
            ) : null}
            <AvatarFallback className="bg-primary/5 text-primary font-bold text-4xl">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={onAvatarClick}
            className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-1 text-primary">{userName}</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">{userEmail}</p>

        <div className="w-full pt-6 border-t border-slate-100 flex justify-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{totalOrders}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              {t("orders")}
            </p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{walletBalance}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              {t("wallet")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
