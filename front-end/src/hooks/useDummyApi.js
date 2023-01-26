import { useCallback, useEffect, useState } from 'react'

export default ({ data, perPage = 10 }) => {
  const [page, setPage] = useState(1)
  const [rowData, setRowData] = useState([])
  const totalCount = data.length

  const fetchData = useCallback(() => {
    const start = (page - 1) * perPage
    setRowData(data.slice(start, start + perPage))
  }, [page])

  const onPaginationChange = (page) => {
    setPage(page)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return {
    rowData,
    page,
    perPage,
    totalCount,
    onPaginationChange,
  }
}
