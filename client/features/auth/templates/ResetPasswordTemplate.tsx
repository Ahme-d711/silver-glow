"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas/authSchemas";
import { useResetPassword } from "../hooks/useResetPassword";
import RightSide from "../components/RightSide";
import { AuthFooter } from "../components/AuthFooter";

export function ResetPasswordTemplate() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  
  const { submitResetPassword, loading } = useResetPassword();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: phone,
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordValues) {
    try {
      await submitResetPassword(data);
      toast.success("Password reset successfully!");
    } catch (error) {
       // Error handled in hook
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center min-h-screen w-full relative"
    >
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-xl space-y-8">
          <div>
            <h2 className="text-[40px] font-bold text-primary">
              {t("reset_password")}
            </h2>
            <p className="font-medium text-primary/60">Enter the code sent to your phone and your new password.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <UniInput
                control={form.control}
                name="phone"
                label={t("phone")}
                placeholder=""
                type="tel"
                readOnly
              />

              <UniInput
                control={form.control}
                name="code"
                label={t("verification_code")}
                placeholder="123456"
                type="text"
              />

              <UniInput
                control={form.control}
                name="password"
                label="New Password"
                placeholder=""
                type="password"
              />

              <UniInput
                control={form.control}
                name="confirmPassword"
                label={t("confirm_password")}
                placeholder=""
                type="password"
              />

              <Button type="submit" className="w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white" disabled={loading}>
                Reset Password
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" /> } 
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-sm font-medium text-primary hover:underline">
                  {t("back")}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <RightSide />

      <AuthFooter />
    </motion.div>
  );
}
