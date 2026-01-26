"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-32 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Skeleton */}
        <div className="lg:col-span-4 xl:col-span-3">
           <div className="bg-white rounded-[24px] border border-divider p-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                 <Skeleton className="h-32 w-32 rounded-[24px]" />
                 <Skeleton className="h-6 w-32 rounded-lg" />
                 <Skeleton className="h-6 w-20 rounded-xl" />
              </div>
              <div className="space-y-4 pt-4 border-t border-divider">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between">
                       <Skeleton className="h-4 w-20" />
                       <Skeleton className="h-4 w-24" />
                    </div>
                 ))}
              </div>
              <div className="space-y-3 pt-6">
                 <Skeleton className="h-11 w-full rounded-xl" />
                 <Skeleton className="h-11 w-full rounded-xl" />
              </div>
           </div>
        </div>

        {/* Right Content Skeleton */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                 <div key={i} className="bg-white rounded-[24px] border border-divider p-6 space-y-4">
                    <Skeleton className="h-4 w-24 rounded-lg" />
                    <Skeleton className="h-8 w-32 rounded-lg" />
                    <Skeleton className="h-4 w-48 rounded-md" />
                 </div>
              ))}
           </div>
           
           <div className="bg-white rounded-[24px] border border-divider p-6 h-[400px]">
              <div className="flex justify-between mb-8">
                 <Skeleton className="h-8 w-40 rounded-lg" />
                 <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
              <div className="space-y-4">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-4">
                       <Skeleton className="h-12 flex-1 rounded-xl" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
