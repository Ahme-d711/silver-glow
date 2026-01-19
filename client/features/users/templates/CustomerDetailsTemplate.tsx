"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { CustomerStatsGrid } from "../components/CustomerStatsGrid";
import { CustomerInfoSidebar } from "../components/CustomerInfoSidebar";
import { CustomerTransactionsTable } from "../components/CustomerTransactionsTable";
import { useUser, useDeleteUser, useUpdateUserBlockStatus } from "../hooks/useUser";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { format } from "date-fns";
import type { User } from "@/features/auth/types";

// Mock transactions - TODO: Replace with real API when available
const transactions = [
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
  { id: "302002", product: "Handmade Pouch", sub: "+3 other products", total: "$121.00", status: "Processing", date: "12 Dec 2023" },
];

export default function CustomerDetailsTemplate() {
  const { id } = useParams();
  const customerId = typeof id === "string" ? id : id?.[0] || "";

  const { data: customer, isLoading, error } = useUser(customerId);
  const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateBlockStatus, isPending: isBlocking } = useUpdateUserBlockStatus();

  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Customer Details"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Customer List", href: "/customers" },
            { label: "Customer Details" },
          ]}
        />
        <UniLoading message="Loading customer details..." />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Customer Details"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Customer List", href: "/customers" },
            { label: "Customer Details" },
          ]}
        />
        <NoDataMsg
          title="Failed to load customer"
          description={error instanceof Error ? error.message : "Customer not found"}
        />
      </div>
    );
  }

  // Format customer data for components
  const profileImageUrl = customer.profileImage
    ? (customer.profileImage.startsWith("http") || customer.profileImage.startsWith("/") 
        ? customer.profileImage 
        : `/${customer.profileImage}`)
    : undefined;

  const lastTransactionAt = customer.lastTransactionAt ?? customer.createdAt;
  const lastLoginAt = customer.lastLoginAt ?? customer.createdAt;

  const formattedLastTransaction = lastTransactionAt
    ? format(new Date(lastTransactionAt), "dd MMM yyyy")
    : "N/A";

  const formattedLastOnline = lastLoginAt
    ? format(new Date(lastLoginAt), "dd MMM yyyy")
    : "N/A";

  const walletBalance = customer.totalBalance ?? customer.walletBalance ?? 0;
  const totalOrders = customer.totalOrders ?? 0;
  const status = customer.isBlocked
    ? "Blocked"
    : customer.active === false
    ? "Deactivated"
    : "Active";
  const idValue = (customer.id || (customer as User)._id || "") as string;

  const customerSidebarData = {
    id: idValue,
    name: customer.name ?? "Unknown",
    status,
    address: customer.address ?? "N/A",
    phone: customer.phone ?? "N/A",
    lastTransaction: formattedLastTransaction,
    lastOnline: formattedLastOnline,
    profileImage: profileImageUrl,
    isBlocked: customer.isBlocked === true,
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
    if (!customerId) return;
    updateBlockStatus({
      id: customerId,
      isBlocked: !customer.isBlocked,
    });
    setBlockDialogOpen(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!customerId) return;
    deleteUserMutation(customerId);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Customer Details"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Customer List", href: "/customers" },
          { label: "Customer Details" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Info Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <CustomerInfoSidebar
            customer={customerSidebarData}
            onBlockToggle={handleBlockToggle}
            onDelete={handleDelete}
            disableActions={isDeleting || isBlocking}
          />
        </div>

        {/* Right Stats & Table */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <CustomerStatsGrid 
            totalOrders={statsData.totalOrders}
            totalBalance={statsData.totalBalance}
            orderTrend={statsData.orderTrend}
            balanceTrend={statsData.balanceTrend}
          />

          {/* Table Component */}
          <CustomerTransactionsTable transactions={transactions} />
        </div>
      </div>

      {/* Block Confirmation Dialog */}
      <ConfirmationDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        title={customer.isBlocked ? "Unblock Customer" : "Block Customer"}
        description={
          customer.isBlocked
            ? "Are you sure you want to unblock this customer? They will be able to access their account again."
            : "Are you sure you want to block this customer? They will not be able to access their account."
        }
        confirmText={customer.isBlocked ? "Unblock" : "Block"}
        variant="destructive"
        onConfirm={handleConfirmBlock}
        isLoading={isBlocking}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
