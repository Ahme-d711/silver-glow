"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Smartphone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { verifyPhoneSchema, type VerifyPhoneFormValues } from "../schemas/authSchemas";
import { OTPInput } from "./OTPInput";
import { useVerify } from "../hooks/useVerify";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function VerifyForm() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  
  const { verify, resend, loading, resendLoading, countdown, canResend } = useVerify();

  const form = useForm<VerifyPhoneFormValues>({
    resolver: zodResolver(verifyPhoneSchema),
    defaultValues: {
      phone: phone,
      code: "",
    },
  });

  // Sync phone from URL if it changes
  useEffect(() => {
     if (phone && form.getValues("phone") !== phone) {
        form.setValue("phone", phone);
     }
  }, [phone, form]);

  async function onSubmit(data: VerifyPhoneFormValues) {
    try {
      await verify(data.phone, data.code);
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleResend = async () => {
    if (!phone) {
        toast.error(t("phone_missing"));
        return;
    }
    await resend(phone);
  };

  return (
    <div className="w-full space-y-8 max-w-xl mx-auto">
      <div className="text-center md:text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 mb-2 rounded-2xl bg-primary/5 text-primary">
            <Smartphone className="h-10 w-10" />
        </div>
        <h2 className="text-4xl md:text-5xl text-left font-bold text-primary">
          {t("verify_phone")}
        </h2>
        <p className="font-medium text-primary/60 max-w-md">
          {t("verification_instructions")}
          {phone && <span className="block mt-1 font-bold text-primary">{phone}</span>}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button 
                type="submit" 
                className="w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white" 
                disabled={loading || form.watch("code").length < 4}
            >
                {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t("verify")}
            </Button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={!canResend || resendLoading}
                    className="text-sm font-bold text-primary hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
                >
                    {resendLoading ? (
                        <Loader className="h-4 w-4 animate-spin inline mr-2" />
                    ) : null}
                    {canResend 
                        ? t("resend_code") 
                        : t("resend_in", { seconds: countdown })
                    }
                </button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/register" className="text-sm font-medium text-primary/60 hover:text-primary transition-colors">
              {t("back")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
