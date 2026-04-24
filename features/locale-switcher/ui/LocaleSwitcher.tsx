"use client"

import { useTransition } from "react"
import { Check, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

import { setLocaleCookie } from "@/features/locale-switcher/actions"
import { LANGUAGE_OPTIONS, type Locale } from "@/shared/config/i18n"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { cn } from "@/shared/lib/cn"

type LocaleSwitcherProps = {
  currentLocale: Locale
  mode: "dropdown" | "buttons"
  onAfterChange?: () => void
}

export const LocaleSwitcher = ({
  currentLocale,
  mode,
  onAfterChange,
}: LocaleSwitcherProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const changeLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      onAfterChange?.()
      return
    }

    startTransition(() => {
      void setLocaleCookie(locale).then(() => {
        router.refresh()
        onAfterChange?.()
      })
    })
  }

  if (mode === "buttons") {
    return (
      <div className="flex gap-1.5">
        {LANGUAGE_OPTIONS.map(({ locale, label }) => (
          <Button
            key={locale}
            type="button"
            size="sm"
            variant={currentLocale === locale ? "default" : "outline"}
            onClick={() => changeLocale(locale)}
            disabled={isPending}
            className="rounded-full text-sm"
            aria-pressed={currentLocale === locale}
          >
            {label}
          </Button>
        ))}
      </div>
    )
  }

  const currentLabel =
    LANGUAGE_OPTIONS.find(({ locale }) => locale === currentLocale)?.label ??
    currentLocale.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          className="h-12 gap-1.5 rounded-2xl bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          <span className="text-sm font-semibold">{currentLabel}</span>
          <ChevronDown className="size-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-24">
        {LANGUAGE_OPTIONS.map(({ locale, label }) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            className={cn(
              "justify-between",
              currentLocale === locale && "font-semibold text-violet-600"
            )}
          >
            {label}
            {currentLocale === locale && <Check className="size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
