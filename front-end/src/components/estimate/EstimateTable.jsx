import Section from '../main/Section'
import ETable from '../common/ETable'
import EstimateResult from './EstimateResult'
import InputGroup from '../form/InputGroup'
import Button from '../form/Button'
import "./EstimateTable.scss"
import { useState } from 'react'
import axios from 'axios'

const checkStyle =`{
  fontSize: ${(props) => props.theme.fontSize.lg};
  width:"20px";
  zoom:2;
  verticalAlign:"-2.5px";
}`


export default (props) => {
    const [ttslider, setTtslider]= useState({
        ws:true,
        ss:false,
        ps:false,
        hs:false
    })
    const [pboxp, setPboxp] = useState({wprice:0,sprice:0,pprice:0,hprice:0,total:0});
    const [wchecked, setWchecked] = useState();
    const [sdmchecked, setSdmchecked] = useState();
    const [pchecked, setPchecked] = useState();
    const [hchecked, setHchecked] = useState();
    const [conditionData, setConditionData] = useState({
        wdate : "0001-01-01",
        wseoul : "데이터없음",
        wgyeong : "데이터없음",
        win : "데이터없음",
        wgang : "데이터없음",
        wje : "데이터없음",
        wdae : "데이터없음",
        wchungbuk : "데이터없음",
        wchungnam : "데이터없음",
        wbu : "데이터없음",
        wul : "데이터없음",
        wgyeongnam : "데이터없음",
        wdaegu : "데이터없음",
        wgyeongbuk : "데이터없음",
        wgwang : "데이터없음",
        wminprice : 0,
        wmaxprice: 0,
        wjeonnam : "데이터없음",
        wjeonbuk : "데이터없음",
        whole : "데이터없음",
        common : "데이터없음",
        trad : "데이터없음",
        hotel : "데이터없음",
        house : "데이터없음",
        church : "데이터없음",
        cathedral : "데이터없음",
        outdoor : "데이터없음",
        sdate : "0001-01-01",
        sseoul : "데이터없음",
        sgyeong : "데이터없음",
        sin : "데이터없음",
        sgang : "데이터없음",
        sje : "데이터없음",
        sdae : "데이터없음",
        schungbuk : "데이터없음",
        schungnam : "데이터없음",
        sbu : "데이터없음",
        sul : "데이터없음",
        sgyeongnam : "데이터없음",
        sdaegu : "데이터없음",
        sgyeongbuk : "데이터없음",
        sgwang : "데이터없음",
        sjeonnam : "데이터없음",
        sjeonbuk : "데이터없음",
        sminprice : 0,
        smaxprice: 0,
        pdate : "0001-01-01",
        pminprice : 0,
        pmaxprice: 0,
        hdate : "0001-01-01",
        hseoul : "해외",
        hgyeong : "데이터없음",
        hin : "데이터없음",
        hgang : "데이터없음",
        hje : "데이터없음",
        hdae : "데이터없음",
        hchungbuk : "데이터없음",
        hchungnam : "데이터없음",
        hbu : "데이터없음",
        hul : "데이터없음",
        hgyeongnam : "데이터없음",
        hdaegu : "데이터없음",
        hgyeongbuk : "데이터없음",
        hgwang : "데이터없음",
        hjeonnam : "데이터없음",
        hjeonbuk : "데이터없음",
        hminprice : 0,
        hmaxprice: 0  
    }
    );
    const [searchEstData, setSearchEstData] = useState(
        [{
            whidx :0,
            whprice : 0,
            whstr: "",
            whkind: "",
            whwcidx: "",
        }],
        [{
            sidx :0,
            scomp :"",
            sphone : "",
            sprice : 0,
            slocation : "",
            sstr: "",
            scomp: "",
        }],
        [{
            pidx :0,
            pphone : "",
            pprice : 0,
            pstr : '',
        }],
        [{
            hidx :0,
            hphone : "",
            hcost : 0,
            hstr: "",
            hlocation: "",
            hbramd: "",
        }]
    );
    
    
    const TRslider = () => {
        if(ttslider.ws===true){
            setTtslider({
                ...ttslider,
                ws:false,
                ss:true,
                ps:false,
                hs:false
            })
        }else if(ttslider.ss===true){
            setTtslider({
                ...ttslider,
                ws:false,
                ss:false,
                ps:true,
                hs:false,
            })
        }else if(ttslider.ps===true){
            setTtslider({
                ...ttslider,
                ws:false,
                ss:false,
                ps:false,
                hs:true,
            })
        }
    }
    const TLslider = () => {
        if(ttslider.hs===true){
            setTtslider({
                ...ttslider,
                ws:false,
                ss:false,
                ps:true,
                hs:false
            })
        }else if(ttslider.ps===true){
            setTtslider({
                ...ttslider,
                ws:false,
                ss:true,
                ps:false,
                hs:false,
            })
        }else if(ttslider.ss===true){
            setTtslider({
                ...ttslider,
                ws:true,
                ss:false,
                ps:false,
                hs:false,
            })
        }
    }

    
    const ClickLabel = (e) => {
        if(e.target.checked==false){
            setConditionData({
                ...conditionData,
                [e.target.name]: "데이터없음",
            })
        }else if(e.target.checked==true){
            setConditionData({
                ...conditionData,
                [e.target.name] : e.target.value
            })
        }
        console.log(e.target);
        console.log(conditionData);
        console.log(e.target.checked);
    }
    const ClickDate = (e) => {
        setConditionData({
            ...conditionData,
            [e.target.name] : e.target.value
        })

        const pnoRegExp = /^[0-9]{0,5}$/;


        if(!pnoRegExp.test(conditionData.hminprice)||!pnoRegExp.test(conditionData.hmaxprice)||!pnoRegExp.test(conditionData.sminprice)||!pnoRegExp.test(conditionData.smaxprice)||!pnoRegExp.test(conditionData.pminprice)||!pnoRegExp.test(conditionData.pmaxprice)||!pnoRegExp.test(conditionData.wminprice)||!pnoRegExp.test(conditionData.wmaxprice)){
            alert("5자리이내의 숫자만 입력해주세요.");
            e.target.value="";
        }
        console.log(e.target);
        console.log(conditionData);
    }

    const labelColor = (e) => {
        if(e.target.style.color=="black"){
            e.target.style.color="lightGray";
        }else {
            e.target.style.color="black"
        }
    }

    const postEst = () => {
        setPboxp({...pboxp,
            wprice:0,
            sprice:0,
            pprice:0,
            hprice:0,});
        console.log("ㅋㅋ"+pboxp);
        axios.post("/searchEstimate",JSON.stringify(conditionData),{params : conditionData})
        .then((response) => {
            console.log(response.data.p);
            console.log(response.data);
            setSearchEstData(response.data);
            console.log(searchEstData);
        })
        .catch((error) => {
            console.log(error);
        })
        console.log(searchEstData);
    }
    
    const rankingData0 =[
        { name: <span style={{fontSize:20, display:"flex", justifyContent:"space-around"}}>
        <div><input type="checkbox" style={{width:"20px", zoom: 2,verticalAlign:"-3px", display:"none"}} id="wchecked"  onClick={(e)=>{setTtslider({...ttslider, ws:true, ss:false, ps:false, hs:false});e.target.style.color="hotPink"}} value={1} checked/>{ttslider.ws ? <label id="wlabel" htmlFor='wchecked' style={{color:"hotPink", fontWeight:"bold"}}>웨딩홀</label>:<label id="wlabel" htmlFor='wchecked'>웨딩홀</label>}</div>
        <div><input type="checkbox" style={{width:"20px", zoom: 2,verticalAlign:"-3px", display:"none"}} id="sdmchecked" onClick={(e)=>{setTtslider({...ttslider, ws:false, ss:true, ps:false, hs:false});e.target.style.color="hotPink"}} value={1}/>{ttslider.ss ? <label id="slabel" htmlFor='sdmchecked' style={{color:"hotPink", fontWeight:"bold"}}>스드메</label>:<label id="slabel" htmlFor='sdmchecked'>스드메</label>}</div>
        <div><input type="checkbox" style={{width:"20px", zoom: 2,verticalAlign:"-3px", display:"none"}} id="pchecked" onClick={(e)=>{setTtslider({...ttslider, ws:false, ss:false, ps:true, hs:false});e.target.style.color="hotPink"}} value={1}/>{ttslider.ps ? <label id="plabel" htmlFor='pchecked' style={{color:"hotPink", fontWeight:"bold"}}>플래너</label>:<label id="plabel" htmlFor='pchecked'>플래너</label>}</div>
        <div><input type="checkbox" style={{width:"20px", zoom: 2,verticalAlign:"-3px", display:"none"}} id="hchecked" onClick={(e)=>{setTtslider({...ttslider, ws:false, ss:false, ps:false, hs:true});e.target.style.color="hotPink"}} value={1}/>{ttslider.hs ? <label id="hlabel" htmlFor='hchecked' style={{color:"hotPink", fontWeight:"bold"}}>허니문</label>:<label id="hlabel" htmlFor='hchecked'>허니문</label>}</div></span>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%", borderRight:"1px solid #0000000a"}}></div>
        },
    ]
    const rankingData1 = [
        { name: <span style={{fontSize:20}}>
            <span style={{display:"flex", justifyContent:"space-around"}}>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wseoul" name="wseoul" onChange={(e)=>{ ClickLabel(e)}}value={"서울"}  /><label onClick={(e) => labelColor(e)} htmlFor='wseoul' >서울</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wgyeong" name="wgyeong" onChange={(e)=>{ ClickLabel(e)}} value={"경기"}  /><label onClick={(e) => labelColor(e)} htmlFor='wgyeong'>경기</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="win" name="win" onChange={(e)=>{ ClickLabel(e)}} value={"인천"}  /><label onClick={(e) => labelColor(e)} htmlFor='win'>인천</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wgang" name="wgang" onChange={(e)=>{ ClickLabel(e)}} value={"강원"}  /><label onClick={(e) => labelColor(e)} htmlFor='wgang'>강원</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wje"onChange={(e)=>{ ClickLabel(e)}} name="wje" value={"제주"}  /><label onClick={(e) => labelColor(e)} htmlFor='wje'>제주</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wdae"onChange={(e)=>{ ClickLabel(e)}} name="wdae" value={"대전"}  /><label onClick={(e) => labelColor(e)} htmlFor='wdae'>대전</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wchungbuk"onChange={(e)=>{ ClickLabel(e)}} name="wchungbuk" value={"충북"}  /><label onClick={(e) => labelColor(e)} htmlFor='wchungbuk'>충북</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wchungnam"onChange={(e)=>{ ClickLabel(e)}} name="wchungnam" value={"충남"}  /><label onClick={(e) => labelColor(e)} htmlFor='wchungnam'>충남</label></div>
            </span>
            <br/>
            <span style={{display:"flex", justifyContent:"space-around"}}>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wbu" onChange={(e)=>{ ClickLabel(e)}} name="wbu" value={"스위스"} /><label onClick={(e)=>labelColor(e)} htmlFor='wbu'>부산</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wul" onChange={(e)=>{ ClickLabel(e)}} name="wul" value={"체코"} /><label onClick={(e)=>labelColor(e)} htmlFor='wul'>울산</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wgyeongnam" onChange={(e)=>{ ClickLabel(e)}} name="wgyeongnam" value={"경남"} /><label onClick={(e)=>labelColor(e)} htmlFor='wgyeongnam'>경남</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wdaegu" onChange={(e)=>{ ClickLabel(e)}} name="wdaegu" value={"포르투갈"} /><label onClick={(e)=>labelColor(e)} htmlFor='wdaegu'>대구</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wgyeongbuk" onChange={(e)=>{ ClickLabel(e)}} name="wgyeongbuk" value={"경북"} /><label onClick={(e)=>labelColor(e)} htmlFor='wgyeongbuk'>경북</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wgwang" onChange={(e)=>{ ClickLabel(e)}} name="wgwang" value={"광주"} /><label onClick={(e)=>labelColor(e)} htmlFor='wgwang'>광주</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wjeonnam" onChange={(e)=>{ ClickLabel(e)}} name="wjeonnam" value={"전남"} /><label onClick={(e)=>labelColor(e)} htmlFor='wjeonnam'>전남</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="wjeonbuk" onChange={(e)=>{ ClickLabel(e)}} name="wjeonbuk" value={"전북"} /><label onClick={(e)=>labelColor(e)} htmlFor='wjeonbuk'>전북</label></div>
            </span>
            </span>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", height:"80px", lineHeight:"40px", borderRight:"1px solid #0000000a"}}>웨딩홀 &nbsp;위치</div>
        },
        { name: 
            <InputGroup><input type={"date"}style={{ marginLeft:-50, fontSize:"18px", border:"none", padding:"8px" ,textAlign:"center"}} name="wdate" onChange={(e)=>ClickDate(e)}></input></InputGroup>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", lineHeight:"40px",borderRight:"1px solid #0000000a"}}>웨딩홀 &nbsp;날짜</div>
        },
        { name: <span style={{fontSize:20}}>
            <span style={{display:"flex", justifyContent:"space-around"}}>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="whole" name="whole" onChange={(e)=>{ ClickLabel(e)}}value={"전체"}  /><label onClick={(e) => labelColor(e)} htmlFor='whole' >전체</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="common" name="common" onChange={(e)=>{ ClickLabel(e)}} value={"일반"}  /><label onClick={(e) => labelColor(e)} htmlFor='common'>일반</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="trad" name="trad" onChange={(e)=>{ ClickLabel(e)}} value={"전통혼례"}  /><label onClick={(e) => labelColor(e)} htmlFor='trad'>전통혼례</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hotel"onChange={(e)=>{ ClickLabel(e)}} name="hotel" value={"호텔"}  /><label onClick={(e) => labelColor(e)} htmlFor='hotel'>호텔</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="house"onChange={(e)=>{ ClickLabel(e)}} name="house" value={"하우스"}  /><label onClick={(e) => labelColor(e)} htmlFor='house'>하우스</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="church"onChange={(e)=>{ ClickLabel(e)}} name="church" value={"교회"}  /><label onClick={(e) => labelColor(e)} htmlFor='church'>교회</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="cathedral"onChange={(e)=>{ ClickLabel(e)}} name="cathedral" value={"성당"}  /><label onClick={(e) => labelColor(e)} htmlFor='cathedral'>성당</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="outdoor" name="outdoor" onChange={(e)=>{ ClickLabel(e)}} value={"야외"}  /><label onClick={(e) => labelColor(e)} htmlFor='outdoor'>야외</label></div>
            </span>
            </span>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", height:"80px", lineHeight:"40px", borderRight:"1px solid #0000000a"}}>웨딩홀 &nbsp;타입</div>
        },
        {   name:<div style={{display:"flex", marginLeft:"50px", alignItems:"center"}}>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px", marginLeft:"100px"}} name="wminprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{ margin:"0 20px",width:"50px", marginLeft:"1%"}}>만원</h3><h3 style={{marginRight:"2%"}}> ~ </h3>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px"}} name="wmaxprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{marginLeft:"-1%",width:"100px"}}>만원</h3><Button onClick={() => {postEst()}} style={{ width:"100px",height:"70px", marginLeft:120,background:'#c9a3b6', borderRadius:'10px'}}>검색</Button>
            </div>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", borderRight:"1px solid #0000000a"}}>웨딩홀 &nbsp;가격</div>},
        ]
    const rankingData2 =[
        { name: 
            <InputGroup><input type={"date"}style={{ marginLeft:-50, textAlign:"center", fontSize:"18px", border:"none", padding:"8px"}} name="sdate" onChange={(e)=>ClickDate(e)}></input></InputGroup>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", lineHeight:"40px",borderRight:"1px solid #0000000a"}}>스드메 &nbsp;날짜</div>
        },
        { name: <span style={{fontSize:20}}>
            <span style={{display:"flex", justifyContent:"space-around"}}>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sseoul"onChange={(e)=>{ ClickLabel(e)}} name="sseoul" value={"서울"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sseoul'>서울</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sgyeong"onChange={(e)=>{ ClickLabel(e)}} name="sgyeong" value={"경기"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sgyeong'>경기</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sin"onChange={(e)=>{ ClickLabel(e)}} name="sin" value={"인천"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sin'>인천</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sgang"onChange={(e)=>{ ClickLabel(e)}} name="sgang" value={"강원"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sgang'>강원</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sje"onChange={(e)=>{ ClickLabel(e)}} name="sje" value={"제주"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sje'>제주</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sdae"onChange={(e)=>{ ClickLabel(e)}} name="sdae" value={"대전"}  /><label onClick={(e)=>labelColor(e)} htmlFor='sdae'>대전</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="schungbuk"onChange={(e)=>{ ClickLabel(e)}} name="schungbuk" value={"충북"}  /><label onClick={(e)=>labelColor(e)} htmlFor='schungbuk'>충북</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="schungnam"onChange={(e)=>{ ClickLabel(e)}} name="schungnam" value={"충남"}  /><label onClick={(e)=>labelColor(e)} htmlFor='schungnam'>충남</label></div>
            </span>
            <br/>
            <span style={{display:"flex", justifyContent:"space-around"}}>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sbu" onChange={(e)=>{ ClickLabel(e)}} name="sbu" value={"부산"} /><label onClick={(e)=>labelColor(e)} htmlFor='sbu'>부산</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sul" onChange={(e)=>{ ClickLabel(e)}} name="sul" value={"울산"} /><label onClick={(e)=>labelColor(e)} htmlFor='sul'>울산</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sgyeongnam" onChange={(e)=>{ ClickLabel(e)}} name="sgyeongnam" value={"경남"} /><label onClick={(e)=>labelColor(e)} htmlFor='sgyeongnam'>경남</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sdaegu" onChange={(e)=>{ ClickLabel(e)}} name="sdaegu" value={"대구"} /><label onClick={(e)=>labelColor(e)} htmlFor='sdaegu'>대구</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sgyeongbuk" onChange={(e)=>{ ClickLabel(e)}} name="sgyeongbuk" value={"경북"} /><label onClick={(e)=>labelColor(e)} htmlFor='sgyeongbuk'>경북</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sgwang" onChange={(e)=>{ ClickLabel(e)}} name="sgwang" value={"광주"} /><label onClick={(e)=>labelColor(e)} htmlFor='sgwang'>광주</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sjeonnam" onChange={(e)=>{ ClickLabel(e)}} name="sjeonnam" value={"전남"} /><label onClick={(e)=>labelColor(e)} htmlFor='sjeonnam'>전남</label></div>
                <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="sjeonbuk" onChange={(e)=>{ ClickLabel(e)}} name="sjeonbuk" value={"전북"} /><label onClick={(e)=>labelColor(e)} htmlFor='sjeonbuk'>전북</label></div>
            </span>
            </span>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", height:"80px", lineHeight:"40px", borderRight:"1px solid #0000000a"}}>스드메 &nbsp;위치</div>
        },
        { name:<div style={{display:"flex", marginLeft:"50px", alignItems:"center"}}>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px", marginLeft:"100px"}} name="sminprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{ margin:"0 20px",width:"50px", marginLeft:"1%"}}>만원</h3><h3 style={{marginRight:"2%"}}> ~ </h3>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px"}} name="smaxprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{marginLeft:"-1%",width:"100px"}}>만원</h3><Button onClick={() => {postEst()}} style={{ width:"100px",height:"70px", marginLeft:120, background:'#c9a3b6', borderRadius:'10px'}}>검색</Button>
            </div>,
            type: <div style={{textAlign:"left", fontSize:20, width:"100%", borderRight:"1px solid #0000000a"}}>스드메 &nbsp;가격</div>
    },]
    const rankingData3 = [
        { name: 
            <InputGroup><input type={"date"}style={{ marginLeft:-50, textAlign:"center", fontSize:"18px", border:"none", padding:"8px"}} name="pdate" onChange={(e)=>ClickDate(e)}></input></InputGroup>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%", lineHeight:"40px",borderRight:"1px solid #0000000a"}}>플래너 &nbsp;날짜</div>
        },
        { name:<div style={{display:"flex", marginLeft:"50px", alignItems:"center"}}>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px", marginLeft:"100px"}} name="pminprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{ margin:"0 20px",width:"50px", marginLeft:"1%"}}>만원</h3><h3 style={{marginRight:"2%"}}> ~ </h3>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px"}} name="pmaxprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{marginLeft:"-1%",width:"100px"}}>만원</h3><Button onClick={() => {postEst()}} style={{ width:"100px",height:"70px", marginLeft:120,background:'#c9a3b6', borderRadius:'10px'}}>검색</Button>
            </div>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%", borderRight:"1px solid #0000000a"}}>플래너 &nbsp;가격</div>
    },]
    const rankingData4 = [
    { name: 
        <InputGroup><input type={"date"}style={{ marginLeft:-50, textAlign:"center", fontSize:"18px", border:"none", padding:"8px"}} name="hdate" onChange={(e)=>ClickDate(e)}></input></InputGroup>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%",lineHeight:"40px" ,borderRight:"1px solid #0000000a"}}>허니문 &nbsp;날짜</div>
    },
    { name: <span style={{fontSize:20}}>
        <span style={{display:"flex", justifyContent:"space-around"}}>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hseoul"onChange={(e)=>{ ClickLabel(e)}} name="hseoul" value={"국내"} /><label onClick={(e)=>labelColor(e)} htmlFor='hseoul'>국내</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hgyeong"onChange={(e)=>{ ClickLabel(e)}} name="hgyeong" value={"태국"} /><label onClick={(e)=>labelColor(e)} htmlFor='hgyeong'>태국</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hin"onChange={(e)=>{ ClickLabel(e)}} name="hin" value={"발리"} /><label onClick={(e)=>labelColor(e)} htmlFor='hin'>발리</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hgang"onChange={(e)=>{ ClickLabel(e)}} name="hgang" value={"하와이"} /><label onClick={(e)=>labelColor(e)} htmlFor='hgang'>하와이</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hje"onChange={(e)=>{ ClickLabel(e)}} name="hje" value={"몰디브"} /><label onClick={(e)=>labelColor(e)} htmlFor='hje'>몰디브</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hdae"onChange={(e)=>{ ClickLabel(e)}} name="hdae" value={"칸쿤"} /><label onClick={(e)=>labelColor(e)} htmlFor='hdae'>칸쿤</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hchungbuk"onChange={(e)=>{ ClickLabel(e)}} name="hchungbuk" value={"파리"} /><label onClick={(e)=>labelColor(e)} htmlFor='hchungbuk'>파리</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hchungnam"onChange={(e)=>{ ClickLabel(e)}} name="hchungnam" value={"이태리"} /><label onClick={(e)=>labelColor(e)} htmlFor='hchungnam'>이태리</label></div>
        </span>
        <br/>
        <span style={{display:"flex", justifyContent:"space-around"}}>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hbu" onChange={(e)=>{ ClickLabel(e)}} name="hbu" value={"스위스"} /><label onClick={(e)=>labelColor(e)} htmlFor='hbu'>스위스</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hul" onChange={(e)=>{ ClickLabel(e)}} name="hul" value={"체코"} /><label onClick={(e)=>labelColor(e)} htmlFor='hul'>체코</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hgyeongnam"el onChange={(e)=>{ ClickLabel(e)}} name="hgyeongnam" value={"포르투갈"} /><label onClick={(e)=>labelColor(e)} htmlFor='hgyeongnam'>포르투갈</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hdaegu" onChange={(e)=>{ ClickLabel(e)}} name="hdaegu" value={"스페인"} /><label onClick={(e)=>labelColor(e)} htmlFor='hdaegu'>스페인</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hgyeongbuk" onChange={(e)=>{ ClickLabel(e)}} name="hgyeongbuk" value={"모리셔스"} /><label onClick={(e)=>labelColor(e)} htmlFor='hgyeongbuk'>모리셔스</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hgwang" onChange={(e)=>{ ClickLabel(e)}} name="hgwang" value={"괌"} /><label onClick={(e)=>labelColor(e)} htmlFor='hgwang'>괌</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hjeonnam" onChange={(e)=>{ ClickLabel(e)}} name="hjeonnam" value={"사이판"} /><label onClick={(e)=>labelColor(e)} htmlFor='hjeonnam'>사이판</label></div>
            <div><input type="checkbox" style={{width:"20px", zoom: 2, verticalAlign:"-3px", display:"none"}} id="hjeonbuk" onChange={(e)=>{ ClickLabel(e)}} name="hjeonbuk" value={"두바이"} /><label onClick={(e)=>labelColor(e)} htmlFor='hjeonbuk'>두바이</label></div>
        </span>
        </span>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%", height:"80px", lineHeight:"40px", borderRight:"1px solid #0000000a"}}>허니문 &nbsp;위치</div>
        },
        { name:<div style={{display:"flex", marginLeft:"50px", alignItems:"center"}}>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px", marginLeft:"100px"}} name="hminprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{ margin:"0 20px",width:"50px", marginLeft:"1%"}}>만원</h3><h3 style={{marginRight:"2%"}}> ~ </h3>
            <input type={"text"} style={{width:"30%", fontSize:"18px", border:"1px solid #ddd", padding:"8px"}} name="hmaxprice" maxLength={5} onChange={(e)=>ClickDate(e)}></input><h3 style={{marginLeft:"-1%",width:"100px"}}>만원</h3><Button onClick={() => {postEst()}} style={{ width:"100px",height:"70px", marginLeft:120,background:'#c9a3b6', borderRadius:'10px'}}>검색</Button>
            </div>,
        type: <div style={{textAlign:"left", fontSize:20, width:"100%", borderRight:"1px solid #0000000a"}}>허니문 &nbsp;가격 </div>
        },
  ]

  const { w, s, p, h } = searchEstData;


  return (
    <>
    <Section title="상세견적" style={props.style} titleSize={"xl"}>
        <div className='slbtn' onClick={TLslider} style={{fontSize:"50px", position:"absolute", left:"80px", top:"85%"}}>«</div>
        <div className='slbtn' onClick={TRslider} style={{fontSize:"50px", position:"absolute", right:"80px", top:"85%"}}>»</div>
        <ETable
            style={{ marginTop: 30, marginBottom: "-30px", minWidth:"100%", zIndex:"10"}}
            data-aos="fade-up"
            columns={[ //배열
            {//예시
                name: '타입',
                id: 'type',
            },
            {//예시
                name: '이름',
                id: 'name',
            },
            ]}
            dataSource={rankingData0}
        />
            { ttslider.ws ? <div id='tcontainer' style={{minWidth:"100%", height:"450px" , overflow:"hidden", position:"relative", boxSizing:"border-box"}}>
        <ETable id="t1"
            style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:0, transition:"left 1s"}}
            data-aos="fade-up"
            columns={[ //배열
            {//예시
                name: '타입',
                id: 'type',
            },
            {//예시
                name: '이름',
                id: 'name',
            },
            ]}
            dataSource={rankingData1}
        />
                <ETable id="t2"
            style={{ marginTop: 30, minWidth:"100%", position:"absolute" , left:1500, transition:"left 1s"}}
            data-aos="fade-up"
            columns={[ //배열
            {//예시
                name: '타입',
                id: 'type',
            },
            {//예시
                name: '이름',
                id: 'name',
            },
            ]}
            dataSource={rankingData2}
        />
                <ETable id="t3"
            style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:3000, transition:"left 1s"}}
            data-aos="fade-up"
            columns={[ //배열
            {//예시
                name: '타입',
                id: 'type',
            },
            {//예시
                name: '이름',
                id: 'name',
            },
            ]}
            dataSource={rankingData3}
        />
                <ETable id="t4"
            style={{ marginTop: 30, minWidth:"100%", position:"absolute" , left:4500, transition:"left 1s"}}
            data-aos="fade-up"
            columns={[ //배열
            {//예시
                name: '타입',
                id: 'type',
            },
            {//예시
                name: '이름',
                id: 'name',
            },
            ]}
            dataSource={rankingData4}
        /></div>
