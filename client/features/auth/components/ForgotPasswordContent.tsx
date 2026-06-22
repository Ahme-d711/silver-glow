"use client";

import { useSearchParams } from "next/navigation";

import { RequestCodeForm } from "./RequestCodeForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

export function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  if (!phone) {
    return <RequestCodeForm />;
  }

  return <ResetPasswordForm />;
}
