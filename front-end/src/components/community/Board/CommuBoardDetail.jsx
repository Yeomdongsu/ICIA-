import EstimateBanner from '../../estimate/EstimateBanner'
import Footer from '../../footer/Footer'
import Button from '../../form/Button'
import Header from '../../header/Header'
import Section from '../../main/Section'
import '../BoardEtc/CommuBoardWr.scss'
import '../Board/CommuBoard.scss'
import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import DetailReple from './DetailReple'
import useAuth from '../../../hooks/useAuth'

const df = date => moment(date).format('YYYY-MM-DD HH:mm:ss')

const CommuBoardDetail = () => {

  const decbno = sessionStorage.getItem("bno");
  const bn = localStorage.getItem('bno')
  const id = sessionStorage.getItem('mid')
  const grade = sessionStorage.getItem('grade')

  const nav = useNavigate()

  const boardList = () => {
    nav('/commuBoardUp')
  }

  const [board, setBoard] = useState({bno:bn});

  const [flist, setFlist] = useState([
    {
      bno: '',
      fnum: 0,
      fid: 0,
      bmid: id,
      foriname: '',
      fsysname: 'Nothing',
      image: '',
      bview: '',
    },
  ])
  const [ decla, setDecla ] = useState({
    decidx: 0,
    dectype: '',
    decmid: id,
    decbmid:board.bmid,
    decbno:decbno,
  });

  useEffect(() => {
    console.log(bn) //게시글번호
    axios
      .get('/getBoard', { params: { bno: bn } })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('btype', res.data.btype)
        localStorage.setItem('btitle', res.data.btitle)
        localStorage.setItem('bstr', res.data.bstr)
        localStorage.setItem('bmid', res.data.bmid)

        setBoard(res.data)

        if (res.data.bfList.length > 0) {
          let newFileList = []
          for (let i = 0; i < res.data.bfList.length; i++) {
            const newFile = {
              ...res.data.bfList[i],
              image: 'upload/' + res.data.bfList[i].fsysname,
            }
            newFileList.push(newFile)
          }
          setFlist(newFileList)
        }
      })
      .catch(err => console.log(err))
  }, [])


  const viewFlist = flist.map((v, i) => {
    return (
      <span className="Down" key={i} >
        {v.image && <img src={v.image} alt="preview-img" style={{width:'500px'}} />}
      </span>
    )
  })
  
  const deleteBoard = ()=>{
    console.log(deleteBoard);

    let confirm = window.confirm('삭제하시겠습니까?');
    if(confirm === true){
        axios
        .get('/deleteProc', {params:{bno:bn}})
        .then(res => {

            console.log(res);

            if(res.data === 'Ok'){
                window.alert("삭제되었습니다.");
                nav(-2);
            } else {
                window.alert('삭제실패하였습니다.');
            }
        })
        .catch(err => window.alert(err))
    } else{
        window.alert('취소되었습니다.');
    }
}
const [declbtn2, setDeclbtn2]= useState(false);
const decl=() => {
  if(id === board.bmid){
    window.alert('본인은 신고하실 수 없습니다.');
    return;
  }
  
  if(id === '' || id === null){
    window.alert('로그인 후, 이용가능한 서비스입니다.');
    return;
  }

    let confirm = window.confirm('신고하시겠습니까?');
    
  if(confirm === true) {
    setDecla({
      dectype: '게시글',
      decmid: id,
      decbmid:board.bmid,
      decbno:board.bno,
    })
    setDeclbtn2(true);  
  } else {
    window.alert('신고를 취소하였습니다.')
  }
}

  useEffect(()=>{
    
    if(declbtn2===true){
      axios
      .post("/declProc" , decla)
      .then((res) => {
        console.log(res.data);

        setDecla(res.data);

        if(res.data === "Ok"){
          window.alert('정상적으로 신고되었습니다.');
        }else if(res.data === "Already"){
          window.alert('이미 신고하였습니다.');
        }
        else{
          window.alert('신고에 실패하였습니다.');
        }
      })
      .catch((err) => console.log(err) );
    }
  },[declbtn2,decla])

  const [comment, setComment] = useState({
    mentstr: '',
    mentbno: bn,
    mentmid: id,
  })
  const [comList, setComList] = useState([
    {
      mentnum: 0,
      mentbno: '',
      mentdate: '',
      mentmid: id,
      mentstr: '',
    }],
  )

  const com = () => {
    console.log(comment)
    if(id == null){
        window.alert("로그인 후 작성 가능합니다.");
        return;
    }

    if(comment.mentstr === "" || comment.mentstr === null){
        window.alert("내용을 입력해주세요");
        return;
    } else{
        axios
          .post('/Bwritecomment', comment)
          .then(res => {
            console.log(res.data)
    
            const Obj = {
              mentnum: 0,
              mentstr: '',
              mentbno: bn,
              mentmid: id,
            }
            setComment(Obj)
            comList.push(res.data)
            window.alert("작성되었습니다.");
            delwrite.current.value="";
            console.log(res.data);
          })
          .catch(err => console.log(err))
    }
}
const { setNotiBack, notiBack, setRecoBack, recoBack, 
  setReviewBack, reviewBack, setShowBack, showBack, setWorryBack, worryBack } = useAuth()


