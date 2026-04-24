import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"

import { LocaleSwitcher } from "@/features/locale-switcher"
import { DEFAULT_LOCALE, isLocale } from "@/shared/config/i18n"
import { NAV_ITEMS, type NavItem } from "@/shared/config/navigation"
import { MobileMenu } from "@/widgets/header/ui/MobileMenu"

const Header = async () => {
  const t = await getTranslations("header")
  const rawLocale = await getLocale()
  const currentLocale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const navLinks: NavItem[] = NAV_ITEMS.map(({ href, labelKey }) => ({
    href,
    label: t(labelKey as Parameters<typeof t>[0]),
  }))

  return (
    <header className="absolute inset-x-0 top-0 z-[70]">
      <div className="container mx-auto flex items-center justify-between px-6 pt-6">
        <Link
          href="/"
          className="flex h-12 shrink-0 items-center gap-3 rounded-2xl bg-white/10 px-5 backdrop-blur-sm transition-colors duration-150 hover:bg-white/15"
        >
          <Image
            src="/logo.png"
            alt={t("logo.title")}
            width={44}
            height={44}
            className="object-contain opacity-80"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-white">
              {t("logo.title")}
            </span>
            <span className="text-xs text-white/60">{t("logo.subtitle")}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav
            aria-label={t("menuLabel")}
            className="flex h-12 items-center gap-8 rounded-2xl bg-white/10 px-6 backdrop-blur-sm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-white/85 transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LocaleSwitcher currentLocale={currentLocale} mode="dropdown" />
        </div>

        <MobileMenu
          currentLocale={currentLocale}
          menuLabel={t("menuLabel")}
          navLinks={navLinks}
        />
      </div>
    </header>
  )
}

export default Header
