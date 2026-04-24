"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { setLocaleCookie } from "@/app/actions"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LANGUAGES } from "@/lib/i18n"
import { NAV_HREFS } from "@/lib/navigation"

const Header = () => {
  const t = useTranslations("header")
  const currentLocale = useLocale()
  const router = useRouter()

  const switchLocale = async (lang: string) => {
    await setLocaleCookie(lang.toLowerCase())
    router.refresh()
  }

  const NAV_LINKS = [
    { label: t("nav.about"), href: NAV_HREFS.about },
    { label: t("nav.certificates"), href: NAV_HREFS.certificates },
    { label: t("nav.results"), href: NAV_HREFS.results },
    { label: t("nav.contacts"), href: NAV_HREFS.contacts },
  ]

  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="container mx-auto px-6 pt-6 flex items-center justify-between">

        {/* Логотип */}
        <Link
          href="/"
          className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 h-12 shrink-0 hover:bg-white/15 transition-colors duration-150"
        >
          <Image
            src="/logo.png"
            alt={t("logo.title")}
            width={44}
            height={44}
            className="object-contain opacity-80"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-white tracking-tight">
              {t("logo.title")}
            </span>
            <span className="text-xs text-white/60">
              {t("logo.subtitle")}
            </span>
          </div>
        </Link>

        {/* Desktop: навигация + языки */}
        <div className="hidden md:flex items-center gap-5">
          <NavigationMenu className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 h-12">
            <NavigationMenuList className="gap-8">
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className="bg-transparent hover:bg-transparent focus:bg-transparent text-base text-white/85 hover:text-white transition-colors duration-150 p-0 rounded-none"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 h-12 text-white hover:bg-white/20 hover:text-white gap-1.5"
              >
                <span className="text-sm font-semibold">{currentLocale.toUpperCase()}</span>
                <ChevronDown className="size-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-24">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={currentLocale === lang.toLowerCase() ? "font-semibold text-violet-600" : ""}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile: бургер */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden text-white hover:bg-white/10 w-11 h-11"
            >
              <Menu className="size-6" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-64 bg-white border-l border-gray-100 p-0 flex flex-col"
          >
            <SheetTitle className="sr-only">{t("menuLabel")}</SheetTitle>

            <div className="px-6 pt-8 pb-4 border-b border-gray-100">
              <p className="text-gray-400 text-xs uppercase tracking-widest">{t("menuLabel")}</p>
            </div>

            <nav className="flex flex-col px-4 pt-4 gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-[15px] font-medium text-gray-700 hover:text-gray-900 rounded-xl h-auto py-2.5"
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </Button>
                </SheetClose>
              ))}
            </nav>

            <div className="px-4 py-6 border-t border-gray-100 flex gap-1.5">
              {LANGUAGES.map((lang) => (
                <SheetClose asChild key={lang}>
                  <Button
                    size="sm"
                    variant={currentLocale === lang.toLowerCase() ? "default" : "outline"}
                    onClick={() => switchLocale(lang)}
                    className="rounded-full text-sm"
                  >
                    {lang}
                  </Button>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
