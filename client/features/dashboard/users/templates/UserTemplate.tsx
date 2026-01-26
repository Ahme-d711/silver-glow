"use client";

import React, { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableFilters } from "@/components/shared/TableFilters";
import { UserCard } from "../components/UserCard";
import { useUsers } from "../hooks/useUser";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { UserGridSkeleton } from "../components/UserGridSkeleton";
import type { User } from "@/features/dashboard/auth/types";
import AddUserTemplate from "./AddUserTemplate";
import { useSearchParams } from "next/navigation";
import { getImageUrl } from "@/utils/image.utils";

const categoryTabs = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Not Active", value: "deactivated" },
  { label: "Blocked", value: "blocked" },
  { label: "Not Blocked", value: "not_blocked" },
];

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
    ? "Blocked"
    : user.isActive === false
    ? "Deactivated"
    : "Active";

  return {
    id,
    name: user.name ?? "Unknown",
    avatar: profileImageUrl,
    status: (status === "Active" ? "Active" : status === "Blocked" ? "Blocked" : "Blocked") as "Active" | "Blocked",
    orders: "0", // TODO: Get from orders API when available
    balance: `${walletBalance.toFixed(2)}`, // Format wallet balance
  };
}

export default function UserTemplate() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const { data: usersData, isLoading, error } = useUsers({
    search,
    isActive: activeTab === "active" ? true : activeTab === "deactivated" ? false : undefined,
    isBlocked: activeTab === "blocked" ? true : activeTab === "not_blocked" ? false : undefined,
  });

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
        title="User"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "User List" },
        ]}
        actionButtons={[
          {
            label: "Export",
            icon: Download,
            variant: "outline",
            className: "bg-secondary text-primary border-none hover:bg-secondary/80",
            onClick: () => console.log("Exporting...")
          },
          {
            label: "Add User",
            icon: Plus,
            className: "bg-primary text-white hover:bg-primary/90",
            onClick: () => setAddUserOpen(true)
          }
        ]}
      />

      <AddUserTemplate open={addUserOpen} onOpenChange={setAddUserOpen} />

      <div className="bg-white rounded-[24px] border border-divider">
        <TableFilters
          tabs={categoryTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {isLoading ? (
          <UserGridSkeleton />
        ) : filteredUsers.length === 0 ? (
          <NoDataMsg
            title="No users found"
            description={search || activeTab !== "all" ? "Try adjusting your filters" : "No users available"}
          />
        ) : (
          <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                {...user}
                selected={selectedIds.includes(user.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
