import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react"
import logo from "./image/logo.png"
import "./ModalPwd.scss";
import ModalPwdReset from "./ModalPwdReset.jsx";

const ModalPwd = ({ setSelectId, setPwd, setCheckValue, setModalOpen }) => {
    const modalRef = useRef(null);
    const [reset, setReset] = useState(false);
    const [findid, setFindid] = useState("");

    const [info, setInfo] = useState({
      mid : "",
      mphone : "" 
    })

    const onch = useCallback(e => {
      const formObj = {
        ...info,
        [e.target.name] : e.target.value,
      };
      setInfo(formObj);
      console.log(formObj);
    }, [info]);

    function checkOnlyOne(id) {
        let checkPick = document.getElementsByName('checkWrap');
        Array.prototype.forEach.call(checkPick, function (el) {
          el.checked = false;
        });
        id.target.checked = true;
        setCheckValue(id.target.defaultValue);
    }

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

    const [dis, setDis] = useState(false);

        function onClickCertification() {
            /* 1. 가맹점 식별하기 */
            const { IMP } = window;
            IMP.init("imp10391932");    

            /* 2. 본인인증 데이터 정의하기 */
            const data = {
              merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
              company: 'WeddingDive',                    // 회사명 또는 URL
              carrier: '',                               // 통신사
            //   id: `${value}`,
              name: '',                                  // 이름
              phone: '',                        // 전화번호
              popup:true,
            };
      
            /* 4. 본인인증 창 호출하기 */
            IMP.certification(data, callback);
          }
      
          /* 3. 콜백 함수 정의하기 */
          function callback(response) {
            const {
              success,
              merchant_uid,
              error_msg,
            } = response;
      
            if (success) {
              setDis(true);
              alert('본인인증 성공');
            } else {
              alert(`본인인증 실패: ${error_msg}`);
            }
          }

    const resetPage = (e) => {
      e.preventDefault();

      const pwd1 = document.getElementById("input1");
      const pwd2 = document.getElementById("input2");

      if(pwd1.value == "" || pwd2.value == ""){
        return alert("빈 칸 안에 값을 입력하세요");
      }

      console.log(info);
      axios
        .post("/checkPwd" , info)
        .then((res) => {
          console.log(res.data);
          if(res.data === "조건에 일치하는 회원이 없습니다."){
            alert(res.data);
          }else {
            setFindid(res.data);
            setReset(true);
          }
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="modal">
           <div ref={modalRef} className="container-three">
               <section className="user-input">
                   <img src={logo} alt="logo" className="ig2"/>
                   <div className="tx">가입할 때 작성한 정보를 입력해주세요 :)</div>
                   <hr className="hr"/>
                   <div className="radiv">
                    <div className="radiv1">
                        <input type="checkbox" className="inra1" name="checkWrap" onChange={(e) => checkOnlyOne(e)} onClick={() => setPwd(false)}/><span className="sp" onClick={() => setPwd(false)}>아이디찾기</span>
                    </div>
                    <div className="radiv2"> 
                        <input type="checkbox" className="inra2" checked name="checkWrap" onChange={(e) => checkOnlyOne(e)} /><span className="sp">비밀번호 찾기</span>
                    </div>
                   </div>
                   <div className="log-other1">아이디</div>
                   <input className="inp-id" type="text" id="input1" name="mid" onChange={onch} maxLength="25" required placeholder="아이디를 입력하세요."/>
                   <div className="log-other1">핸드폰 번호</div>
                   <div>
                    <input className="phonenum" type="text" id="input2" name="mphone" onChange={onch} maxLength="11" required placeholder="핸드폰 번호를 입력하세요."/>
                   <button className="phonebtn" style={{lineHeight:'18px', paddingTop:'-25px'}} onClick={onClickCertification}>인증<br/>번호</button></div>
                   {dis === true ? (<button className="log-btnid" id="joinIn" onClick={resetPage}>비밀번호 재설정하기</button>) : ( <button className="log-btnid2" id="joinIn" disabled>비밀번호 재설정하기</button> )}
                   {/* //  <button className="log-btnid" id="joinIn" disabled onClick={resetPage}>비밀번호 재설정하기</button> */}
                   <button className="log-btn-del" onClick={() => setSelectId(false)}>돌아가기</button>
               </section>
               {reset && <ModalPwdReset setReset={setReset} setModalOpen={setModalOpen} findid={findid}/>}
           </div>
        </div>        
    );
};

export default ModalPwd;
