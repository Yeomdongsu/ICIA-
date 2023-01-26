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