import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { securitySchema, SecurityFormValues } from "../schemas/securitySchema";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";

export interface SecuritySettingsHandle {
  submit: () => Promise<void>;
}

export const SecuritySettings = forwardRef<SecuritySettingsHandle>((_, ref) => {
  const t = useTranslations("Dashboard");
  const { submitChangePassword } = useChangePassword();

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema) as any,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SecurityFormValues) => {
    try {
      await submitChangePassword(data);
      form.reset();
    } catch (error) {
      // Error handled in hook toast
    }
  };

  useImperativeHandle(ref, () => ({
    submit: form.handleSubmit(onSubmit),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-8 rounded-[24px] border border-divider shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/5 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">Security Settings</h3>
              <p className="text-sm text-content-secondary">
                Update your account password to keep your account secure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniInput
              control={form.control}
              name="currentPassword"
              label="Current Password"
              placeholder="••••••••"
              type="password"
              className="md:col-span-2"
            />

            <UniInput
              control={form.control}
              name="newPassword"
              label="New Password"
              placeholder="••••••••"
              type="password"
            />

            <UniInput
              control={form.control}
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>
      </form>
    </Form>
  );
});

SecuritySettings.displayName = "SecuritySettings";
