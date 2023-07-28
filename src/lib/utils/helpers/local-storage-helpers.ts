export const getLSData = (key: string) => {
  const value = localStorage.getItem(key)

  return value ? JSON.parse(value) : null
}

export interface ILSData {
  name: string
  height: number
  mass: number
  hair_color: string
}

export const setLSData = (key: string, data: ILSData[] | never[]) =>
  localStorage.setItem(key, JSON.stringify(data))

export const deleteLSData = (key: string) => localStorage.removeItem(key)
