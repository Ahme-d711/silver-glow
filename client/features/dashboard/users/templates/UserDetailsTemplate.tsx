"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserStatsGrid } from "../components/UserStatsGrid";
import { UserInfoSidebar } from "../components/UserInfoSidebar";
import { UserTransactionsTable } from "../components/UserTransactionsTable";
import { useUser, useDeleteUser, useUpdateUserBlockStatus, useAddUserBalance, useActivateUser } from "../hooks/useUser";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { AddBalanceModal } from "../components/AddBalanceModal";
import { UserDetailsSkeleton } from "../components/UserDetailsSkeleton";
import EditUserTemplate from "./EditUserTemplate";
import { format } from "date-fns";
import type { User } from "@/features/dashboard/auth/types";
import { Wallet, Pencil } from "lucide-react";
import { getImageUrl } from "@/utils/image.utils";

// Mock transactions - TODO: Replace with real API when available
const transactions = [
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
];

export default function UserDetailsTemplate() {
  const { id } = useParams();
  const userId = typeof id === "string" ? id : id?.[0] || "";

  const { data: user, isLoading, error } = useUser(userId);
  const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateBlockStatus, isPending: isBlocking } = useUpdateUserBlockStatus();
  const { mutate: addBalance, isPending: isAddingBalance } = useAddUserBalance();
  const { mutate: activateUserMutation, isPending: isActivating } = useActivateUser();

  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isLoading) return <UserDetailsSkeleton />;

  if (error || !user) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="User Details"
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "User List", href: "/dashboard/users" },
            { label: "User Details" },
          ]}
        />
        <NoDataMsg
          title="Failed to load user"
          description={error instanceof Error ? error.message : "User not found"}
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
    : "N/A";

  const formattedLastOnline = lastLoginAt
    ? format(new Date(lastLoginAt), "dd MMM yyyy")
    : "N/A";

  const walletBalance = user.totalBalance ?? user.walletBalance ?? 0;
  const totalOrders = user.totalOrders ?? 0;
  const status = user.isBlocked
    ? "Blocked"
    : user.isActive === false
    ? "Deactivated"
    : "Active";
  const idValue = (user.id || (user as User)._id || "") as string;

  const userSidebarData = {
    id: idValue,
    name: user.name ?? "Unknown",
    status,
    address: user.address ?? "N/A",
    phone: user.phone ?? "N/A",
    lastTransaction: formattedLastTransaction,
    lastOnline: formattedLastOnline,
    profileImage: profileImageUrl,
    isBlocked: user.isBlocked === true,
    isActive: user.isActive !== false,
  };

  const statsData = {
    totalOrders: totalOrders.toLocaleString(),
    totalBalance: walletBalance.toFixed(2),
    orderTrend: {
      value: "0%",
      isUp: totalOrders > 0,
      sub: totalOrders > 0 ? "Orders available" : "No orders yet",
    },
    balanceTrend: {
      value: "0%",
      isUp: walletBalance >= 0,
      sub: `Balance: ${walletBalance.toFixed(2)}`,
    },
  };

  const handleBlockToggle = () => {
    setBlockDialogOpen(true);
  };

  const handleConfirmBlock = () => {
    if (!userId) return;
    updateBlockStatus({
      id: userId,
      isBlocked: !user.isBlocked,
    });
    setBlockDialogOpen(false);
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
        title="User Details"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "User List", href: "/dashboard/users" },
          { label: "User Details" },
        ]}
        actionButtons={[
          {
            label: "Edit Profile",
            icon: Pencil,
            variant: "outline",
            className: "bg-secondary text-primary border-none hover:bg-secondary/80",
            onClick: () => setEditDialogOpen(true),
          },
          {
            label: "Add Balance",
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
            onBlockToggle={handleBlockToggle}
            onDelete={handleDelete}
            disableActions={isDeleting || isBlocking || isActivating}
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
          <UserTransactionsTable transactions={transactions} />
        </div>
      </div>

      {/* Block Confirmation Dialog */}
      <ConfirmationDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        title={user.isBlocked ? "Unblock User" : "Block User"}
        description={
          user.isBlocked
            ? "Are you sure you want to unblock this user? They will be able to access their account again."
            : "Are you sure you want to block this user? They will not be able to access their account."
        }
        confirmText={user.isBlocked ? "Unblock" : "Block"}
        variant="destructive"
        onConfirm={handleConfirmBlock}
        isLoading={isBlocking}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      {/* Activate Confirmation Dialog */}
      <ConfirmationDialog
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
        title="Activate User"
        description="Are you sure you want to activate this user? Their account will be accessible again."
        confirmText="Activate"
        onConfirm={handleConfirmActivate}
        isLoading={isActivating}
      />

      {/* Add Balance Modal */}
      <AddBalanceModal
        open={balanceModalOpen}
        onOpenChange={setBalanceModalOpen}
        currentBalance={walletBalance}
        userName={user.name || "User"}
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