: ttslider.ss ? <div id='tcontainer' style={{minWidth:"100%", height:"450px" , overflow:"hidden", position:"relative", boxSizing:"border-box"}}>
<ETable id="t1"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-1500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData1}
/>
        <ETable id="t2"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:0, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData2}
/>
        <ETable id="t3"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:1500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData3}
/>
        <ETable id="t4"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:3000, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData4}
/></div>
: ttslider.ps ? <div id='tcontainer' style={{minWidth:"100%", height:"450px" , overflow:"hidden", position:"relative", boxSizing:"border-box"}}>
<ETable id="t1"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-3000, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData1}
/>
        <ETable id="t2"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-1500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData2}
/>
        <ETable id="t3"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:0, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData3}
/>
        <ETable id="t4"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute" , left:1500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData4}
/></div> 
: ttslider.hs ? <div id='tcontainer' style={{minWidth:"100%", height:"450px" , overflow:"hidden", position:"relative", boxSizing:"border-box"}}>
<ETable id="t1"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-4500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData1}
/>
        <ETable id="t2"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-3000, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData2}
/>
        <ETable id="t3"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute", left:-1500, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData3}
/>
        <ETable id="t4"
    style={{ marginTop: 30, minWidth:"100%", position:"absolute" , left:0, transition:"left 1s"}}
    data-aos="fade-up"
    columns={[ //배열
    {//예시
        name: '타입',
        id: 'type',
    },
    {//예시
        name: '이름',
        id: 'name',
    },
    ]}
    dataSource={rankingData4}
/></div> : null}
    </Section>
    <EstimateResult eData={searchEstData} setPboxp={setPboxp} pboxp={pboxp}></EstimateResult>
    </>
  )
}