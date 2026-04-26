import { getTranslations } from "next-intl/server"

import Header from "@/widgets/header"
import { Button } from "@/shared/ui/button"
import { PHONES } from "@/entities/clinic/model"

const Hero = async () => {
  const t = await getTranslations("hero")

  return (
    <section
      className="relative flex min-h-svh flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/heroTwo.jpg')" }}
    >
      <Header />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-black/15" />

      <div className="container relative z-10 mx-auto mt-auto px-6 pb-12 pt-32 md:px-12 md:pb-24 md:pt-0">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {t("titleLine1")}
            <br />
            <span className="text-violet-300">{t("titleLine2")}</span>
          </h1>

          <p className="mb-8 max-w-sm text-base leading-relaxed text-white/65 md:text-lg">
            {t("subtitle")}
          </p>

          <Button
            className="h-auto rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-white/90 active:scale-100"
            asChild
          >
            <a
              href={PHONES[0].whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
