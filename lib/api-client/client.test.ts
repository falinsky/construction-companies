import 'whatwg-fetch'
import { when } from 'jest-when'
import { getCompanies } from './client'

describe('getCompanies()', () => {
  const fetchSpy = jest.spyOn(window, 'fetch')

  afterEach(fetchSpy.mockReset)

  test('Exception was thrown', async () => {
    when(fetchSpy)
      .calledWith('/api/companies')
      .mockImplementationOnce(() => {
        throw new Error('Some exception thrown')
      })

    await expect(getCompanies()).rejects.toThrow(/^Some exception thrown$/)
  })

  test('Response was not ok', async () => {
    when(fetchSpy)
      .calledWith('/api/companies')
      .mockResolvedValueOnce({
        ok: false,
      } as Response)

    await expect(getCompanies()).rejects.toThrow(/^Response was not ok$/)
  })

  test.each([
    [[]],
    [
      [
        {
          id: 1,
          name: 'Name 1',
          logo: 'Logo 1',
          specialty: 'Specialty 1',
          city: 'City 1',
        },
      ],
    ],
    [
      [
        {
          id: 2,
          name: 'Name 2',
          logo: 'Logo 2',
          specialty: 'Specialty 2',
          city: 'City 2',
        },
        {
          id: 3,
          name: 'Name 3',
          logo: 'Logo 3',
          specialty: 'Specialty 3',
          city: 'City 3',
        },
      ],
    ],
  ])('Data retrieved', async (data) => {
    when(fetchSpy)
      .calledWith('/api/companies')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...data],
      } as Response)

    const companies = await getCompanies()

    expect(companies).toEqual([...data])
  })
})
