"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton"

export function AdsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-32 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Left: Table Skeleton */}
        <div className="flex-1 w-full">
          <UniTableSkeleton columnCount={6} rowCount={8} />
        </div>

        {/* Right: Mobile Preview Skeleton */}
        <div className="hidden xl:block shrink-0">
          <div className="relative w-[360px] h-[700px] bg-white rounded-[40px] border-2 border-gray-100 shadow-sm overflow-hidden flex flex-col mx-auto">
            {/* Status Bar */}
            <div className="bg-[#192C56]/10 px-6 py-3 flex justify-between items-center">
              <Skeleton className="h-3 w-8 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-6 rounded-md" />
              </div>
            </div>

            {/* Header Mockup */}
            <div className="bg-[#192C56] p-4 pb-6 rounded-b-[24px] relative shrink-0">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full border-2 border-white/20" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24 bg-white/20 rounded-full" />
                    <Skeleton className="h-2 w-16 bg-white/10 rounded-full" />
                  </div>
                </div>
                <Skeleton className="w-8 h-8 rounded-full bg-white/10" />
              </div>
              <Skeleton className="h-9 w-full bg-white/10 rounded-xl" />
            </div>

            <div className="flex-1 p-4 space-y-6 bg-gray-50/50">
              {/* Hero Ad Skeleton */}
              <Skeleton className="h-40 w-full rounded-xl" />
              
              {/* Grid Placeholder */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>

              {/* List Placeholder */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-full" />
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-24 h-32 rounded-xl shrink-0" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav Mockup */}
            <div className="bg-white border-t py-4 px-8 flex justify-between items-center shrink-0">
               {[1, 2, 3, 4].map((i) => (
                 <Skeleton key={i} className="h-5 w-5 rounded-md" />
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
