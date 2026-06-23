"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { ProfileSummaryCard } from "./ProfileSummaryCard";
import { ProfileEditForm } from "./ProfileEditForm";

export function ProfileContent() {
  const tNav = useTranslations("Navigation");
  const {
    user,
    fileInputRef,
    name,
    email,
    userName,
    userPhoto,
    userInitial,
    totalOrders,
    walletBalance,
    imageError,
    isLoading,
    setName,
    setImageError,
    handleImageChange,
    openFilePicker,
    handleSave,
  } = useUpdateProfile();

  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors w-fit font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        {tNav("back_home")}
      </Link>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ProfileSummaryCard
            userName={userName}
            userEmail={email}
            userPhoto={userPhoto}
            userInitial={userInitial}
            totalOrders={totalOrders}
            walletBalance={walletBalance}
            imageError={imageError}
            onImageError={() => setImageError(true)}
            onAvatarClick={openFilePicker}
          />
        </div>

        <div className="lg:col-span-2">
          <ProfileEditForm
            name={name}
            phone={user?.phone || ""}
            email={email}
            isLoading={isLoading}
            onNameChange={setName}
            onSubmit={handleSave}
          />
        </div>
      </div>
    </>
  );
}
