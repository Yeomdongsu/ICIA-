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

    // const [mpid1, setMpid1] = useState("");
    // const [mpid2, setMpid2] = useState("");
    // const [mname, setMname] = useState("");
    const [sid, setSid] = useState("");

    const [id, setId] = useState({
        mname : "",
        mpid : "",
    })
    // const mpid = mpid1 + mpid2;

    const onch = useCallback((e) => {
        // if(e.target.name === "mpid1"){
        //     setMpid1(e.target.value); 
        // }else if(e.target.name === "mpid2"){
        //     setMpid2(e.target.value); 
        // }
        // else if(e.target.name === "mname"){
        //     setMname(e.target.value);
        // }

        const formObj = {
            ...id,
            [e.target.name] : e.target.value,
            // mname : mname,
            // mpid : mpid1 + mpid2,
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
                    {/* <div style={{width:"100%" , marginBottom:"42px"}}> */}
                        <input className="inp-id" onChange={onch} name="mpid" type="text" maxLength="13" required placeholder="- 를 제외한 13자리를 입력하세요."/>
                        {/* <span className="sp">__</span> */}
                        {/* <input className="bnum2" onChange={onch} name="mpid2" value={mpid2} type="password" maxLength="7" required placeholder="*******"/> */}
                    {/* </div> */}
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
