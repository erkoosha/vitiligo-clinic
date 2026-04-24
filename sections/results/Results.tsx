"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ChevronsLeftRight } from "lucide-react"
import { RESULTS } from "@/lib/results"

const PER_PAGE = 3

type BeforeAfterSliderProps = { before: string; after: string; area: string }

const BeforeAfterSlider = ({ before, after, area }: BeforeAfterSliderProps) => {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const move = (clientX: number) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden aspect-4/5 select-none cursor-col-resize"
      onMouseMove={(e) => { if (dragging) move(e.clientX) }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      {/* After: background */}
      <Image src={after} alt={`${area} после`} fill className="object-cover" sizes="33vw" />
      {/* Before: clipped to left `pos`% */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${area} до`} fill className="object-cover" sizes="33vw" />
      </div>
      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px bg-white/80 pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10 cursor-col-resize"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => { e.preventDefault(); setDragging(true) }}
        onTouchStart={() => setDragging(true)}
        onTouchMove={(e) => { e.preventDefault(); move(e.touches[0].clientX) }}
        onTouchEnd={() => setDragging(false)}
      >
        <ChevronsLeftRight className="size-4 text-violet-600" />
      </div>
      {/* Labels */}
      <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg pointer-events-none">ДО</span>
      <span className="absolute bottom-4 right-4 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg pointer-events-none">ПОСЛЕ</span>
    </div>
  )
}

const Results = () => {
  const t = useTranslations("results")
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(RESULTS.length / PER_PAGE)
  const visible = RESULTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <section id="results" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-lg">
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

        <div className="grid md:grid-cols-3 gap-8">
          {visible.map((result) => (
            <Card key={result.id} className="overflow-hidden border-gray-100">
              {result.before && result.after ? (
                <BeforeAfterSlider before={result.before} after={result.after} area={result.area} />
              ) : (
                <div className="aspect-4/5 bg-linear-to-br from-violet-100 to-violet-50 flex flex-col items-center justify-center gap-2 text-violet-400">
                  <div className="w-16 h-16 rounded-full bg-violet-200/60" />
                  <span className="text-sm">До / После</span>
                </div>
              )}
              <CardContent className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{result.area}</h3>
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{result.percent}</span>
                </div>
                <p className="text-sm text-gray-400">{result.months} · {t("therapy")}</p>
              </CardContent>
            </Card>
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

        <p className="text-center text-gray-400 text-sm mt-8">{t("disclaimer")}</p>
      </div>
    </section>
  )
}

export default Results
