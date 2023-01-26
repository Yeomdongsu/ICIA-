import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/common/Table'
import Paging from '../../components/community/BoardEtc/Paging'
import Button from '../../components/form/Button'

const AdminEventMag = () => {
  let pnum = 1
  const [events, setEvents] = useState([])

  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })

  const getList = pnum => {
    axios
      .get('/eventPage', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        const { eveList, pageNum, totalPage } = response.data
        setPage({ pageNum: pageNum, totalPage: totalPage })
        setEvents(eveList)
        sessionStorage.setItem('pageNum', pageNum)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    pnum != null ? getList(pnum) : getList(1)
  }, [])

  return (
    <>
      <Table
        columns={[
          { name: '종류', id: 'etype' },
          { name: '이벤트 명', id: 'etitle' },
          { name: '가격(만원)', id: 'eprice' },
          {
            name: '사진',
            id: 'eimg',
            render: (v, id) => (
              <img src={`/upload/${v}`} style={{ width: '100px', height: '100px' }}></img>
            ),
          },
        ]}
        dataSource={events}
      />
      <Link to="/adminEventWr">
        <Button>추가하기</Button>
      </Link>
      <Paging page={page} getList={getList} />
    </>
  )
}
export default AdminEventMag
