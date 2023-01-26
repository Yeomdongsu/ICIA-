import axios from 'axios'
import { setDefaultOptions } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/common/Table'
import Payment from '../../components/estimate/Payment'
import Button from '../../components/form/Button'
// import usePayment from '../../hooks/usePayment'

export default () => {
  const comma = (num) =>[num].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const id = sessionStorage.getItem("mid");
  const nav = useNavigate();
    const inputBorder= useRef();
  const [dibData,setDibData] = useState([{}]);
  useEffect(()=>{
    axios.post("/searchDib", null, {params:{mid:id}})
    .then((res)=>{
      console.log(res.data);
      setDibData(res.data);
    })
  },[])
  
  const [likes, setLikes] = useState([
    // {name: "gd"},
    // {name: "gd"},
    // {name: "gd"},
  ])
  console.log(dibData);
  const {wh,sd,pl,ho} = dibData;
  useEffect(()=>{
    console.log(wh);
    let ls = [];
    if(wh!==undefined){
      for(let i=0; i<wh.length; i++){
        ls.push({dname: wh[i].whname, dtype: "웨딩홀", dprice: wh[i].whprice ,dwhidx:wh[i].whidx, dmid:id, bprice: wh[i].bprice ,dorder: i});
        setLikes(ls);
      }
    }
      if(sd!==undefined){
        for(let i=0; i<sd.length; i++){
          ls.push({dname: sd[i].scomp, dtype: "스드메", dprice: sd[i].sprice ,dsidx:sd[i].sidx, dmid:id, dorder: wh.length+i,});
          setLikes(ls);
        }
      }
      if(pl!==undefined){
        for(let i=0; i<pl.length; i++){
          ls.push({dname: pl[i].pname, dtype: "플래너", dprice: pl[i].pprice ,dpidx:pl[i].pidx, dmid:id, dorder: wh.length+sd.length+i,});
          setLikes(ls);
        }
      }
      if(ho!==undefined){
        for(let i=0; i<ho.length; i++){
          ls.push({dname: ho[i].hlocation, dtype: "허니문", dprice: ho[i].hcost ,dhidx:ho[i].hidx, dmid:id, dorder: wh.length+sd.length+pl.length+i,});
          setLikes(ls);
        }
      }
  },[wh],[sd],[pl],[ho]);
  // console.log({a})
  // likes.concat();
  // for(let i=1; i<3; i++){
  //   likes.concat({name: dd[i]});
  // }
  // console.log(likes)
  const [delData, setdelData] = useState([]);
  const [delbtn, setDelbtn] = useState(false);

  // const onRemoveHandler = (id) => () => {
  //   if (!window.confirm(`${likes[id].name} 을 찜 목록에서 삭제하시겠습니까?`)) return


  // }
  const [showData,setShowData]=useState([]);;
  useEffect(()=>{
    let tempShow = []
    console.log(likes);
    tempShow=likes.slice();
    console.log(tempShow)
      for(let i =0; i<tempShow.length; i++){
        tempShow[i]={...tempShow[i], dprice:comma(tempShow[i].dprice)}
    }
    setShowData(tempShow);
    console.log(showData);
  },[likes])


  useEffect(()=>{
    console.log("여기요오오"+delData);
    if(delbtn===true){
      axios.post("/deleteDib", delData)
      .then((res)=>{
        window.alert("힝 삭제됐어");
        setDelbtn(false);
        nav(0);
      });  
    }


    //버튼누를때 유즈스테이트 하나 바뀌게해서 만약에 그값이 바뀌면 axios 보낸다 해주면될듯
  },[delData,delbtn]);

  const [checkall,setCheckall] = useState(false);
  const [checkList, setCheckList] = useState([]);
  // useEffect(()=>{
  //   console.log(delData,checkall);
  // },[delData,checkall])
  let tempdelData = [];
  let tempcheckList = [];
  let tempallData= [];
  const onCheckboxChangeHandler = (e,index) => {
    console.log(checkList.length, likes.length);
    console.log(index);
    if (e.target.name!=="rperson" && e.target.name!=="rdatestart" && e.target.name!=="rdateend"){
      const val = Number(e.target.value)
      setCheckList(checkList.includes(val) ? checkList.filter((v) => v !== val) : [...checkList, val])
      console.log(val);
      console.log(checkList);
      {val ===-1&&checkall===false ? setCheckall(true): setCheckall(false)};
      if(val===-1&&delData.length!==likes.length){
        setCheckList([]);
        setdelData([]);
        setdelData(likes);
        console.log("제바아아알")
        console.log(delData);
        return;
      }else if(val===-1){
        // setCheckList(checkList.filter(v=> v !== val));
        setCheckall(false);
        setdelData([]);
        console.log(delData);
        return;
      }else if (val!==-1&&delData.length===likes.length){
        setCheckall(false);
        console.log(delData);
        console.log(checkList);
        for(let i = 0 ; i<likes.length; i++){
          tempcheckList.push(i);
        }
        tempcheckList.splice(val,1);
        setCheckList(tempcheckList);
        tempallData = delData.slice();
        tempallData.splice(val,1);
        setdelData(tempallData);
        return;
      }



      
      console.log(e.target.checked,checkall)
      console.log(likes[e.target.value].dtype, e.target.checked, checkall)
      if(likes[e.target.value].dtype==="웨딩홀"&&e.target.checked===true &&checkall===false){
        setdelData([...delData,{
          dtype:"웨딩홀",
          dmid:id,
          dwhidx:likes[e.target.value].dwhidx,
          dprice:likes[e.target.value].dprice,
          dname:likes[e.target.value].dname,
          dorder: index,
          bprice: likes[e.target.value].bprice
      }])}else if(likes[e.target.value].dtype==="웨딩홀"&&e.target.checked===false &&checkall===false){
        setdelData(delData.filter(delData=>delData.dwhidx!==likes[e.target.value].dwhidx))
      }
      if(likes[e.target.value].dtype==="스드메"&&e.target.checked===true &&checkall===false){
        console.log(likes[e.target.value].dsidx);
        setdelData([...delData,{
          dtype:"스드메",
          dmid:id,
          dsidx:likes[e.target.value].dsidx,
          dprice:likes[e.target.value].dprice,
          dname:likes[e.target.value].dname,
          dorder:index,
      }])}else if(likes[e.target.value].dtype==="스드메"&&e.target.checked===false &&checkall===false){
        setdelData(delData.filter(delData=>delData.dsidx!==likes[e.target.value].dsidx))
      }
      if(likes[e.target.value].dtype==="플래너"&&e.target.checked===true &&checkall===false){
        console.log(likes[e.target.value].dpidx);
        setdelData([...delData,{
        dtype:"플래너",
        dmid:id,
        dpidx:likes[e.target.value].dpidx,
        dprice:likes[e.target.value].dprice,
        dname:likes[e.target.value].dname,
        dorder:index,
      }])}else if(likes[e.target.value].dtype==="플래너"&&e.target.checked===false &&checkall===false){
        setdelData(delData.filter(delData=>delData.dpidx!==likes[e.target.value].dpidx))
      }
      if(likes[e.target.value].dtype==="허니문"&&e.target.checked===true &&checkall===false){
        console.log(likes[e.target.value].dhidx);
        setdelData([...delData,{
        dtype:"허니문",
        dmid:id,
        dhidx:likes[e.target.value].dhidx,
        dprice:likes[e.target.value].dprice,
        dname:likes[e.target.value].dname,
        dorder:index,
      }])}else if(likes[e.target.value].dtype==="허니문"&&e.target.checked===false &&checkall===false){
        setdelData(delData.filter(delData=>delData.dhidx!==likes[e.target.value].dhidx))
      }
    }


    if (e.target.name==="rperson" || e.target.name==="rdatestart" || e.target.name==="rdateend"){
      tempdelData=delData.slice();
      // console.log(delData.findIndex(d=>d.dorder===index));
      if(tempdelData.length!==0 &&e.target.name==="rperson"){
      tempdelData[delData.findIndex(d=>d.dorder===index)]={...tempdelData[delData.findIndex(d=>d.dorder===index)],[e.target.name]:parseInt(e.target.value)};
      setdelData(tempdelData);
      } else if(tempdelData.length!==0 &&e.target.name!=="rperson"){
        tempdelData[delData.findIndex(d=>d.dorder===index)]={...tempdelData[delData.findIndex(d=>d.dorder===index)],[e.target.name]:e.target.value};
        setdelData(tempdelData);
        }
      console.log(tempdelData);
      console.log(index);
      console.log(checkall)
    }
  }

  const borderChange = (e)=> {
    inputBorder.current.style.border="1px solid lightGray";
    inputBorder.current = e.target;
    inputBorder.current.style.border="1px solid black";
  }
  const personRegExp = /^[0-9]{0,4}$/;
  const dataConfirm= (e) =>{
    if(!personRegExp.test(inputBorder.current.value)){
      window.alert("0명 이상 입력해주세요");
      inputBorder.current.value="";
    }
  }
  console.log(delData);
  return (
    <div style={{ width: '100%' }}>
      <Table
        columns={[
          {
            name: checkall === false ? <input type="checkBox" checked={false} value={-1} onChange={(e)=>onCheckboxChangeHandler(e)}/>:<input type="checkBox" checked={true} value={-1} onChange={(e)=>onCheckboxChangeHandler(e)}/>,
            render: (v, index) => (
              checkall === true ? <input type="checkbox" value={index} onChange={(e)=>onCheckboxChangeHandler(e,index)} checked/> : checkall === false && checkList.indexOf(index) !== -1 ? <input type="checkbox" value={index} onChange={(e)=>onCheckboxChangeHandler(e,index)} checked/>:<input type="checkbox" value={index} onChange={(e)=>onCheckboxChangeHandler(e,index)}/>
            ),
          },
          {
            name: '등록번호',
            render: (v, index) => index + 1,
            style: {
              width: 80,
            },
          },
          {
            name: '타입',
            id: 'dtype',
          },
          {
            name: '상품명',
            id: 'dname',
          },
          {
            name: '예약일 선택',
            render: (v,index) => ( checkall===false ?( likes[index].dtype !== "허니문" && checkList.indexOf(index) === -1 ? <input type="date" name="rdatestart" onChange={(e)=>onCheckboxChangeHandler(e, index)} style={{width:"300px", fontSize:"16px", textAlign:"center", border:"none"}} disabled/> : likes[index].dtype !== "허니문" && checkList.indexOf(index) !== -1 ? <input type="date" name="rdatestart" onChange={(e)=>onCheckboxChangeHandler(e, index)} style={{width:"300px", fontSize:"16px", textAlign:"center", border:"none"}}/> : checkList.indexOf(index) === -1 ? <><input type="date" disabled onChange={(e)=>onCheckboxChangeHandler(e,index)} name="rdatestart" style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/><span> ~ </span><input type="date" name='rdateend' disabled onChange={(e)=>onCheckboxChangeHandler(e,index)} style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/></> :  <><input type="date" onChange={(e)=>onCheckboxChangeHandler(e,index)} name="rdatestart" style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/><span> ~ </span><input type="date" name='rdateend' onChange={(e)=>onCheckboxChangeHandler(e,index)} style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/></>)
            :( likes[index].dtype !== "허니문" ? <input type="date" name="rdatestart" onChange={(e)=>onCheckboxChangeHandler(e, index)} style={{width:"300px", fontSize:"16px", textAlign:"center", border:"none"}}/> : <><input type="date" onChange={(e)=>onCheckboxChangeHandler(e,index)} name="rdatestart" style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/><span> ~ </span><input type="date" name='rdateend' onChange={(e)=>onCheckboxChangeHandler(e,index)} style={{width:"150px",fontSize:"16px", textAlign:"center", border:"none"}}/></>)),
            id: 'selectRdate',
          },
          {
            name: '1인 식대',
            render: (v,index) => likes[index].dtype === "웨딩홀"?<div type="text" name="bprice" style={{width:"50px", textAlign:"center"}}>{likes[index].bprice} 만원</div>: null,
            id: 'bprice',
          },
          {
            name: '인원 선택',
            render: (v,index) => ( checkall===false ?( likes[index].dtype === "웨딩홀" && checkList.indexOf(index) === -1 ?<><input type="text" disabled ref={inputBorder} onClick={(e)=>borderChange(e)} onChange={(e)=>{onCheckboxChangeHandler(e,index);dataConfirm(e)}} name="rperson" maxLength="4" style={{width:"50px", border:"1px solid lightGray", textAlign:"center"}}/><label style={{color:"black", marginLeft:"10px"}}>명</label></> : likes[index].dtype === "웨딩홀" && checkList.indexOf(index) !== -1 ?  <><input type="text" ref={inputBorder} onClick={(e)=>borderChange(e)} onChange={(e)=>{onCheckboxChangeHandler(e,index);dataConfirm(e)}} name="rperson" maxLength="4" style={{width:"50px", border:"1px solid lightGray", textAlign:"center"}}/><label style={{color:"black", marginLeft:"10px"}}>명</label></>:null)
            : ( likes[index].dtype === "웨딩홀" ?  <><input type="text" ref={inputBorder} onClick={(e)=>borderChange(e)} onChange={(e)=>{onCheckboxChangeHandler(e,index);dataConfirm(e)}} name="rperson" maxLength="4" style={{width:"50px", border:"1px solid lightGray", textAlign:"center"}}/><label style={{color:"black", marginLeft:"10px"}}>명</label></>:null)),
            id: 'selectPopu',
          },
          {
            name: '가격',
            render: (v,index) => likes[index].dtype === "웨딩홀" && (delData[delData.findIndex(d=>d.dorder===index)]?.rperson ===null || delData[delData.findIndex(d=>d.dorder===index)]?.rperson === undefined || delData[delData.findIndex(d=>d.dorder===index)]?.rperson === "")?<div type="text" name="dprice" style={{width:"100px", textAlign:"right"}}>{likes[index]?.dprice} 만원</div>: likes[index].dtype === "웨딩홀"&&(checkList.indexOf(index) !==-1||checkall)&&(delData[delData.findIndex(d=>d.dorder===index)]?.rperson !==null || delData[delData.findIndex(d=>d.dorder===index)]?.rperson !==undefined || delData[delData.findIndex(d=>d.dorder===index)]?.rperson !== "") ?<div type="text" name="dprice" style={{width:"100px", textAlign:"right"}}>{likes[index].dprice+delData[delData.findIndex(d=>d.dorder===index)].bprice*delData[delData.findIndex(d=>d.dorder===index)].rperson} 만원</div> : <div type="text" name="dprice" style={{width:"100px", textAlign:"right"}}>{likes[index].dprice} 만원</div>,
            id: 'dprice',
          },
        ]}
        dataSource={showData}
      />
      <div style={{float:"right", marginTop:'50px', width:200, display:"flex", justifyContent:"space-around"}}>
        <Button onClick={()=>setDelbtn(true)}>선택삭제</Button>
      <Payment ptext="결제하기" pData={delData} />
      </div>
    </div>
  )
}