const onch = e => {
  delwrite.current=e.target;
  const Obj = {
    ...comment,
    [e.target.name]: e.target.value,
  } 
  setComment(Obj)
  console.log(comment);
}
const move=(type)=>{
  console.log(type);
  switch(type){
    case "공지사항":
      nav("/community/commuBoardNoti");
      break;
      case "추천할래요":
      nav("/community/commuBoardReco");
      break;
      case "고민있어요":
      nav("/community/commuBoardWorry");
      break;
      case "자랑할래요":
      nav("/community/commuBoardShow");
      break;
      case "업체후기톡톡":
      nav("/community/commuBoardReview");
      break;
  }
}
const delwrite = useRef();
  return (
    <div>
      <Header />
      <EstimateBanner text="community" />
      <Section title="">
        <div className="Main">
          <form className="Content_table">
            <div style={{ marginTop: '50px', marginBottom: '30px' }}>
              <input className="Input inputTitle" readOnly value={board.btitle}></input>
              <div className="divBoard divBdInfo">
                <div>
                  <span>NO.&emsp;{board.bno}</span>
                </div>
                <span>작성자&emsp;{board.bmid}</span>
                <span>작성일&emsp;{df(board.bdate)}</span>
                <span>조회수&emsp;{board.bview}&emsp;</span>
              </div>
              <div className="Box">
                <div style={{marginTop:'30px'}} className="FileData">{viewFlist}</div>
              </div>
              <textarea style={{border:'none', height:'500px'}}
                onScroll readOnly className="Textarea TextStr" placeholder="내용" value={board.bstr} >
              </textarea>
              
            </div>
           
            <div className="divbtn" style={{  display:'flex'}}>
               {id===""||id===undefined||id===null ? null: board.bmid !== id || grade === "admin" ? (
              <Button type='button' onClick={()=>decl()} style={{ opacity:'90%', background:'#E63535', borderRadius:'100px', width: '120px', height: '50px' }}>🚨 신고하기</Button> 
              ): <div />}
              <div>{board.bmid === id || grade === "admin" ? (
                <Button type="button" onClick={boardList} 
                style={{ width: '120px', height: '50px',background:'#C9A3B6' ,borderRadius:'10px', marginRight:'10px'}}>글수정</Button> ) : null}
                {board.bmid === id || grade ==="admin" ? (
                <Button type="button" onClick={()=>{deleteBoard(); move(board.btype)}} style={{ width: '120px', height: '50px', background: 'lightgray',borderRadius:'10px' }}>
                    삭제하기</Button>): null}
              </div>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'center', lineHeight:'50px',width: '100%', marginTop: '30px'}}>
              <Button type="button" onClick={() => move(board.btype)} style={{ width: '120px', height: '50px', background:'#C9A3B6' ,borderRadius:'10px' }}>
                목록
              </Button>
            </div>
          </form>
          <form className="">
            <div style={{ marginTop: '50px', display: 'flex', marginLeft:'50px', }}>
              <input className="inputdiv inputWrBtn" ref={delwrite} placeholder="댓글을 입력하세요." name="mentstr"
                 onChange={onch}></input>
                <Button className='wtBtn' type="button" onClick={com} 
                style={{   width: '150px', height: '90px', background:'#C9A3B6', borderTopRightRadius:'15px', borderBottomRightRadius:'15px',}}>
                작성하기
                </Button>
          </div>
          </form>
      </div>
        <DetailReple comment={comment} setComment={setComment} comList={comList} setComList={setComList}/>
      </Section>
      <Footer />
    </div>
  )
}
export default CommuBoardDetail
