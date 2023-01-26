import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '../../components/common/Table'
import Paging from '../../components/community/BoardEtc/Paging'

const AdminResMag = () => {
  let pnum = 1
  const [reserv, setReserv] = useState([])
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })
  const getList = pnum => {
    axios('/getReservAll', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        const { rList, pageNum, totalPage } = response.data
        setPage({ totalPage: totalPage, pageNum: pageNum })
        setReserv(rList)
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
          { name: '종류', id: 'rtype' },
          { name: '예약자 아이디', id: 'rmid' },
          //   {name:"예약명", id:}
          { name: '결제금액', id: 'rcost' },
          { name: '예약일', id: 'rdatestart' },
          {
            name: '예약종료일',
            id: 'rdateend',
            // render: (v, id) => (reserv[id].rtype == '허니문' ? <p>{v}</p> : null),
          },
          { name: '예약인원', id: 'rperson' },
          { name: '진행상태', id: 'rstatus' },
        ]}
        dataSource={reserv}
      />
      <Paging page={page} getList={getList} />
    </>
  )
}
export default AdminResMag
