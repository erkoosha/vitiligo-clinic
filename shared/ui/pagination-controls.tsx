"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/shared/ui/button"

type PaginationControlsProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PaginationArrows = ({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex shrink-0 items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="rounded-full"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="text-sm text-gray-400">
        {page + 1} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        className="rounded-full"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

export const PaginationDots = ({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(index)}
          className={
            index === page
              ? "h-2 w-6 min-w-0 rounded-full bg-violet-600 p-0 transition-all duration-200 hover:bg-violet-600"
              : "h-2 w-2 min-w-0 rounded-full bg-gray-300 p-0 transition-all duration-200 hover:bg-gray-400"
          }
          aria-label={`Go to page ${index + 1}`}
          aria-current={index === page ? "page" : undefined}
        />
      ))}
    </div>
  )
}
