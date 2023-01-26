import React, { useEffect, useRef, useState } from "react";
import "./JoinModalBasic.scss";
import Logo from "./Logo";
import PopAddPostCode from "./PopAddPostCode";
import PopAddDom from "./PopAddDom";
import axios from "axios";
import PhoneConfirm from "./PhoneConfirm";
import { useNavigate } from "react-router-dom";


const JoinModal = ( props ) => {
    const nav = useNavigate();
    const [bb, setBb] = useState(false);
    const modalRef = useRef(null);
    const [cfBtn, setCfBtn] = useState(false);
    const [test, setTest] = useState({})
    const [a, setA] = useState("");
    const [b, setB] = useState(false);
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [p3, setP3] = useState("");
    const [r1, setR1] = useState("");
    const [r2, setR2] = useState("");
    const reftest = useRef();
    const [account, setAccount] = useState(
        {
        }
        )
        useEffect(()=>{
            axios.get("/compareId", {params:{mid:account.mid}})
            .then((res)=>{
                setTest({...test,
                fi:res.data});
            })
        },[account.mid]);


        //input에 입력될 때마다 account state값이 변경되게 하는 함수
    const onChangeAccount = (e) => {
        console.log(e.target.value+"asdsadadsda")
        console.log(test)
    if(e.target.name=="p1"){
        setP1(e.target.value);
    }
    if(e.target.name=="p2"){
        setP2(e.target.value);
    }
    if(e.target.name=="p3"){
        setP3(e.target.value);
    }
    if(e.target.name=="r1"){
        setR1(e.target.value);
    }
    if(e.target.name=="r2"){
        setR2(e.target.value);
    }

    const r = r1 + r2
    const p = p1 + p2 + p3;
    const addr = a
            setAccount({
                ...account,
            [e.target.name]: e.target.value,
            mpid : r,
            mphone: p,
            maddr: addr
        });

        // const joinIn=document.getElementById("joinIn");
        // if(a!= "" && b!= false){
        //     joinIn.disabled=false;
        // } else{
        //     joinIn.disabled=true;
        // }
        // if((account.mid&&account.mpwd&&account.mname&&account.mpid&&account.maddr&&account.mphone&&account.memail)!=""){
        //     joinIn.disabled=false;
        //     joinIn.style.background="black"
        // }
}


    const jbtn = () => {
        axios.post("/joinProc", account)
        .then((res) => {
            console.log(res);
            window.alert("이랏샤이마세 👏");
            props.setMymodal(false);
            setAccount({});
        }).catch(err => console.log(err))
    }


    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        // 이벤트 핸들러 함수
        if(isPopupOpen===true||bb===true){
            return;
        }
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (!modalRef.current.contains(event.target)) {
                props.setMymodal(false);
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);}
        };

        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    
    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    
    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    
    useEffect(()=>{
        console.log(reftest.current);
        let id1 = document.getElementById("checkId");
        let idresult = document.getElementById("idresult");
        const idRegExp = /^(?=.*[a-zA-Z][0-9])[^!@#$%^*+=-]{4,12}$/;
        let pwd1 = document.getElementById("pwd1");
        let pwd2 = document.getElementById("pwd2");
        let pwdresult = document.getElementById("pwdresult");
        let cresult = document.getElementById("cresult");
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(reftest.current===id1){
        if(account.mid===""||account.mid===undefined){
            idresult.style.display="none";
        } else if (!idRegExp.test(account.mid)) {
            setTest({...test, ai:0});
            idresult.innerHTML="대소문자 또는 숫자 조합으로 4-12자리 입력해 주세요!";
            idresult.style.display="block";
            idresult.style.color="red";
        }else if(test.fi==="Failed"){
            console.log("이걸봐"+test.fi);
            setTest({...test, ai:0});
            idresult.innerHTML="중복된 아이디 입니다.";
            idresult.style.display="block";
            idresult.style.color="red";
            console.log(test.ai)
        }else if(idRegExp.test(account.mid)&&test.fi==="Ok") {
            console.log("이걸봐"+test.fi);
            setTest({...test, ai:1});
            idresult.innerHTML="사용가능한 아이디 입니다.";
            idresult.style.display="block";
            idresult.style.color="limeGreen";
            console.log("할렐루야")
        }}

        if(reftest.current===pwd1){
        if(pwd1.value == "" || pwd1.value===undefined){
            pwdresult.style.display="none";
            setTest({...test,bi:0});
        } else if(!pwdRegExp.test(pwd1.value)){
            pwdresult.innerHTML="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            pwdresult.style.display="block";
            pwdresult.style.color="red";
            console.log("asddsa")
            setTest({...test, bi:0});
        }  else if(pwdRegExp.test(pwd1.value)) {
            pwdresult.innerHTML=("안전한 비밀번호 입니다.");
            pwdresult.style.display="block";
            pwdresult.style.color="limeGreen";
            setTest({...test, bi:1});
        }
    }
        if(reftest.current===pwd2){   
            if(pwd1.value == "" || pwd2.value==""){
            cresult.style.display="none";
            setTest({...test,ci:0});;
        }else if(pwd1.value==pwd2.value){
            cresult.style.display="block";
            cresult.style.color="limeGreen";
            cresult.innerHTML="비밀번호가 일치합니다.";
            setTest({...test,ci:1});;
        } else{
            cresult.style.display="block";
            cresult.style.color="red";
            cresult.innerHTML="비밀번호가 일치하지않습니다."
            setTest({...test,ci:0});;
        }
    }

    // const regName = () => {
        const nameCheck=document.getElementById("nameCheck");
        if(reftest.current===nameCheck){ 
            const nameRegExp = /^[a-zA-zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,12}$/;
            if(!nameRegExp.test(nameCheck.value)){
                nameCheck.value="";
                alert("한글 또는 영어 12자 이하로 입력해주세요")
            }
        }
    // }

    // const regRno = () => {
        const rnoCheck1=document.getElementById("rnoCheck1");
        const rnoCheck2=document.getElementById("rnoCheck2");
        if(reftest.current===rnoCheck1||reftest.current===rnoCheck2){ 
            const rnoRegExp = /^[0-9]{0,7}$/;
            const rnoRegExp2 = /^[0-9]{6}$/;
            const rnoRegExp3 = /^[0-9]{7}$/;

        if(!rnoRegExp.test(rnoCheck1.value)){
            rnoCheck1.value="";
            alert("숫자만 입력해주세요.")
        }
        if(!rnoRegExp.test(rnoCheck2.value)){
            rnoCheck2.value="";
            alert("숫자만 입력해주세요.")
        }

        if(rnoRegExp2.test(rnoCheck1.value)&&rnoRegExp3.test(rnoCheck2.value)){
            setTest({...test,
                ei:1
            })
        }else{
            setTest({...test,
                ei:0
            })
        }
    }
    // }
    // const regPno = () => {
        const pnoCheck1=document.getElementById("pnoCheck1");
        const pnoCheck2=document.getElementById("pnoCheck2");
        const pnoCheck3=document.getElementById("pnoCheck3");
        if(reftest.current===pnoCheck1 ||reftest.current===pnoCheck2 ||reftest.current===pnoCheck3){ 
        const pnoRegExp = /^[0-9]{0,4}$/;
        const pnoRegExp2 = /^[0-9]{3}$/;
        const pnoRegExp3 = /^[0-9]{4}$/;


        if(!pnoRegExp.test(pnoCheck1.value)){
            pnoCheck1.value="";
            alert("숫자만 입력해주세요.")
        }
        if(!pnoRegExp.test(pnoCheck2.value)){
            pnoCheck2.value="";
            alert("숫자만 입력해주세요.")
        }
        if(!pnoRegExp.test(pnoCheck3.value)){
            pnoCheck3.value="";
            alert("숫자만 입력해주세요.")
        }

        if(pnoRegExp2.test(pnoCheck1.value)&&pnoRegExp3.test(pnoCheck2.value)&&pnoRegExp3.test(pnoCheck3.value)){
            setTest({...test,
                di:1
            })
        }else{
            setTest({...test,
                di:0
            })
            setB(false);
        }
    }
    
    const myemail = document.getElementById("myE");
    if(reftest.current===myemail){
            console.log('이거다아아')
            const emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            if(emailRegExp.test(myemail.value)){
                setTest({...test,
                    gi:1
                })
            } else{
                setTest({...test,
                    gi:0
                })
            }
        }
    
        const addr2 = document.getElementById("addr2");
        if(reftest.current===addr2){
            console.log(addr2.value);
            if(addr2.value===""||addr2.value===undefined){
                setTest({...test,
                    hi:0
                })
            } else{
                setTest({...test,
                    hi:1
                })
            }
        }
    
    },[account.mid,account.mpwd,account.mpwd2,account.mpid, account.mname ,account.mphone, account.maddr, account.mdaddr,account.memail ,test.fi])
    console.log(test)
    const click= (e) => {
        reftest.current = e.target;
        console.log(reftest.current)
    }
    return (
        <div className="JoinModal">
           <div ref={modalRef} className="JoinContainer">
               <section className="user-input">
                   <div className="jtx"><Logo>Wedding Dive<br/> Join</Logo></div>
                   <hr className="jhr"/>
                   <form>
                   <div className="jinput-container">
                   <div className="join-title">아이디</div>
                   <input className="input-basic" id="checkId" type="text" required placeholder="아이디를 입력하세요." name="mid" ref={reftest} onClick={(e)=>click(e)} onChange={(e)=> { onChangeAccount(e); click(e)}} autoFocus/>
                   </div>
                   <div id="idresult" style={{display:"none", color:"red", textIndent:"0%", textAlign:"left" , paddingBottom:"15px",lineHeight:"0px" , marginLeft:"210px"}}></div>
                   <div className="jinput-container">
                   <div className="join-title">비밀번호</div>
                   <input className="input-basic" id="pwd1" type="password" required placeholder="비밀번호를 입력하세요." name="mpwd"ref={reftest} onClick={(e)=>click(e)} onChange={(e)=>{ onChangeAccount(e); click(e)}} />
                   </div>
                   <div id="pwdresult" style={{display:"none", color:"red", textIndent:"0%", textAlign:"left" ,paddingBottom:"15px",lineHeight:"0px" , marginLeft:"210px"}}></div>
                   <div className="jinput-container">
                   <div className="join-title">비밀번호 <br/>재확인</div>
                   <input className="input-basic" id="pwd2" name="mpwd2" type="password" required placeholder="비밀번호를 입력하세요. " ref={reftest} onClick={(e)=>click(e)}  onChange={(e)=>{ onChangeAccount(e); click(e)}}/>
                   </div>
                   <div id="cresult" style={{display:"none", color:"red", textIndent:"0%", textAlign:"left" , paddingBottom:"15px",lineHeight:"0px" , marginLeft:"210px"}}></div>
                   <div className="jinput-container">
                   <div className="join-title">이름</div>
                   <input className="input-basic" id="nameCheck" type="text" required placeholder="이름을 입력하세요." name="mname" ref={reftest} onClick={(e)=>click(e)} onChange={(e) => {onChangeAccount(e); click(e)}}/>
                   </div>
                   <div className="jinput-container">
                   <div className="join-title">주민번호</div>
                        <div style={{width:"350px"}}>
                            <input className="mtrno" id="rnoCheck1" type="text" maxLength="6" minLength="6" required placeholder="950618" name="r1" ref={reftest} onClick={(e)=>click(e)} onChange={(e) => {onChangeAccount(e); click(e)}}/><span style={{margin:"0 2%"}}>-</span>
                            <input className="mtrno" id="rnoCheck2" type="password" maxLength="7" minLength="7" required placeholder="1xxxxxx" name="r2" ref={reftest} onClick={(e)=>click(e)} onChange={(e) =>{onChangeAccount(e); click(e)}}/>
                        </div>
                   </div>
                   <div className="jinput-container">
                   <div className="join-title">주소</div>
                   <input className="input-basic" type="text" value={a} name="maddr" readOnly required placeholder="주소를 입력하세요." onClick={() => openPostCode()}/>
                   </div>
                   <div className="jinput-container">
                   <div className="join-title">상세주소</div>
                   <input className="input-basic" type="text" id="addr2" name="mdaddr" required placeholder="상세주소를 입력하세요."ref={reftest} onClick={(e)=>click(e)} onChange={(e)=>{onChangeAccount(e); click(e)}}/>
                   </div>
                   <div className="jinput-container">
                   <div className="join-title">핸드폰 <br/>번호</div>
                   <span className="phone-container">
                    { b === false ? <>
                   <input className="phone-box" id="pnoCheck1" type="text" minLength="2" maxLength="3" required placeholder="010" name="p1" ref={reftest} onClick={(e)=>click(e)} onChange={(e) =>{onChangeAccount(e); click(e)}}/><span className="phonew">-</span>
                   <input className="phone-box" id="pnoCheck2" type="text" minLength="4" maxLength="4" required placeholder="0000" name="p2"ref={reftest} onClick={(e)=>click(e)}  onChange={(e) =>{onChangeAccount(e); click(e)}}/><span className="phonew">-</span>
                   <input className="phone-box" id="pnoCheck3" type="text" minLength="4" maxLength="4" required placeholder="0000" name="p3" ref={reftest} onClick={(e)=>click(e)} onChange={(e) =>{onChangeAccount(e); click(e)}}/></> :  <>
                   <input className="phone-box" id="pnoCheck1" type="text" minLength="2" maxLength="3" required placeholder="010" name="p1" disabled onChange={(e) =>{onChangeAccount(e); click(e)}}/><span className="phonew">-</span>
                   <input className="phone-box" id="pnoCheck2" type="text" minLength="4" maxLength="4" required placeholder="0000" name="p2" disabled  onChange={(e) =>{onChangeAccount(e); click(e)}}/><span className="phonew">-</span>
                   <input className="phone-box" id="pnoCheck3" type="text" minLength="4" maxLength="4" required placeholder="0000" name="p3" disabled  onChange={(e) =>{onChangeAccount(e); click(e)}}/></> }
                   { test.di ===1 ?
                   <PhoneConfirm opacity={1} background={'#C3B6D9'} setB={setB} setBb={setBb} account={account} p1={p1} p2={p2} p3={p3} /> : <PhoneConfirm background={"#C3B6D9"} opacity={0.7} setB={setB} disabled={true} />}
                   </span>
                   </div>
                   <div className="jinput-container">
                   <div className="join-title">이메일</div>
                   <input className="input-basic" id="myE" type="email" name="memail" required placeholder="@이메일주소를 입력하세요." ref={reftest} onChange={(e)=>{onChangeAccount(e); click(e)}}/>
                   </div>
                   {account.mid!==""&&account.mpwd!==""&&account.mname!==""&&account.mpid!==""&&account.maddr!==""&&account.mphone!==""&&account.memail!==""&&a!==""&&b!==false&&test.bi===1&&test.ci===1&&test.di===1&&test.ei===1&&test.gi===1&&test.hi===1 ?
                   <button type="button" className="join-btn" id="joinIn" style={{background:"#C9A3B6"}} onClick={jbtn}>회원가입</button> : <button type="button" className="join-btn" id="joinIn" style={{background:"#C9A3B6", opacity:"0.7"}} disabled>회원가입</button>}
                    { props.mymodal ? <button className="join-btn-del" style={{background:"lightgray"}} onClick={()=>props.setMymodal(false)}>취소하기</button>:<button className="join-btn-del" style={{background:"lightgray"}} onClick={() =>props.setSelectJoin(false)}>돌아가기</button>}
               </form>
               </section>
               <div>
                </div>
                </div>
                    {/* 클릭 시 팝업 생성 */}
                    {/* 팝업 생성 기준 div */}
                    <div id='popupDom'>
                        {isPopupOpen && (
                            <PopAddDom>
                                <PopAddPostCode onClose={closePostCode} setA={setA} />
                            </PopAddDom>
                        )}
                </div>
        <div>
    </div>
</div>         
    );
}

export default JoinModal;