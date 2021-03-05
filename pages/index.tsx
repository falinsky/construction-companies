import Head from 'next/head'
import { useQuery } from 'react-query'
import { getCompanies } from '../lib/api-client/client'
import CompaniesDataGrid from '../components/CompaniesDataGrid'
import { Typography } from '@material-ui/core'

export const Home = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery('companies', () =>
    getCompanies()
  )

  return (
    <>
      <Head>
        <title>Construction Companies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="h1">Construction Companies</Typography>
        <CompaniesDataGrid
          companies={data}
          isLoading={isLoading}
          isError={isError}
        />
      </main>
    </>
  )
}

export default Home
