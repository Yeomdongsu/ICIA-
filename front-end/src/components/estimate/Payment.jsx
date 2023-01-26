import axios from 'axios';
import fi from 'date-fns/esm/locale/fi/index.js';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../form/Button';

const Payment = ({ effect, deps, ptext, width, height, zIndex, wlist, slist, plist, hlist, pData,borderRadius,background,...props }) => {
  const nav = useNavigate();
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
        document.head.removeChild(jquery); document.head.removeChild(iamport);
    }
  }, []);
  const id = sessionStorage.getItem("mid");
  const name = sessionStorage.getItem("mname");
  const phone = sessionStorage.getItem("mphone");
  const [data, setData] = useState({
    pg: 'html5_inicis.INIpayTest', // PG사 (필수항목)
    pay_method: 'card', // 결제수단 (필수항목)
    merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
    name: '결제 테스트', // 주문명 (필수항목)
    amount: '100', // 금액 (필수항목)
    custom_data: { name: '부가정보', desc: '세부 부가정보' },
    buyer_name: name, // 구매자 이름
    buyer_tel: phone, // 구매자 전화번호 (필수항목)
    buyer_email: null, // 구매자 이메일
    buyer_addr: null,
    buyer_postalcode: null,
  });

  const [reservData,setReservData] = useState([])
    

    useEffect(()=>{
      console.log("피데이터"+pData);
      console.log(pData);
      if(pData===undefined||pData.length===0){
        return;
      }
      if(pData!==undefined&&pData.length!==0){
        let tprice=0;
        for(let i =0; i<pData.length; i++){
          if(pData[i].dtype==="웨딩홀"){
            // for(let i =0; i<pData.length; i++){
              tprice=tprice+pData[i].dprice+pData[i].bprice*pData[i]?.rperson;
            // }
            console.log(pData[i].bprice);
          }else {
              tprice=tprice+pData[i].dprice;
        }
        }
        if(pData.length>1){
          console.log(tprice);
        setData({...data,
          amount:tprice,
          name: pData[0].dname+" 외"+(pData.length-1).toString()+"건",
        })}
        else if(pData.length===1){
          setData({...data,
            amount:tprice,
            name: pData[0].dname,
          })
        }
        console.log(tprice);

      }
        console.log(data.name)
      },[pData]);
  
    useEffect(()=>{
        if(wlist!==undefined){
        setData({...data,
          name:wlist.whname,
          amount:wlist.whprice,
        })}
    },[wlist]);
    
    useEffect(()=>{
      if(slist!==undefined){
      setData({...data,
        name:slist.scomp,
        amount:slist.sprice,
      })}
    },[slist]);

    useEffect(()=>{
      if(plist!==undefined){
      setData({...data,
        name:plist.pname,
        amount:plist.pprice,
      })}
  },[plist]);

    useEffect(()=>{
      if(hlist!==undefined){
      setData({...data,
        name:hlist.hlocation,
        amount:hlist.hcost,
      })}
    },[hlist]);

    let fiData = [];
    const [paybtn, setPayBtn]=useState(false);
    useEffect(()=>{
      if(reservData?.length===0||reservData===undefined||reservData?.length>pData?.length){
        return;
      }

      for(let i=0; i<pData?.length; i++){
        if(pData[i]?.dtype==="웨딩홀"){
            fiData.push({
            rwhidx: pData[i].dwhidx,
            rcost: pData[i].dprice,
            rmid:id,
            rimpuid: reservData[0].rimpuid,
            rtype:"웨딩홀",
            rstatus : "진행예정",
            rdatestart : pData[i].rdatestart,
            rperson : pData[i].rperson
          })}else if(pData[i]?.dtype==="스드메"){
            fiData.push({
            rsidx: pData[i].dsidx,
            rcost:pData[i].dprice,
            rmid:id,
            rimpuid: reservData[0].rimpuid,
            rtype:"스드메",
            rstatus : "진행예정",
            rdatestart : pData[i].rdatestart,
          })}else if(pData[i]?.dtype==="플래너"){
            fiData.push({
            rpidx: pData[i].dpidx,
            rcost:pData[i].dprice,
            rmid:id,
            rimpuid: reservData[0].rimpuid,
            rtype:"플래너",
            rstatus : "진행예정",
            rdatestart : pData[i].rdatestart,
          })}else if(pData[i]?.dtype==="허니문"){
            fiData.push({
            rhidx: pData[i].dhidx,
            rcost:pData[i].dprice,
            rmid:id,
            rimpuid: reservData[0].rimpuid,
            rtype:"허니문",
            rstatus : "진행예정",
            rdatestart : pData[i].rdatestart,
            rdateend : pData[i].rdateend,
          })}
      }
      console.log(reservData);
      if(fiData.length===0){
      // setReservData(fiData);
        fiData.push(reservData);
        fiData=fiData[0];
      }

      console.log(fiData);
      if(fiData.length!==0&&paybtn===true){
      axios.post("/insertReservation" , fiData)
      .then((res) => {console.log(res);
          fiData=null;
          setReservData([]);
          setPayBtn(false);
          nav(0);
        }
      ).catch((err)=>{
        fiData=[];
        setReservData([]);
        setPayBtn(false);
      });
    }
    },[paybtn])
  
