import FlexBox from '../../components/common/FlexBox'
import Pagination from '../../components/common/Pagination'
import CollectItem from '../../components/collect/CollectItem'
import useDummyApi from '../../hooks/useDummyApi'
import honeymoon from '../../data/honeymoon'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import honeymoons from '../../data/honeymoon'
import axios from 'axios'
import useApi from '../../hooks/useApi'

export default () => {
  // const { rowData, page, totalCount, perPage, onPaginationChange } = useDummyApi({
  //   data: honeymoons,
  //   perPage: 9,
  // })

  const navigate = useNavigate()

  const [hData, setHdata] = useState([])
  useEffect(() => {
    axios
      .get('/searchHoneyMoonAll')
      .then(res => {
        console.log('율' + res.data)
        setHdata(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(hData)
  for (let i = 0; i < hData.length; i++) {
    console.log(hData[i])
  }
  const { fetchData, response, loading } = useApi('get', '/searchHoneyMoonAll')

  const scrollHandler = useCallback(
    e => {
      if (
        window.scrollY + window.innerHeight >=
        document.querySelector('body').offsetHeight - 200
      ) {
        setHoneymoon([...honeymoon, ...honeymoons])
      }
    },
    [window]
  )
  useEffect(() => {
    fetchData()
  }, [])
  let tempEList = []
  const [honeymoon, setHoneymoon] = useState(honeymoons)
  useEffect(() => {
    for (let i = 0; i < hData.length; i++) {
      tempEList.push({
        id: hData[i].hidx,
        image: hData[i].himg2,
        title: hData[i].himg,
        content: hData[i].hlocation,
      })
    }
    setHoneymoon(tempEList)
  }, [hData])
  console.log(honeymoon)

  return (
    <>
      <div style={{ flexWrap: 'wrap', width: '100%', height: '100%' }} gap={40}>
        {honeymoon.map((v, id) => (
          <CollectItem
            key={v.id}
            image={'/upload/' + v.image}
            companyName={v.content}
            style={{ width: '100%', marginBottom: '3%' }}
            link={`/collect/honeymoon/${id}`}
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
