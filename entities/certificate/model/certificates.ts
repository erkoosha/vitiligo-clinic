export type Certificate = {
  id: number
  image: string
}

export const CERTIFICATES: Certificate[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  image: `/certificate/OF DERMATOLOGY-${String(i + 1).padStart(2, "0")}.png`,
}))
