import { render, screen } from '../test/testUtils'
import CompaniesDataGrid from './CompaniesDataGrid'
import { Company } from '../lib/api-client/client'
import userEvent from '@testing-library/user-event'

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

  test('search by name', () => {
    const company1 = {
      id: 1,
      name: 'Name 1',
      logo: 'Logo 1',
      specialty: 'Specialty 1',
      city: 'City 1',
    }
    const company2 = {
      id: 2,
      name: 'Name 2',
      logo: 'Logo 2',
      specialty: 'Specialty 2',
      city: 'City 2',
    }

    render(<CompaniesDataGrid companies={[company1, company2]} />)

    userEvent.type(screen.getByPlaceholderText('Search by name'), company1.name)
    screen.getByRole('cell', { name: company1.name })
    expect(screen.queryByRole('cell', { name: company2.name })).toBeNull()
  })

  test('render all available specialties as checked checkboxes', () => {
    const company1 = {
      id: 1,
      name: 'Name 1',
      logo: 'Logo 1',
      specialty: 'Specialty 1',
      city: 'City 1',
    }
    const company2 = {
      id: 2,
      name: 'Name 2',
      logo: 'Logo 2',
      specialty: 'Specialty 2',
      city: 'City 2',
    }

    render(<CompaniesDataGrid companies={[company1, company2]} />)

    expect(screen.getByLabelText(company1.specialty)).toHaveProperty(
      'checked',
      true
    )
    expect(screen.getByLabelText(company2.specialty)).toHaveProperty(
      'checked',
      true
    )
  })

  test('not render companies with not selected specialties', () => {
    const company1 = {
      id: 1,
      name: 'Name 1',
      logo: 'Logo 1',
      specialty: 'Specialty 1',
      city: 'City 1',
    }
    const company2 = {
      id: 2,
      name: 'Name 2',
      logo: 'Logo 2',
      specialty: 'Specialty 2',
      city: 'City 2',
    }

    render(<CompaniesDataGrid companies={[company1, company2]} />)

    userEvent.click(screen.getByLabelText(company1.specialty))
    expect(screen.queryByRole('cell', { name: company1.specialty })).toBeNull()
  })
})
