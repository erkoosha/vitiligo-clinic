"use server"

import { cookies } from "next/headers"

const VALID_LOCALES = ["ru", "kz", "en"] as const
type Locale = (typeof VALID_LOCALES)[number]

export const setLocaleCookie = async (locale: string): Promise<void> => {
  const safe: Locale = VALID_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "ru"
  const cookieStore = await cookies()
  cookieStore.set("NEXT_LOCALE", safe, { path: "/", maxAge: 31536000 })
}
