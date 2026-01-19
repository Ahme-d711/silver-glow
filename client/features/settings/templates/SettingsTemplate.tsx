"use client"

import { useState } from "react"
import { Plus, Download } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { TabsHeader, tabs } from "../components/TabsHeader"
import { ProjectOrgsTable } from "../components/ProjectOrgsTable"
import { AdminsTable, DriversTable, ShippingTermsTable, RequestTypeTable } from "../components/Tables"
import { PlacesView } from "../components/PlacesView"
import { TermsView } from "../components/TermsView"
import { PriceView } from "../components/PriceView"
import { RejectionView } from "../components/RejectionView"
import { ContactUsView } from "../components/ContactUsView"
import { PasswordsView } from "../components/PasswordsView"

export default function SettingsTemplate() {
  const [activeTab, setActiveTab] = useState("admins")
  const [activeSubTab, setActiveSubTab] = useState("governorate")

  const getActionButtons = () => {
    // Import ActionButton type if needed or just let inference work if defined in PageHeader
    const buttons: any[] = [
      {
        label: "Export",
        icon: Download,
        variant: "outline",
        className: "bg-secondary/10 text-primary border-none hover:bg-secondary/20 font-bold h-11 px-6 rounded-xl",
        onClick: () => console.log("Exporting...")
      }
    ]

    let addButtonLabel = ""
    if (activeTab === "admins") addButtonLabel = "Add Admin"
    if (activeTab === "project_organizations") addButtonLabel = "Add Organization"
    if (activeTab === "drivers") addButtonLabel = "Add Driver"
    if (activeTab === "terms") addButtonLabel = "Add Term"
    if (activeTab === "shipping") addButtonLabel = "Add Shipping Term"
    if (activeTab === "request_type") addButtonLabel = "Add Request Type"
    
    if (activeTab === "places") {
      if (activeSubTab === "governorate") addButtonLabel = "Add Governorate"
      else if (activeSubTab === "region") addButtonLabel = "Add Region"
      else if (activeSubTab === "neighborhood") addButtonLabel = "Add Neighborhood"
      else addButtonLabel = "Add Place"
    }
    
    if (activeTab === "rejection") addButtonLabel = "Add Reason"
    
    if (activeTab === "price") {
      if (activeSubTab === "km") addButtonLabel = "Add Price km"
      else if (activeSubTab === "wasal") addButtonLabel = "Add Price wasal"
      else addButtonLabel = "Add Price"
    }

    if (activeTab === "contact") addButtonLabel = "Add Contact Us"

    if (addButtonLabel) {
      buttons.push({
        label: addButtonLabel,
        icon: Plus,
        className: "bg-primary text-white font-bold hover:bg-primary/90 shadow-md active:scale-95 h-11 px-6 rounded-xl",
        onClick: () => console.log(`Adding ${addButtonLabel}`)
      })
    }

    return buttons
  }

  const renderContent = () => {
    switch (activeTab) {
      case "admins": return <AdminsTable />
      case "project_organizations": return <ProjectOrgsTable />
      case "drivers": return <DriversTable />
      case "shipping": return <ShippingTermsTable />
      case "request_type": return <RequestTypeTable />
      case "places": return <PlacesView activePlaceTab={activeSubTab} onTabChange={setActiveSubTab} />
      case "terms": return <TermsView />
      case "price": return <PriceView activeSubTab={activeSubTab} onTabChange={setActiveSubTab} />
      case "rejection": return <RejectionView activeSubTab={activeSubTab} onTabChange={setActiveSubTab} />
      case "contact": return <ContactUsView />
      case "passwords": return <PasswordsView />
      default: return (
        <div className="p-20 text-center text-content-tertiary bg-white rounded-[24px] border border-divider">
          Content for {tabs.find(t => t.id === activeTab)?.label} will be here.
        </div>
      )
    }
  }

  const handleMainTabChange = (id: string) => {
    setActiveTab(id)
    if (id === "places") setActiveSubTab("governorate")
    else if (id === "price") setActiveSubTab("km")
    else if (id === "rejection") setActiveSubTab("driver")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]}
        actionButtons={getActionButtons()}
      />

      <TabsHeader activeTab={activeTab} onTabChange={handleMainTabChange} />

      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        {renderContent()}
      </div>
    </div>
  )
}
