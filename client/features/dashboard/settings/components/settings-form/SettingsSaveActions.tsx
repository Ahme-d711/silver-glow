import { useTranslations, useLocale } from "next-intl";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SettingsSaveActionsProps = {
  isUpdating: boolean;
  onSave: () => void;
};

export function SettingsSaveActions({ isUpdating, onSave }: SettingsSaveActionsProps) {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";

  return (
    <div
      className={cn("flex mt-6 w-full", isRtl ? "justify-start" : "justify-end")}
      dir="ltr"
    >
      <Button
        type="button"
        onClick={onSave}
        disabled={isUpdating}
        className="h-12 px-8 min-w-[140px] rounded-xl font-bold bg-[#1B254B] hover:bg-[#1B254B]/90"
      >
        {isUpdating ? (
          <>
            <Loader2 className="me-2 h-4 w-4 animate-spin" />
            {t("saving")}...
          </>
        ) : (
          <>
            <Save className="me-2 h-4 w-4" />
            {t("save_changes")}
          </>
        )}
      </Button>
    </div>
  );
}
