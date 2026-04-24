"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { REVIEWS } from "@/entities/review/model"
import { getPageItems, getTotalPages } from "@/shared/lib/pagination"
import { Card, CardContent } from "@/shared/ui/card"
import { StarIcon } from "@/shared/ui/icons"
import { PaginationArrows, PaginationDots } from "@/shared/ui/pagination-controls"
import { SectionHeading } from "@/shared/ui/section-heading"

const PER_PAGE = 3

const Reviews = () => {
  const t = useTranslations("reviews")
  const [page, setPage] = useState(0)
  const totalPages = getTotalPages(REVIEWS.length, PER_PAGE)
  const visibleReviews = getPageItems(REVIEWS, page, PER_PAGE)

  return (
    <section id="reviews" className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading label={t("label")} title={t("title")} />
          <PaginationArrows
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {visibleReviews.map((review) => (
            <Card key={review.id} className="rounded-2xl border-gray-100">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
                <p className="mb-6 flex-1 leading-relaxed text-gray-600">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <PaginationDots
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <p className="mt-6 text-center text-xs text-gray-400">
          {t("source")}{" "}
          <a
            href="https://2gis.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-gray-600"
          >
            2GIS
          </a>
        </p>
      </div>
    </section>
  )
}

export default Reviews
