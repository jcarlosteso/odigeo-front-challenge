export const isoDate = (d: Date): string => d.toISOString().split("T")[0]

export const normalizeStr = (s: string): string => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()

export const hhmm = (from: Date, to: Date) => {
  const hours = Math.floor((to.valueOf() - from.valueOf()) / (1000 * 60 * 60))
  const minutes = (to.valueOf() - from.valueOf()) % (1000 * 60)

  return ({ hours, minutes })
}

const DAY_MSECS = 24 * 60 * 60 * 1000

export const plusDays = (from: Date, to: Date): number => {
  const ddFrom = from.getDate()
  const mmFrom = from.getMonth() + 1
  const ddTo = to.getDate()
  const mmTo = to.getMonth() + 1

  if (mmFrom === mmTo) return (ddTo - ddFrom)
  const lastDay = new Date(new Date(`${to.getFullYear()}-${mmTo}-01`).valueOf() - DAY_MSECS)
  return (lastDay.getDate() - ddFrom + ddTo)
}