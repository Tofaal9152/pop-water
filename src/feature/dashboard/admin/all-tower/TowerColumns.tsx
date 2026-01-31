import DeleteAction from '@/hooks/DeleteAction'
import { ColumnDef } from '@tanstack/react-table'
import { TOWER_QUERY_KEY } from '../service/tower.service'
import { AppDialog } from '@/components/web/AppDialog'
import TowerForm from '../tower-management/TowerForm'
import TowerDetails from './TowerDetails'

export const TowerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <div className="max-w-[260px] truncate">{row.getValue('location')}</div>
    ),
  },
  {
    accessorKey: 'village',
    header: 'Village',
    cell: ({ row }) => <div>{row.getValue('village')}</div>,
  },
  {
    accessorKey: 'water_harvest_per_week',
    header: 'Water / Week (L)',
    cell: ({ row }) => (
      <div>
        {Number(row.getValue('water_harvest_per_week')).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'co2_offset_per_week',
    header: 'CO₂ Offset / Week (T)',
    cell: ({ row }) => (
      <div>{Number(row.getValue('co2_offset_per_week')).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'hours_saved_per_day',
    header: 'Hours Saved / Day',
    cell: ({ row }) => <div>{row.getValue('hours_saved_per_day')}</div>,
  },
  {
    accessorKey: 'lives_improved',
    header: 'Lives Improved',
    cell: ({ row }) => (
      <div>{Number(row.getValue('lives_improved')).toLocaleString()}</div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        {/* Edit */}
        <AppDialog
          mode="edit"
          title="Edit Tower"
          description="Update water tower information"
          size='xl'
        >
          <TowerForm mode="edit" data={row.original} />
        </AppDialog>
        <AppDialog
          mode="view"
          title="View Tower"
          description="View water tower information"
          size='xl'
        >
         <TowerDetails tower={row.original} />
        </AppDialog>

        {/* Delete */}
        <DeleteAction
          endPoint={`/tower/admin/?id=${row.original.id}`}
          queryKeys={[[TOWER_QUERY_KEY]]}
        />
      </div>
    ),
  },
]
