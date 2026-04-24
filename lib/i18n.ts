export const LANGUAGES = ["EN", "RU", "KZ"] as const
export type Language = (typeof LANGUAGES)[number]
