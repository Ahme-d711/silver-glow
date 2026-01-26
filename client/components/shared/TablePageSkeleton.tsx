"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton"

interface TablePageSkeletonProps {
  columnCount?: number
  rowCount?: number
  withHeader?: boolean
  withBreadcrumbs?: boolean
  withAddButton?: boolean
  withExportButton?: boolean
}

export function TablePageSkeleton({
  columnCount = 5,
  rowCount = 10,
  withHeader = true,
  withBreadcrumbs = true,
  withAddButton = true,
  withExportButton = true
}: TablePageSkeletonProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header Skeleton */}
      {withHeader && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-lg" />
            {withBreadcrumbs && (
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {withExportButton && <Skeleton className="h-11 w-32 rounded-xl" />}
            {withAddButton && <Skeleton className="h-11 w-36 rounded-xl" />}
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="w-full">
        <UniTableSkeleton columnCount={columnCount} rowCount={rowCount} />
      </div>
    </div>
  )
}
