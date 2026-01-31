import { Card, CardContent, CardFooter } from '@/components/ui/card'
import DataTable from '@/components/web/DataTable'
import Pagination from '@/components/web/Pagination'
import { useApiQuery } from '@/hooks/useApi'
import { useState } from 'react'
import { TOWER_QUERY_KEY } from '../service/tower.service'
import { TowerColumns } from './TowerColumns'

const AllTower = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useApiQuery(
    [TOWER_QUERY_KEY, page],
    '/tower/admin/',
    {
      page: page,
    },
  )

  const list = data?.results?.data ?? []
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <DataTable
            data={list}
            columns={TowerColumns}
            loading={isLoading}
            error={error?.message}
          />
        </CardContent>

        <CardFooter>
          <Pagination
            page={page}
            total={data?.count ?? 0}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

export default AllTower
