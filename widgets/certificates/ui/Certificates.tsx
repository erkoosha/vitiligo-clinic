"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { CERTIFICATES } from "@/entities/certificate/model"
import { getPageItems, getTotalPages } from "@/shared/lib/pagination"
import { PaginationArrows, PaginationDots } from "@/shared/ui/pagination-controls"
import { SectionHeading } from "@/shared/ui/section-heading"

const PER_PAGE = 6

const Certificates = () => {
  const t = useTranslations("certificates")
  const [page, setPage] = useState(0)
  const totalPages = getTotalPages(CERTIFICATES.length, PER_PAGE)
  const visibleCertificates = getPageItems(CERTIFICATES, page, PER_PAGE)

  return (
    <section id="certificates" className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading label={t("label")} title={t("title")} />
          <PaginationArrows
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {visibleCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="relative aspect-3/4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:border-violet-100 hover:shadow-md"
            >
              <Image
                src={certificate.image}
                alt={`${t("title")} ${certificate.id}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        <PaginationDots
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
}

export default Certificates
