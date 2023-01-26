import styled from 'styled-components'
// import useAuth from '../../hooks/useAuth'
import FlexBox from '../common/FlexBox'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'
import Logo from './Logo'
import Menus from './Menus'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal.jsx'
import { useState, useCallback, useEffect } from 'react'
import JoinModal from './JoinModal'
import ModalJoin from './ModalJoin'
import naverLogo from "./image/naverplus.png";
import axios from 'axios'
import googleLogo from "./image/Google.png";

const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  background: ${(props) => (props.white ? 'transparent' : '#fff')};
  color: ${(props) => (props.white ? props.theme.colors.white : props.theme.colors.black)};
  border-bottom: 1px solid
    ${(props) => (props.white ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)')};
`

const UtilText = (props) => (
  <Typhography size="sm" font="medium" style={{ color: 'inherit', cursor: 'pointer' }} {...props} />
)

function Header(props) {
  const nav = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const [modalOpened, setModalOpened] = useState(false);


  const openModal = () => setModalOpened(true)
  const [mymodal, setMymodal] = useState(false);

  const closeSubmenu = () => setActiveSubmenu(null)
  const openSubmenu = (i) => setActiveSubmenu(i)

  // 로그인 상태 저장
  const [lstate, setLstate] = useState("");
  const [manager, setManager] = useState("");

  // 소셜 로그인 상태 저장
  const [naverState, setNaver] = useState("");
  const [googleState, setGoogle] = useState("");

  // 네이버 로그인 회원 정보 저장
  const [userInfo, setUserInfo] = useState({
      mid : "",
      mname : "",
  });

  const abc = () => {
      const { naver } = window;

      const NAVER_CLIENT_ID = "P_f4n3MDCvD5zsVcl0Pe";  // 발급 받은 Client ID 입력 
      const NAVER_CALLBACK_URL = "http://localhost:3000";  // 작성했던 Callback URL 입력

      const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_CALLBACK_URL,
        isPopup: false,
        // loginButton: { color: 'green', type: 3, height: 55 },
        callbackHandle: true,
      })
      naverLogin.init();
        
      naverLogin.getLoginStatus(async function (status) {
          console.log(`로그인? ${status}`)
      if(status) {
          console.log(naverLogin.user);
          const naverId = naverLogin.user.email;
          const naverNickName = naverLogin.user.nickname;

          sucLoginNaver(naverId,naverNickName);
          sessionStorage.setItem("mid", naverId);
          sessionStorage.setItem("naverNickName", naverNickName);
          sessionStorage.setItem("grade", "user");

          axios
          .get("/naverLoginCheck", { params : { mid : naverId, mname : naverNickName}})
          .then((res) => {
              console.log(res.data);
            
              if(res.data === "회원가입 가능"){

                let confirm = window.confirm("네이버의 가입 정보로 회원가입을 하시겠습니까?");

                if(confirm === true){
                  axios
                      .get("/naverLogin", { params : { mid : naverId, mname : naverNickName}})
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
      }) 
    }  

  const userAccessToken = () => {
    window.location.href.includes('access_token') && abc();
  };
      
  useEffect(() => {
    userAccessToken();

    // 세션에 저장된 로그인 아이디를 가져옴(로그인 상태 유지)
    console.log(sessionStorage);
    console.log(localStorage);
    const mid = sessionStorage.getItem("mid");
    const grade = sessionStorage.getItem("grade");
    const naverNickName = sessionStorage.getItem("naverNickName");
    const googleName = sessionStorage.getItem("googleName");

    console.log(googleName);
    console.log(mid);
    console.log(naverNickName);

    if(googleName != null){
      setGoogle(googleName);
    }
    if(naverNickName != null){
      setNaver(naverNickName);
    }
    if(mid !== null){
      setLstate(mid);
    }
    if(grade === "admin"){
      setManager(grade);
    }
  }, []);
  
  // 로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((mid,grade) => {
    setLstate(mid);
    setManager(grade);
  }, []);

  const sucLoginNaver = useCallback((naverId,naverNickName) => {
    setLstate(naverId);
    setNaver(naverNickName);
  }, [])

  const sucLoginGoogle = useCallback((googleId,googleName) => {
    setLstate(googleId);
    setGoogle(googleName);
  }, [])
  
  const onLogout = () => {
    alert("로그아웃")
    setLstate("");
    sessionStorage.removeItem("mid");
    sessionStorage.removeItem("grade");
    console.log(sessionStorage);
    console.log(localStorage);
    // nav("/");
    window.location.replace("http://192.168.0.13:3000/");
  }

  const onLogout2 = () => {
    alert("로그아웃")
    setLstate("");
    setNaver("");
    setGoogle("");
    sessionStorage.removeItem("mid");
    sessionStorage.removeItem("naverNickName");
    sessionStorage.removeItem("googleName");
    sessionStorage.removeItem("grade");
    localStorage.clear("access_token");
    window.location.replace("http://192.168.0.13:3000/");
  }

  const Mypage = () => {
    nav("/member/mypage");
  }

  const managerPage = () => {
    nav("/admin/memberMag")
  }

  return (
    <HeaderWrapper white={props.white} onMouseLeave={closeSubmenu}>
      <Wrapper justify="space-between" align="center" style={{ height: 100 }}>
        <FlexBox gap={70} align="center">
          <Link to="/" style={{ color: 'inherit' }}>
            <Logo style={{ cursor: 'pointer' }}>Wedding Dive</Logo>
          </Link>
          <Menus openSubmenu={openSubmenu} activeSubmenu={activeSubmenu} />
        </FlexBox>
      {lstate === "" ? (  
        <FlexBox gap={15} align="center">
          <UtilText onClick={openModal}>로그인</UtilText>
          <UtilText onClick={()=>setMymodal(true)} >회원가입 </UtilText>
        </FlexBox>
      ) : (manager === "admin" ? (
        <FlexBox gap={15} align="center">
          <UtilText>{manager}님</UtilText>
          <UtilText onClick={managerPage}>관리자 페이지</UtilText>
          <UtilText onClick={onLogout}>로그아웃</UtilText>
        </FlexBox>
      ) : (naverState !== "" ? (
        <FlexBox gap={15} align="center">
          <UtilText onClick={() => {alert(`🤗 ${naverState}님 반갑습니다 🤗`)}}><img src={naverLogo} alt="naver" style={{marginTop:"7px", width:"30px"}}/></UtilText>
          <UtilText onClick={Mypage}>{naverState}님</UtilText>
          <UtilText onClick={onLogout2}>로그아웃</UtilText>
        </FlexBox>
      ) : (googleState !== "" ? (
        <FlexBox gap={15} align="center">
          <UtilText onClick={() => {alert(`🤗 ${googleState}님 반갑습니다 🤗`)}}><img src={googleLogo} alt="google" style={{marginTop:"9px", width:"40px", marginRight:"-5px"}}/></UtilText>
          <UtilText onClick={Mypage}>{googleState}님</UtilText>
          <UtilText onClick={onLogout2}>로그아웃</UtilText>
        </FlexBox>
      ) : (
        <FlexBox gap={15} align="center">
          <UtilText>{lstate}님</UtilText>
          <UtilText onClick={Mypage}>마이페이지</UtilText>
          <UtilText onClick={onLogout}>로그아웃</UtilText>
        </FlexBox>
      ))))}
      </Wrapper>
      <Modal opened={modalOpened} setModalOpened={setModalOpened} sucLogin={sucLogin} sucLoginNaver={sucLoginNaver} sucLoginGoogle={sucLoginGoogle} />
      <ModalJoin mymodal={mymodal} setMymodal={setMymodal} />
    </HeaderWrapper>
  )
}

export default Header
