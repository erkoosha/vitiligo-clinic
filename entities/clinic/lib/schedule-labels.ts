import { type DayKey, SCHEDULE } from "@/entities/clinic/model"

type TranslateDay = (key: `days.${DayKey}`) => string

export const getScheduleDayLabels = (t: TranslateDay): Record<DayKey, string> =>
  SCHEDULE.reduce(
    (labels, { dayKey }) => ({
      ...labels,
      [dayKey]: t(`days.${dayKey}`),
    }),
    {} as Record<DayKey, string>
  )
