export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export const SCHEDULE: { dayKey: DayKey; hours: string | null }[] = [
  { dayKey: "mon", hours: "08:00–18:00" },
  { dayKey: "tue", hours: "15:00–19:00" },
  { dayKey: "wed", hours: "08:00–18:00" },
  { dayKey: "thu", hours: "15:00–19:00" },
  { dayKey: "fri", hours: "08:00–18:00" },
  { dayKey: "sat", hours: "09:00–13:00" },
  { dayKey: "sun", hours: null },
]
