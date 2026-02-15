"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Camera, Save, ArrowLeft, Loader } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateProfile } from "@/features/auth/actions/auth.service";

export default function ProfileTemplate() {
  const { user, setUser } = useAuthStore();
  const t = useTranslations("Auth");
  const tNav = useTranslations("Navigation");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [imageError, setImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const userName = user?.name || "User";
  const userPhoto = previewUrl || getImageUrl(user?.picture);
  const userInitial = userName.charAt(0).toUpperCase();

  // Sync state when user data is loaded from store (handles refresh)
  useEffect(() => {
    if (user && !isInitialized) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("file_too_large") || "Image must be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageError(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t("name_required") || "Name is required");
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
        toast.success(res.message || "Profile updated successfully!");
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors w-fit font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          {tNav("back_home") || "Back to Home"}
        </Link>

        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
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
                        onError={() => setImageError(true)}
                      />
                    ) : null}
                    <AvatarFallback className="bg-primary/5 text-primary font-bold text-4xl">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold mb-1 text-primary">{userName}</h2>
                <p className="text-slate-500 text-sm mb-6 font-medium">{user?.email}</p>
                
                <div className="w-full pt-6 border-t border-slate-100 flex justify-center gap-4">
                   <div className="text-center">
                      <p className="text-lg font-bold text-primary">0</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{t("orders")}</p>
                   </div>
                   <div className="h-8 w-px bg-slate-100" />
                   <div className="text-center">
                      <p className="text-lg font-bold text-primary">0</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{t("wallet")}</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-none shadow-xl overflow-hidden">
              <div className="h-1.5 bg-linear-to-r from-primary/80 to-primary" />
              <CardHeader className="pb-2 pt-8 px-8">
                <CardTitle className="text-2xl text-primary font-bold">{t("edit_profile")}</CardTitle>
                <CardDescription className="text-slate-500">{t("edit_profile_desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-600 font-medium ml-1">{t("full_name")}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <Input 
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 h-12 border-slate-200 focus:border-primary/30 focus:ring-primary/10 rounded-xl bg-slate-50/50" 
                          placeholder={t("name_placeholder")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-600 font-medium ml-1">{t("phone")}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <Input 
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 h-12 border-slate-200 focus:border-primary/30 focus:ring-primary/10 rounded-xl bg-slate-50/50" 
                          placeholder={t("phone_placeholder")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-600 font-medium ml-1">{t("email_address_readonly") || "Email Address (Read-only)"}</Label>
                    <div className="relative opacity-80">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                      <Input 
                        id="email"
                        value={user?.email || ""}
                        readOnly
                        className="pl-10 h-12 bg-slate-100/50 border-slate-200 cursor-not-allowed rounded-xl" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-white px-10 h-12 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-5 w-5 mr-2" />
                      )}
                      {t("save_changes")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
