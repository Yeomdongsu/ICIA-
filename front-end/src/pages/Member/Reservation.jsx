import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/common/Table'
import Button from '../../components/form/Button'

export default () => {
  const id = sessionStorage.getItem("mid");
  const nav = useNavigate();
  const [reservData, setReservData] = useState([]);
  const [reserv, setReserv]= useState([]);
  const [refundData, setRefundData]=useState({});
  const [delReserv, setDelReserv]=useState();
  const [a, setA]= useState(false);
  let total =[];
  let rList=[];
  let temprlist =[];
  useEffect(()=>{
    axios.get("/myReservation",{params:{mid : id}})
    .then((res)=>{
      console.log(res.data);
      setReservData(res.data);
    }).catch((error)=>console.log(error));
  },[])

  const {rw,rs,rp,rh} = reservData;
  rList.push(rw);
  rList.push(rs);
  rList.push(rp);
  rList.push(rh);
  console.log(rList);
  const inputReserv = rList;
  console.log(inputReserv);
  if(reservData.length!==0){
  if(rw.length!==0){
    for(let i=0; i<rw.length; i++){
      temprlist.push(rw[i].whrList);
    }
  }
  if(rs.length!==0){
    for(let i=0; i<rs.length; i++){
      temprlist.push(rs[i].srList);
    }
  }
  if(rp.length!==0){
    for(let i=0; i<rp.length; i++){
      temprlist.push(rp[i].prList);
    }
  }
  if(rh.length!==0){
    for(let i=0; i<rh.length; i++){
      temprlist.push(rh[i].hrList);
    }
  }
  const trList = temprlist;
  console.log(trList)
  for(let i=0; i<trList.length; i++){
    console.log(trList[i])
    console.log(inputReserv)
    switch(trList[i].rtype){
      case "웨딩홀":
        total.push({category :trList[i].rtype, name:inputReserv[0][i].whname, date:moment(trList[i].rdatestart).format('YYYY-MM-DD'), price:trList[i].rcost +" 만원", progress:trList[i].rstatus})
        break;
      case "스드메":
        total.push({category :trList[i].rtype, name:inputReserv[1][i-rw.length].scomp, date:moment(trList[i].rdatestart).format('YYYY-MM-DD'), price:trList[i].rcost+" 만원", progress:trList[i].rstatus})
        break;
      case "플래너":
        total.push({category :trList[i].rtype, name:inputReserv[2][i-rw.length-rs.length].pname, date:moment(trList[i].rdatestart).format('YYYY-MM-DD'), price:trList[i].rcost+" 만원", progress:trList[i].rstatus})
        break;
      case "허니문":
        total.push({category :trList[i].rtype, name:inputReserv[3][i-rw.length-rs.length-rp.length].hlocation, date:(moment(trList[i].rdatestart).format('YYYY-MM-DD') +" ~ " + moment(trList[i].rdateend).format('YYYY-MM-DD')), price:trList[i].rcost+" 만원", progress:trList[i].rstatus})
        break;
      }
      console.log(total);
  }
  console.log(total);
}
  useEffect(()=>{
    setReserv(total);
  },[reservData])

  const onRemoveHandler = (index) => () => {
    if(temprlist[index].rstatus==="환불완료"){
      alert("이미 환불된 건입니다.");
      return;
    }
    let rconf=window.confirm("예약을 취소하시겠습니까?");
    console.log("여기보세요");
    console.log(temprlist[index].ridx);
    console.log(temprlist[index].rimpuid);
    console.log(temprlist[index].rcost);
    console.log(temprlist[index].rstatus);
    console.log(reserv[index].name);
    if(rconf===true){
    setRefundData({
      imp_uid:temprlist[index].rimpuid,
      cancel_request_amount:temprlist[index].rcost,
      reason: "테스트 결제 환불", // 환불사유
    });
    setDelReserv({ridx:temprlist[index].ridx});
  }
    console.log(refundData);

  }
  console.log(refundData);
    useEffect(()=>{
      if(refundData.length===0){
        return;
      }
      axios.post("/TokenRequest", refundData)  //환불전에 토큰받고 환불로이어짐
      .then((res)=>{
          console.log(res.data);
          setRefundData([]);
          setA(true);
      }).catch((err)=>{console.log(err);setRefundData([]);})
    },[refundData]);

    useEffect(()=>{
      console.log(delReserv);
      if(a===true){
        axios.post("/delReserv",delReserv)
        .then((res)=>{
          console.log("예약삭제?",res.data);
          setA(false);
          window.alert("예약이 취소되었습니다");
          nav(0);
        }).catch((err)=>{
          console.log(err);
          setA(false);
        })
      }
    },[a]);

  return (
    <Table
      columns={[
        {
          name: '예약 번호',
          render: (v, index) => index + 1,
          style: {
            width: 80,
          },
        },
        {
          name: '예약 종류',
          id: 'category',
        },
        {
          name: '예약 명',
          id: 'name',
        },
        {
          name: '예약 날짜',
          id: 'date',
        },
        {
          name: '예약금',
          id: 'price',
        },
        {
          name: '진행 현황',
          id: 'progress',
        },
        {
          name: '확인/취소',
          id: 'id',
          render: (v, index) => (temprlist[index].rstatus === "진행예정" ? <Button onClick={onRemoveHandler(index)}>예약취소</Button>:<Button onClick={onRemoveHandler(index)} style={{background:"red"}}>환불완료</Button> ),
          style: {
            width: 200,
          },
        },
      ]}
      dataSource={reserv}
    />
  )
}
