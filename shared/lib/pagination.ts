export const getTotalPages = (itemsCount: number, perPage: number) =>
  Math.max(1, Math.ceil(itemsCount / perPage))

export const getPageItems = <T,>(
  items: readonly T[],
  page: number,
  perPage: number
) => items.slice(page * perPage, (page + 1) * perPage)
