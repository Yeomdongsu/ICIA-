ICIA 최종프로젝트 Wedding Dive
---
프로젝트 기간 : 1달 반<br><br>
프로젝트 인원 : 6명<br><br>
사용 프로그램 : visual studio, intellj, Mysql<br><br>
사용 언어 : Html, CSS, JavaScript, React, Java<br>
### 환경 구성<br>
IDE(통합개발환경) : IntelliJ Ultimate(유료 버전), Visual Studio Code<br><br>
프레임워크 : Spring Boot<br><br>
데이터베이스 : Mysql<br><br>
DB 접근 기술 : JPA<br><br>
View 템플릿 : React<br>
### **[프로젝트 설명]**
결혼하는 과정에 필요한 스드메, 신혼여행, 예식장 등 필요한걸 하나에 모아논 웨딩 중개 사이트입니다.<br>
※ #### 제가 구현한 기능으로는<br>
- #### 로그인(일반회원, 소셜로그인(네이버, 구글)<br>
- #### 아이디찾기, 비밀번호 찾기(재설정)<br>
- #### 상담문의 게시판(게시글 출력, 페이징 처리, 검색기능, 글쓰기, session을 이용해 회원과 관리자의 기능 구분[게시글 비밀번호, 글삭제, 댓글기능, 댓글삭제])<br>
- #### 뉴스 게시판(뉴스 출력, session을 이용해 회원과 관리자의 기능 구분[뉴스쓰기, 뉴스삭제]<br>
- #### 채팅봇 기능(라이브러리)<br>
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

※ 상담문의 글쓰기 (비회원은 글쓰기X)

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

## ServiceCenterDetail.jsx 컴포넌트

※ 게시글 상세보기 ( 게시글 삭제(관리자만), 게시글 댓글 작성(관리자만), 게시글 댓글 삭제(관리자만) )

