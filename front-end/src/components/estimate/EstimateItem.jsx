import Button from '../form/Button'
import Typhography from '../common/Typhography'
import FlexBox from '../common/FlexBox';
import Payment from './Payment';
import "./EstimateItem.scss"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const EstimateItem = ( {pboxp,setPboxp,w,s,p,h, ...props} ) => {
  const comma = (num) =>[num].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const id = sessionStorage.getItem("mid");
  const nextId = useRef(0);
  const [a, setA]= useState(false);
  const [tbox, setTbox]= useState(0);
  const clickTbox =()=>{setTbox(1)};
  const clickTbox2 = () => {setTbox(0);}
  // && pboxp.wprice!=w[e.target.id.substr(1)].whprice
  const dibBtn= () => {
    // axios.post("/ddibInsert" , null, {params:{dibData:encodeURI(dibData)}})
    axios.post("/ddibInsert" ,dibData)
    .then((res)=>{
      window.alert("찜딱콩");
      setA(false);
      setDibData([]);
    }).catch(err=>{setA(false);setDibData([]);});
  }
  const clickwItem = (e) => {
    if(id===undefined || id===null || id===""){
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      return;
    }
    
    if(e.target.type==="submit"){
      let btnconfirm= window.confirm("찜하시겠습니까?");
      console.log(btnconfirm);
      if(btnconfirm===false){
        return;
      }
      else if(btnconfirm===true){
        setDibData([...dibData,{id:nextId.current ,dtype:"웨딩홀", dmid:id, dwhidx:w[e.target.id.substr(1)]?.whidx}]);
      }
      console.log(dibData);
      console.log(pboxp);
      setA(true);
      return;
    }

    const wc = document.getElementById("w"+e.target.id.substr(1));
    console.log("쫌"+wc.checked);
    console.log(w[e.target.id.substr(1)]);
      if(wc.checked==false){
      e.target.style.opacity=0.1;
        setPboxp({...pboxp, wprice:pboxp.wprice+w[e.target.id.substr(1)].whprice});
        setDibData([...dibData,{id:nextId.current ,dtype:"웨딩홀", dmid:id, dwhidx:w[e.target.id.substr(1)].whidx}]);
        console.log(dibData);
      }else{
        e.target.style.opacity=0;
        setPboxp({...pboxp, wprice:pboxp.wprice-w[e.target.id.substr(1)].whprice});
        for(let i=0; i<dibData.length; i=i+1){
        setDibData(dibData.filter(dibData => dibData.dwhidx!==w[e.target.id.substr(1)].whidx ));
        }
        console.log(dibData);
      }

  }
  
  const clicksItem = (e) => {
    if(id===undefined || id===null || id===""){
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      return;
    }
    
    if(e.target.type==="submit"){
      let btnconfirm= window.confirm("찜하시겠습니까?");
      console.log(btnconfirm);
      if(btnconfirm===false){
        return;
      }else if(btnconfirm===true){
        setDibData([...dibData,{id:nextId.current ,dtype:"스드메", dmid:id, dsidx:s[e.target.id.substr(1)].sidx}]);
      }
      console.log(dibData);
      console.log(pboxp);
      setA(true);
      return;
    }


    const sc = document.getElementById("sd"+e.target.id.substr(1));
    console.log(e);
    console.log("sc1 체크여부 :"+sc.checked+"아이디: s"+e.target.id.substr(1));
    if(sc.checked==false){
      e.target.style.opacity=0.1;
        setPboxp({...pboxp, sprice:pboxp.sprice+s[e.target.id.substr(1)].sprice});
        setDibData([...dibData,{id:nextId.current ,dtype:"스드메", dmid:id, dsidx:s[e.target.id.substr(1)].sidx}]);
    }else{
      e.target.style.opacity=0;
        setPboxp({...pboxp, sprice:pboxp.sprice-s[e.target.id.substr(1)].sprice});
        for(let i=0; i<dibData.length; i=i+1){
          setDibData(dibData.filter(dibData => dibData.dsidx!==s[e.target.id.substr(1)].sidx ));
          }
    }
  }

  const clickpItem = (e) => {
    if(id===undefined || id===null || id===""){
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      return;
    }
    
    if(e.target.type==="submit"){
      let btnconfirm= window.confirm("찜하시겠습니까?");
      console.log(btnconfirm);
      if(btnconfirm===false){
        return;
      }else if(btnconfirm===true){
        setDibData([...dibData,{id:nextId.current ,dtype:"플래너", dmid:id, dpidx:p[e.target.id.substr(1)].pidx}]);
      }
      console.log(dibData);
      console.log(pboxp);
      setA(true);
      return;
    }


    const pc = document.getElementById("pd"+e.target.id.substr(1));
    console.log("pcpc"+e.target.id.substr(1))
    console.log("pc1 체크여부 :"+pc.checked+"아이디: pd"+e.target.id.substr(1))
    if(pc.checked==false){
      e.target.style.opacity=0.1;
        setPboxp({...pboxp, pprice:pboxp.pprice+p[e.target.id.substr(1)].pprice});
        setDibData([...dibData,{id:nextId.current ,dtype:"플래너", dmid:id, dpidx:p[e.target.id.substr(1)].pidx}]);
    }else{
      e.target.style.opacity=0;
        setPboxp({...pboxp, pprice:pboxp.pprice-p[e.target.id.substr(1)].pprice});
        for(let i=0; i<dibData.length; i=i+1){
          setDibData(dibData.filter(dibData => dibData.dpidx!==p[e.target.id.substr(1)].pidx ));
        }
    }
  }

  const clickhItem = (e) => {
    if(id===undefined || id===null || id===""){
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      return;
    }
    
    if(e.target.type==="submit"){
      let btnconfirm= window.confirm("찜하시겠습니까?");
      console.log(btnconfirm);
      if(btnconfirm===false){
        return;
      }else if(btnconfirm===true){
        setDibData([...dibData,{id:nextId.current ,dtype:"허니문", dmid:id, dhidx:h[e.target.id.substr(1)].hidx}]);
      }
      console.log(dibData);
      console.log(pboxp);
      setA(true);
      return;
    }


    const hc = document.getElementById("ho"+e.target.id.substr(1));
    if(hc.checked==false){
      e.target.style.opacity=0.1;
        setPboxp({...pboxp, hprice:pboxp.hprice+h[e.target.id.substr(1)].hcost});
        setDibData([...dibData,{id:nextId.current ,dtype:"허니문", dmid:id, dhidx:h[e.target.id.substr(1)].hidx}]);
    }else{
        e.target.style.opacity=0;
        setPboxp({...pboxp, hprice:pboxp.hprice-h[e.target.id.substr(1)].hcost});
        for(let i=0; i<dibData.length; i=i+1){
          setDibData(dibData.filter(dibData => dibData.dhidx!==h[e.target.id.substr(1)].hidx ));
        }
    }
  }
  const wItem = w?.map((wlist,a) => {
    return (
      <div data-aos="fade-up" style={{ }}>
      <FlexBox style={{width:"100%"}}>
      <div
      style={{
        width: '1395px',
        height: '550px',
        backgroundImage: `url(upload/${wlist.whimg2})`,
        backgroundSize: '1395px 550px',
        borderRadius: "7px"
      }}/>
      <div className='ehover' onClick={() => window.open('/collect/wedding-hall/', '_blank')}>{wlist.whstr}</div>
      </FlexBox>
      { pboxp.wprice !== 0 ?
      <><input type="checkBox" id={"w"+a} style={{display:"none"}}/><label htmlFor={'w'+a} id={"a"+a} className='pcheck' onClick={(e)=>clickwItem(e)}></label></>:<><input type="checkBox" checked={false} id={'w'+a} style={{display:"none"}}/><label htmlFor={'w'+a} id={"a"+a} className='pcheck' style={{opacity:0}} onClick={(e)=>clickwItem(e)}></label></>}
    <p style={{ marginTop: 10, marginBottom: "50px"}}>
      <Typhography size="md" font="medium" style={{display:"inline-block", width:"100%", padding:"20px 10px 25px 20px", borderBottom:"1px dotted lightGray"}}>
        <span key={a} style={{fontSize:"25px", fontWeight:'bold'}}>{wlist.whname}</span>
        <div style={{float:"right"}}>
        <span style={{fontSize:"25px", fontWeight:'bold', lineHeight:"65px", marginRight:"100px"}}>{comma(wlist.whprice)}만원</span>
          <Payment ptext={"예약하기💕"} width={"120px"} height={"100px"} wlist={wlist} background ={'#C3B6D9'} borderRadius={'10px'}></Payment>
          <Button id={"w"+a} onClick={(e)=>{clickwItem(e)}} style={{width:120, height:100, background:"lightgray", borderRadius:'10px', marginLeft:'10px'}}>찜하기💕</Button>
        </div>
        <span style={{fontSize:"20px", fontWeight:'bold', lineHeight:"40px"}}><br/>{wlist.whkind}</span>
      </Typhography>
    </p>
    </div>);
  })
  console.log(w);
  const sItem = s?.map((slist,b) => {
    return (
      <div data-aos="fade-up" style={{}}>
      <FlexBox style={{width:"700px" }}>
      <div
      style={{
        width: '650px',
        height: '350px',
        backgroundImage: `url(upload/${slist.simg2})`,
        backgroundSize: '650px 350px',
        borderRadius: "7px"
      }}/>
      <div className='ehover2' onClick={() => window.open('/collect/sdm/', '_blank')}>{slist.sstr}</div>
      </FlexBox>
      { pboxp.sprice !== 0 ?
      <><input type="checkbox" id={"sd"+b} style={{display:"none"}}/><label htmlFor={'sd'+b} id={"b"+b} className='ppcheck' onClick={(e)=>clicksItem(e)}></label></>:<><input type="checkbox" checked={false} id={"sd"+b} style={{display:"none"}}/><label htmlFor={"sd"+b} id={"b"+b} className='ppcheck' style={{}} onClick={(e)=>clicksItem(e)}></label></>}
    <p style={{ marginTop: 10, marginBottom: "50px" }}>
      <Typhography size="md" font="medium" style={{display:"inline-block", width:"92%", padding:"10px 0px 15px 20px", borderBottom:"1px dotted lightGray"}}>
        <span key={b} style={{fontSize:"23px", fontWeight:'bold'}}>{slist.scomp}</span>
        <div style={{float:"right"}}>
        <span style={{fontSize:"23px", fontWeight:'bold', lineHeight:"55px", marginRight:"10px"}}>{comma(slist.sprice)}만원</span>
          <Payment ptext={"예약하기💕"} width={"120px"} height={"100px"} slist={slist} background ={'#C3B6D9'} borderRadius={'10px'}></Payment>
          <Button id={"b"+b}  onClick={(e)=>{clicksItem(e)}} style={{width:120, height:100, background:"lightgray", borderRadius:'10px', marginLeft:'10px'}}>찜하기💕</Button>
        </div>
        <span style={{fontSize:"19px", fontWeight:'bold', lineHeight:"40px"}}><br/>{slist.slocation}</span>
      </Typhography>
    </p>
    </div>);
  })
  
  const pItem = p?.map((plist,c) => {
    return (
      <div data-aos="fade-up" style={{ }}>
      <FlexBox style={{width:"700px"}}>
      <div
      style={{
        width: '650px',
        height: '600px',
        backgroundImage: `url(upload/${plist.pimg})`,
        backgroundSize: '650px 600px',
        borderRadius: "7px"
      }}/>
      <div className='ehover3' onClick={() => window.open('/collect/honeymoon/', '_blank')}>{plist.pstr}</div>
      </FlexBox>
      { pboxp.pprice !==0 ?
     <><input type="checkbox" id={"pd"+c} style={{display:"none"}}/><label htmlFor={'pd'+c} id={"c"+c} className='ppcheck' onClick={(e)=>clickpItem(e)}></label></>:<><input type="checkbox" checked={false} id={"pd"+c} style={{display:"none"}}/><label htmlFor={"pd"+c} id={"c"+c} className='ppcheck' style={{opacity:0}} onClick={(e)=>clickpItem(e)}></label></>}
    <p style={{ marginTop: 10, marginBottom: "50px" }}>
      <Typhography size="md" font="medium" style={{display:"inline-block", width:"92%", padding:"10px 0px 15px 20px", borderBottom:"1px dotted lightGray"}}>
        <span key={c} style={{fontSize:"23px", fontWeight:'bold'}}>{plist.pname}</span>
        <div style={{float:"right"}}>
          <span style={{fontSize:"23px", fontWeight:'bold', lineHeight:"55px", marginRight:"10px"}}>{comma(plist.pprice)}만원</span>
          <Payment ptext={"예약하기💕"} width={"120px"} height={"100px"} plist={plist} background ={'#C3B6D9'} borderRadius={'10px'}></Payment>
          <Button  onClick={(e)=>{clickpItem(e)}} id={"c"+c} style={{width:120, height:100, background:"lightgray", borderRadius:'10px', marginLeft:'10px'}}>찜하기💕</Button>
        </div>
        <span style={{fontSize:"19px", fontWeight:'bold', lineHeight:"40px"}}><br/>{plist.pphone}</span>
      </Typhography>
    </p>
    </div>);
  })
  const hItem = h?.map((hlist,d) => {
    console.log(d);
    console.log(`url(upload/${hlist.himg})`);
    return (
      <div data-aos="fade-up" style={{ }}>
      <FlexBox style={{width:"100%"}}>
      <div
      style={{
        width: '1395px',
        height: '550px',
        backgroundImage: `url('upload/${hlist.himg2}')`,
        backgroundSize: '1395px 550px',
        backgroundRepeat : "no-repeat",
        borderRadius: "7px"
      }} />
      <div className='ehover' style={{overflow:"hidden"}} onClick={() => window.open('/collect/honeymoon/', '_blank')}>{hlist.hstr}</div>
      </FlexBox>
      { pboxp.hprice !=0 ?
       <><input type="checkBox" id={"ho"+d} style={{display:"none"}}/><label htmlFor={'ho'+d} id={"d"+d} className='pcheck' onClick={(e)=>clickhItem(e)}></label></>:<><input type="checkBox" checked={false} id={'ho'+d} style={{display:"none"}}/><label htmlFor={'ho'+d} id={"d"+d} className='pcheck' style={{opacity:0}} onClick={(e)=>clickhItem(e)}></label></>}
    <p style={{ marginTop: 10, marginBottom: "50px" }}>
      <Typhography size="md" font="medium" style={{display:"inline-block", width:"100%", padding:"20px 10px 25px 20px", borderBottom:"1px dotted lightGray"}}>
        <span key={d} style={{fontSize:"25px", fontWeight:'bold'}}>{hlist.hlocation}</span>
        <div style={{float:"right"}}>
        <span style={{fontSize:"25px", fontWeight:'bold', lineHeight:"65px", marginRight:"100px"}}>{comma(hlist.hcost)}만원</span>
          <Payment ptext={"예약하기💕"} width={"120px"} height={"100px"} hlist={hlist} background ={'#C3B6D9'} borderRadius={'10px'}></Payment>
          <Button  onClick={(e)=>{clickhItem(e)}} id={"d"+d} style={{width:120, height:100, background:"lightgray", borderRadius:'10px', marginLeft:'10px'}}>찜하기💕</Button>
        </div>
        <span style={{fontSize:"20px", fontWeight:'bold', lineHeight:"40px"}}><br/>{hlist.hbrand}</span>
      </Typhography>
    </p>
    </div>);
  })

  console.log("스드메"+sItem);
  console.log(pItem);
  console.log("허니문"+hItem);

  const [dibData, setDibData] = useState([]);
  console.log("")
  useEffect(()=> {
    console.log(dibData);
  },[dibData])

  useEffect(()=>{
    console.log(dibData);
    if(a===true){
      dibBtn();
    }
  },[a])


  return (
    <div style={{marginBottom:80, marginTop:70}}>
      {(wItem !== undefined && wItem?.length!==0) ? 
      <>
      <h1 style={{marginTop:"-50px",marginBottom:"40px", marginLeft:"10px"}}>웨딩홀</h1> 
      <div style={{marginBottom:"80px", display:"flex", flexWrap:"wrap"}}>{wItem}</div></>: null }
      {(sItem !== undefined && sItem?.length!==0) ?
      <>
      <h1 style={{marginTop:"-50px",marginBottom:"40px", marginLeft:"10px"}}>스드메</h1> 
      <div style={{marginBottom:"80px", display:"flex", flexWrap:"wrap"}}>{sItem}</div></>: null }
      {pItem !== undefined && pItem?.length!==0 ? 
      <>
      <h1 style={{marginBottom:"40px", marginLeft:"10px"}}>플래너</h1>
      <div style={{marginBottom:"80px", display:"flex", flexWrap:"wrap"}}>{pItem}</div></>: null }
      {hItem !== undefined && hItem?.length!==0 ? 
      <>
      <h1 style={{marginBottom:"40px", marginLeft:"10px"}}>허니문</h1>
      <div style={{marginBottom:"80px", display:"flex", flexWrap:"wrap"}}>{hItem}</div></>: null }
      { pboxp.wprice+pboxp.sprice+pboxp.pprice+pboxp.hprice != 0 ?  <>
        {tbox == 0 ? 
        <div id="pricebox" style={{background:"rgb(255, 252, 253)", opacity:"1" ,color:"black" ,height:365, width:400, position:"fixed", right:"100px", bottom:"50px", transition: "all 1s", fontSize:"20px", borderRadius:"10px"}}><div style={{width:"90%", margin:"0 auto", lineHeight:"50px", marginTop:"15px"}}><div onClick={clickTbox} style={{width:"20px", height:"20px", cursor:"pointer", position:"absolute", right:"-30px"}}>X</div><span style={{marginLeft:"10px"}}>웨딩홀</span><span style={{float:"right"}}>{comma(pboxp.wprice)}만원</span></div><div style={{width:"90%", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>스드메</span><span style={{float:"right"}}>{comma(pboxp.sprice)}만원</span></div><div style={{width:"90%", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>플래너</span><span style={{float:"right"}}>{comma(pboxp.pprice)}만원</span></div><div style={{width:"90%", height:"60px" ,borderBottom:"2px solid", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>허니문</span> <span style={{float:"right"}}>{comma(pboxp.hprice)}만원</span></div><div style={{color:"red", width: "90%", margin:"0 auto", marginTop:"10px", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>합계 </span><span style={{float:"right"}}>{comma(pboxp.wprice+pboxp.sprice+pboxp.pprice+pboxp.hprice)}만원</span></div><div className='dib1' onClick={dibBtn}>전체 찜하기💕</div></div> : <div className='dib2' onClick={clickTbox2} style={{position:"fixed", bottom:"280px", right:"18px", fontSize:"40px"}}>💌</div>}</>:
      <><div id="pricebox" style={{background:"rgb(255, 248, 248)", opacity:"1" ,color:"black" ,height:365, width:400, position:"fixed", bottom:"50px", right:"-400px", transition: "all 1s", fontSize:"20px", borderRadius:"10px"}}><div style={{width:"90%", margin:"0 auto", lineHeight:"50px", marginTop:"15px"}}><div onClick={clickTbox} style={{width:"20px", height:"20px", cursor:"pointer", position:"absolute", right:"-30px"}}>X</div><span style={{marginLeft:"10px"}}>웨딩홀</span><span style={{float:"right"}}>{comma(pboxp.wprice)}만원</span></div><div style={{width:"90%", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>스드메</span><span style={{float:"right"}}>{comma(pboxp.sprice)}만원</span></div><div style={{width:"90%", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>플래너</span><span style={{float:"right"}}>{comma(pboxp.pprice)}만원</span></div><div style={{width:"90%", height:"60px" ,borderBottom:"2px solid", margin:"0 auto", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>허니문</span> <span style={{float:"right"}}>{comma(pboxp.hprice)}만원</span></div><div style={{color:"red", width: "90%", margin:"0 auto", marginTop:"10px", lineHeight:"50px"}}><span style={{marginLeft:"10px"}}>합계 </span><span style={{float:"right"}}>{comma(pboxp.wprice+pboxp.sprice+pboxp.pprice+pboxp.hprice)}만원</span></div><div className='dib1'>전체 찜하기💕</div></div>
      </>}
      </div>
  )
}

export default EstimateItem;