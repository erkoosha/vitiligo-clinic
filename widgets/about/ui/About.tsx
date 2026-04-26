import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Award, BookOpen, FileText, Users, type LucideIcon } from "lucide-react"

import {
  AWARD_KEYS,
  DOCTOR,
  MEM_KEYS,
  MILESTONES,
  PATENT_KEYS,
  PUB_KEYS,
  STATS,
} from "@/entities/doctor/model"
import { Card, CardContent } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"
import { cn } from "@/shared/lib/cn"

type BioCardProps = {
  icon: LucideIcon
  title: string
  items: readonly string[]
  tone?: "violet" | "amber"
}

const BioCard = ({
  icon: Icon,
  title,
  items,
  tone = "violet",
}: BioCardProps) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6">
    <div className="mb-5 flex items-center gap-3">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tone === "amber"
            ? "bg-amber-50 text-amber-500"
            : "bg-violet-50 text-violet-600"
        )}
      >
        <Icon className="size-5" />
      </div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
    </div>
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-500">
          <span
            className={cn(
              "mt-0.5 shrink-0",
              tone === "amber" ? "text-amber-400" : "text-violet-400"
            )}
          >
            {tone === "amber" ? "*" : "-"}
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

const About = async () => {
  const t = await getTranslations("about")
  const bioCards = [
    {
      title: t("patentsTitle"),
      icon: FileText,
      items: PATENT_KEYS.map((key) => t(key as Parameters<typeof t>[0])),
    },
    {
      title: t("publicationsTitle"),
      icon: BookOpen,
      items: PUB_KEYS.map((key) => t(key as Parameters<typeof t>[0])),
    },
    {
      title: t("awardsTitle"),
      icon: Award,
      items: AWARD_KEYS.map((key) => t(key as Parameters<typeof t>[0])),
      tone: "amber" as const,
    },
    {
      title: t("membershipsTitle"),
      icon: Users,
      items: MEM_KEYS.map((key) => t(key as Parameters<typeof t>[0])),
    },
  ] satisfies BioCardProps[]

  return (
    <section id="about">
      <div className="bg-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid items-start gap-16 md:grid-cols-2">
            <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-violet-50">
              {DOCTOR.photo ? (
                <>
                  <Image
                    src={DOCTOR.photo}
                    alt={DOCTOR.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent">
                    <div className="w-full p-6">
                      <p className="text-lg font-semibold leading-tight text-white">
                        {DOCTOR.name}
                      </p>
                      <p className="text-sm text-white/70">{t("doctorTitle")}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={96}
                    height={96}
                    className="opacity-80"
                  />
                  <div>
                    <p className="text-lg font-semibold leading-tight text-gray-900">
                    {DOCTOR.name}
                  </p>
                    <p className="mt-1 text-sm text-gray-500">{t("doctorTitle")}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <SectionHeading label={t("label")} title={t("title")} />
              <p className="mb-12 mt-6 text-lg leading-relaxed text-gray-500">
                {t("description")}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <Card
                    key={stat.key}
                    className="border-violet-100 bg-violet-50 text-center"
                  >
                    <CardContent className="p-5">
                      <p className="mb-1 text-3xl font-bold text-violet-600">
                        {stat.value}
                      </p>
                      <p className="text-xs leading-snug text-gray-500">
                        {t(`stats.${stat.key}`)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-600 to-violet-700 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="mb-16 text-center text-3xl font-bold text-white">
            Ключевые этапы
          </h2>
          
          {/* Desktop timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-8 h-1 bg-white/20"></div>
              
              {/* Timeline items */}
              <div className="relative grid grid-cols-4 gap-8">
                {MILESTONES.map(({ year, key }, index) => (
                  <div key={year} className="flex flex-col items-center">
                    {/* Year circle */}
                    <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-violet-600 shadow-lg">
                      <p className="text-xl font-bold">{year}</p>
                    </div>
                    {/* Description */}
                    <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                      <p className="text-sm leading-relaxed text-white">
                        {t(key as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-8">
            {MILESTONES.map(({ year, key }, index) => (
              <div key={year} className="flex gap-6">
                {/* Timeline point and line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-violet-600 font-bold shadow-lg">
                    {year}
                  </div>
                  {index < MILESTONES.length - 1 && (
                    <div className="mt-2 h-12 w-1 bg-white/20"></div>
                  )}
                </div>
                {/* Description */}
                <div className="flex-1 pt-2">
                  <p className="text-sm leading-relaxed text-white">
                    {t(key as Parameters<typeof t>[0])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="mb-12 text-3xl font-bold text-gray-900">
            {t("bioTitle")}
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {[bioCards.slice(0, 2), bioCards.slice(2)].map((column, index) => (
              <div key={index} className="flex flex-col gap-6">
                {column.map((card) => (
                  <BioCard key={card.title} {...card} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
