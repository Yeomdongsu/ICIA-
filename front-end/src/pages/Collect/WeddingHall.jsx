import FlexBox from '../../components/common/FlexBox'
import Pagination from '../../components/common/Pagination'
import CollectItem from '../../components/collect/CollectItem'
import useDummyApi from '../../hooks/useDummyApi'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import weddinghall from '../../data/weddinghall'
import { useNavigate } from 'react-router-dom'
import weddinghalls from '../../data/weddinghall'

export default () => {
  // const { rowData, page, totalCount, perPage, onPaginationChange } = useDummyApi({
    // data: weddinghall,
    // perPage: 9,

    const navigate = useNavigate()

    const [hData, setHdata]= useState([]);
    useEffect(()=>{
      axios.get("/weddinghall")
      .then(res=>{
        console.log("율"+res.data);
        setHdata(res.data);
      }).catch(err=>console.log(err))  
    },[]);
    console.log(hData);
    for(let i=0; i<hData.length; i++){
      console.log(hData[i])
    }
    const { fetchData, response, loading } = useApi('get', "/weddinghall")
  
    const scrollHandler = useCallback((e) => {
      if ((window.scrollY + window.innerHeight) >= (document.querySelector('body').offsetHeight - 200)) {
        setplanner([
          ...weddinghall,
          ...weddinghalls
        ])
      }
    }, [window])
    useEffect(() => {
      fetchData()
  
    }, [])
    let tempEList = [];
    const [planner, setplanner] = useState(weddinghall)
    useEffect(()=>{
      for(let i =0; i<hData.length; i++){
        tempEList.push({id:hData[i].hidx, image:hData[i].himg, title:hData[i].himg, content:hData[i].hbrand})
      }
      setplanner(tempEList);
    },[hData])
  console.log(weddinghall);

  return (
    <>
      <div style={{ flexWrap: 'wrap', width: '100%' , height:'100%'}} gap={40}>
        {weddinghall.map((v, id) => (
          <CollectItem
            image={v.image}
            companyName={"/upload/"+v.companyName}
            style={{ width: '100%', marginBottom:'3%'}}
            link={`/collect/wedding-hall/${id}`}
          />
        ))}
      </div>
      {/* <Pagination
        page={page}
        totalCount={totalCount}
        perPage={perPage}
        onPaginationChange={onPaginationChange}
      /> */}
    </>
  )
}
