"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { REVIEWS } from "@/lib/reviews"
import { StarIcon } from "@/components/shared/icons"

const PER_PAGE = 3

const Reviews = () => {
  const t = useTranslations("reviews")
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(REVIEWS.length / PER_PAGE)
  const visible = REVIEWS.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <section id="reviews" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {t("title")}
            </h2>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-full"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-gray-400">{page + 1} / {totalPages}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((review) => (
            <Card key={review.id} className="rounded-2xl border-gray-100">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed flex-1 mb-6">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                onClick={() => setPage(i)}
                className={`h-2 w-auto min-w-0 rounded-full transition-all duration-200 p-0 ${
                  i === page ? "bg-violet-600 w-6 hover:bg-violet-600" : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          {t("source")}{" "}
          <a
            href="https://2gis.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-gray-600 transition-colors"
          >
            2GIS
          </a>
        </p>

      </div>
    </section>
  )
}

export default Reviews
