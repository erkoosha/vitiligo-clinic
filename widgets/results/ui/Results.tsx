"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { RESULTS } from "@/entities/treatment-result/model"
import { getPageItems, getTotalPages } from "@/shared/lib/pagination"
import { Card, CardContent } from "@/shared/ui/card"
import { PaginationArrows, PaginationDots } from "@/shared/ui/pagination-controls"
import { SectionHeading } from "@/shared/ui/section-heading"
import { BeforeAfterSlider } from "@/widgets/results/ui/BeforeAfterSlider"

const PER_PAGE = 3

const Results = () => {
  const t = useTranslations("results")
  const [page, setPage] = useState(0)
  const totalPages = getTotalPages(RESULTS.length, PER_PAGE)
  const visibleResults = getPageItems(RESULTS, page, PER_PAGE)

  return (
    <section id="results" className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            label={t("label")}
            title={t("title")}
            titleClassName="max-w-lg"
          />
          <PaginationArrows
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {visibleResults.map((result) => {
            const area = t(`areas.${result.areaKey}`)
            const duration = t(`durations.${result.durationKey}`)

            return (
              <Card key={result.id} className="overflow-hidden border-gray-100">
                {result.before && result.after ? (
                  <BeforeAfterSlider
                    before={result.before}
                    after={result.after}
                    area={area}
                    beforeLabel={t("before")}
                    afterLabel={t("after")}
                  />
                ) : (
                  <div className="flex aspect-4/5 flex-col items-center justify-center gap-2 bg-linear-to-br from-violet-100 to-violet-50 text-violet-400">
                    <div className="h-16 w-16 rounded-full bg-violet-200/60" />
                    <span className="text-sm">{t("comparison")}</span>
                  </div>
                )}
                <CardContent className="px-5 py-4">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{area}</h3>
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-600">
                      {result.percent}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {duration} · {t("therapy")}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <PaginationDots page={page} totalPages={totalPages} onPageChange={setPage} />

        <p className="mt-8 text-center text-sm text-gray-400">{t("disclaimer")}</p>
      </div>
    </section>
  )
}

export default Results
