"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { CustomerStatsGrid } from "../components/CustomerStatsGrid";
import { CustomerInfoSidebar } from "../components/CustomerInfoSidebar";
import { CustomerTransactionsTable } from "../components/CustomerTransactionsTable";
import { useUser } from "../hooks/useUser";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { format } from "date-fns";

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

  const formattedCreatedAt = customer.createdAt
    ? format(new Date(customer.createdAt), "dd MMM yyyy")
    : "N/A";

  const walletBalance = customer.walletBalance ?? 0;
  const status = customer.active === false ? "Blocked" : "Active";
  const idValue = (customer.id || (customer as any)._id || "") as string;

  const customerSidebarData = {
    id: idValue,
    name: customer.name ?? "Unknown",
    status,
    address: "N/A", // TODO: Add address field when available in API
    phone: customer.phone ?? "N/A",
    lastTransaction: formattedCreatedAt, // Using createdAt as fallback
    lastOnline: formattedCreatedAt, // Using createdAt as fallback
    profileImage: profileImageUrl,
  };

  // Mock stats - TODO: Replace with real API when available
  const statsData = {
    totalOrders: "0", // TODO: Get from orders API
    totalBalance: walletBalance.toFixed(2),
    orderTrend: { value: "0%", isUp: false, sub: "No orders yet" },
    balanceTrend: { value: "0%", isUp: true, sub: `Balance: ${walletBalance.toFixed(2)}` },
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
          <CustomerInfoSidebar customer={customerSidebarData} />
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
    </div>
  );
}
