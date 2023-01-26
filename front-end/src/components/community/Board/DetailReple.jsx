import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const df = date => moment(date).format('YYYY-MM-DD HH:mm:ss')

const DetailReple = ( {comment,setComment,comList,setComList,...props}) => {
    const id = sessionStorage.getItem('mid')
    const grade = sessionStorage.getItem('grade')    
    const bn = localStorage.getItem('bno')

    const nav = useNavigate();

  useEffect(() => {
    console.log(bn) //게시글번호
  }, [])

const onch = e => {
  const Obj = {
    ...comment,
    [e.target.name]: e.target.value,
  } 
  setComment(Obj)
  console.log(comment);
}

useEffect(() => {
  axios
  .get('/BcommentList', { params: { mentbno: bn } })
  .then(res => {
    console.log(res.data)
    setComList(res.data)
    console.log(res.data[0].mentmid)
  })
  .catch(err => console.log(err))
},[])
    const [delCan, setDelCan] = useState('삭제하기');
    const [cnum , setCnum] =useState(0);
    const [read, setRead] = useState(true);
    const [uwrite, setUwrite] = useState("수정하기");
    const curbtn = useRef(0)

    const update = i => {
      setCnum(i);
      read ? setRead(false) : setRead(true);
      if(read){
          setRead(false)
          setUwrite("수정완료")
          setDelCan("취소하기")
      }
      else{
          console.log(comment.mentstrup)
          if(comment.mentstr === "" || comment.mentstr === null){
              window.alert("내용을 입력해주세요");
              setUwrite("수정하기")
              setDelCan('삭제하기')
          }
          else{
            comList.reverse()[i].mentstr = comment.mentstr;
            console.log(comList.reverse()[i])
          axios.post('/updateBcomment', comList.reverse()[i])
          .then(res=>{
            // console.log("-----------------")
              console.log(res.data);
              setComList(res.data);
              setRead(true)
              setDelCan("삭제하기")
              const Obj = {
                mentnum:0,
                mentstr: '',
                mentbno: bn,
                mentmid: id,
              }
              setComment(Obj);
            }).catch((error)=>console.log(error))
            setUwrite("수정하기")
      }
      }      
    }

  const deleteBcomment = i => {
    console.log(comList[i])  
    if(delCan === "삭제하기"){
      let confirm = window.confirm('삭제하시겠습니까?')
      if (confirm === true) {
        console.log(comList)
        axios
        .post('/deleteBcomment', comList.reverse()[i])
        .then(res => {
          console.log(res)

          if(res.data === "Ok"){
            window.alert('삭제되었습니다.');
            nav(0);
          }
          else{
            window.alert('삭제실패하였습니다.')
          }
        })
        .catch(err => console.log(err))
      } else {
        window.alert('취소되었습니다.')
      }
    } else {
      window.alert('취소되었습니다.')
      setRead(true)
              setUwrite("수정하기")
              setDelCan("삭제하기")
    }
}

const [ decla, setDecla ] = useState({
  decidx: 0,
  decmid: id,
  dectype: '',
  decbmid:'',
  decbno:comment.mentnum,
});

const [declbtn3, setDeclbtn3]= useState(false);

const decl2 =(dmid,mnum) => {
  if(id == null || id === ""){
    window.alert('로그인 후, 이용 가능합니다.')
    return;
  }
    let confirm = window.confirm('신고하시겠습니까?');
    if(confirm === true) {
      setDecla({
        dectype: '댓글',
        decmid: id,
        decbmid:dmid,
        decbno:mnum,
      })
      setDeclbtn3(true);
  } else {
    window.alert('신고를 취소하였습니다.')
  }
  }

  useEffect(()=>{
    if(declbtn3===true){
      axios
  .post("/declProc" , decla)
  .then((res) => {
    console.log(res.data);

    setDecla(res.data);

    if(res.data === "Ok"){
      window.alert('정상적으로 신고되었습니다.');
    }else{
      window.alert('신고에 실패하였습니다.');
    }
  })
  .catch((err) => console.log(err) );
    }
  },[declbtn3,decla])

const clistItem = comList?.slice(0)
.reverse()
.map((comList, i) => {
  return(
    <>
    { comList.length !== 0 ?
      <div key={comList.mentnum}>
        <div>
          <div className="divdiv" style={{ border:'1px solid #C9A3B6',background:'#FFF7F8', borderRadius:'15px', marginTop:'10px'}}>
            <div className="divbtn" style={{paddingTop:'10px'}}>
              
              <div>
                {/* <span>{comList.mentmid}</span> */}
                <span style={{paddingLeft:'20px',}}>{comList.mentmid}</span>
                {id===""||id===undefined||id===null ? null:(comList.mentmid !== id || grade ==="admin" ) ? 
                <span style={{cursor:'pointer'}} onClick={()=>decl2(comList.mentmid, comList.mentnum)}> 🚨</span> : null}
              </div>
              <div>
                <span style={{ marginRight: '15px' }}>{df(comList.mentdate)}</span>
                {(comList.mentmid === id || grade ==="admin") ? 
                // 수정하기 or 수정완료
                  <button
                    style={{ border: 'none', background: 'none', fontSize: '17px', color: 'black', cursor: 'pointer', marginRight:'10px'}}
                    type="button" ref={curbtn} onClick={() => update(i) }> 수정하기 </button> : null}
                {comList.mentmid === id || grade ==="admin" ? 
                // 삭제하기 or 취소하기
                  <button
                    style={{ border: 'none', background: 'none', fontSize: '17px', color: 'rgb(230, 53, 53)', cursor: 'pointer', paddingRight:'20px'}}
                    type="button" onClick={() => deleteBcomment(i)}> {delCan} </button> : null}
              </div>
            </div>
            {!read && cnum === i ?
            <input className="inputre" style={{background:"#D9E5FF", paddingLeft:'20px', height:'50px'}}
            name='mentstr' defaultValue={comList.mentstr} onChange={onch}/>
           
            : <input className="inputre" style={{paddingLeft:'20px', height:'50px',background:'#FFF7F8'}} name="mentstr" value={comList.mentstr} readOnly />}
          </div>
        </div>

      </div>
    : <div className="divdiv">
    <input
      className="inputre"
      style={{ textAlign: 'center' }}
      placeholder="댓글이 존재하지 않습니다."
      readOnly
    />
  </div>
  }
  </>
  );
})
  return (<div className="" style={{margin: '0 auto'}}>{clistItem}</div>)
}
export default DetailReple;