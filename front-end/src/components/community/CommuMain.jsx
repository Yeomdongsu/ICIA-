import React, { useEffect, useState } from 'react'
import Table from '../common/Table'
import Section from '../main/Section'
import './CommuMain.scss'
import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

const CommuMain = () => {
  const df = date => moment(date).format('YYYY- MM-DD HH:mm')
    
  const nav = useNavigate()
  const mid = sessionStorage.getItem('mid')
  // const grade = sessionStorage.getItem('grade');
  let pnum = sessionStorage.getItem('pageNum')
  // let bview = sessionStorage.getItem("bview");
  const [bitem, setBitem] = useState({})
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
    btype: "",
  })

  const [bData, setBdata]=useState([]);
  useEffect(()=>{
    axios.get("/bdRank")
    .then((res)=>{
      console.log(res.data);
      setBdata(res.data);
    }).catch((err)=>
    console.log(err));
  },[])
  const {a,b,c,d,e} = bData;

    // const bn = sessionStorage.getItem('bno');
    const id = sessionStorage.getItem("mid");
    const str = sessionStorage.getItem("btitle");
    const grade = sessionStorage.getItem("admin");
    const [board, setBoard] = useState({
        bno : 0,
        btype:"",
        btitle: "",
        bmid: id,
        bstr: "",
        bview: "",
    })

  const [notice, setNotice] = useState([]);
  const [ reco, setReco ] = useState([]);
  const [ worry, setWorry ] = useState([]);
  const [ show, setShow ] = useState([]);
  const [ review, setReview ] = useState([]);

  useEffect(()=>{
  let aa=[];
  if(a!==undefined){
  for(let i=a.length-1; i>a.length-4; i--){
    if(i < 0){
      return;}
    aa.push({name: a[i].btitle, read: a[i].bview, bno:a[i].bno});
    setNotice(aa);}}
    console.log(aa)

  let bb=[];
  if(b!==undefined){
  for(let i=b.length-1; i>b.length-4; i--){
    if(i < 0){
      return;}
    bb.push({name: b[i].btitle, read: b[i].bview, bno:b[i].bno});
    setReco(bb);}}

  let ee=[];
  if(e!==undefined){
  for(let i=e.length-1; i>e.length-4; i--){
    if(i < 0){
      return;}
    ee.push({name: e[i].btitle, read: e[i].bview, bno:e[i].bno});
    setWorry(ee);}}

  let dd=[];
  if(d!==undefined){
    for(let i=d.length-1; i>d.length-4; i--){
      if(i < 0){
        return;}
    dd.push({name: d[i].btitle, read: d[i].bview, bno:d[i].bno});
    setShow(dd);}}

  let cc=[];
  if(c!==undefined){
  for(let i=c.length-1; i>c.length-4; i--){
    if(i < 0){
      return;}
    console.log(c)
    cc.push({name: c[i].btitle, read: c[i].bview, bno:c[i].bno});
    setReview(cc);}}
},[a,b,c,d,e])

const move = (ta,id) => {
  console.log(ta);
  switch(ta){
    case "notice":
      console.log(notice);
      console.log(notice[id].bno);
      localStorage.setItem('bno', notice[id].bno);
      nav('/commuBoardDetail');
      break;
    case "reco" :
      console.log(reco);
      console.log(reco[id])
      console.log(reco[id].bno);
      localStorage.setItem('bno', reco[id].bno);
      nav('/commuBoardDetail');
      break;
    case "worry" :
      console.log(worry);
      console.log(worry[id].bno);
      localStorage.setItem('bno', worry[id].bno);
      nav('/commuBoardDetail');
      break;
    case "show" :
      console.log(show);
      console.log(show[id].bno);
      localStorage.setItem('bno', show[id].bno);
      nav('/commuBoardDetail');
      break;
    case "review" :
      console.log(review);
      console.log(review[id].bno);
      localStorage.setItem('bno', review[id].bno);
      nav('/commuBoardDetail');
      break;
    
  }
}
  return (
    // <Section title=<>이시간 <h1 style={{color:"red"}}>HOT</h1></>  style={{ height: '100%' }}>
    <Section title= '커뮤니티 인기글' style={{ height: '100%' }}>
      <Table
        style={{ marginTop: 30, fontSize:'18px', fontSize:'18px' }}
        columns={[
          //배열
          {
            name: '',
            // render: (v, id) => id + 1,
            style: {
              width: 80,
            },
          },
          {
            //예시
            name: <a href="/community/commuBoardNoti">공지사항</a>,
            id: 'name',
            render:(v, id)=>(<p className="link" onClick={()=>move("notice",id)}>{v}</p>)
          },
          {
            name: <a href="/community/commuBoardNoti">+</a>,
            id: 'read',
            style: {
              width: 80,
            },
          },
        ]}
        dataSource={notice}
      ></Table>
      <div>
        <div className="table1">
          <Table
            style={{ marginTop: 30, marginRight: '50px', float: 'left', fontSize:'18px' }}
            // data-aos="fade-up"
            columns={[
              //배열
              {
                name: '',
                // render: (v, id) => id + 1,
                style: {
                  width: 80,
                },
              },
              {
                //예시
                name: <a href="/community/commuBoardReco">추천할래요</a>,
                id: 'name',
                render:(v, id)=>(<p className="link" onClick={()=>move("reco",id)}>{v}</p>)

              },
              {
                name: <a href="/community/commuBoardReco">+</a>,
                id: 'read',
                style: {
                  width: 80,
                },
              },
            ]}
            dataSource={reco}
          />

          <Table
            style={{ marginTop: 30, float: 'right' , fontSize:'18px'}}
            // data-aos="fade-up"
            columns={[
              //배열
              {
                name: '',
                // render: (v, id) => id + 1,
                style: {
                  width: 80,
                },
              },
              {
                //예시
                name: <a href="/community/commuBoardWorry">고민있어요</a>,
                id: 'name',
                render:(v, id)=>(<p className="link" onClick={()=>move("worry",id)}>{v}</p>)

              },
              {
                name: <a href="/community/commuBoardWorry">+</a>,
                id: 'read',
                style: {
                  width: 80,
                },
              },
            ]}
            dataSource={worry}
          />
        </div>
        <div className="table1" style={{ marginBottom: '20px' }}>
          <Table
            style={{ marginTop: '30px', marginRight: '50px', float: 'left', fontSize:'18px' }}
            // data-aos="fade-up"
            columns={[
              //배열
              {
                name: '',
                // render: (v, id) => id + 1,
                style: {
                  width: 80,
                },
              },
              {
                //예시
                name: <a href="/community/commuBoardShow">자랑할래요</a>,
                id: 'name',
                render:(v, id)=>(<p className="link" onClick={()=>move("show",id)}>{v}</p>)

              },
              {
                name: <a href="/community/commuBoardShow">+</a>,
                id: 'read',
                style: {
                  width: 80,
                },
              },
            ]}
            dataSource={show}
          />

          <Table
            style={{ marginTop: '30px', fontSize:'18px' }}
            // data-aos="fade-up"
            columns={[
              //배열
              {
                name: '',
                // render: (v, id) => id + 1,
                style: {
                  width: 80,
                },
              },
              {
                //예시
                name: <a href="/community/commuBoardReview">업체후기톡톡</a>,
                id: 'name',
                render:(v, id)=>(<p className="link" onClick={()=>move("review",id)}>{v}</p>)

              },
              {
                name: <a href="/community/commuBoardReview">+</a>,
                id: 'read',
                style: {
                  width: 80,
                },
              },
            ]}
            dataSource={review}
          />
        </div>
      </div>
    </Section>
  )
}

export default CommuMain
