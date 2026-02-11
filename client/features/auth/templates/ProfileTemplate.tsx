"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Camera, Save, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function ProfileTemplate() {
  const { user } = useAuthStore();
  const t = useTranslations("Auth");
  const tNav = useTranslations("Navigation");

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [imageError, setImageError] = useState(false);

  const userName = user?.name || "User";
  const userPhoto = getImageUrl(user?.picture);
  const userInitial = userName.charAt(0).toUpperCase();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-primary/95 to-primary/90 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          {tNav("back_home") || "Back to Home"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white">
              <CardContent className="pt-10 pb-10 flex flex-col items-center">
                <div className="relative group mb-6">
                  <Avatar className="h-32 w-32 border-4 border-white/30 shadow-2xl">
                    {!imageError && userPhoto ? (
                      <AvatarImage
                        src={userPhoto}
                        alt={userName}
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : null}
                    <AvatarFallback className="bg-primary-light text-primary font-bold text-4xl">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-white text-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold mb-1">{userName}</h2>
                <p className="text-white/60 text-sm mb-6">{user?.email}</p>
                
                <div className="w-full pt-6 border-t border-white/10 flex justify-center gap-4">
                   <div className="text-center">
                      <p className="text-lg font-bold">0</p>
                      <p className="text-xs text-white/60">Orders</p>
                   </div>
                   <div className="h-8 w-px bg-white/10" />
                   <div className="text-center">
                      <p className="text-lg font-bold">0</p>
                      <p className="text-xs text-white/60">Wallet</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-none shadow-2xl overflow-hidden">
              <div className="h-2 bg-linear-to-r from-primary-light to-primary" />
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-primary">Edit Profile</CardTitle>
                <CardDescription>Update your personal information and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-primary/70">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                        <Input 
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 h-11 border-primary/10 focus:border-primary/30" 
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary/70">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                        <Input 
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 h-11 border-primary/10 focus:border-primary/30" 
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary/70">Email Address (Read-only)</Label>
                    <div className="relative opacity-60">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                      <Input 
                        id="email"
                        value={user?.email || ""}
                        readOnly
                        className="pl-10 h-11 bg-primary/5 border-transparent cursor-not-allowed" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-white px-8 h-11 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
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
