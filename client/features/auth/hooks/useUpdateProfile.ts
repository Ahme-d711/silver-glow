"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { updateProfile } from "@/features/auth/actions/auth.service";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function useUpdateProfile() {
  const { user, setUser } = useAuthStore();
  const t = useTranslations("Auth");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [imageError, setImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const userName = user?.name || t("user_fallback");
  const userPhoto = previewUrl || getImageUrl(user?.picture);
  const userInitial = (user?.name || "U").charAt(0).toUpperCase();
  const totalOrders = user?.totalOrders ?? 0;
  const walletBalance = user?.totalBalance ?? user?.walletBalance ?? 0;

  useEffect(() => {
    if (user && !isInitialized) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  useEffect(() => {
    setImageError(false);
  }, [userPhoto]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(t("file_too_large"));
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setImageError(false);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error(t("name_required"));
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (phone) formData.append("phone", phone);
      if (selectedImage) formData.append("picture", selectedImage);

      const res = await updateProfile(formData);

      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setSelectedImage(null);
        setPreviewUrl(null);
        toast.success(res.message || t("profile_update_success"));
      } else {
        toast.error(res.message || t("profile_update_failed"));
      }
    } catch (error) {
      toast.error(t("unexpected_error"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    fileInputRef,
    name,
    phone,
    email: user?.email || "",
    userName,
    userPhoto,
    userInitial,
    totalOrders,
    walletBalance,
    imageError,
    isLoading,
    setName,
    setPhone,
    setImageError,
    handleImageChange,
    openFilePicker,
    handleSave,
  };
}
