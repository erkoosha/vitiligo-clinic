"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { LocaleSwitcher } from "@/features/locale-switcher"
import { type Locale } from "@/shared/config/i18n"
import { type NavItem } from "@/shared/config/navigation"
import { Button } from "@/shared/ui/button"

type MobileMenuProps = {
  currentLocale: Locale
  menuLabel: string
  navLinks: NavItem[]
}

export const MobileMenu = ({
  currentLocale,
  menuLabel,
  navLinks,
}: MobileMenuProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="h-11 w-11 touch-manipulation text-white hover:bg-white/10 hover:text-white md:hidden"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-100 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            aria-label={menuLabel}
            onClick={() => setOpen(false)}
          />

          <aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,calc(100vw-1rem))] flex-col border-l border-gray-100 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {menuLabel}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 px-4 py-6">
              <LocaleSwitcher
                currentLocale={currentLocale}
                mode="buttons"
                onAfterChange={() => setOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
