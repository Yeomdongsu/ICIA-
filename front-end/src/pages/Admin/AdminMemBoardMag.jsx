import axios from 'axios'
import moment from 'moment/moment'
import React, { useCallback, useEffect, useState } from 'react'
import '../../components/community/Board/CommuBoardCss.scss'
import '../../components/community/BoardEtc/CommuBoardWr.scss'
import CTable from '../../components/community/Table/CTable'
import CTableColumn from '../../components/community/Table/CTableColumn'
import CTableRow from '../../components/community/Table/CTableRow'
import Button from '../../components/form/Button'
import Paging from '../../components/community/BoardEtc/Paging'
import { useNavigate } from 'react-router'

const AdminMemBoardMag = () => {
  const nav = useNavigate()
  const df = date => moment(date).format('YYYY- MM-DD HH:mm')
  let pnum = sessionStorage.getItem('pageNum')
  const [mbitem, setMbitem] = useState({})
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  })
  const [searchId, setSearchId] = useState('')
  // localStorage.setItem('search', '')
  let search
  const getList = pnum => {
    search = sessionStorage.getItem('search')
    console.log(search)
    axios
      .get('/getMemBoard', { params: { pageNum: pnum, searchId: search } })
      .then(response => {
        setSearchId('')
        console.log(response.data)
        const { bList, totalPage, pageNum } = response.data
        setPage({ totalPage: totalPage, pageNum: pageNum })
        setMbitem(bList)
        sessionStorage.setItem('pageNum', pageNum)
        sessionStorage.setItem('pageNum', 1)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    sessionStorage.setItem('search', '')
    pnum != null ? getList(pnum) : getList(1)
  }, [])

  const getBoard = useCallback(bno => {
    // 보여질 게시글 번호를 localStorage에 저장(글 번호 유지)
    localStorage.setItem('bno', bno)
    nav('/commuBoardDetail')
  }, [])

  let list = null
  if (mbitem.length === 0) {
    list = (
      <CTableRow key={0}>
        <CTableColumn span={5}>게시글이 없습니다.</CTableColumn>
      </CTableRow>
    )
  } else {
    list = Object.values(mbitem).map(item => (
      <CTableRow key={item.bno}>
        <CTableColumn wd="w-10">{item.bno}</CTableColumn>
        <CTableColumn wd="w-10">{item.btype}</CTableColumn>
        <CTableColumn wd="w-10">{item.bmid}</CTableColumn>
        <CTableColumn wd="w-40">
          <div onClick={() => getBoard(item.bno)}>{item.btitle}</div>
        </CTableColumn>
        <CTableColumn wd="w-20">{df(item.bdate)}</CTableColumn>
        {/* <CTableColumn wd="w-10">{item.bview}</CTableColumn> */}
      </CTableRow>
    ))
  }

  const onch = e => {
    setSearchId(e.target.value)
    // console.log(e.target.value)
    sessionStorage.setItem('search', e.target.value)
  }

  return (
    <>
      <div className="Main">
        <div className="">
          <CTable hName={['No', '카테고리', '작성자', '제목', '작성날짜']}>{list}</CTable>
          <Paging page={page} getList={getList} />
          <div className="btn"></div>
        </div>
      </div>
      <div style={{ margin: 'auto' }}>
        <input
          className="Input"
          name="searchId"
          placeholder="검색할 아이디를 입력하세요"
          onChange={onch}
          value={searchId}
        />
        &ensp;
        <Button onClick={() => getList(pnum, search)}>검색</Button>
      </div>
    </>
  )
}

export default AdminMemBoardMag
