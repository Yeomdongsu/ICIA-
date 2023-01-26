import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EstimateBanner from "../estimate/EstimateBanner";
import Footer from "../footer/Footer";
import Button from "../form/Button";
import Header from "../header/Header";
import Section from "../main/Section";
import "./WedNewsDetail.scss";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm");

const WedNewsDetail = () => {

    const nav = useNavigate();
    const [board, setBoard] = useState({});
    const [flist, setFlist] = useState([
        {
        image: "",
        }
    ]);

    const bn = localStorage.getItem("bno");
    const grade = sessionStorage.getItem("grade");

    useEffect(() => {

        axios   
        .get("/newsDetail", { params : {bno : bn, type:"News"}})
        .then((res) => {
            // console.log(res);
            console.log(res.data);
            setBoard(res.data);

            if (res.data.bfList.length > 0) {
                console.log(res.data.bfList);
                let newFileList = [];
                for (let i = 0; i < res.data.bfList.length; i++) {
                  const newFile = {
                    ...res.data.bfList[i],
                    image: "upload/" + res.data.bfList[i].fsysname,
                  };
                  console.log(newFile);
                  newFileList.push(newFile);
                }
                //console.log(newFileList);
                setFlist(newFileList);
            }
      
        })
        .catch((err) => console.log(err));
    }, []);

    const viewFlist = flist.map((v, i) => {
        //console.log(v);
        return (
          <div key={i}>
            {v.image && <img src={v.image} style={{width:"1100px",margin:"auto"}} alt="preview-img" />}
          </div>
        );
    });
    
    const newsDel = () => {
        let confirm = window.confirm("이 뉴스를 삭제하시겠습니까?");

        if(confirm === true){

            axios
                .post("newsDel", board)
                .then((res) => {
                    console.log(res.data);
                    if(res.data == "뉴스 삭제 성공"){
                        alert("뉴스가 삭제되었습니다.");
                        nav("/WeddingNews");
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div>
            <Header />
            <EstimateBanner />
            <Section style={{margin:"auto",width:"100%"}}>
            <div className="WMain">
                <form className="WContent">
                    <div style={{marginTop:"-30px", marginBottom:"25px", width:"1100px"}}>
                        <input style={{ height:"45px"}} readOnly
                        className="WInput" value={board.btitle}/>
                        <div className="Winfo">
                            <span style={{paddingLeft : "5px",color:"green"}}>🐥&nbsp;{board.bmid}&nbsp;기자</span>
                            <span style={{paddingRight : "5px"}}>작성일 &nbsp;: &nbsp;{df(board.bdate)}</span>
                        </div>
                        <div style={{border:"1px solid #e6e6e6", borderBottom:"none",}}>{viewFlist}</div>
                        <textarea style={{ height:"1000px", borderTop:"none"}} onScroll readOnly
                        className="WTextarea" placeholder="내용" value={board.bstr}/>
                        {/* <div>{viewFlist}</div> */}
                    </div>
                    {grade === "admin" ? (
                        <div style={{marginTop:"-5px"}}>
                            <Button type="button" onClick={()=>nav("/WeddingNews")} style={{width:"150px", height:"50px", marginLeft:"450px", backgroundColor : "#C9A3B6"}}>목록</Button>
                            <Button type="button" onClick={newsDel} style={{width:"150px", height:"50px", marginLeft:"350px"}}>게시글 삭제</Button>              
                        </div>
                    ) : (<Button type="button" onClick={()=>nav("/WeddingNews")} style={{width:"150px", height:"50px",backgroundColor : "#C9A3B6"}}>목록</Button>)}
                </form>
            </div>
            </Section>
            <Footer />
        </div>

    );
}

export default WedNewsDetail;