const onClickPayment = () => {
  console.log(data)
  if(id===undefined || id===null || id===""){
    window.alert("로그인 후 이용 가능한 서비스입니다.");
    return;
  }
  if(pData?.length===0){
    window.alert("찜목록을 선택해주세요!")
    return;
  }
  console.log(pData)
  for(let i = 0; i<pData?.length; i++){
    switch(pData[i].dtype){
      case "웨딩홀":
        if(pData[i].rdatestart===undefined){
          window.alert("웨딩홀 예약일을 선택해주세요!");
          return;
        }else if(pData[i].rperson===undefined){
          window.alert("인원을 입력해주세요!");
          return;
        };
        break;
      case "스드메" :
        if(pData[i].rdatestart===undefined){
          window.alert("스드메 예약일을 선택해주세요!");
          return;
        };
        break;
      case "플래너" :
        if(pData[i].rdatestart===undefined){
          window.alert("플래너 예약일을 선택해주세요!");
          return;
        };
        break;
      case "허니문" :
        if(pData[i].rdatestart===undefined){
          window.alert("출발날짜를 선택해주세요!");
          return;
        } else if(pData[i].rdateend===undefined){
          window.alert("종료날짜를 선택해주세요!");
          return;
        }
        break;
    }
  }

    // imp51345423
    console.log(data);
  const { IMP } = window;
  IMP.init("imp18221811"); // 결제 데이터 정의
  IMP.request_pay(data, callback);  //data에는 결제를 위한 정보들을 담은 객체를 전달해야 합니다. 예를 들어, buyer_name(주문자명), amoun(결제 금액), pg(사용할 PG사), pay_method(결제수단) 등이 존재합니다.
  console.log(data);
}                                   //callback 정보를 이용해 결제창을 호출하고, 유저가 입력한 카드 정보들이 카드사 서버로 전달되어 인증을 거치고, 인증이 성공하면 인증키를 PG에 전달하는 등 복잡한 과정을 거친 후, 콜백 함수가 호출됩니다


  const callback = (response) => {
    const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
    const tokenData={
      "imp_uid" : imp_uid
    }

    if (success) {
      console.log(imp_uid);
      if(wlist!==undefined){
        setReservData([...reservData,{
          rwhidx: wlist.whidx,
          rcost:paid_amount,
          rmid:id,
          rimpuid: imp_uid,
          rtype:"웨딩홀",
          rstatus : "진행예정",
        }])
      }else if(slist!==undefined){
        setReservData([...reservData,{
          rsidx: slist.sidx,
          rcost:paid_amount,
          rmid:id,
          rimpuid: imp_uid,
          rtype:"스드메",
          rstatus : "진행예정",
        }])
      }else if(plist!==undefined){
        setReservData([...reservData,{
          rpidx: plist.pidx,
          rcost:paid_amount,
          rmid:id,
          rimpuid: imp_uid,
          rtype:"플래너",
          rstatus : "진행예정",
        }])
      }else if(hlist!==undefined){
        setReservData([...reservData,{
          rhidx: hlist.hidx,
          rcost:paid_amount,
          rmid:id,
          rimpuid: imp_uid,
          rtype:"허니문",
          rstatus : "진행예정",
        }])
      }

      if(pData?.length!==0&&pData!==undefined){
        // for(let i=0; i<pData.length; i++){
          if(pData[0]?.dtype==="웨딩홀"){
              setReservData([...reservData,{
                rhidx: pData[0].dwhidx,
                rcost: pData[0].dprice,
                rmid:id,
                rimpuid: imp_uid,
                rtype:"웨딩홀",
                rstatus : "진행예정",
              }])}else if(pData[0]?.dtype==="스드메"){
              setReservData([...reservData,{
                rhidx: pData[0].dsidx,
                rcost:pData[0].dprice,
                rmid:id,
                rimpuid: imp_uid,
                rtype:"스드메",
                rstatus : "진행예정",
              }])}else if(pData[0]?.dtype==="플래너"){
              setReservData([...reservData,{
                rhidx: pData[0].dpidx,
                rcost:pData[0].dprice,
                rmid:id,
                rimpuid: imp_uid,
                rtype:"플래너",
                rstatus : "진행예정",
              }])}else if(pData[0]?.dtype==="허니문"){
              setReservData([...reservData,{
                rhidx: pData[0].dhidx,
                rcost:pData[0].dhprice,
                rmid:id,
                rimpuid: imp_uid,
                rtype:"허니문",
                rstatus : "진행예정",
              }])}
          // }
      }
      
      window.alert('결제 성공');
      setPayBtn(true);
    } else {
      window.alert(`결제 실패 : ${error_msg}`);
    }
  }
  
  return (
    <>
      <span onClick={onClickPayment}><Button style={{width:`${width}`, height:`${height}`, zIndex:`${zIndex}`, background:`${background}`, borderRadius:`${borderRadius}`}}>{ptext}</Button></span>
    </>
   );
}
  
  export default Payment;