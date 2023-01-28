ICIA 최종프로젝트 Wedding Dive
---
프로젝트 기간 : 1달 반<br><br>
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
로그인과 비밀번호 input창에 onChange함수를 이용해 useState에 보관 후 '로그인' 버튼 클릭시 axios를 사용해 JSON형태로 지정한 url로<br> 
보낸 후 intellij에서 return한 값이 공백이 아닐 경우 로그인 성공이란 alert창과 함께 받아온 값 중 mid와 grade를 sessionStorage에<br>저장 후 모달창 끄고 메인페이지로 이동합니다.<br>
- #### 소셜회원<br>
네이버와 구글 api를 사용해 제가 허가한 이메일만 로그인이 되도록 하였고 로그인 시 주는 한정적인 데이터 중, 쓸 수 있는 데이터인<br>
이름과 아이디를 세션에 저장 후 바로 axios를 사용해 데이터베이스에서 일치하는 id 정보가 없을때만 회원가입이 가능하게 했습니다.

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
회원가입 시 비밀번호가 암호화되어 들어가기 때문에, 프론트에서 받아온 값을 매개변수로 받아 내장함수인 findById로 데이터베이스에<br>
일치하는 회원의 데이터를 가져온 후 비교 해 일치하면 멤버 데이터를 return하고 일치하지 않는다면 null을 return합니다. 그 후 <br>
back 세션에도 "member"란 변수에 로그인 한 회원의 데이터를 저장합니다.

- 아이디 찾기, 비밀번호 재설정
- 웨딩 뉴스 페이지 	 
- 1:1문의 페이지
- 챗봇 라이브러리 입니다.


