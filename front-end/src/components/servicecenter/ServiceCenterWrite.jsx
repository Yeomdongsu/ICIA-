import React, { useCallback, useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Button from "../form/Button";
import Section from "../main/Section";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceCenterWrite = () => {
    const Main = {
        minHeight: "250px",
        width: "100%",
        margin: "auto",
    }
    const Content = {
        width : "100%",
        margin : "auto",
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        boxSizing: "border-box",
    }
    const Input = {
        height : "50px",
        fontSize: "20px",
        lineHeight: "2.5rem",
        background: "white",
        border: "1px solid rgb(230, 230, 230)",
        padding: "10px 20px",
    }
    const Textarea = {
        width: "100%",
        height: "35rem",
        fontSize: "1.25rem",
        lineHeight: "2.5rem",
        background: "white",
        resize: "none",
        margin:"auto",
        padding: "10px 20px",
        boxSizing: "border-box",
        border: "1px solid rgb(230, 230, 230)",
    }
    const Buttons = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "30px 0 40px 0",
    }

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
export default ServiceCenterWrite;
