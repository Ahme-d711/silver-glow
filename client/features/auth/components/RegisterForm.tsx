"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, User } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniPhoneInput } from "@/components/shared/uni-form/UniPhoneInput";
import { registerSchema, type RegisterFormValues } from "../schemas/authSchemas";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface RegisterFormProps {
  register: (values: RegisterFormValues) => Promise<void>;
  loading: boolean;
}

export function RegisterForm({ register, loading }: RegisterFormProps) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      await register(data);
      toast.success(t("register_success") || "Account created successfully!");
      // Redirect to verification page
      router.push(`/verify?phone=${encodeURIComponent(data.phone)}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-full space-y-8 max-w-xl mx-auto">
      <div className="space-y-3">
        <h2 className="text-5xl font-bold text-primary">
          {t("create_account")}
        </h2>
        <p className="font-medium text-primary/60">{t("sign_up_text")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <UniInput
            control={form.control}
            name="name"
            label={t("full_name")}
            placeholder="ex. John Smith"
          />

          <UniPhoneInput
            control={form.control}
            name="phone"
            label={t("phone")}
            placeholder="123456789"
          />

          <UniInput
            control={form.control}
            name="email"
            label={t("email")}
            placeholder="ahmed@simple.com"
            type="email"
          />

          {/* Gender Selection */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-">
                <FormLabel className="text-content-secondary text-base font-medium">{t("gender")}</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => field.onChange("male")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl border transition-all",
                        field.value === "male" 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-divider bg-transparent text-primary/60 hover:border-primary/50"
                      )}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">{t("male")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("female")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl border transition-all",
                        field.value === "female" 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-divider bg-transparent text-primary/60 hover:border-primary/50"
                      )}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">{t("female")}</span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative">
            <UniInput
              control={form.control}
              name="password"
              label={t("password")}
              placeholder="*******"
              type="password"
            />
          </div>

          <div className="relative">
            <UniInput
              control={form.control}
              name="confirmPassword"
              label={t("confirm_password")}
              placeholder="*******"
              type="password"
            />
          </div>

          <Button type="submit" className="w-full h-14 mt-4 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white" disabled={loading}>
            {t("register_submit")}
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" /> } 
          </Button>

          <div className="text-center">
            <p className="text-sm font-medium text-primary/60">
              {t("already_have_account")}{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">
                {t("sign_in")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
