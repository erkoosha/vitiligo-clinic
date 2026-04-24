export const DOCTOR = {
  name: "Касымханова Алия Айдарбековна",
  photo: "/doctor.jpg",
} as const

export const STATS = [
  { value: "38+", key: "years" as const },
  { value: "180+", key: "transplants" as const },
  { value: "50+", key: "publications" as const },
] as const

export const MILESTONES = [
  { year: "2006", key: "milestone2006" },
  { year: "2010", key: "milestone2010" },
  { year: "2015", key: "milestone2015" },
  { year: "2023", key: "milestone2023" },
] as const

export const PATENT_KEYS = ["patent1", "patent2"] as const
export const PUB_KEYS = ["pub1", "pub2", "pub3", "pub4", "pub5"] as const
export const AWARD_KEYS = ["award1", "award2", "award3"] as const
export const MEM_KEYS = ["mem1", "mem2", "mem3", "mem4"] as const
