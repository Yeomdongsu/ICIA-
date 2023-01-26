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
    const dv = {
        display: "flex",
        justifyContent: "end",
        width: "100%",
        // marginBottom : "-5px",
        margin: "-20px 0px 60px 0",
        // paddingRight: "500px",
        zIndex : "10",
    }
    const writeBtn = {
        backgroundColor : "#C3B6D9",
        // marginTop:"-42px",
        marginTop:"-35px",
        width : "160px",    
        // marginLeft : "330px",
    }

    const nav = useNavigate();
    let pnum = sessionStorage.getItem("pageNum");
    const grade = sessionStorage.getItem("grade");

    const [bitem, setBitem] = useState({});

    const [flist, setFlist] = useState([
        {
        //   bfnum: 0,
        //   bfbid: 0,
        //   bfsysname: "",
        //   bforiname: "Nothing",
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