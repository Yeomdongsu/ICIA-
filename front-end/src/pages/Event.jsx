import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Wrapper from '../components/common/Wrapper'
import { Link } from 'react-router-dom'
import events from '../data/events'
import styled from 'styled-components'
import EstimateBanner from '../components/estimate/EstimateBanner'
import useApi from '../hooks/useApi'
import { useCallback, useEffect, useState } from 'react'
import FlexBox from '../components/common/FlexBox'
import axios from 'axios'
import Image1 from './Events/EventImage/EventImage4.jpg'

const EventLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 600px;

  :hover .dimd {
    opacity: 1 !important;
  }
`

export default () => {
  /**
   * API 호출 예시
   * 첫번째 get은 메서드, get, post, put, delete로 사용 가능
   * 뒤에 /event는 url 입니다. API 호출할 정보에 따라 입력해주시면 됩니다
   * 전달되는 fetchData는 정보를 조회하는 함수며,
   * fetchData를 실행 시킬때 loading이 true, 정보가 다 조회되면 자동으로 loading이 false가 됩니다.
   */
  const [eData, setEdata] = useState([])
  useEffect(() => {
    axios
      .get('/event')
      .then(res => {
        console.log('율' + res.data)
        setEdata(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(eData)
  for (let i = 0; i < eData.length; i++) {
    console.log(eData[i])
  }
  const { fetchData, response, loading } = useApi('get', '/event')

  const scrollHandler = useCallback(
    e => {
      if (
        window.scrollY + window.innerHeight >=
        document.querySelector('body').offsetHeight - 200
      ) {
        setEventList([...eventList, ...events])
      }
    },
    [window]
  )
  useEffect(() => {
    fetchData()

    // window.addEventListener('scroll', scrollHandler)

    // return () => {
    //   window.removeEventListener('scroll', scrollHandler)
    // }
  }, [])
  let tempEList = []
  const [eventList, setEventList] = useState(events)
  useEffect(() => {
    for (let i = 0; i < eData.length; i++) {
      tempEList.push({
        id: eData[i].eidx,
        image: eData[i].eimg,
        title: eData[i].estr,
        content: eData[i].estr,
      })
    }
    setEventList(tempEList)
  }, [eData])
  console.log(eventList)
  return (
    <div>
      <Header />
      <EstimateBanner text="Event" />
      <Wrapper style={{ padding: '100px 110px 150px' }}>
        <FlexBox
          style={{ width: '100%', flexWrap: 'wrap', justifycontent: 'space-between', margin: '1%' }}
        >
          {eventList.map(v => (
            <EventLink
              to={`/event/${v.id}`}
              style={{ width: '50%', height: '800px', padding: '5px' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(upload/${v.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />
              <div
                className="dimd"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  opacity: 0,
                  transition: '.3s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {v.title}
              </div>
            </EventLink>
          ))}
        </FlexBox>
      </Wrapper>
      <Footer />
    </div>
  )
}
