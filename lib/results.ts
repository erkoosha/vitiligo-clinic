export type Result = {
  id: number
  area: string
  months: string
  percent: string
  before?: string
  after?: string
}

export const RESULTS: Result[] = [
  { id: 1, area: "Лицо", months: "3 месяца", percent: "60%" },
  { id: 2, area: "Руки", months: "6 месяцев", percent: "75%" },
  { id: 3, area: "Шея и декольте", months: "9 месяцев", percent: "85%" },
  { id: 4, area: "Спина", months: "12 месяцев", percent: "90%" },
  { id: 5, area: "Ноги", months: "8 месяцев", percent: "70%" },
  { id: 6, area: "Туловище", months: "10 месяцев", percent: "80%" },
]
