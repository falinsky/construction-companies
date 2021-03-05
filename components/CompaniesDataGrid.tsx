import { Company } from '../lib/api-client/client'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import { Avatar } from '@material-ui/core'

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
  return (
    <DataGrid
      rows={companies}
      columns={columns}
      autoHeight
      pageSize={10}
      disableSelectionOnClick
      columnBuffer={columns.length}
      loading={isLoading}
      error={isError || null}
    />
  )
}