```javascript
import EstimateBanner from "../estimate/EstimateBanner";
import Footer from "../footer/Footer";
import Button from "../form/Button";
import Header from "../header/Header";
import Section from "../main/Section";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./ServiceCenterDetail.scss";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm");
const df2 = (date) => moment(date).format("YYYY-MM-DD");

const ServiceCenterDetail = () => {
   
    const nav = useNavigate();
    const [board, setBoard] = useState({});

    const grade = sessionStorage.getItem("grade");
    const bn = localStorage.getItem("bno");

    const [comList, setComList] = useState({});

    useEffect(() => {
        const mid = sessionStorage.getItem("mid");
        console.log(comList);

        if(mid === null){
            alert("로그인 후 가능한 기능입니다");
            nav("/");
            return;
        }

        // console.log(bn); //게시글번호

        axios
        .get("/ServiceCenterDetail", {params: {bno:bn, type:"serviceCenter"} })
        .then((res) => {
            // console.log(res);
            // console.log(res.data);
            setBoard(res.data);
        })
        .catch((err) => console.log(err));

        axios
        .get("ScommentList", {params : {mentbno:bn}})
        .then((res) => {
            // console.log(res.data);
            setComList(res.data);
            
        })
        .catch((err) => console.log(err));

    }, []);

    const [comment, setComment] = useState({
        mentstr : "",
        mentmid : grade,
        mentbno : bn,
    });

    const {mentstr, mentmid, mentbno} = comment;

    const onch = (e) => {
        const Obj = {
            ...comment,
            [e.target.name] : e.target.value,
        }
        setComment(Obj);
    };

    const com = () => {
        // console.log(comment);

        if(comList == ""){
            axios
            .post("Swritecomment" , comment)
            .then((res) => {
                console.log(res.data);

                const Obj = {
                    mentstr : "",
                    mentmid : grade,
                    mentbno : bn,            
                }
                setComment(Obj);
            })
            .catch((err) => console.log(err));
        }else{
            alert("댓글은 최대 1개만 가능합니다.");
                const Obj = {
                    mentstr : "",
                    mentmid : grade,
                    mentbno : bn,            
                }
                setComment(Obj);
        }
        
    }

    const deleteComment = () => {
        // e.preventDefault();

        let confirm = window.confirm('삭제하시겠습니까?');
        
        if(confirm === true){
            console.log(comList);

            axios
                .post("deleteComment", comList)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
    }

    const SboardDel = () => {
        let confirm = window.confirm("이 게시글을 삭제하시겠습니까?");

        if(confirm === true){

            if(comList == ""){
                axios
                .post("SboardDel", board)
                .then((res) => {
                    console.log(res.data);
                    if(res.data == "게시글 삭제 성공"){
                        alert("게시글이 삭제되었습니다.");
                        nav("/ServiceCenter");
                    }
                })
                .catch((err) => console.log(err));

            }else {
                axios
                .post("SboardDel", board)
                .then((res) => {
                    console.log(res.data);
                    if(res.data == "게시글 삭제 성공"){
                        alert("게시글이 삭제되었습니다.");
                        nav("/ServiceCenter");
                    }
                })
                .catch((err) => console.log(err));

                axios
                .post("deleteComment", comList)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err));

            }
        }
    }

    return (
        <div>
            <Header />
            <EstimateBanner />
            <Section>
            <div className="SMain">
                <form className="SContent">
                    <div style={{marginTop:"-30px", marginBottom:"25px"}}>
                        <input style={{width:"1000px", height:"45px"}} readOnly
                        className="SInput" value={board.btitle}/>
                        <div className="Sinfo">
                            <span>NO.&nbsp;{board.bno}</span>
                            <span style={{paddingLeft : "110px"}}>작성자 &nbsp;: &nbsp;{board.bmid}</span>
                            <span>작성일 &nbsp;: &nbsp;{df(board.bdate)}</span>
                        </div>
                        <textarea style={{width: "1000px", height:"500px"}} onScroll readOnly
                        className="STextarea" placeholder="내용" value={board.bstr}/>
                    </div>
                    {grade === "admin" ? (
                        <div>
                            <Button type="button" onClick={()=>nav("/ServiceCenter")} style={{width:"150px", height:"50px", marginLeft:"400px", backgroundColor : "#C9A3B6"}}>목록</Button>
                            <Button type="button" onClick={SboardDel} style={{width:"150px", height:"50px", marginLeft:"300px"}}>게시글 삭제</Button>              
                        </div>
                    ) : (<Button type="button" onClick={()=>nav("/ServiceCenter")} style={{width:"150px", height:"50px", backgroundColor : "#C9A3B6"}}>목록</Button>)}
                </form>
                <form className="SContent">
                    <div style={{marginTop:"20px", display:"flex"}}>
                        {grade === "admin" ? (
                            <>
                                <input className="Sinputdiv" name="mentstr" value={mentstr} onChange={onch} />
                                <Button style={{width:"150px", height:"55px", backgroundColor : "#C9A3B6"}} onClick={com}>작성하기</Button>
                            </>
                        ) : (
                            <>
                                <input className="Sinputdiv" name="mentstr" readOnly placeholder="관리자만 쓸 수 있는 댓글입니다."/>
                                <Button style={{width:"150px", height:"55px",backgroundColor : "#C9A3B6"}} onClick={(e) => {e.preventDefault(); alert("관리자만 쓸 수 있는 댓글입니다.")}}>작성하기</Button>
                            </>
                        )}
                    </div>
                    {comList !== "" ? (
                    <div className="Sdivdiv">
                        <div className="Sdivbtn">
                            <div>
                                <span>관리자</span>
                            </div>
                            <div>
                                <span style={{marginRight:"15px"}}>{df2(comList.mentdate)}</span>
                                {grade === "admin" ? (<button style={{border:"none", background:"none", fontSize:"17px", color:"red", cursor:"pointer"}} onClick={deleteComment}>삭제하기</button>) : (null)}
                            </div>
                        </div>
                        <input className="Sinputre" value={comList.mentstr} />
                    </div>
                    ) : (
                    <div className="Sdivdiv">
                        <input className="Sinputre" style={{textAlign:"center"}} placeholder="댓글이 존재하지 않습니다." readOnly />
                    </div>
                    )}
                </form>
            </div>
            </Section>
            <Footer />
        </div>
    );
}
export default ServiceCenterDetail;
```
게시글 전체보기 화면에서 글 제목을 클릭했을 때 이동되는 상세페이지 컴포넌트입니다. 클릭한 글의 번호를 localStorage에 저장 후 해당하는 글의 상세페이지로 이동합니다. 클릭 시에 sessionStorage에서 grade값을 가져와 관리자인 경우에는 상세페이지 이동, 일반회원일 때는 글의 비밀번호를 작성해 일치할때만 이동하게 합니다. 1:1상담 게시판이기 때문에 댓글은 관리자만 달 수 있고 관리자일 경우에만 회원 게시글 삭제와 관리자 댓글을 삭제할 수 있게 했습니다.

