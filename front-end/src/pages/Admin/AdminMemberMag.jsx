import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/common/Pagination'
import Table from '../../components/common/Table'
import Paging from '../../components/community/BoardEtc/Paging'
import Button from '../../components/form/Button'

const AdminMemberMag = () => {
  let pnum = 1
  const [members, setMembers] = useState([])

  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })

  const getList = pnum => {
    axios
      .get('/searchUserAll', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        // setMembers(response.data)
        const { member, pageNum, totalPage } = response.data
        setPage({ totalPage: totalPage, pageNum: pageNum })
        setMembers(member)
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
          {
            name: '회원 아이디',
            id: 'mid',
            style: {
              width: 200,
            },
          },
          {
            name: '회원 이름',
            id: 'mname',
          },
          {
            name: '연락처',
            id: 'mphone',
          },
          {
            name: '예약 건 수',
            id: 'mresc',
          },
          {
            name: '신고된 횟수',
            id: 'mdec',
          },
          // {
          //   name: '관리버튼',
          //   id: 'id',
          //   render: id => <Button onClick={removeMember(id)}>탈퇴</Button>,
          // },
        ]}
        dataSource={members}
      />
      <Paging page={page} getList={getList} />
    </>
  )
}
export default AdminMemberMag
