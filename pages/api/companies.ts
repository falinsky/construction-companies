import { NextApiRequest, NextApiResponse } from 'next'
import companiesData from '../../data/companies.json'

const companiesHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(404).json({ message: 'Not Found' })
  } else {
    res.status(200).json(companiesData)
  }
}

export default companiesHandler
