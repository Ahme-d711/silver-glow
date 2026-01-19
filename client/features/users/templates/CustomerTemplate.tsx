"use client";

import React, { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableFilters } from "@/components/shared/TableFilters";
import { CustomerCard } from "../components/CustomerCard";
import { useUsers } from "../hooks/useUser";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";
import type { User } from "@/features/auth/types";

const categoryTabs = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

// Convert API User to CustomerCard format
function convertCustomerToCardFormat(customer: User) {
  const profileImageUrl = customer.profileImage
    ? (customer.profileImage.startsWith("http") || customer.profileImage.startsWith("/") 
        ? customer.profileImage 
        : `/${customer.profileImage}`)
    : undefined;

  const id = (customer.id || (customer as any)._id || "") as string;
  const walletBalance = customer.walletBalance ?? 0;
  const isActive = customer.active !== false;

  return {
    id,
    name: customer.name ?? "Unknown",
    avatar: profileImageUrl,
    status: isActive ? ("Active" as const) : ("Blocked" as const),
    orders: "0", // TODO: Get from orders API when available
    balance: `${walletBalance.toFixed(2)}`, // Format wallet balance
  };
}

export default function CustomerTemplate() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: customersData, isLoading, error } = useUsers();

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // Convert and filter customers
  const filteredCustomers = useMemo(() => {
    if (!customersData) return [];

    let converted = customersData.users.map(convertCustomerToCardFormat);

    // Filter by status
    if (activeTab === "active") {
      converted = converted.filter((c) => c.status === "Active");
    } else if (activeTab === "blocked") {
      converted = converted.filter((c) => c.status === "Blocked");
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      converted = converted.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.id.toLowerCase().includes(searchLower)
      );
    }

    return converted;
  }, [customersData, activeTab, search]);

  if (isLoading) {
    return (
      <div className="space-y-6 min-h-screen">
        <PageHeader
          title="Customer"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Customer List" },
          ]}
        />
        <UniLoading message="Loading customers..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 min-h-screen">
        <PageHeader
          title="Customer"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Customer List" },
          ]}
        />
        <NoDataMsg
          title="Failed to load customers"
          description={error instanceof Error ? error.message : "An error occurred"}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <PageHeader
        title="Customer"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Customer List" },
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
            label: "Add Customer",
            icon: Plus,
            className: "bg-primary text-white hover:bg-primary/90",
            onClick: () => console.log("Adding customer...")
          }
        ]}
      />

      <div className="bg-white rounded-[24px] border border-divider">
        <TableFilters
          tabs={categoryTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          searchPlaceholder="Search customer. . ."
        />

        {filteredCustomers.length === 0 ? (
          <NoDataMsg
            title="No customers found"
            description={search || activeTab !== "all" ? "Try adjusting your filters" : "No customers available"}
          />
        ) : (
          <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                {...customer}
                selected={selectedIds.includes(customer.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
