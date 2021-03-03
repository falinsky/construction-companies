export interface Company {
  id: number
  name: string
  logo: string
  specialty: string
  city: string
}

export async function getCompanies(): Promise<Company[]> {
  const response = await fetch('/api/companies')
  if (!response.ok) {
    throw new Error('Response was not ok')
  }

  return response.json()
}
