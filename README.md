ICIA 최종프로젝트 Wedding Dive
---
프로젝트 기간 : 1달 반<br><br>
프로젝트 인원 : 6명
사용 프로그램 : visual studio, intellj, Mysql<br><br>
사용 언어 : Html, CSS, JavaScript, React, Java<br>
### 환경 구성<br>
IDE(통합개발환경) : IntelliJ Ultimate(유료 버전), Visual Studio Code<br><br>
프레임워크 : Spring Boot<br><br>
데이터베이스 : Mysql<br><br>
DB 접근 기술 : JPA<br><br>
View 템플릿 : React<br>
### **[프로젝트 설명]**
4달 반 교육 후 약 한달 반 가량의 최종 프로젝트 입니다.<br>제가 구현한 기능으로는,<br>
## ModalBasic.jsx 컴포넌트

※ 로그인(일반회원, 소셜로그인(네이버,구글)

```javascript
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import "./ModalBasic.scss";
import logo from "./image/logo.png";
import naver from "./image/naverplus.png";
import kakao from "./image/kakao.jpg";
import google from "./image/Google.png";
import facebook from "./image/facebook.png";
import ModalId from "./ModalId.jsx";
import JoinModal from "./JoinModal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function ModalBasic({ setModalOpen, sucLogin, sucLoginNaver, sucLoginGoogle }) {
    // 모달 외부 클릭시 끄기 처리
    const modalRef = useRef(null);
    const [selectId, setSelectId] = useState(false);
    const [selectJoin, setSelectJoin] = useState(false);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (!modalRef.current.contains(event.target)) {
                setModalOpen(false);
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);}
        };

        document.addEventListener('mousedown', handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응
        
        return () => {
            document.removeEventListener('mousedown', handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    const showModalId = () => {
        setSelectId(true);
    };

    const showModalJoin = () => {
        setSelectJoin(true);
    };

    const [form, setForm] = useState({
        mid : "",
        mpwd : "",
    });
    const { mid , mpwd } = form;

    const nav = useNavigate();

    const sendLogin = (e) => {
        e.preventDefault();

        console.log(form);
        axios
            .post("/loginProc", form)
            .then((response) => {
                console.log(response);
            if (response.data !== ""){
                alert('로그인 성공');
                console.log(response.data);
                const mid = response.data.mid;
                const grade = response.data.grade;
                sucLogin(mid,grade);
                // 로그인 상태 유지(세션)
                sessionStorage.setItem("mid", mid);
                sessionStorage.setItem("grade", grade);
                setModalOpen(false);
                nav("/");
            }
            else {
                alert("아이디나 비밀번호가 틀립니다.");
                const formObj = {
                mid: "",    
                mpwd: "",
                };
                setForm(formObj);  
            }
        })
        .catch((error) => {alert('통신 실패'); console.log(error)});
    };

    const onChange = useCallback((e) => {
        const formObj = {
            ...form,
            [e.target.name] : e.target.value,
        };
        setForm(formObj);
    }, [form]);

    const naverRef = useRef();
    const googleRef = useRef();
    
	const initializeNaverLogin = () => {
        const { naver } = window;

        const NAVER_CLIENT_ID = "???";  // 발급 받은 Client ID 입력 
        const NAVER_CALLBACK_URL = "http://localhost:3000";  // 작성했던 Callback URL 입력
    
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 55 },
			callbackHandle: true,
		})
		naverLogin.init();
      
        naverLogin.getLoginStatus(async function (status) {
            console.log(`네이버 로그인 상태 : ${status}`)
			if (status) {
                console.log(naverLogin.user);
                const naverId = naverLogin.user.email;
                const naverNickName = naverLogin.user.nickname;

                sucLoginNaver(naverId,naverNickName);
                sessionStorage.setItem("mid", naverId);
                sessionStorage.setItem("naverNickName", naverNickName);
                sessionStorage.setItem("grade", "user");
			}
		}) 
	}

    const google_client_Id = "???";

    function start(){
        gapi.client.init({
          clientId : google_client_Id,
          scope : "https://www.googleapis.com/auth/userinfo.email",
        });
      }

    useEffect(() => {
		initializeNaverLogin();
        gapi.load('client:auth2', start);
	}, []);

    async function onSuccess(res) {
        setModalOpen(false);

        // console.log(res);
        // console.log(res.profileObj);

        const googleId = res.profileObj.email;
        const googleName = res.profileObj.name;
        console.log(googleId);
        console.log(googleName);

        sucLoginGoogle(googleId,googleName);

        sessionStorage.setItem("mid", googleId);
        sessionStorage.setItem("googleName", googleName);
        sessionStorage.setItem("grade", "user");

        axios
        .get("/googleLoginCheck", { params : { mid : googleId, mname : googleName}})
        .then((res) => {
            console.log(res.data);

            if(res.data === "회원가입 가능"){

                let confirm = window.confirm("구글의 가입 정보로 회원가입을 하시겠습니까?");

                if(confirm === true){
        
                  axios
                      .get("/googleLogin", { params : { mid : googleId, mname : googleName}})
                      .then((res) => {
                          console.log(res.data);
        
                          if(res.data === "존재하는 아이디"){
                            alert("이미 가입한 회원입니다.");
                          }else {
                            alert("회원가입 성공! 👏");
                          }
                      })
                      .catch((err) => console.log(err));
        
                }
            }
        })
        .catch((err) => console.log(err));
    }
    
    const onFailure = (res) => {
        alert("구글 로그인에 실패하였습니다");
        console.log("실패", res);
    };

    return (
        <div className="modal">
            <div ref={modalRef} className="container">
                <form onSubmit={sendLogin} className="user-input">
                    <img src={logo} alt="logo" className="ig"/>
                        <input className="inp-id" type="text" name="mid" value={mid} onChange={onChange} required placeholder="아이디"/>
                        <input className="inp-pw" type="password" name="mpwd" value={mpwd} onChange={onChange} maxLength="45" required placeholder="비밀번호"/>
                        <button type="submit" className="log-btn">로그인</button>
                    <ul className="join-find">
                        <li className="user-join" onClick={showModalJoin} >&nbsp;&nbsp;&nbsp;회원가입</li>
                        <li onClick={showModalId}>아이디/비밀번호 찾기</li>
                    </ul>
                    <div className="log-other">또는</div>
                </form>
                <section>
                    <div className="other-btn">
                        <div ref={googleRef} style={{display:"none"}}>
                            <GoogleLogin 
                            className="google-button"
                            buttonText="구글 계정으로 로그인" // 버튼에 뜨는 텍스트
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <div className="log-glg btn glg" onClick={() => {googleRef.current.children[0].click();}}>
                            <img src={google} alt="google"/>
                            <div className="log-txt">구글 계정으로 로그인</div>
                        </div>
                        <div ref={naverRef} style={{display:"none"}} id="naverIdLogin"></div>
                        <div className="log-naver btn naver" onClick={() => {naverRef.current.children[0].click();}}>
                            <img src={naver} alt="naver"/>
                            <div className="log-txt">네이버 계정으로 로그인</div>
                        </div>
                    </div>
                </section>
                {selectId && <ModalId setSelectId={setSelectId} setModalOpen={setModalOpen}/>} 
                {selectJoin && <JoinModal setSelectJoin={setSelectJoin} setModalOpen={setModalOpen}/>} 
            </div>
        </div>    
    );
}

export default ModalBasic;
```
- #### 일반회원<br>
로그인과 비밀번호 input창에 onChange함수를 이용해 useState에 보관 후 '로그인' 버튼 클릭시 axios를 사용해 JSON형태로 지정한 url로 보낸 후 intellij에서 return한 값이 공백이 아닐 경우 로그인 성공이란 alert창과 함께 받아온 값 중 mid와 grade를 sessionStorage에 저장 후 모달창 끄고 메인페이지로 이동합니다.<br>
- #### 소셜회원<br>
네이버와 구글 api를 사용해 제가 허가한 이메일만 로그인이 되도록 하였고 로그인 시 주는 한정적인 데이터 중, 쓸 수 있는 데이터인 이름과 아이디를 세션에 저장 후 바로 axios를 사용해 데이터베이스에서 일치하는 id 정보가 없을때만 회원가입이 가능하게 했습니다.

## Back_MemberController
```java
    @ResponseBody
    @PostMapping("loginProc")
    public Member loginProc(@RequestBody Member member, HttpServletRequest request){
        log.info("loginProc()");
        HttpSession session = request.getSession();
        Member login = mServ.loginProc(member);
        session.setAttribute("member", login);
        return login;
    }
```
## Back_MemberService
```java
 public Member loginProc(Member member) {
        log.info("loginProc()");
        Member dbMember = null;

        try {
            dbMember = mRepo.findById(member.getMid()).get();
            log.info("dbMember" + dbMember);
            if (encoder.matches(member.getMpwd(), dbMember.getMpwd())){
                //session.setAttribute("member", dbMember);
                log.info("" + dbMember);
                //log.info("" + session);
                return dbMember;
            }
            else {
                dbMember = null;
            }
        }catch (Exception e){
            log.info(e.getMessage());
            dbMember = null;
        }

        return dbMember;
    }
```
회원가입 시 비밀번호가 암호화되어 들어가기 때문에, 프론트에서 받아온 값을 매개변수로 받아 내장함수인 findById로 데이터베이스에 일치하는 회원의 데이터를 가져온 후 비교 해 일치하면 멤버 데이터를 return하고 일치하지 않는다면 null을 return합니다. 그 후 back 세션에도 "member"란 변수에 로그인 한 회원의 데이터를 저장합니다.<br><br>
- #### 로그인 창 활성화 화면<br><br>
![image](https://user-images.githubusercontent.com/117874997/215289298-3d6edfe0-1d41-482c-ae87-c0a95a150ed9.png)

## ModalId.jsx 컴포넌트

※ 아이디 찾기
```javascript
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react"
import logo from "./image/logo.png"
import "./ModalId.scss";
import ModalPwd from "./ModalPwd.jsx";

const ModalId = ({ setSelectId, setModalOpen }) => {
    const [pwd, setPwd] = useState(false);
    const modalRef = useRef(null);
    const [ checkValue, setCheckValue ] = useState('');
    
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

    const selectPwd = () => {
        setPwd(true);
    };

    const [sid, setSid] = useState("");

    const [id, setId] = useState({
        mname : "",
        mpid : "",
    })

    const onch = useCallback((e) => {

        const formObj = {
            ...id,
            [e.target.name] : e.target.value,
        };
        setId(formObj);
        console.log(formObj);
    }, [id]);

    const selectId = (e) => {
        e.preventDefault();
        axios
            .post("selectId" , id)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                {res.data === "일치하는 아이디가 없습니다." ? (setSid(res.data)) : (setSid("찾으려는 아이디 : " + res.data))}
            })
            .catch((err) => {alert('실패'); console.log(err)});
    }

    return (
        <div className="modal">
           <div ref={modalRef} className="container-two">
               <section className="user-input">
                   <img src={logo} alt="logo" className="ig2"/>
                   <div className="tx">가입할 때 작성한 정보를 입력해주세요 :)</div>
                   <hr className="hr"/>
                   <div className="radiv">
                    <div className="radiv1">
                        <input type="checkbox" checked name="checkWrap" onChange={(e) => checkOnlyOne(e)} className="inra1"/><span className="sp" name="checkWrap" onChange={(e) => checkOnlyOne(e)}>아이디찾기</span>
                    </div>
                    <div className="radiv2"> 
                        <input type="checkbox" name="checkWrap" onChange={(e) => checkOnlyOne(e)} onClick={selectPwd} className="inra2"/><span className="sp" onClick={selectPwd}>비밀번호 찾기</span>
                        {pwd && <ModalPwd setSelectId={setSelectId} setPwd={setPwd} setCheckValue={setCheckValue} setModalOpen={setModalOpen}/>}
                    </div>
                   </div>
                   <form onSubmit={selectId}>
                    <div className="log-other1">이름</div>
                    <input className="inp-id" onChange={onch} name="mname" type="text" maxLength="25" required placeholder="이름을 입력하세요."/>
                    <div className="log-other1">주민등록번호</div>
                        <input className="inp-id" onChange={onch} name="mpid" type="text" maxLength="13" required placeholder="- 를 제외한 13자리를 입력하세요."/>
                    <div className="tx2">{sid}</div>
                    <button type="submit" className="log-btnid">아이디 찾기</button>
                   </form>
                   <button className="log-btn-del" onClick={() => setSelectId(false)}>돌아가기</button>
               </section>
           </div>
        </div>        
    );
};

export default ModalId;
```
가입 시 작성한 이름과 주민등록번호를 쓰고 '아이디 찾기' 버튼을 클릭 해 데이터베이스에 일치하는 데이터가 없으면 없다는 문구와 일치하는 데이터가 있다면 아이디를 알려줍니다.

## Back_MemberController
```java
@ResponseBody
    @PostMapping("selectId")
    public String selectId(@RequestBody Member member){
        log.info("selectId()");
        log.info("" + member);
        return mServ.selectId(member);
    }
```
## Back_MemberService
```java
public String selectId(Member member) {
        log.info("selectId()");
        Member m = null;
        String msg = "";

        try {
            m = mRepo.findByMnameAndMpid(member.getMname(),member.getMpid());
            log.info("" + m);
            if (m != null){
                return m.getMid();
            }else {
                return msg = "일치하는 아이디가 없습니다.";
            }
        }catch (Exception e){
            e.printStackTrace();
            return msg = "일치하는 아이디가 없습니다.";
        }
    }
```
프론트에서 보낸 값으로 findBy~~ 함수를 이용해 데이터베이스에 일치하는 아이디가 있다면 아이디를 return, 없다면 없다는 문자열을 return 합니다.<br><br>
#### 아이디찾기 화면 <br><br>
![image](https://user-images.githubusercontent.com/117874997/215290054-025e4bc1-c952-41eb-aa3f-58decaaed7b7.png)

## ModalPwd.jsx 컴포넌트

※ 비밀번호 재설정_1
```javascript
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
            IMP.init("???");    

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
```
가입 시 작성한 아이디와 핸드폰번호를 쓰고 '인증번호' 버튼을 클릭 해 인증확인 절차까지 밟아야 '비밀번호 재설정' 버튼의 비활성화가 풀리게 했습니다. 이후 작성한 정보와 일치하는
회원이 데이터베이스에 있을 경우, 그 회원의 아이디를 useState에 저장 후 비밀번호 재설정하는 모달창으로 이동합니다.

## Back_MemberController
```java
    @ResponseBody
    @PostMapping("checkPwd")
    public String checkPwd(@RequestBody Member member){
        log.info("checkPwd()");
        return mServ.checkPwd(member);
    }
```
## Back_MemberService
```java
        public String checkPwd(Member member) {
        log.info("checkPwd()");
        String msg = "";

        try {
            Member id = mRepo.findByMidAndMphone(member.getMid(),member.getMphone());
            log.info("조건에 일치하는 ID : " + id);
            if (id != null){
                return id.getMid();
            }else {
                return msg = "조건에 일치하는 회원이 없습니다.";
            }
        }catch (Exception e){
            e.printStackTrace();
            return msg = "조건에 일치하는 회원이 없습니다.";
        }
    }
```
프론트에서 보낸 값으로 findBy~~ 함수를 이용해 데이터베이스에 일치하는 아이디가 있다면 아이디를 return, 없다면 없다는 문자열을 return 합니다.<br><br>
#### 비밀번호 재설정 화면_1<br><br>
![image](https://user-images.githubusercontent.com/117874997/215290351-a523b48e-4068-4803-b931-a7a0e54866ce.png)

## ModalPwdReset.jsx 컴포넌트

※ 비밀번호 재설정_2
```javascript
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
```
재설정할 비밀번호를 조건식에 맞게 비밀번호 확인 input창 까지 동일하게 썼을때만 재설정이 완료됩니다.

## Back_MemberController
```java
    @ResponseBody
    @PostMapping("resetPwd")
    public String resetPwd(@RequestBody Member member){
        log.info("resetPwd()");
        return mServ.resetPwd(member);
    }
```
## Back_MemberService
```java
    public String resetPwd(Member member) {
        log.info("resetPwd()");
        Member dbMember = null;
        String msg = "";

        try {
            dbMember = mRepo.findById(member.getMid()).get();
            log.info("dbMember -> " + dbMember);
            if (dbMember != null){
                String newPwd = encoder.encode(member.getMpwd());
                dbMember.setMpwd(newPwd);
                mRepo.save(dbMember);
                msg = "성공";
            }else {
                msg = "실패";
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return msg;
    }
```
프론트에서 받아온 값으로 findBy~~ 함수를 이용해 재설정할 비밀번호를 암호화 한 후 save()를 이용해 update를 해줍니다.
#### 비밀번호 재설정 화면_2<br><br>
![image](https://user-images.githubusercontent.com/117874997/215290676-ea154b87-8e87-4ab2-98a5-03ab5be1d945.png)

## ServiceCenterInquiry.jsx 컴포넌트

※ 상담문의 페이지 (첫화면, 검색 후 화면)
```javascript
import React, { useCallback, useEffect, useState } from "react";
import Section from "../main/Section";
import Button from "../form/Button";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stable from "./Stable";
import StableColumn from "./StableColumn";
import StableRow from "./StableRow";
import Paging from "./Spaging";
import { el } from "date-fns/locale";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm");

const ServiceCenterInquiry = () => {
    const dv = {
        display: "flex",
        justifyContent: "end",
        width: "100%",
        margin: "30px 0 60px 0",
    }
    const input = {
        border: "1px solid #ddd",
        fontSize : "18px",
        paddingLeft : "10px",
        width : "350px",
    }  
    const searchBtn = {
        backgroundColor : "#C3B6D9",
        width : "60px", 
    }
    const writeBtn = {
        backgroundColor : "#C3B6D9", 
        width : "160px",    
        marginLeft : "330px",
    }

    const nav = useNavigate();
    let pnum = sessionStorage.getItem("pageNum");

    const [bitem, setBitem] = useState({});
    const [page, setPage] = useState({
      totalPage: 0,
      pageNum: 1,
    });
  
    //게시글 목록을 서버로부터 가져오는 함수
    let search

    const getList = (pnum) => {
        search = sessionStorage.getItem('search')
        console.log(search);

        axios
        .get("/ServiceList", { params: { pageNum: pnum, content : search, type: "serviceCenter" } })
        .then((res) => {
            setInput1("");

            console.log(res.data);
            const { bList, totalPage, pageNum } = res.data;
            setPage({ totalPage: totalPage, pageNum: pageNum });
            //console.log(totalPage);
            setBitem(bList);
            sessionStorage.setItem("pageNum", pageNum);
            // sessionStorage.setItem('pageNum', 1)

        })
        .catch((err) => console.log(err));
    };

    const getBoard = useCallback((bno) => {
        //보여질 게시글 번호를 localStorage에 저장(글번호 유지를 위해)

        let grade = sessionStorage.getItem("grade");

        if(grade != "admin"){
            let sign = prompt("게시글 비밀번호를 입력해주세요");

            const abc = {
                bno : bno,
                bpwd : sign,
            }
    
            if(sign !== null){
                console.log(abc);
                axios
                .post("SboardPwd", abc)
                .then((res) => {
                    console.log(res.data);
    
                    if(res.data === "일치"){
                        localStorage.setItem("bno", bno);
                        nav("/ServiceCenterDetail");
                    }else {
                        alert("다시 입력해주세요.");
                    }
                })
                .catch((err) => console.log(err));
            }
        }else {
            localStorage.setItem("bno", bno);
            nav("/ServiceCenterDetail");
        }

    }, []);

    //main 페이지가 화면에 보일 때 서버로부터 게시글 목록을 가져온다.
    useEffect(() => {
        sessionStorage.setItem('search', '')
        pnum !== null ? getList(pnum) : getList(1);
    } ,[]);

    //출력할 게시글 목록 작성
    let list = null;
    if (bitem.length === 0) {
        list = (
        <StableRow key={0}>
            <StableColumn span={4}>게시글이 없습니다.</StableColumn>
        </StableRow>
        );
    } else {
        list = Object.values(bitem).map((item,i) => (
        <StableRow key={item.bno}>
            {/* <StableColumn wd="w-10">{bitem.length-i}</StableColumn> */}
            <StableColumn wd="w-10">{(pnum - 1) * 10 + i+1}</StableColumn>
            <StableColumn wd="w-55">
            <div onClick={() => getBoard(item.bno)}>{item.btitle}&ensp;🔒</div>
            </StableColumn>
            <StableColumn wd="w-15">{item.bmid}</StableColumn>
            <StableColumn wd="w-20">{df(item.bdate)}</StableColumn>
        </StableRow>
        ));
    }

    const write = (e) => {
        e.preventDefault();

        const mid = sessionStorage.getItem("mid");

        if(mid === null){
            alert("로그인 후 가능한 기능입니다");
            return;
        }else{
            nav("/ServiceCenterWrite");
        }

    }

    const [input1, setInput1] = useState("");

    const onch = (e) => {
        setInput1(e.target.value);
        sessionStorage.setItem('search', e.target.value);
    };

    return (
        <div data-aos="fade-up">
            <Section title="상담문의게시판" style={{ height : "1000px"}}>
                <Stable hName={["NO", "제목", "작성자", "작성일"]}>{list}</Stable>
                <Paging page={page} getList={getList} />
                <div style={dv} >
                    <input style={input} onChange={onch} value={input1}/>
                    <Button style={searchBtn} onClick={() => getList(pnum, search)}>검색</Button>
                    <Button style={writeBtn} onClick={write}>글쓰기</Button>
                </div>
            </Section>
        </div>
    );
}; 
export default ServiceCenterInquiry;
```
- #### 첫 페이지 화면<br>
페이지에 들어가자마자 게시글 목록을 서버로부터 map함수를 이용해 가져와 출력합니다. 페이징 처리도 같이 합니다.
- #### 글 제목 검색 후 화면<br>
게시글의 제목 중, 검색 input 창 안의 내용이 포함 되어있는 게시글만 가져와 출력합니다. 페이징 처리도 같이 합니다.

## Back_BoardController
```java
    @GetMapping("ServiceList")
    public Map<String, Object> ServiceList(@RequestParam Integer pageNum, String content, String type, HttpSession session){
        log.info("ServiceList()");
        return bServ.getServiceList(pageNum,content,type);
    }
```
## Back_BoardService
```java
        public Map<String, Object> getServiceList(Integer pageNum, String content, String type) {
        log.info("getServiceList()");

        if(pageNum == null){//처음에 접속했을 때는 pageNum이 넘어오지 않는다.
            pageNum = 1;
        }

        int listCnt = 10; // 페이지당 보여질 게시글 갯수

        Map<String, Object> res = new HashMap<>();

        if(content.equals("")) {
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC, "bno");
            Page<Board> result = bRepo.findByBtype(type, pb);
            List<Board> bList = result.getContent();
            int totalPage = result.getTotalPages();

            res.put("bList", bList);
            res.put("pageNum", pageNum);
            res.put("totalPage", totalPage);
        }else{
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC,"bno");
            Page<Board> board = bRepo.findByBtitleContainingAndBtype(content, type, pb);
            List<Board> bList = board.getContent();
            int totalPage = board.getTotalPages();

            res.put("totalPage", totalPage);
            res.put("pageNum", pageNum);
            res.put("bList", bList);
        }
        return res;
    }
```
- #### 첫 페이지 화면<br>
처음 접속 시에만 임의로 pageNum에 1을 줘 1페이지로 이동하게 합니다. 프론트에서 넘겨준 값과 일치한 게시글들만 DESC(내림차순)으로 반환합니다.
- #### 글 제목 검색 후 화면<br>
findBy~~Containing을 이용해 프론트에서 넘겨준 값이 포함되어있는 게시글들만 DESC(내림차순)으로 반환합니다.<br>

#### 첫 화면<br>
![image](https://user-images.githubusercontent.com/117874997/215291950-f4a5b511-081f-4eda-bf61-ab81259ec376.png)

#### 글 제목 검색 후 화면<br>
![image](https://user-images.githubusercontent.com/117874997/215291978-37bc474b-55c2-4e9f-bcba-6fa26bb15acc.png)

## ServiceCenterWrite.jsx 컴포넌트
```javascript
    const nav = useNavigate();
    const id = sessionStorage.getItem("mid");
  
    useEffect(() => {
        // const mid = sessionStorage.getItem("mid");

        if(id === null){
            alert("로그인 후 가능한 기능입니다");
            nav("/");
            // return;
        }
    })

    const [board, setBoard] = useState({
        btitle : "",
        bstr : "",
        bpwd : "",
        btype : "serviceCenter",
        // member : {mid : id}
        bmid : id,
    })
  
    const onch = useCallback(e => {
        const formObj = {
          ...board,
          [e.target.name] : e.target.value,
        };
        setBoard(formObj);
        console.log(formObj);
    }, [board]);
  
    const onWrite = (e) => {
        e.preventDefault();

        axios
            .post("/serviceCenterWrite" , board)
            .then((res) => {
                console.log(res.data);
                if(res.data === "성공"){
                    alert("게시글이 작성되었습니다.");
                    nav(-1);
                }
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
        <Header/>
        <div data-aos="fade-up">
        <Section style={{width : "55%"}}>
            <div style={Main}>
            <span style={{display : "block", textAlign : "center", fontSize : "50px", padding : "0"}}>문의하기</span>
            <form style={Content} onSubmit={onWrite}>
                    <input style={Input} onChange={onch} name="btitle" placeholder="제목을 입력하세요." autoFocus required />
                    <textarea style={Textarea} onChange={onch} name="bstr" onScroll placeholder="게시글을 작성하세요." required/>
                    <input style={Input} onChange={onch} name="bpwd" placeholder="게시글 비밀번호를 입력하세요." required />
                <div style={Buttons}>
                    <Button type="submit" wsize="s-30" style={{width : "150px" , marginRight:"10px", backgroundColor : "#C9A3B6"}}>작성하기</Button>
                    <Button type="button" wsize="s-10" color="gray" onClick={() => nav(-1)} 
                        style={{width: "150px", backgroundColor : "#D3D3D3", fontSize : "18px"}}>취소하기</Button>
                </div>
            </form>    
            </div>
        </Section>
        </div>
        <Footer />
        </>
    );
}
```
상담문의게시판에서 글쓰기를 누르면 이 컴포넌트로 이동합니다. 문의게시판 특성 상 1:1문의를 원칙으로 해 게시글 비밀번호까지 써야 작성이 가능합니다.

## Back_BoardController
```java
    @PostMapping("serviceCenterWrite")
    public String serviceCenterWrite(@RequestBody Board board){
        log.info("serviceCenterWrite()");
        return bServ.serviceCenterWrite(board);
    }
```
## Back_BoardService
```java
    @Transactional
    public String serviceCenterWrite(Board board) {
        log.info("serviceCenterWrite()");
        String msg = "";

        try{
            bRepo.save(board);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }
        return msg;
    }
```
작성한 내용을 데이터베이스에 save()함수를 이용해 insert 해줍니다.<br><br>
#### 글쓰기 화면<br><br>
![image](https://user-images.githubusercontent.com/117874997/215292380-30bab833-913b-45cc-8107-675322ae2ab0.png)

※ 웨딩 뉴스 페이지
- #### 일반회원<br>
제목을 클릭 시 클릭한 글의 번호를 localStorage에 저장 후 해당하는 글의 상세페이지로 이동합니다.
## ModalPwd.jsx 컴포넌트

※ 챗봇 라이브러리 
 



