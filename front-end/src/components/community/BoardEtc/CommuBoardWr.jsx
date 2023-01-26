import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../../footer/Footer";
import Button from "../../form/Button";
import Select from "../../form/Select";
import Header from "../../header/Header";
import "./CommuBoardWr.scss";
import styled from 'styled-components'
import { formItemStyle } from '../../../style/theme'
import Arrow from '../../../assets/images/select/select-arrow.png'

const Sel = styled.select`
border: 0;
font-size: ${(props) => props.theme.fontSize.md};
${formItemStyle};
appearance: none;
background: #fff url(${Arrow}) no-repeat right 15px center;
background-size: 10px;
`
const CommuBoardWr = () => {
// const CommuBoardWr = ({handleList}) => {
    const nav = useNavigate();
    
  // const titleRef = useRef();
  // const contetnRef = useRef();
  const [fileImage, setFileImage] = useState('')

  const id = sessionStorage.getItem("mid");
  const grade = sessionStorage.getItem("grade");
  const cb = sessionStorage.getItem("cb");
  console.log(cb);
  const [data, setData] = useState({
    btype: cb,
    btitle: "",
    bmid: id,
    bstr: "",
    bview: "",
  });

  useEffect(()=>{
    console.log(data);
  },[data])
  const inputBoard = useRef();
  const borderCh = (e) => {
    inputBoard.current.style.border = '1px solid lightgray';
    inputBoard.current.style.background = 'white';
    inputBoard.current = e.target
    inputBoard.current.style.border = '1px solid black';
    inputBoard.current.style.background = 'rgb(248,248,248)';
  
  }
  //전송 데이터와 파일을 담을 멀티파트 폼 생성
  let formData = new FormData();
  // const { btitle, bstr, btype,  } = data;

  //작성한 내용(글, 파일들) 전송 함수
  const onWrite = useCallback(
    (e) => {
      e.preventDefault();
      //console.log(data);
      //전송 시 파일 이외의 데이터를 폼데이터에 추가
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      axios
        .post("/writeProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "Ok") {
            alert("작성 성공");
            sessionStorage.removeItem("pageNum");
            nav(-1);
          } else {
            alert("작성 실패");
            //formData = new FormData();
          }
        })
        .catch((error) => console.log(error));
    },
    [data]
  );
  const onChange = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
        bmid:id,
      };
      console.log(dataObj);
      setData(dataObj);
    },
    [data]
  );
  //console.log(data);
  //파일 선택 시 폼데이터에 파일 목록 추가(다중파일)
  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        setFileImage(URL.createObjectURL(e.target.files[0]))
        formData.append("files", files[i]);
      }
    },
    [formData]
  );
    const imageInput = useRef();
    const onClickImg = () => {
        imageInput.current.click();
    }
    
  const options = [
    {
      defaultLabel: '공지사항',
      value : '공지사항',
      label :'공지사항'
    },
    {
      defaultLabel: '추천할래요',
      value : '추천할래요',
      label :'추천할래요'
    },
    
    {
      defaultLabel: '고민있어요',
      value : '고민있어요',
      label :'고민있어요'
    },
    {
      defaultLabel: '자랑할래요',
      value : '자랑할래요',
      label :'자랑할래요'
    },
    {
    defaultLabel: '업체후기톡톡',
    value : '업체후기톡톡',
    label :'업체후기톡톡'
  },
  ]
  const options1 = [
    // {
    //     defaultLabel: 1,
    //     value : 1,
    //     label :'공지사항'
    // },
  {
    defaultLabel: '추천할래요',
    value : '추천할래요',
    label :'추천할래요'
  },
  
  {
    defaultLabel: '고민있어요',
    value : '고민있어요',
    label :'고민있어요'
  },
  {
    defaultLabel: '자랑할래요',
    value : '자랑할래요',
    label :'자랑할래요'
  },
  {
    defaultLabel: '업체후기톡톡',
    value : '업체후기톡톡',
    label :'업체후기톡톡'
    },
  ]
    return(
        <div>
            <Header />
        <div className="Main">
            <form className="Content" onSubmit={onWrite}>
                {/*  onSubmit={onWrite} */}
                {/* <h1>글쓰기</h1><br /> */}
               
                <div style={{marginTop:"50px", marginBottom:"30px"}}>
                   {grade === 'admin' ?(
                    <Sel defaultValue={data.btype} style={{width: "150px", height:"51px",paddingTop:'12px',paddingLeft:'20px', border:'1px solid lightgray', borderBottom:'none'}}
                    name="btype" onChange={onChange}>
                      {options.map((item)=>(
                        <option value={item.value} onChange={onChange}>{item.label}</option>
                      ))}
                    </Sel>):(
                    <Sel defaultValue={data.btype} style={{width: "150px", height:"51px",paddingTop:'12px',paddingLeft:'20px', border:'1px solid lightgray', borderBottom:'none'}}
                    name="btype" onChange={onChange}>
                      {options1.map((item)=>(
                        <option value={item.value} onChange={onChange}>{item.label}</option>
                      ))}
                    </Sel>)}
                    <input style={{width:"900px", height:"50px", borderBottom:'none'}}
                    className="Input" ref={inputBoard} onClick={(e)=>borderCh(e)}  placeholder="제목을 입력하세요." autoFocus required 
                      name="btitle" value={data.btitle} onChange={onChange}
                    />
                    <textarea style={{width: "1050px", height:"500px",}} onScroll 
                    className="Textarea" ref={inputBoard} onClick={(e)=>borderCh(e)}  placeholder="게시글을 작성하세요."
                      name="bstr" onChange={onChange} value={data.bstr} 
                    ></textarea>
                    <div>
                      {fileImage && (
                        <div>
                          <img alt="image" src={fileImage} style={{ width: '350px', height: '350px' }} />
                        </div>
                      )}
                    </div>
                    <input type="file" name = "files" multiple className="Input" accept="image/*" ref={imageInput} onChange={onFileChange}
                    style={{ display:'none',
                        width:"1000px", height:"50px", fontSize:"1rem", marginTop:"-10px", paddingLeft:"10px"
                    }} />
                    <button style={{width: '120px', height: '50px', background:'#C3B6D9',border:'1px solid #D6C7ED', color:'',borderRadius:'10px'}} type="button" className="filebtn" onClick={onClickImg}>첨부하기</button>
                </div>
                <div className="Buttons">
                    <Button  wsize="s-30" style={{marginRight:"10px",width: '120px', height: '50px', background:'#C9A3B6',borderRadius:'10px'}}>
                        작성하기
                    </Button>
                    <Button type="button" wsize="s-10" color="gray" outline onClick={() => nav(-1)}
                    style={{width: '120px', height: '50px', backgroundColor:"lightgray",borderRadius:'10px'}}>취소하기</Button>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    );
}
export default CommuBoardWr;