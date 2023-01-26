import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '../../components/common/Table'
import Paging from '../../components/community/BoardEtc/Paging'

const AdminBbibMag = () => {
  let pnum = 1
  const [bbib, setBbib] = useState([])
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })
  const getList = pnum => {
    axios
      .get('/getBbibAll', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        const { dList, pageNum, totalPage } = response.data
        setPage({ totalPage: totalPage, pageNum: pageNum })
        setBbib(dList)
        sessionStorage.setItem('pageNum', pageNum)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    pnum !== null ? getList(pnum) : getList(1)
  }, [])
  return (
    <>
      <Table
        columns={[
          { name: '신고당한 아이디', id: 'decbmid' },
          { name: '신고자 아이디', id: 'decmid' },
          { name: '게시글 번호', id: 'decbno' },
          { name: '신고된 게시판', id: 'dectype' },
        ]}
        dataSource={bbib}
      />
      <Paging page={page} getList={getList} />
    </>
  )
}
export default AdminBbibMag
