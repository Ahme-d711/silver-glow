"use client";

import React, { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableFilters } from "@/components/shared/TableFilters";
import { UserCard } from "../components/UserCard";
import { useUsers } from "../hooks/useUser";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { UserGridSkeleton } from "../components/UserGridSkeleton";
import type { User } from "@/features/auth/types";
import AddUserTemplate from "./AddUserTemplate";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/image.utils";
import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";

const getCategoryTabs = (t: { [key: string]: string }) => {
  const { all_status, active, not_active, blocked, not_blocked } = t;
  return [
    { label: all_status, value: "all" },
    { label: active, value: "active" },
    { label: not_active, value: "deactivated" },
    { label: blocked, value: "blocked" },
    { label: not_blocked, value: "not_blocked" },
  ];
};

// Convert API User to UserCard format
function convertUserToCardFormat(user: User) {
  const profileImageUrl = getImageUrl(user.picture || user.profileImage || user.photo) || undefined;

  const mongoId =
    typeof (user as { _id?: unknown })._id === "string"
      ? (user as { _id?: string })._id
      : "";
  const id = (user.id || mongoId) as string;
  const walletBalance = user.totalBalance ?? user.walletBalance ?? 0;
  
  const status = user.isBlocked === true
    ? "blocked"
    : user.isActive === false
    ? "deactivated"
    : "active";

  return {
    id,
    name: user.name ?? "Unknown",
    avatar: profileImageUrl,
    status: status as "active" | "blocked" | "deactivated",
    orders: "0", // TODO: Get from orders API when available
    balance: `${walletBalance.toFixed(2)}`, // Format wallet balance
  };
}

export default function UserTemplate() {
  const t = useTranslations("Users");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const translatedTabs = getCategoryTabs({
    all_status: t("all_status"),
    active: t("active"),
    not_active: t("not_active"),
    blocked: t("blocked"),
    not_blocked: t("not_blocked"),
  });

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const { data: usersData, isLoading, error } = useUsers({
    search,
    isActive: activeTab === "active" ? true : activeTab === "deactivated" ? false : undefined,
    isBlocked: activeTab === "blocked" ? true : activeTab === "not_blocked" ? false : undefined,
  });

  const handleExport = () => {
    if (filteredUsers.length === 0 || selectedIds.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data selected for export");
      return;
    }
    
    // Map selected IDs to the formatted data
    const dataToExport = filteredUsers
      .filter(u => selectedIds.includes(u.id))
      .map((user) => ({
        "Name": user.name || "Unknown",
        "Status": user.status,
        "Balance": user.balance,
        "Orders": user.orders,
      }));

    exportToExcel(dataToExport, {
      filename: `Users_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "Users",
    });
  };

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // Convert users from API
  const filteredUsers = useMemo(() => {
    if (!usersData) return [];
    return usersData.users.map(convertUserToCardFormat);
  }, [usersData]);

  return (
    <div className="space-y-6 min-h-screen">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: tCommon("all") },
        ]}
        actionButtons={[
          {
            label: tCommon("export"),
            icon: Download,
            variant: "outline",
            className: "bg-secondary text-primary border-none hover:bg-secondary/80",
            onClick: handleExport
          },
          {
            label: t("add_user"),
            icon: Plus,
            className: "bg-primary text-white hover:bg-primary/90",
            onClick: () => setAddUserOpen(true)
          }
        ]}
      />

      <AddUserTemplate open={addUserOpen} onOpenChange={setAddUserOpen} />

      <div className="bg-white rounded-[24px] border border-divider">
        <TableFilters
          tabs={translatedTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {isLoading ? (
          <UserGridSkeleton />
        ) : filteredUsers.length === 0 ? (
          <NoDataMsg
            title={t("no_users_found")}
            description={search || activeTab !== "all" ? t("adjust_filters") : t("no_users_available")}
          />
        ) : (
          <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                  selected={selectedIds.includes(user.id)}
                  onSelect={handleSelect}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
