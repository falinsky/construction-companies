import { Company } from '../lib/api-client/client'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  TextField,
  Toolbar,
} from '@material-ui/core'
import React, { useMemo, useState } from 'react'

const columns: GridColDef[] = [
  {
    field: 'logo',
    headerName: 'Logo',
    renderCell: (params: GridCellParams): JSX.Element => {
      return (
        <Avatar
          src={params.row.logo}
          alt={`logo for ${params.row.name}`}
          variant="rounded"
        />
      )
    },
    sortable: false,
    disableColumnMenu: true,
  },
  { field: 'name', headerName: 'Name', flex: 2, disableColumnMenu: true },
  {
    field: 'specialty',
    headerName: 'Specialty',
    flex: 1,
    disableColumnMenu: true,
  },
  { field: 'city', headerName: 'City', flex: 2, disableColumnMenu: true },
]

interface CompaniesDataGridProps {
  companies?: Company[]
  isLoading?: boolean
  isError?: boolean
}

export default function CompaniesDataGrid({
  companies = [],
  isLoading = false,
  isError = false,
}: CompaniesDataGridProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const specialties = useMemo(
    () => Array.from(new Set(companies.map((c) => c.specialty))),
    [companies]
  )

  const [specialtiesState, setSpecialtiesState] = useState<
    Record<string, boolean>
  >({})

  const specialtyEnabled = (specialty: string) =>
    !(specialty in specialtiesState) || specialtiesState[specialty]

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(normalizedSearchTerm) &&
      specialtyEnabled(c.specialty)
  )

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialtiesState((state) => ({
      ...state,
      [event.target.name]: event.target.checked,
    }))
  }

  return (
    <>
      <Toolbar>
        {specialties.map((specialty) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={specialtyEnabled(specialty)}
                onChange={handleCheckboxChange}
                name={specialty}
              />
            }
            label={specialty}
            key={specialty}
          />
        ))}
        <TextField
          placeholder="Search by name"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Toolbar>

      <DataGrid
        rows={filteredCompanies}
        columns={columns}
        autoHeight
        pageSize={10}
        disableSelectionOnClick
        columnBuffer={columns.length}
        loading={isLoading}
        error={isError || null}
      />
    </>
  )
}
