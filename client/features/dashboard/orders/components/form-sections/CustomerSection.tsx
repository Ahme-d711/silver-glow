import React from "react";
import { Control } from "react-hook-form";
import { UniAsyncCombobox } from "@/components/shared/uni-form/UniAsyncCombobox";
import { User } from "@/features/auth/types";
import { SectionHeader } from "./SectionHeader";

interface CustomerSectionProps {
  control: Control<any>;
  t: (key: string) => string;
  tCommon: (key: string) => string;
  onUserSelect: (user: User) => void;
  fetchUsers: (search: string) => Promise<User[]>;
  isEdit?: boolean;
}

export function CustomerSection({
  control,
  t,
  tCommon,
  onUserSelect,
  fetchUsers,
  isEdit,
}: CustomerSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeader title={t("customer")} />
      <UniAsyncCombobox
        control={control}
        name="userId"
        label={t("customer")}
        onSelect={onUserSelect}
        fetchData={fetchUsers}
        placeholder={t("select_customer")}
        searchPlaceholder={tCommon("search")}
        emptyMessage={tCommon("no_data")}
        getItemLabel={(user: User) => `${user.name} (${user.phone})`}
        disabled={isEdit}
        required
      />
    </div>
  );
}
