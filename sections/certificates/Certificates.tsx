"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { CERTIFICATES } from "@/lib/certificates"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PER_PAGE = 6

const Certificates = () => {
  const t = useTranslations("certificates")
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(CERTIFICATES.length / PER_PAGE)
  const visible = CERTIFICATES.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <section id="certificates" className="py-24 bg-gray-50">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {visible.map((cert) => (
            <div
              key={cert.id}
              className="relative aspect-3/4 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-200"
            >
              <Image
                src={cert.image}
                alt={`Сертификат ${cert.id}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
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

      </div>

    </section>
  )
}

export default Certificates
