import React from "react";
import { Control } from "react-hook-form";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { SectionHeader } from "./SectionHeader";

interface NotesSectionProps {
  control: Control<any>;
  t: (key: string) => string;
  isEdit?: boolean;
}

export function NotesSection({
  control,
  t,
  isEdit,
}: NotesSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeader title={t("notes")} />
      
      <UniTextarea
        control={control}
        name="customerNotes"
        label={t("customer_notes")}
        placeholder={t("enter_customer_notes")}
        rows={3}
      />

      {isEdit && (
        <UniTextarea
          control={control}
          name="adminNotes"
          label={t("admin_notes")}
          placeholder={t("enter_admin_notes")}
          rows={3}
        />
      )}
    </div>
  );
}
