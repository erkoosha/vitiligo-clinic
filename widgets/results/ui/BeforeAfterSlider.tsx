"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronsLeftRight } from "lucide-react"

type BeforeAfterSliderProps = {
  before: string
  after: string
  area: string
  beforeLabel: string
  afterLabel: string
}

export const BeforeAfterSlider = ({
  before,
  after,
  area,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const move = (clientX: number) => {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return

    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100
    setPosition(Math.min(100, Math.max(0, nextPosition)))
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/5 cursor-col-resize select-none overflow-hidden touch-none"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        setDragging(true)
        move(event.clientX)
      }}
      onPointerMove={(event) => {
        if (dragging) move(event.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image src={after} alt={`${area}: ${afterLabel}`} fill className="object-cover" sizes="33vw" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={before} alt={`${area}: ${beforeLabel}`} fill className="object-cover" sizes="33vw" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
        style={{ left: `${position}%` }}
      />
      <div
        className="absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="size-4 text-violet-600" />
      </div>
      <span className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  )
}
