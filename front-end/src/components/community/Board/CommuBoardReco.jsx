import axios from 'axios'
import moment from 'moment/moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../form/Button'
import '../Board/CommuBoardCss.scss'
import CTable from '../Table/CTable'
import CTableColumn from '../Table/CTableColumn'
import CTableRow from '../Table/CTableRow'
import Paging from '../BoardEtc/Paging'

const CommuBoardReco = () => {
  const df = date => moment(date).format('YYYY- MM-DD HH:mm')
  const cb = sessionStorage.setItem("cb", "추천할래요");
  const id = sessionStorage.getItem('mid')
  const grade = sessionStorage.getItem('grade');

  const nav = useNavigate()
  let pnum = sessionStorage.getItem('pageNum')

  const [bitem, setBitem] = useState({})
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
    btype: '추천할래요',
  })

  // 게시글 목록을 서버로부터 가져오는 함수
  const getList = pnum => {
    axios
      .get('/list', { params: { pageNum: pnum, type: '추천할래요' } })
      .then(res => {
        console.log(res.data)
        const { bList, totalPage, pageNum, btype } = res.data
        setPage({ totalPage: totalPage, pageNum: pageNum, btype: btype })
        setBitem(bList)
        sessionStorage.setItem('pageNum', pageNum)
      })
      .catch(err => console.log(err))
    }
    
    const getBoard = useCallback(bno => {
      // 보여질 게시글 번호를 localStorage에 저장(글 번호 유지)
      localStorage.setItem('bno', bno)
      
    nav('/commuBoardDetail')
  }, [])

  // main 페이지가 화면에 보일때 서버로부터 게시글 목록을 가져옴
  useEffect(() => {
    pnum !== null ? getList(pnum) : getList(1)
  }, [])

  // 출력할 게시글 목록 작성 //
  let list = null
  if (bitem.length === 0) {
    list = (
      <CTableRow key={0}>
        <CTableColumn span={5}>게시글이 없습니다.</CTableColumn>
      </CTableRow>
    )
  } else {
    list = Object.values(bitem).map((item,i) => (
      <CTableRow key={item.bno}>
          <CTableColumn wd="w-10">{(pnum - 1)*10 + i +1}</CTableColumn>
        <CTableColumn wd="w-40">
          <div onClick={() => getBoard(item.bno)}>{item.btitle}</div>
        </CTableColumn>
        <CTableColumn wd="w-20">{item.bmid}</CTableColumn>
        <CTableColumn wd="w-20">{df(item.bdate)}</CTableColumn>
        <CTableColumn wd="w-10">{item.bview}</CTableColumn>
      </CTableRow>
    ))
  }

  // 글쓰기 화면으로 이동
  const onWrite = () => {
    if (id === '' || id == null) {
      window.alert('로그인 후, 게시글을 작성하실 수 있습니다.')
    } else {
      nav('/CommuBoardWr')
    }
  }

  return (
    <div>
      <div className="Main">
        <div className="Content_table">
          <CTable hName={['No', '제목', '작성자', '날짜', '조회수']}>{list}</CTable>
          <Paging page={page} getList={getList} wd="w-20" />
          {grade === 'user' || grade === 'admin' ?  
          <div className="btn">
            <Button style={{width:'90px',height:'50px',background:'#C3B6D9', borderRadius:'10px'}} onClick={onWrite}>글쓰기</Button>
          </div>
           :null }
        </div>
      </div>
    </div>
  )
}

export default CommuBoardReco
