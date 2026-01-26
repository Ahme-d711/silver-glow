"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface FormPageSkeletonProps {
  fieldCount?: number
}

export function FormPageSkeleton({ fieldCount = 6 }: FormPageSkeletonProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-white rounded-[24px] shadow-sm border border-divider p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: fieldCount }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-3 pt-4 border-t border-divider">
          <Skeleton className="h-11 w-32 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
