"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UniTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
}

export function UniTableSkeleton({
  columnCount = 5,
  rowCount = 10,
}: UniTableSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search and Filters Skeleton */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-10 w-[250px] rounded-xl" />
        <div className="flex items-center gap-2">
           <Skeleton className="h-10 w-[100px] rounded-xl" />
           <Skeleton className="h-10 w-[140px] rounded-xl" />
        </div>
      </div>

      <div className="rounded-[24px] border border-divider overflow-hidden bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="hover:bg-transparent border-divider">
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i} className="h-14">
                  <Skeleton className="h-4 w-24 rounded-lg bg-primary/5" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent border-divider">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j} className="h-16">
                    <Skeleton className="h-4 w-full rounded-lg bg-gray-100" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between space-x-2 py-4">
         <Skeleton className="h-5 w-[200px] rounded-lg" />
         <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
         </div>
      </div>
    </div>
  );
}
