export const isoDate = (d: Date): string => d.toISOString().split("T")[0]

export const normalizeStr = (s: string): string => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()