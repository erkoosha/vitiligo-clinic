import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { DOCTOR, STATS, MILESTONES, PATENT_KEYS, PUB_KEYS, AWARD_KEYS, MEM_KEYS } from "@/lib/about"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, BookOpen, Award, Users } from "lucide-react"

const About = async () => {
  const t = await getTranslations("about")

  return (
    <section id="about">

      {/* Part 1: Hero — white */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Doctor photo */}
            <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-violet-50">
              <Image
                src={DOCTOR.photo}
                alt={DOCTOR.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent">
                <div className="p-6 w-full">
                  <p className="text-white font-semibold text-lg leading-tight">{DOCTOR.name}</p>
                  <p className="text-white/70 text-sm">{t("doctorTitle")}</p>
                </div>
              </div>
            </div>

            {/* Intro */}
            <div className="pt-2">
              <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">{t("label")}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">{t("title")}</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">{t("description")}</p>
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <Card key={stat.key} className="bg-violet-50 border-violet-100 text-center">
                    <CardContent className="p-5">
                      <p className="text-3xl font-bold text-violet-600 mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 leading-snug">{t(`stats.${stat.key}`)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Part 2: Milestones — violet */}
      <div className="bg-violet-600 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {MILESTONES.map(({ year, key }) => (
              <div key={year} className="border-l-2 border-white/30 pl-6">
                <p className="text-4xl font-bold text-white mb-3">{year}</p>
                <p className="text-violet-200 text-sm leading-relaxed">{t(key as Parameters<typeof t>[0])}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 3: Bio details — gray-50 */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">{t("bioTitle")}</h3>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left: Patents + Publications */}
            <div className="flex flex-col gap-6">

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <FileText className="size-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{t("patentsTitle")}</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {PATENT_KEYS.map((key) => (
                    <li key={key} className="flex gap-2.5 text-sm text-gray-500 leading-relaxed">
                      <span className="text-violet-400 shrink-0 mt-0.5">—</span>
                      {t(key as Parameters<typeof t>[0])}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <BookOpen className="size-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{t("publicationsTitle")}</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {PUB_KEYS.map((key) => (
                    <li key={key} className="flex gap-2.5 text-sm text-gray-500 leading-relaxed">
                      <span className="text-violet-400 shrink-0 mt-0.5">—</span>
                      {t(key as Parameters<typeof t>[0])}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right: Awards + Memberships */}
            <div className="flex flex-col gap-6">

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <Award className="size-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{t("awardsTitle")}</h4>
                </div>
                <div className="flex flex-col gap-4">
                  {AWARD_KEYS.map((key) => (
                    <div key={key} className="flex gap-3 items-start">
                      <span className="text-amber-400 text-base leading-none mt-0.5 shrink-0">★</span>
                      <p className="text-sm text-gray-500 leading-relaxed">{t(key as Parameters<typeof t>[0])}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <Users className="size-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{t("membershipsTitle")}</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {MEM_KEYS.map((key) => (
                    <li key={key} className="flex gap-2.5 text-sm text-gray-500 leading-relaxed">
                      <span className="text-violet-400 shrink-0 mt-0.5">—</span>
                      {t(key as Parameters<typeof t>[0])}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default About
