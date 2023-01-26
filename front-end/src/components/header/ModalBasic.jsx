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

        const NAVER_CLIENT_ID = "P_f4n3MDCvD5zsVcl0Pe";  // 발급 받은 Client ID 입력 
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

    const google_client_Id = "172311337797-1bc8e57cgbqe4upl6olbel5ct7aa8alp.apps.googleusercontent.com";

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
                        {/* <button onClick={out}>로그아웃</button> */}
                        {/* <a href="https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=P_f4n3MDCvD5zsVcl0Pe&client_secret=XkTTRRuJW0&access_token=AAAAOYptEExjv7Qn6cP-Otn5e5w7DVfukIjAApgC317uCJxEeQ07Iy9iktxt8g1GgNv0fWFAcainx5GmyC-viMtdcgg&service_provider=NAVER">로그아웃</a> */}
                        {/* <div className="log-naver btn" style={{border:"none"}}>
                            <div id="naverIdLogin"></div>
                        </div> */}
                        {/* <div className="log-kao btn kao">
                            <img src={kakao} alt="kakao"/>
                            <div className="log-txt">카카오톡 계정으로 로그인</div>
                        </div>
                        <div className="log-face btn face">
                            <img src={facebook} alt="facebook"/>
                            <div className="log-txt">페이스북 계정으로 로그인</div>
                        </div> */}
                    </div>
                </section>
                {selectId && <ModalId setSelectId={setSelectId} setModalOpen={setModalOpen}/>} 
                {selectJoin && <JoinModal setSelectJoin={setSelectJoin} setModalOpen={setModalOpen}/>} 
            </div>
        </div>    
    );
}

export default ModalBasic;