import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import events from '../../data/events'
import FlexBox from '../common/FlexBox'
import Typhography from '../common/Typhography'

const EventPopupWrapper = styled.div`
  position: absolute;
  left: 35px;
  top: 50px;
  width: 350px;
  font-size: 0;
  z-index: 10;
`
const EventPopupFooter = styled(FlexBox)`
  background: ${(props) => props.theme.colors.black};
  padding: 7px 5px;
  cursor: pointer;
`

export default () => {
  const eventInfo = events[3]
  const [opened, setOpened] = useState(true)

  const onClickHandler = () => {
    setOpened(false)
  }

  return (
    <EventPopupWrapper style={{ display: opened ? 'block' : 'none' }}>
      <Link to={`/event/${eventInfo.id}`}>
        <img src={eventInfo.image} style={{ width: '100%' }} />
      </Link>
      <EventPopupFooter justify="flex-end">
        <Typhography color="white" size="sm" onClick={onClickHandler}>
          닫기
        </Typhography>
      </EventPopupFooter>
    </EventPopupWrapper>
  )
}