- #### 해당 게시글 상세정보 가져오기
## Back_BoardController 
```java
    @GetMapping("ServiceCenterDetail")
    public Board ServiceCenterDetail(@RequestParam int bno, String type){
        log.info("ServiceCenterDetail()");
        return bServ.ServiceCenterDetail(bno, type);
    }
```
## Back_BoardService
```java
    public Board ServiceCenterDetail(int bno, String type) {
        log.info("ServiceCenterDetail()");
        Board board = null;

        try{
            board = bRepo.findByBnoAndBtype(bno,type);
            log.info("board 값 : " + board);

        }catch (Exception e){
            e.printStackTrace();
            board = null;
        }
        return board;
    }
```

- #### 해당 게시글 댓글 달기(관리자만)
## Back_BoardController 
```java
    @PostMapping("Swritecomment")
    public String Swritecomment(@RequestBody Comment comment){
        log.info("Swritecomment()");
        return bServ.Swritecomment(comment);
    }
```
## Back_BoardService
```java
    public String Swritecomment(Comment comment) {
        log.info("Swritecomment()");
        String msg = "";

        try {
            cRepo.save(comment);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }
        return msg;
    }
```
- #### 해당 게시글 댓글 출력
## Back_BoardController 
```java
    @GetMapping("ScommentList")
    public Comment ScommentList(@RequestParam int mentbno){
        log.info("ScommentList()");
        return bServ.ScommentList(mentbno);
    }
```
## Back_BoardService
```java
    public Comment ScommentList(int mentbno) {
        log.info("ScommentList()");
        Comment comment = null;

        try{
            comment = cRepo.findByMentbno(mentbno);

        }catch (Exception e){
            e.printStackTrace();
        }

        return comment;
    }
```
- #### 해당 게시글 댓글 삭제(관리자만)
## Back_BoardController 
```java
    @PostMapping("deleteComment")
    public String deleteComment(@RequestBody Comment comment){
        log.info("deleteComment()");
        return bServ.deleteComment(comment);
    }
```
## Back_BoardService
```java
    public String deleteComment(Comment comment) {
        log.info("deleteComment()");
        String msg = "";

        try {
            cRepo.delete(comment);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }

        return msg;
    }
```

