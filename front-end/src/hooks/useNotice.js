import axios from 'axios'
import { useEffect, useState } from 'react'

export default () => {
  const [notices, setNotices] = useState([])

  const [s, setS] = useState("")
  const fetchData = async () => {
    axios.get("/searchNotiAll")
    .then(res =>{
      console.log(res.data)
      let rhd = res.data
      let noti =[];
      for(let i=0;i<rhd.length;i++){
        console.log(rhd[i].btitle)
        noti.push(rhd[i].btitle)
      }
      console.log(noti)
      // setS(res.data)
      setNotices(noti)
    }).catch(err => console.log(err))
    // setNotices([
    //   '비점착식 데코타일로 베란다 바닥 꾸미기',
    //   '발이 편한 내돈내산 매트 솔직 후기 #살림잇템',
    //   '자주 사용하는 그릇 15종을 소개합니다 #리빙잇템',
    // ])
    // axios.post()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    notices,
    fetchData,
  }
}
