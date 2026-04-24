export type Result = {
  id: number
  areaKey: "face" | "hands" | "neck" | "back" | "legs" | "body"
  durationKey: "threeMonths" | "sixMonths" | "nineMonths" | "twelveMonths" | "eightMonths" | "tenMonths"
  percent: string
  before?: string
  after?: string
}

export const RESULTS: Result[] = [
  { id: 1, areaKey: "face", durationKey: "threeMonths", percent: "60%" },
  { id: 2, areaKey: "hands", durationKey: "sixMonths", percent: "75%" },
  { id: 3, areaKey: "neck", durationKey: "nineMonths", percent: "85%" },
  { id: 4, areaKey: "back", durationKey: "twelveMonths", percent: "90%" },
  { id: 5, areaKey: "legs", durationKey: "eightMonths", percent: "70%" },
  { id: 6, areaKey: "body", durationKey: "tenMonths", percent: "80%" },
]
