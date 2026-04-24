import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

const LOCALES = ["ru", "kz", "en"] as const
type Locale = (typeof LOCALES)[number]

const isValidLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as Locale)

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get("NEXT_LOCALE")?.value ?? "ru"
  const locale: Locale = isValidLocale(raw) ? raw : "ru"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
