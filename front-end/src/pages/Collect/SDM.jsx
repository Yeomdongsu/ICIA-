import FlexBox from '../../components/common/FlexBox'
import Pagination from '../../components/common/Pagination'
import CollectItem from '../../components/collect/CollectItem'
import useDummyApi from '../../hooks/useDummyApi'
import sdm from '../../data/sdm'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import sdms from '../../data/sdm'

export default () => {
  // const { rowData, page, totalCount, perPage, onPaginationChange } = useDummyApi({
  //   data: sdm,
  //   perPage: 9,
  // })

    const navigate = useNavigate()
  
    const [hData, setHdata]= useState([]);
    useEffect(()=>{
      axios.get("/sdm")
      .then(res=>{
        console.log("율"+res.data);
        setHdata(res.data);
      }).catch(err=>console.log(err))  
    },[]);
    console.log(hData);
    for(let i=0; i<hData.length; i++){
      console.log(hData[i])
    }
    const { fetchData, response, loading } = useApi('get', "/sdm")
  
    const scrollHandler = useCallback((e) => {
      if ((window.scrollY + window.innerHeight) >= (document.querySelector('body').offsetHeight - 200)) {
        setsdm([
          ...sdm,
          ...sdms
        ])
      }
    }, [window])
    useEffect(() => {
      fetchData()
  
    }, [])
    let tempEList = [];
    const [sdm, setsdm] = useState(sdms)
    useEffect(()=>{
      for(let i =0; i<hData.length; i++){
        tempEList.push({id:hData[i].hidx, image:hData[i].himg, title:hData[i].himg, content:hData[i].hbrand})
      }
      setsdm(tempEList);
    },[hData])
  console.log(sdm);
  return (
    <>
      <FlexBox style={{ flexWrap: 'wrap', width: '100%' }} gap={40}>
        {sdm.map((v, id) => (
          <CollectItem
            image={v.image}
            companyName={"/upload/"+v.companyName}
            style={{ width: '360px' }}
            link={`/collect/sdm/${id}`}
          />
        ))}
      </FlexBox>
      {/* <Pagination
        page={page}
        totalCount={totalCount}
        perPage={perPage}
        onPaginationChange={onPaginationChange}
      /> */}
    </>
  )
}
