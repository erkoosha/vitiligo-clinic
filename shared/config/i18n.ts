export const DEFAULT_LOCALE = "ru"

export const LOCALES = ["ru", "kz", "en"] as const
export type Locale = (typeof LOCALES)[number]

export const LANGUAGE_OPTIONS = [
  { locale: "en", label: "EN" },
  { locale: "ru", label: "RU" },
  { locale: "kz", label: "KZ" },
] as const satisfies ReadonlyArray<{ locale: Locale; label: string }>

export const isLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as Locale)
