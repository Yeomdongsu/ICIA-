import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/common/Table'
import Paging from '../../components/community/BoardEtc/Paging'
import Button from '../../components/form/Button'
import './clickst.scss'

const AdminBrandBoardMag = () => {
  const pnum = 1
  let selOp = sessionStorage.getItem('selOp')

  const [shows, setShows] = useState([])
  const [showTable, setShowTable] = useState([])
  const [selectOption, setSelectOption] = useState('')
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })
  console.log(selOp)
  console.log('selectOption : ' + selectOption)

  const wTable = [
    {
      name: '종류',
      render: () => '웨딩홀',
    },
    {
      name: '예식장',
      id: 'whwc',
      render: (v, id) => v.wname,
    },
    {
      name: '웨딩홀 명',
      id: 'whname',
    },
    {
      name: '예식 종류',
      id: 'whkind',
    },
    { name: '상세 내용', id: 'whstr', render: v => <p>{v}</p> },
  ]

  const pTable = [
    {
      name: '종류',
      render: () => '플래너',
    },
    {
      name: '플래너 성명',
      id: 'pname',
    },
    {
      name: '플래너 연락처',
      id: 'pphone',
    },
    { name: '상세 내용', id: 'pstr' },
    {
      name: '플래너 금액',
      id: 'pprice',
    },
  ]

  const sTable = [
    {
      name: '종류',
      render: () => <div>스드메</div>,
    },
    {
      name: '업체 명',
      id: 'scomp',
    },
    {
      name: '업체 연락처',
      id: 'sphone',
    },
    {
      name: '업체 위치',
      id: 'slocation',
    },
    {
      name: '상세 내용',
      id: 'sstr',
      render: v => <div style={{ width: '400px', margin: 'auto' }}>{v}</div>,
    },
    {
      name: '스드메 금액',
      id: 'sprice',
    },
  ]

  const hTable = [
    {
      name: '종류',
      render: () => '여행사',
    },
    {
      name: '여행사',
      id: 'hbrand',
    },
    {
      name: '연락처',
      id: 'hphone',
    },
    {
      name: '국내/국외',
      id: 'harrival',
    },
    {
      name: '여행지',
      id: 'hlocation',
    },
    {
      name: '상세 내용',
      id: 'hstr',
      render: v => <div style={{ width: '400px', margin: 'auto' }}>{v}</div>,
    },
    {
      name: '금액',
      id: 'hcost',
    },
  ]

  const noDataTable = [
    {
      id: 'data',
    },
  ]
  const noData = [
    {
      data: '목록이 없습니다',
    },
  ]

  const changeWTable = pnum => {
    setSelectOption('weddingHall')
    axios
      .get('/searchWeddingHallAllPage', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        const { whList, pageNum, totalPage } = response.data
        if (whList.length == 0) {
          setShowTable(noDataTable)
          setShows(noData)
        } else {
          setPage({ totalPage: totalPage, pageNum: pageNum })
          setShows(whList)
          setShowTable(wTable)
          sessionStorage.setItem('pageNum', pageNum)
          sessionStorage.setItem('pageNum', 1)
        }
      })
      .catch(error => console.log(error))
  }

  const changeSTable = pnum => {
    setSelectOption('sdm')
    axios
      .get('/searchSdmAllPage', { params: { pageNum: pnum, no: 'notnull' } })
      .then(response => {
        console.log(response.data)
        const { sList, pageNum, totalPage } = response.data
        if (sList.length == 0) {
          setShowTable(noDataTable)
          setShows(noData)
        } else {
          setPage({ totalPage: totalPage, pageNum: pageNum })
          setShows(sList)
          setShowTable(sTable)
          sessionStorage.setItem('pageNum', pageNum)
          sessionStorage.setItem('pageNum', 1)
        }
      })
      .catch(error => console.log(error))
  }

  const changePTable = pnum => {
    setSelectOption('planner')
    axios
      .get('/searchPlannerAllPage', { params: { pageNum: pnum, no: 'notnoll' } })
      .then(response => {
        console.log(response.data)
        const { pList, pageNum, totalPage } = response.data
        if (pList.length == 0) {
          setShowTable(noDataTable)
          setShows(noData)
        } else {
          setPage({ totalPage: totalPage, pageNum: pageNum })
          setShows(pList)
          setShowTable(pTable)
          sessionStorage.setItem('pageNum', pageNum)
          sessionStorage.setItem('pageNum', 1)
        }
      })
      .catch(error => console.log(error))
  }

  const changeHTable = pnum => {
    setSelectOption('honeymoon')
    axios
      .get('/searchHoneyMoonAllPage', { params: { pageNum: pnum, no: 'notnull' } })
      .then(response => {
        console.log(response.data)
        const { hList, pageNum, totalPage } = response.data
        if (hList.length == 0) {
          setShowTable(noDataTable)
          setShows(noData)
        } else {
          setPage({ totalPage: totalPage, pageNum: pageNum })
          setShows(hList)
          setShowTable(hTable)
          sessionStorage.setItem('pageNum', pageNum)
          sessionStorage.setItem('pageNum', 1)
        }
      })
      .catch(error => console.log(error))
  }

  // 처음 시작시 테이블 설정
  useEffect(() => {
    switch (selOp) {
      case 'sdm':
        changeSTable(pnum)
        break
      case 'planner':
        changePTable(pnum)
        break
      case 'honeymoon':
        changeHTable(pnum)
        break
      default:
        changeWTable(pnum)
        break
    }
    sessionStorage.setItem('selOp', '')
  }, [])

  return (
    <div>
      <div>
        <button
          className={`${selectOption === 'weddingHall' ? 'click' : 'nonclick'}`}
          onClick={() => changeWTable(pnum)}
        >
          웨딩홀
        </button>
        <button
          className={`${selectOption === 'sdm' ? 'click' : 'nonclick'}`}
          onClick={() => changeSTable(pnum)}
        >
          스드메
        </button>
        <button
          className={`${selectOption === 'planner' ? 'click' : 'nonclick'}`}
          onClick={() => changePTable(pnum)}
        >
          플래너
        </button>
        <button
          className={`${selectOption === 'honeymoon' ? 'click' : 'nonclick'}`}
          onClick={() => changeHTable(pnum)}
        >
          허니문
        </button>
      </div>
      <div>
        <Table columns={showTable} dataSource={shows} style={{ width: '1200px' }} />
        <Link to="/adminBrandBoardWr" state={{ selectOption: selectOption }}>
          <Button>추가하기</Button>
        </Link>
      </div>
      {selectOption == 'weddingHall' && <Paging page={page} getList={changeWTable} />}
      {selectOption == 'sdm' && <Paging page={page} getList={changeSTable} />}
      {selectOption == 'planner' && <Paging page={page} getList={changePTable} />}
      {selectOption == 'honeymoon' && <Paging page={page} getList={changeHTable} />}
    </div>
  )
}
export default AdminBrandBoardMag
