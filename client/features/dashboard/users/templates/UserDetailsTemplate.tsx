"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserStatsGrid } from "../components/UserStatsGrid";
import { UserInfoSidebar } from "../components/UserInfoSidebar";
import { UserTransactionsTable } from "../components/UserTransactionsTable";
import { useUser, useDeleteUser, useAddUserBalance, useActivateUser, useUserOrders } from "../hooks/useUser";
import { PageErrorState } from "@/components/shared/PageErrorState";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { AddBalanceModal } from "../components/AddBalanceModal";
import { UserDetailsSkeleton } from "../components/UserDetailsSkeleton";
import EditUserTemplate from "./EditUserTemplate";
import { format } from "date-fns";
import { Wallet, Pencil } from "lucide-react";
import { getImageUrl } from "@/utils/image.utils";
import type { Order } from "../../orders/types";
import { getMappedOrderStatus } from "../../orders/types";
import type { UserAccountStatus, UserSidebarData, UserStatsData, UserTransaction } from "../types";

export default function UserDetailsTemplate() {
  const t = useTranslations("Users");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const { id } = useParams();
  const userId = typeof id === "string" ? id : id?.[0] || "";

  const { data: user, isLoading, error } = useUser(userId);
  const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser();
  const { mutate: addBalance, isPending: isAddingBalance } = useAddUserBalance();
  const { mutate: activateUserMutation, isPending: isActivating } = useActivateUser();
  
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  const { data: ordersData, isLoading: isLoadingOrders } = useUserOrders(userId, { 
    limit: 5,
    status: getMappedOrderStatus(statusFilter),
    startDate: dateFilter ? dateFilter.toISOString() : undefined,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isLoading) return <UserDetailsSkeleton />;

  if (error || !user) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title={t("user_details")}
          breadcrumbs={[
            { label: tNav("dashboard"), href: "/dashboard" },
            { label: t("title"), href: "/dashboard/users" },
            { label: t("user_details") },
          ]}
        />
        <PageErrorState
          title={t("failed_load_user")}
          description={error instanceof Error ? error.message : t("user_not_found")}
          variant={error ? "error" : "not-found"}
          backHref="/dashboard/users"
          backLabel={t("title")}
        />
      </div>
    );
  }

  // Format user data for components
  const profileImageUrl = getImageUrl(user.picture || user.profileImage || user.photo) || undefined;

  const lastTransactionAt = user.lastTransactionAt ?? user.createdAt;
  const lastLoginAt = user.lastLoginAt ?? user.createdAt;

  const formattedLastTransaction = lastTransactionAt
    ? format(new Date(lastTransactionAt), "dd MMM yyyy")
    : t("na");
  const formattedLastOnline = lastLoginAt
    ? format(new Date(lastLoginAt), "dd MMM yyyy")
    : t("na");

  const currency = typeof user.currency === "string" ? user.currency : "EGP";

  const transactions: UserTransaction[] = ordersData?.orders.map((order: Order) => ({
    orderId: order._id,
    id: order.trackingNumber || order._id,
    product: order.items[0]?.name || t("na"),
    sub: order.items.length > 1 ? `+${order.items.length - 1} ${t("other_products")}` : "",
    total: `${order.totalAmount} ${currency}`,
    status: order.status,
    paymentStatus: order.paymentStatus,
    date: format(new Date(order.createdAt), "dd MMM yyyy"),
    image: order.items[0]?.image || "",
  })) || [];

  const walletBalance = user.totalBalance ?? user.walletBalance ?? 0;
  const totalOrders = user.totalOrders ?? 0;
  const status: UserAccountStatus = user.isActive === false ? "deactivated" : "active";
  const idValue = user.id || user._id || "";

  const userSidebarData: UserSidebarData = {
    id: idValue,
    name: user.name ?? t("unknown"),
    status,
    address: user.address ?? t("na"),
    phone: user.phone ?? t("na"),
    lastTransaction: formattedLastTransaction,
    lastOnline: formattedLastOnline,
    profileImage: profileImageUrl,
    isActive: user.isActive !== false,
  };

  const statsData: UserStatsData = {
    totalOrders: totalOrders.toLocaleString(),
    totalBalance: walletBalance.toFixed(2),
    orderTrend: {
      value: "0%",
      isUp: totalOrders > 0,
      sub: totalOrders > 0 ? t("orders_available") : t("no_orders_yet"),
    },
    balanceTrend: {
      value: "0%",
      isUp: walletBalance >= 0,
      sub: t("balance_desc", { balance: walletBalance.toFixed(2) }),
    },
  };

  const handleDelete = () => {
    if (user.isActive === false) {
      setActivateDialogOpen(true);
    } else {
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!userId) return;
    deleteUserMutation(userId);
    setDeleteDialogOpen(false);
  };

  const handleConfirmActivate = () => {
    if (!userId) return;
    activateUserMutation(userId);
    setActivateDialogOpen(false);
  };

  const handleConfirmBalance = (amount: number) => {
    if (!userId) return;
    addBalance(
      { id: userId, amount },
      {
        onSuccess: () => {
          setBalanceModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t("user_details")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title"), href: "/dashboard/users" },
          { label: t("user_details") },
        ]}
        actionButtons={[
          {
            label: t("edit_profile"),
            icon: Pencil,
            variant: "outline",
            className: "bg-secondary text-primary border-none hover:bg-secondary/80",
            onClick: () => setEditDialogOpen(true),
          },
          {
            label: t("add_balance"),
            icon: Wallet,
            className: "bg-primary text-white hover:bg-primary/90",
            onClick: () => setBalanceModalOpen(true),
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Info Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <UserInfoSidebar
            user={userSidebarData}
            onDelete={handleDelete}
            disableActions={isDeleting || isActivating}
          />
        </div>

        {/* Right Stats & Table */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <UserStatsGrid 
            totalOrders={statsData.totalOrders}
            totalBalance={statsData.totalBalance}
            orderTrend={statsData.orderTrend}
            balanceTrend={statsData.balanceTrend}
          />

          {/* Table Component */}
          <UserTransactionsTable 
            transactions={transactions} 
            isLoading={isLoadingOrders}
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            date={dateFilter}
            onDateChange={setDateFilter}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("delete_user_title")}
        description={t("delete_user_desc")}
        confirmText={tCommon("delete")}
        variant="destructive"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      {/* Activate Confirmation Dialog */}
      <ConfirmationDialog
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
        title={t("activate_user_title")}
        description={t("activate_user_desc")}
        confirmText={tCommon("confirm")}
        onConfirm={handleConfirmActivate}
        isLoading={isActivating}
      />

      {/* Add Balance Modal */}
      <AddBalanceModal
        open={balanceModalOpen}
        onOpenChange={setBalanceModalOpen}
        currentBalance={walletBalance}
        userName={user.name || t("user")}
        onConfirm={handleConfirmBalance}
        isLoading={isAddingBalance}
      />

      {/* Edit User Dialog */}
      {user && (
        <EditUserTemplate
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={user}
        />
      )}
    </div>
  );
}
