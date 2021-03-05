import { render, screen } from '../test/testUtils'
import CompaniesDataGrid from './CompaniesDataGrid'
import { Company } from '../lib/api-client/client'

describe('CompaniesDataGrid', () => {
  test.each([[undefined], [[]]])('renders no companies data', (companies) => {
    render(<CompaniesDataGrid companies={companies} />)

    screen.getByText('No rows')
  })

  test('renders loading indicator', () => {
    render(<CompaniesDataGrid isLoading />)

    screen.getByRole('progressbar')
  })

  test('renders error', () => {
    render(<CompaniesDataGrid isError />)

    screen.getByText('An error occurred.')
  })

  test('renders companies data', () => {
    const companies: Company[] = [
      {
        id: 1,
        name: 'Name 1',
        logo: 'Logo 1',
        specialty: 'Specialty 1',
        city: 'City 1',
      },
      {
        id: 2,
        name: 'Name 2',
        logo: 'Logo 2',
        specialty: 'Specialty 2',
        city: 'City 2',
      },
    ]
    render(<CompaniesDataGrid companies={companies} />)

    for (const company of companies) {
      screen.getByRole('cell', { name: company.name })
      screen.getByAltText('logo for ' + company.name)
      screen.getByRole('cell', { name: company.specialty })
      screen.getByRole('cell', { name: company.city })
    }
  })
})