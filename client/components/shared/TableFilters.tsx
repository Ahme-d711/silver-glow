"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DatePicker } from "./DatePicker"
import { StatusFilter } from "./StatusFilter"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface TableTab {
  label: string
  value: string
}

export interface FilterOption {
  label: string
  value: string
}

interface TableFiltersProps {
  // Tabs (usually on the left)
  tabs?: TableTab[]
  activeTab?: string
  setActiveTab?: (value: string) => void
  
  // Search (central/right)
  search?: string
  setSearch?: (value: string) => void
  searchPlaceholder?: string
  
  // Date Picker (right)
  date?: Date | undefined
  setDate?: (date: Date | undefined) => void

  // Select Filter (right)
  filterValue?: string
  onFilterChange?: (value: string) => void
  filterOptions?: FilterOption[]
  filterPlaceholder?: string

  // Additional children (right)
  children?: React.ReactNode
  
  className?: string
}

export function TableFilters({
  tabs,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  searchPlaceholder = "Search...",
  date,
  setDate,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
  children,
  className,
}: TableFiltersProps) {
  return (
    <div className={cn("p-6 flex flex-wrap items-center justify-between gap-4", className)}>
      {/* Tabs Section */}
      {tabs && activeTab !== undefined && setActiveTab && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList className="bg-background p-1.5 rounded-2xl border border-divider h-auto gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border-none shadow-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-content-tertiary hover:text-content-secondary cursor-pointer"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Inputs Section */}
      <div className="flex items-center gap-3 flex-1 justify-end max-w-4xl">
        {/* Search */}
        {setSearch && search !== undefined && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-content-tertiary" />
            <Input 
              placeholder={searchPlaceholder} 
              className="pl-11 rounded-xl border-divider bg-background h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        
        {/* Select Filter */}
        {onFilterChange && filterValue !== undefined && (
          <StatusFilter 
            value={filterValue} 
            onValueChange={onFilterChange} 
            options={filterOptions}
            placeholder={filterPlaceholder}
          />
        )}

        {/* Date Picker */}
        {setDate && date !== undefined && (
          <DatePicker date={date} setDate={setDate} />
        )}

        {/* Extra Actions */}
        {children}
      </div>
    </div>
  )
}
