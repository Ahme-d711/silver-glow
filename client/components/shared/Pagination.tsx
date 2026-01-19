"use client"

import { cn } from "@/lib/utils"
import {
  Pagination as UiPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  itemLabel?: string // e.g., "مستخدم" for "users"
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "items",
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    pages.push(1)

    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    if (currentPage <= 3) {
      start = 2
      end = 4
    }

    if (currentPage >= totalPages - 2) {
      start = totalPages - 3
      end = totalPages - 1
    }

    if (start > 2) {
      pages.push("...")
    }

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i)
      }
    }

    if (end < totalPages - 1) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  const pageNumbers = getPageNumbers()
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="flex items-center justify-between w-full p-6 bg-white rounded-none shadow-sm">
      {/* Page Info */}
      <div className="text-sm font-medium text-content-secondary whitespace-nowrap">
        Showing {startItem}-{endItem} from {totalItems} {itemLabel}
      </div>

      <UiPagination className="justify-end mx-0 w-auto">
        <PaginationContent className="gap-4">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={cn(
                "h-10 w-10 p-0 flex items-center justify-center rounded-lg bg-background/50 text-primary hover:bg-primary/10 transition-colors border-none",
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="h-10 w-10 flex items-center justify-center text-primary cursor-pointer" />
                </PaginationItem>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={isActive}
                  className={cn(
                    "flex items-center justify-center rounded-lg cursor-pointer text-sm hover:text-white font-semibold transition-all border-none shadow-none",
                    isActive 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-background/50 text-primary hover:bg-primary/10"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(pageNum)
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={cn(
                "h-10 w-10 p-0 flex items-center justify-center rounded-lg bg-background/50 text-primary hover:bg-primary/10 transition-colors border-none cursor-pointer",
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </UiPagination>
    </div>
  )
}

