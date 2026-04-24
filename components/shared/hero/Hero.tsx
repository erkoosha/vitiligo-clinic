"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Header from "@/components/shared/header/Header"

const fadeUp = (delay = 0) => ({
  initial: { y: 24 },
  animate: { y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
})

const Hero = () => {
  const t = useTranslations("hero")

  return (
    <section
      className="relative min-h-svh flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/heroTwo.jpg')" }}
    >
      <Header />

      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-black/80 via-black/55 to-black/15" />

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 mt-auto pb-12 md:pb-24 pt-32 md:pt-0">
        <div className="max-w-2xl">

          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6"
          >
            {t("titleLine1")}
            <br />
            <span className="text-violet-300">{t("titleLine2")}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="text-base md:text-lg text-white/65 leading-relaxed max-w-sm mb-8"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...fadeUp(0.32)}>
            <Button
              className="rounded-full px-7 py-3.5 h-auto bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 hover:scale-105 active:scale-100 transition-all duration-200"
              asChild
            >
              <a href="https://wa.me/77474213961" target="_blank" rel="noopener noreferrer">
                {t("cta")}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

