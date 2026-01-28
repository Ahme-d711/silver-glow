"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas";

interface LoginFormProps {
  login: (phone: string, password: string) => Promise<void>;
  loading: boolean;
}

export function LoginForm({ login, loading }: LoginFormProps) {
  const t = useTranslations("Auth");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      await login(data.phone, data.password);
      toast.success(t("login_success") || "Login successful!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login";
      toast.error(errorMessage);
      form.setError("root", { message: errorMessage });
    }
  }

  return (
    <div className="w-full space-y-8 max-w-xl mx-auto">
      <div>
        <h2 className="text-[40px] font-bold text-primary">
          {t("login")}
        </h2>
        <p className="font-medium text-primary/60">{t("sign_in_text")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <UniInput
            control={form.control}
            name="phone"
            label={t("phone")}
            placeholder=""
            type="tel"
            autoComplete="tel"
          />

          <UniInput
            control={form.control}
            name="password"
            label={t("password")}
            placeholder=""
            type="password"
            autoComplete="current-password"
          />

          <div className="">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary"
            >
              {t("forgot_password")}
            </Link>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white" disabled={loading}>
            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t("submit")}
          </Button>

          <div className="text-center pt-2">
            <p className="text-sm font-medium text-primary/60">
              {t("dont_have_account")}{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                {t("sign_up")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
