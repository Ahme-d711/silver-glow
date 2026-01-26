"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function UserGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white rounded-[24px] border border-divider p-6 flex flex-col items-center space-y-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="w-full border-t border-dashed border-divider pt-6 flex justify-between">
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
