"use client";

import { LogIn, Sparkles, UserPlus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useLoginRequiredModal,
  type LoginRequiredContext,
} from "../stores/loginRequiredModalStore";
import { cn } from "@/lib/utils";

const contextConfig: Record<
  LoginRequiredContext,
  { titleKey: string; descKey: string; icon: typeof LogIn }
> = {
  checkout: {
    titleKey: "title_checkout",
    descKey: "desc_checkout",
    icon: Sparkles,
  },
  wishlist: {
    titleKey: "title_wishlist",
    descKey: "desc_wishlist",
    icon: Sparkles,
  },
  wallet: {
    titleKey: "title_wallet",
    descKey: "desc_wallet",
    icon: Sparkles,
  },
  review: {
    titleKey: "title_review",
    descKey: "desc_review",
    icon: Sparkles,
  },
  default: {
    titleKey: "title_default",
    descKey: "desc_default",
    icon: LogIn,
  },
};

export function LoginRequiredModal() {
  const t = useTranslations("LoginRequired");
  const { open, context, closeLoginRequired } = useLoginRequiredModal();
  const config = contextConfig[context];
  const Icon = config.icon;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeLoginRequired()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[440px] overflow-hidden border-0 p-0 gap-0 rounded-[28px] shadow-2xl"
      >
        <div className="relative bg-linear-to-br from-[#1a2b4b] via-[#243a66] to-[#1a2b4b] px-8 pt-10 pb-8 text-white">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />

          <button
            onClick={closeLoginRequired}
            className="absolute top-4 end-4 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t("close")}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 shadow-lg">
              <Icon className="h-7 w-7 text-amber-300" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-white">
              {t(config.titleKey)}
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-white/75 max-w-[320px]">
              {t(config.descKey)}
            </DialogDescription>
          </div>
        </div>

        <div className="bg-white px-8 py-7 space-y-3">
          <Button
            asChild
            className="w-full h-12 rounded-2xl bg-[#1a2b4b] hover:bg-[#111d33] text-white font-bold text-base shadow-lg"
            onClick={closeLoginRequired}
          >
            <Link href="/login" className="flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" />
              {t("login")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className={cn(
              "w-full h-12 rounded-2xl border-divider font-semibold text-primary",
              "hover:bg-neutral-50"
            )}
            onClick={closeLoginRequired}
          >
            <Link href="/register" className="flex items-center justify-center gap-2">
              <UserPlus className="h-4 w-4" />
              {t("register")}
            </Link>
          </Button>

          <button
            onClick={closeLoginRequired}
            className="w-full pt-1 text-sm text-content-tertiary hover:text-primary transition-colors"
          >
            {t("continue_browsing")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