#### 회원이 본인 글 확인할 때<br><br>
![image](https://user-images.githubusercontent.com/117874997/215292806-d22fa74f-871a-4cc9-8768-c35f1e763052.png)

#### 관리자가 회원 글 확인할 때<br><br>
![image](https://user-images.githubusercontent.com/117874997/215292887-60fa539a-a17b-4a2b-a565-99c30033d526.png)

## WedNews.jsx 컴포넌트

※ 웨딩 뉴스 ( 글쓰기와 상세보기는 위의 상담게시판과 많이 겹쳐 코드를 제외했습니다 )
```javascript
import React, { useCallback, useEffect, useState } from "react";
import Section from "../main/Section";
import Button from "../form/Button";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StableRow from "../servicecenter/StableRow";
import StableColumn from "../servicecenter/StableColumn";
import Paging from "../servicecenter/Spaging";
import { fi } from "date-fns/locale";
// import Paging from "./Spaging";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm");

const WedNews = () => {
    const nav = useNavigate();
    let pnum = sessionStorage.getItem("pageNum");
    const grade = sessionStorage.getItem("grade");

    const [bitem, setBitem] = useState({});

    const [flist, setFlist] = useState([
        {
          image: "",
        },
      ]);
    

    const { bdate, bfList, bmid, bno, bstr, btitle, btype } = bitem;

    const [page, setPage] = useState({
      totalPage: 0,
      pageNum: 1,
    });
      
    //게시글 목록을 서버로부터 가져오는 함수
    const getList = (pnum) => {

        axios
        .get("/newsList", { params: { pageNum: pnum, type: "News" } })
        .then((res) => {
            console.log(res.data);
            const { bList, totalPage, pageNum } = res.data;
            setPage({ totalPage: totalPage, pageNum: pageNum });
            setBitem(bList);
            sessionStorage.setItem("pageNum", pageNum);
        })
        .catch((err) => console.log(err));

        // console.log(bitem);
        axios
        .get("/newsListImg", { params : { type : "News" } })
        .then((res) => {
            console.log(res.data);

            let prevFid = -1;

            if (res.data.length > 0) {
                let newFileList = [];
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i]);
                    if (res.data[i].fid === prevFid) continue;
                    const newFile = {
                        image: "upload/" + res.data[i].fsysname,
                    };
                    newFileList.push(newFile);
                    prevFid = res.data[i].fid;
                }
                // console.log(newFileList);
                setFlist(newFileList);
            }
        })
        .catch((err) => console.log(err));
    };

    const getBoard = useCallback((bno) => {
        //보여질 게시글 번호를 localStorage에 저장(글번호 유지를 위해)
            localStorage.setItem("bno", bno);
            nav("/WedNewsDetail");
    }, []);

    //main 페이지가 화면에 보일 때 서버로부터 게시글 목록을 가져온다.
    useEffect(() => {
        // pnum !== null ? getList(pnum) : getList(1);
        getList(1);
        } ,[]);

    //출력할 게시글 목록 작성
    let list = null;
    if (bitem.length === 0) {
        list = (<div>뉴스가 존재하지 않습니다.</div>);
    } else {
        list = Object.values(bitem).map((item) => (
            <>
                <div key={item.bno} style={{height:"180px",overflow:"hidden",}}>
                    <h1 style={{cursor:"pointer"}} onClick={() => getBoard(item.bno)}>{item.btitle}</h1>
                    <div style={{height:"90px",overflow:"hidden",marginTop:"5px",marginBottom:"5px",cursor:"pointer"}} onClick={() => getBoard(item.bno)}>{item.bstr}</div>
                    <span>🐥 {item.bmid} 기자  ㅣ {df(item.bdate)}</span>
                </div>
                <hr/>
            </>
    ));
    }

    const viewFlist = flist.map((v, i) => {
        console.log(v);
        return (
            <>
                <div key={i} style={{height:"180px",marginTop:"3px", marginBottom:"-3px"}}>
                {v.image && <img src={v.image} style={{width:"240px",height:"170px",cursor:"pointer"}} alt="preview-img" />}
                </div>
                <hr/>
            </>
        );
      });
    
    const write = (e) => {
        e.preventDefault();
        nav("/WedNewsWrite");
    }

    return (
            <div data-aos="fade-up">
                <Section title="웨딩뉴스" style={{width:"1100px", height : "1880px", marginBottom:"-60px"}}>
                    <div style={dv} >
                        {grade === "admin" ? (<Button style={writeBtn} onClick={write}>뉴스 쓰기</Button>) : (null)}
                    </div>
                    <div style={{display:"flex", alignItems:"center", marginTop:"-500px", height:"1200px"}}>
                        <div style={{marginRight:"10px", marginTop:"70px", height:"250px"}}>{viewFlist}</div>
                        <div style={{marginTop:"70px", height:"250px", width:"850px"}}>{list}</div>
                    </div>
                    {/* <div style={{marginTop:"500px", width:"100%", height:"300px"}}>
                        <Paging page={page} getList={getList} />
                        <div style={dv} >
                            {grade === "admin" ? (<Button style={writeBtn} onClick={write}>뉴스 쓰기</Button>) : (null)}
                        </div>
                    </div> */}
                </Section>
            </div>
    );
}    
export default WedNews;
```
사진을 불러오고 출력하는거 이외에는 상담문의게시판과 동일합니다. 뉴스 페이지가 처음 열렸을 때 데이터베이스의 file 테이블에서 type이 "News"인 파일만 가져옵니다. 각 게시글 앞에 대표사진 1개만 불러오기 위해 if문에 continue를 이용해 flist에 넣은 후 map()을 이용해 각 해당 뉴스와 뉴스에 맞는 대표사진을 출력합니다.

## Back_BoardController
```java
    @GetMapping("newsListImg")
    public List<Files> newsListImg(@RequestParam String type){
        log.info("newsListImg()");
        return bServ.newsListImg(type);
    }
```
## Back_BoardService
```java
    public List<Files> newsListImg(String type) {
        log.info("newsListImg()");

        List<Files> bfList = bfRepo.findByFtype(type);
        return bfList;
    }
```

#### 뉴스 전체출력 화면<br><br>
![image](https://user-images.githubusercontent.com/117874997/215294422-d28516c6-9b0a-4463-907f-43b5bda73d82.png)

#### 뉴스 작성화면 (상담게시판과 겹치는 부분이 많아 이미지만 첨부합니다.)<br><br>
![image](https://user-images.githubusercontent.com/117874997/215294135-269530f1-ad47-4c9e-bc89-856738f66daf.png)

#### 뉴스 상세보기 화면_1(상담게시판과 겹치는 부분이 많아 이미지만 첨부합니다.)<br><br>
![image](https://user-images.githubusercontent.com/117874997/215294274-09444e9d-3881-4b0b-ab0f-5b435ebc5bdb.png)

#### 뉴스 상세보기 화면_2(상담게시판과 겹치는 부분이 많아 이미지만 첨부합니다.)<br><br>
![image](https://user-images.githubusercontent.com/117874997/215294304-21a03e7f-78be-42c0-b50a-42bbfbecb028.png)

## ChattingBot.jsx 컴포넌트

※ 챗봇 라이브러리 
```javascript
import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import jb from "./jb.jpeg"

const ChattingBot = ({img, setImg}) => {
    const steps = [
        {
            id: '0', 
            message : '안녕하세요 회원님💙 Wedding Dive 챗봇입니다.',
            trigger: '1',
        },
        {
            id: '1',
            message : '준비가 되셨다면 시작버튼을 눌러 주세요.',
            trigger: '2',
            // end:true
        },
        {
            id: '2',
            options: [
              { value: 1, label: '시작하기', trigger: '3' }
            ],
        },
        {
            id: '3',
            options : [
                { value: 1, label: '자주 묻는 질문', trigger: '4'},
            ]
        },
        {
            id: '4',
            options : [
                {value: 1, label: '왜 Wedding Dive인가요? 💕', trigger:'5'},
                {value: 2, label: '예식 사진촬영시 친구는 몇명이 적당한가요? 💕', trigger: '6'},
                {value: 3, label: '드레스를 잘 고르는 법이 있나요? 💕', trigger: '7'},
                {value: 4, label: '신혼여행 준비는 언제쯤 하는 게 좋나요? 💕', trigger: '10'},
                {value: 5, label: '신랑님 체크사항 💕', trigger:'12'},
                {value: 6, label: '신부님 체크사항 💕', trigger:'17'},
                {value: 7, label: '차은우 전화번호 💕', trigger:'18'},
                {value: 8, label: '추가 다른 문의는❔💕', trigger:'19'}
            ]
        },
        {
            id: '5',
            message : '결혼하고 싶은 우리 모두의\n소망을 담아 만들었습니다.',
            trigger:'99'
        },
        {
            id: '6',
            message : '적게는 18명에서 많게는\n25명까지 줄을 섭니다.',
            trigger:'99'
        },
        {
            id: '7',
            message : '기본적으로 드레스를 결정하실 때엔 신부님 체형의 단점은 커버해주고 장점은 부각시켜 주는 드레스를 선택해야 합니다.\n\n 하체에 콤플렉스가 있는 신부님의 경우 허리라인은 살려주고 하체 라인이 돋보이지 않게 가려줄 A라인이나 벨라인 드레스가 어울리며\n\n키가 크고 골반이 있으신 분들은 머메이드 라인이 어울립니다.',
            trigger: '99',
        },
        {
            id:'10',
            message : '보통 허니문을 예약하시는 평균적인 시기는 출발 6개월 전이지만 예식 날짜와 예식장 결정이 되시면 바로 준비하셔야 합니다.\n\n 왜냐!! 허니문 비용을 가장 효과적으로 줄일 수 있는 방법이 바로 항공권이기 때문이에요.',
            trigger: '99',
        },
        {
            id:'12',
            message:'- 구두 색깔과 같은 목이 긴 양말 착용\n\n- 식장에 디피해 놓을 액자를 받지 못하였다면 예식 당일 반드시 수령\n\n- 웨딩카와 웨딩카에 장식이 되어있는지 체크\n\n- 주례자와 사회자 도착 여부 확인\n\n- 여행가방과 지갑 등을 미리 식구나 친구에게 부탁하여 웨딩카에 넣어 두었는지 확인',
            trigger:'99',
        },
        {
            id:'17',
            message:'- 충분한 휴식, 숙면, 신부님을 도와줄 친구 섭외',
            trigger:'99',
        },
        {
            id:'18',
            message:'010 - 4063 - 6618입니다.', 
            trigger:'99',
        },
        {
            id:'19',
            message:'자세한 1:1 문의는 아래 링크를 클릭하세요!',
            trigger:'20',
        },
        {   
            id:'20',
            component : (
                <a href="/ServiceCenter" style={{color:'white', marginLeft:'5px', fontSize:'17px'}}>1:1 문의하러 가기</a>
            ),
            trigger: '99',
        },
        {
            id: 'jb',
            component : (
                <img src={jb} style={{width:"280px", height:"300px"}}/>
            ),
            trigger:'99'
        },
        {
            id: '99',
            options: [
            { value: 1, label: '처음으로', trigger: '3'},
            { value: 2, label: '종료하기', trigger: '100'},
            ]
        },
        {
            id: '100',
            message : '감사합니다.\n좋은 하루 되세요 :)',
            end : true
        },
    ]

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        // headerBgColor: '#EF6C00',
        headerBgColor : '#F7ECEC',
        // FontWeight : '200',
        // headerFontColor: '#fff',
        headerFontColor : 'black',
        headerFontSize: '15px',
        // botBubbleColor: '#EF6C00',
        botBubbleColor : '#EBF7FF',
        botFontColor: '#black',
        userBubbleColor: 'white',
        userFontColor: 'black',
    };
    const st = {
        position : 'fixed',
        bottom : "90px", right : "80px",
        whiteSpace: "pre-line"
    }
    const xbtn = {
        position : 'fixed', 
        bottom : '568px', 
        right :'100px', 
        color :'black',
        zIndex : '1000',
        cursor : 'pointer',
    }
    return (
        <>
        <h3 style={xbtn} onClick={() => setImg(!img)}>✖</h3>
        <ThemeProvider theme={theme} >
            <ChatBot steps={steps} 
            headerTitle="Wedding Dive 채팅봇"
            placeholder="채팅이 불가능한 채널입니다."
            botDelay={500} userDelay={500} style={st}
            // 인풋 검색창 스타일
            // inputStyle={{position : "fixed", bottom : "0"}}
            // 봇 아바타 스타일
            avatarStyle={{width : '46px', background:'#EBF7FF'}} 
            // avatarStyle={{width : '180px', height:'180px'}} 
            // 선택 버튼 스타일
            bubbleOptionStyle={{width : '330px', background : '#F7ECEC', color:'black'}} 
            contentStyle={{width:"415px"}} 
            customStyle={{background:"#DB8383", width:"338px", }}
            />
        </ThemeProvider>

        </>
    );    
}
export default ChattingBot;
```
react-simple-chatbot 라이브러리를 이용해 챗봇을 만들어보았습니다.

#### 챗봇_1<br><br>
![image](https://user-images.githubusercontent.com/117874997/215295149-b59b4a7e-ca2f-4b0c-a3c2-6efb53d0f263.png)

#### 챗봇_2<br><br>
![image](https://user-images.githubusercontent.com/117874997/215295157-d921bf64-3243-4aed-a013-bad28517331d.png)

#### 챗봇_3<br><br>
![image](https://user-images.githubusercontent.com/117874997/215295169-277858a8-70ee-46d1-ab66-3d6bf59d78ec.png)

+) 마치며
---
- #### 소감<br><br>
프로젝트를 시작하기 전 리액트를 3~4일 정도만 배웠어서 코드 자체가 번잡하고 불필요한게 많을거 같습니다. 더 열심히 해서 점점 나아지는 모습 기대해주세요. 이 프로젝트는 저에게는 많은 경험이 되었고, 저의 부족한 부분과 제가 할 수 있는 부분을 구별할 수 있는 능력을 가지게 해주었다고 생각합니다. 그렇기에 부족한 부분을 연마하고 알고 있는 부분은 더욱 자세히 알아보고자 합니다. 부족한 부분이 많은 프로젝트인 것 같지만, 이러한 경험을 통해 쌓은 경험치는 사라지지 않기 때문에 부끄러우면서도 자랑스럽다고 자부합니다. 
