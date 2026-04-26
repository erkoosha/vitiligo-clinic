type Doctor = {
  name: string
  photo: string | null
}

export const DOCTOR: Doctor = {
  name: "Касымханова Алия Айдарбековна",
  photo: "/Aliya.jpeg",
}

export const STATS = [
  { value: "20", key: "years" as const },
  { value: "10", key: "transplants" as const },
  { value: "С 2026", key: "publications" as const },
] as const

export const MILESTONES = [
  { year: "2006", key: "milestone2006" },
  { year: "2010", key: "milestone2010" },
  { year: "2015", key: "milestone2015" },
  { year: "2023", key: "milestone2023" },
  { year: "2026", key: "milestone2026" },
] as const

export const PATENT_KEYS = ["patent1", "patent2"] as const
export const PUB_KEYS = ["pub1", "pub2", "pub3", "pub4", "pub5"] as const
export const AWARD_KEYS = ["award1", "award2", "award3"] as const
export const MEM_KEYS = ["mem1", "mem2", "mem3", "mem4"] as const
