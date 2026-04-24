import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { PHONES, SOCIALS, SCHEDULE } from "@/entities/clinic/model"
import { getScheduleDayLabels } from "@/entities/clinic/lib/schedule-labels"
import { NAV_ITEMS } from "@/shared/config/navigation"
import { InstagramIcon } from "@/shared/ui/icons"

const Footer = async () => {
  const t = await getTranslations("footer")
  const tHeader = await getTranslations("header")
  const tContact = await getTranslations("contact")

  const navLinks = NAV_ITEMS.map(({ href, labelKey }) => ({
    href,
    label: tHeader(labelKey as Parameters<typeof tHeader>[0]),
  }))
  const dayLabels = getScheduleDayLabels(t)

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Logo + description + social */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="opacity-80" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{tHeader("logo.title")}</p>
                <p className="text-[11px] text-white/50">{tHeader("logo.subtitle")}</p>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5">{t("description")}</p>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>{s.username}</span>
              </a>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-5">{t("navigation")}</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-5">{t("schedule")}</p>
            <div className="flex flex-col gap-2">
              {SCHEDULE.map(({ dayKey, hours }) => (
                <div key={dayKey} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/60">{dayLabels[dayKey]}</span>
                  {hours ? (
                    <span className="text-white tabular-nums">{hours}</span>
                  ) : (
                    <span className="text-white/30">{t("closed")}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-5">{tContact("phones")}</p>
            <div className="flex flex-col gap-2 mb-6">
              {PHONES.map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {phone.number}
                </a>
              ))}
            </div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">{tContact("address")}</p>
            <p className="text-sm text-white/60 leading-snug">{tContact("addressText")}</p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/30">
          <p>© {new Date().getFullYear()} {tHeader("logo.title")}. {t("copyright")}.</p>
          <p>
            {t("madeBy")}{" "}
            <a
              href="https://www.instagram.com/dreamoferkosha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              @dreamoferkosha
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
