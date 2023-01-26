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