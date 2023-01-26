import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react"
import logo from "./image/logo.png"
import "./ModalPwdReset.scss";

const ModalPwdReset = ({ setSelectId, setReset, findid, setModalOpen }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (!modalRef.current.contains(event.target)) {
                setSelectId(false);
            }
        };

        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    const vd = {
        paddingTop : "2px",
        paddingBottom: "17px",
        fontSize: "30px",
    }

    const [newpwd, setNewpwd] = useState({
        mid : findid,
        mpwd : ""
    })

    const onch = useCallback(e => {
        const formObj = {
            ...newpwd,
            mpwd : e.target.value
        };
        setNewpwd(formObj);
        console.log(formObj);
    });

    const check = () => {
        let pwd11 = document.getElementById("pwd11");
        let pwd22 = document.getElementById("pwd22");
        let pwdresult = document.getElementById("pwdresult");
        let cresult = document.getElementById("cresult");

        const pwdRegExpp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

        if(pwd11.value == ""){
            pwdresult.style.display="none";
        }else if(!pwdRegExpp.test(pwd11.value)){
            pwdresult.innerHTML="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            pwdresult.style.display="block";
            pwdresult.style.color="red";
        }else if(pwdRegExpp.test(pwd11.value)) {
            pwdresult.innerHTML=("안전한 비밀번호 입니다.");
            pwdresult.style.display="block";
            pwdresult.style.color="limeGreen";
        }
        
        if(pwd11.value == "" || pwd22.value==""){
            cresult.style.display="none";
        }else if(pwd11.value==pwd22.value){
            cresult.style.display="block";
            cresult.style.color="limeGreen";
            cresult.innerHTML="비밀번호가 일치합니다.";
        }else{
            cresult.style.display="block";
            cresult.style.color="red";
            cresult.innerHTML="비밀번호가 일치하지않습니다."
        }

    }

    const resetPwd = (e) => {
        e.preventDefault();
  
        let pwd1 = document.getElementById("pwd11");
        let pwd2 = document.getElementById("pwd22");
        
        if(pwd1.value == "" || pwd2.value == ""){
          return alert("빈 칸 안에 값을 입력하세요");
        }else if(pwd1.value !== pwd2.value){
          return alert("동일한 비밀번호를 입력하세요");
        }
  
        console.log(newpwd);
        axios
            .post("/resetPwd" , newpwd)
            .then((res) => {
                console.log(res.data);
                if(res.data === "성공"){
                    alert("새로운 비밀번호로 로그인해주세요");
                    setModalOpen(false);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="modal">
           <div ref={modalRef} className="container-four">
               <section className="user-input">
                   <img src={logo} alt="logo" className="ig2"/>
                   <div className="tx">앞으로 사용할 비밀번호를 입력하세요 :)</div>
                   <hr className="hr"/>
                   <div>
                        <input type="checkbox" checked/><span className="sp2"> 비밀번호 재설정하기</span>
                    </div>
                   <div className="newPwd1">새로운 비밀번호</div>
                   <input className="inp-id" id="pwd11" onChange={(e) => {check(); onch(e)}} name="mpwd" type="password" required placeholder="비밀번호를 입력하세요."/>
                   <div id="pwdresult"></div>
                   <div className="newPwd2">비밀번호 확인</div>
                   <input className="inp-id" id="pwd22" onChange={check} type="password" required placeholder="다시 한번 입력해주세요."/>
                   <div id="cresult" style={{marginBottom:"15px"}}></div>
                   {/* <div style={vd}>💛💚💙💜🖤</div> */}
                   <button className="log-btnid" onClick={resetPwd}>재설정하기</button>
                   <button className="log-btn-del" onClick={() => setReset(false)}>돌아가기</button>
               </section>
           </div>
        </div>        
    );
};

export default ModalPwdReset;
