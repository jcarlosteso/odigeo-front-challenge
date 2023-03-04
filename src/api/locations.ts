export interface LocationData {
  name: string;
}

export const getAllLocations = async (): Promise<LocationData[]> => {
  const response = await fetch('/locations')
  const data = await response.json()

  return data.map((name: string):LocationData => ({ name }))
}