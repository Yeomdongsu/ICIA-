import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const instance = axios.create({
  baseURL: 'http://localhost:8080'
})

/**
 * 최초 실행 시 useApi('get', '/event') 와 같은 형태로 사용
 * 이후 반환된 fetchData 를 실행시키면 axios call에 따라 반환값들과 상태 관리를 한다
 * 자주 사용되는 page에 대한 관리도 있으며, 해당 내용은 onPaginationChange로 처리
 * 호출 시 fetchData({ userInfo: '1234' }) 같은 식으로 하면 call 되는 데이터에 대한 처리도 가능.
 */
export default (method, url) => {
    const perPage = 10
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [response, setResponse] = useState({})
  
    const fetchData = useCallback(async (data) => {
        setLoading(true)
        const res = await instance[method](url, {
            page,
            ...data
        })
        setLoading(false)

        setResponse(res.data)
    }, [page])
  
    const onPaginationChange = (page) => {
      setPage(page)
    }
  
    useEffect(() => {
      fetchData()
    }, [page])
  
    return {
        loading,
        response,
        page,
        perPage,
        onPaginationChange,
        fetchData
    }
}