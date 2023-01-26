import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'
import Table from '../../components/common/Table'
import Button from '../../components/form/Button'
import { Link, useLocation } from 'react-router-dom'
import Paging from '../../components/community/BoardEtc/Paging'
import './clickst.scss'

const AdminBrandMag = () => {
  // const nonclick = { width: 120, height: 80, background: 'white', color: 'black' }
  // const click = { width: 120, height: 80, background: '#EAEAEA', color: 'red' }
  let pnum = 1
  let selOp = sessionStorage.getItem('selOp')
  const [shows, setShows] = useState([])
  const [showTable, setShowTable] = useState([])
  const [selectOption, setSelectOption] = useState('')
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })

  console.log('selOp : ' + selOp)
  console.log('selectOption : ' + selectOption)

  const wTable = [
    {
      name: '종류',
      render: () => '예식장',
    },
    {
      name: '업체 명',
      id: 'wname',
    },
    {
      name: '업체 연락처',
      id: 'wphone',
    },
    {
      name: '위치',
      id: 'wlocation',
    },
    {
      name: '사진',
      id: 'wimg',
      render: (v, id) => <img src={`/upload/${v}`} style={{ width: '100px', height: '100px' }} />,
    },
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
  ]

  const sTable = [
    {
      name: '종류',
      render: () => '스드메',
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

  const changeWTable = pnum => {
    setSelectOption('weddingComp')
    axios
      .get('/searchWeddingCompAllPage', { params: { pageNum: pnum } })
      .then(response => {
        console.log(response.data)
        const { wcList, pageNum, totalPage } = response.data
        if (wcList.length == 0) {
          setShowTable(noDataTable)
          setShows(noData)
        } else {
          setPage({ totalPage: totalPage, pageNum: pageNum })
          setShows(wcList)
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
      .get('/searchSdmAllPage', { params: { pageNum: pnum } })
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
      .get('/searchPlannerAllPage', { params: { pageNum: pnum } })
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
      .get('/searchHoneyMoonAllPage', { params: { pageNum: pnum } })
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
  const choice = e => {
    console.log(e.target.value)
  }
  return (
    <div>
      <div>
        <button
          className={`${selectOption === 'weddingComp' ? 'click' : 'nonclick'}`}
          onClick={() => changeWTable(pnum)}
        >
          예식장
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
        <Link to="/adminBrandWr" state={{ selectOption: selectOption }}>
          <Button>추가하기</Button>
        </Link>
      </div>
      {selectOption == 'weddingComp' && <Paging page={page} getList={changeWTable} />}
      {selectOption == 'sdm' && <Paging page={page} getList={changeSTable} />}
      {selectOption == 'planner' && <Paging page={page} getList={changePTable} />}
      {selectOption == 'honeymoon' && <Paging page={page} getList={changeHTable} />}
    </div>
  )
}
export default AdminBrandMag
