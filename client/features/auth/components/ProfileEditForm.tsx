"use client";

import { User, Phone, Mail, Save, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChangePhoneForm } from "./ChangePhoneForm";

interface ProfileEditFormProps {
  name: string;
  phone: string;
  email: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileEditForm({
  name,
  phone,
  email,
  isLoading,
  onNameChange,
  onSubmit,
}: ProfileEditFormProps) {
  const t = useTranslations("Auth");
  const displayPhone = phone ? `+${phone.replace(/^\+/, "")}` : "—";

  return (
    <Card className="bg-white border-none shadow-xl overflow-hidden">
      <div className="h-1.5 bg-linear-to-r from-primary/80 to-primary" />
      <CardHeader className="pb-2 pt-8 px-8">
        <CardTitle className="text-2xl text-primary font-bold">{t("edit_profile")}</CardTitle>
        <CardDescription className="text-slate-500">{t("edit_profile_desc")}</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-600 font-medium ms-1">
                {t("full_name")}
              </Label>
              <div className="relative">
                <User className="absolute start-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="ps-10 h-12 border-slate-200 focus:border-primary/30 focus:ring-primary/10 rounded-xl bg-slate-50/50"
                  placeholder={t("name_placeholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-600 font-medium ms-1">
                {t("phone_readonly")}
              </Label>
              <div className="relative opacity-80">
                <Phone className="absolute start-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <Input
                  id="phone"
                  value={displayPhone}
                  readOnly
                  dir="ltr"
                  className="ps-10 h-12 bg-slate-100/50 border-slate-200 cursor-not-allowed rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600 font-medium ms-1">
              {t("email_address_readonly")}
            </Label>
            <div className="relative opacity-80">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <Input
                id="email"
                value={email}
                readOnly
                className="ps-10 h-12 bg-slate-100/50 border-slate-200 cursor-not-allowed rounded-xl"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-10 h-12 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 me-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 me-2" />
              )}
              {t("save_changes")}
            </Button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 md:p-6">
          <ChangePhoneForm variant="profile" />
        </div>
      </CardContent>
    </Card>
  );
}

