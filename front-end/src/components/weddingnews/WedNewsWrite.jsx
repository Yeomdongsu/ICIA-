import React, { useCallback, useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Button from "../form/Button";
import Section from "../main/Section";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WedNewsWrite = () => {
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
    // const id = sessionStorage.getItem("mid");
    // const grade = sessionStorage.getItem("grade");
  
    const [data, setData] = useState({
        btitle: "",
        bstr: "",
        bmid: "",
        btype: "News",
    });

    //전송 데이터와 파일을 담을 멀티파트 폼 생성
    let formData = new FormData();
    // const { btitle, bcontent } = data;

    //작성한 내용(글, 파일들) 전송 함수
    const onWrite = useCallback((e) => {
        e.preventDefault();

        //console.log(data);
        //전송 시 파일 이외의 데이터를 폼데이터에 추가
        formData.append(
            "data",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        console.log(formData);
        axios
            .post("/newsWrite", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data === "ok") {
                    alert("작성 성공");
                    nav("/WeddingNews");
                    // sessionStorage.removeItem("pageNum");
                    // nav("/main");
                } else {
                    alert("작성 실패");
                    //formData = new FormData();
                }
            })
            .catch((error) => console.log(error));
        }, [data]);

    const onChange = useCallback((e) => {
        const dataObj = {
            ...data,
            [e.target.name]: e.target.value,
        };
        console.log(dataObj);
        setData(dataObj);
        }, [data]);

    //파일 선택 시 폼데이터에 파일 목록 추가(다중파일)
    const onFileChange = useCallback((e) => {
        const files = e.target.files;
        //console.log(files);
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }},[formData]);

    return (
        <>
            <Header/>
            <div data-aos="fade-up">
            <Section style={{width : "55%"}}>
                <div style={Main}>
                    <span style={{display : "block", textAlign : "center", fontSize : "50px", padding : "0"}}>뉴스 작성</span>
                    <form style={Content} onSubmit={onWrite}>
                        <input style={Input} onChange={onChange} name="btitle" placeholder="제목을 입력하세요." autoFocus required />
                        <input style={Input} onChange={onChange} name="bmid" placeholder="기자 이름을 입력하세요." required />
                        <textarea style={Textarea} onChange={onChange} name="bstr" onScroll placeholder="내용을 작성하세요." required/>
                        <input type="file" name="files" onChange={onFileChange} multiple />
                        <div style={Buttons}>
                            <Button type="submit" wsize="s-30" style={{width : "150px" , marginRight:"10px", backgroundColor:"#C9A3B6"}}>작성하기</Button>
                            <Button type="button" wsize="s-10" color="gray" onClick={() => nav(-1)} style={{width: "150px", backgroundColor : "#D3D3D3", fontSize : "18px"}}>취소하기</Button>
                        </div>
                    </form>    
                </div>
            </Section>
            </div>
            <Footer />
        </>
    );
}
export default WedNewsWrite;
