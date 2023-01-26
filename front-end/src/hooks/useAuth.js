import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

const useAuth = () => {
  console.log("useAuth")
  const id = localStorage.getItem("mid");
  const [logined, setLogined] = useState(false)
  const [userInfo, setUserInfo] = useState([
    {
      mid:id,
      grade:'',
      maddr:'',
      memail:'',
      mname:'',
      mphone:'',
      mpwd:'',
      mdaddr:'',
    },
  ]);
  useEffect (() => {
    const id = sessionStorage.getItem("mid");

    axios
    .post("/mypage", null,{params:{mid:id}})
    .then((res)=> {
      console.log(res.data)
      setUserInfo(res.data);
    })
    .catch((err)=> console.log(err));
  },[])
  
  const doLogin = (id, password) => {
    setLogined(true)
  }


  const doLogout = () => {
    if (!logined) return

    setLogined(false)
  }
  const [notiBack, setNotiBack]=useState(false);
  const [recoBack, setRecoBack] = useState(false);
  const [reviewBack, setReviewBack] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [worryBack, setWorryBack] = useState(false);

  return {
    logined,
    userInfo,
    doLogin,
    doLogout,
    notiBack,
    recoBack,
    reviewBack,
    showBack,
    worryBack,
    setNotiBack,
    setRecoBack,
    setReviewBack,
    setShowBack,
    setWorryBack
  }
}
export default useAuth;