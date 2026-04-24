"use server"

import { cookies } from "next/headers"

import { DEFAULT_LOCALE, isLocale } from "@/shared/config/i18n"

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export const setLocaleCookie = async (locale: string): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set("NEXT_LOCALE", isLocale(locale) ? locale : DEFAULT_LOCALE, {
    path: "/",
    maxAge: YEAR_IN_SECONDS,
    sameSite: "lax",
  })
}
