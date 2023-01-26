import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import useNotice from '../../hooks/useNotice'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'

const NoticeWrapper = styled.section`
  padding: 10px 0;
  // background: ${(props) => props.theme.colors.gray};
  background:#FFEBE4;
`

const slideUpActive = keyframes`
  0% {
    transform: translateY(35px);
  }
  100% {
    transform: translateY(0));
  }
`

const slideUpHide = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-35px);
    opacity: 1;
  }
`

const NoticeText = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  transform: translateY(0);

  &.active {
    animation: ${slideUpActive} 0.3s;
  }

  &.hide {
    animation: ${slideUpHide} 0.3s;
    opacity: 0;
  }
`

export default () => {
  const { notices } = useNotice()
  const [active, setActive] = useState([]);

  useEffect(()=>{
    if (notices.length === 0) return

    setTimeout(() => {
      setActive((active + 1) % notices.length)
    }, 3000)
  }, [active, notices])

  return (
    <NoticeWrapper>
      <Link to="/community/commuBoardNoti">
        <Wrapper>
          <Typhography size="lg" font="bold" style={{ width: 200 }}>
            공지사항
          </Typhography>
          <Typhography
            size="md"
            style={{ flex: 1, height: 35, overflow: 'hidden', position: 'relative' }}
          >
            {notices && notices.map((v, i) => (
              <NoticeText className={active === i ? 'active' : 'hide'} key={i}>
                {v}
              </NoticeText>
            ))}
          </Typhography>
        </Wrapper>
      </Link>
    </NoticeWrapper>
  )
}
