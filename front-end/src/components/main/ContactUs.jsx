import styled from 'styled-components'
import Typhography from '../common/Typhography'

const ContactUsWrapper = styled.section`
  position: sticky;
  left: 0;
  bottom: 0px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 50px;
  // background: #efefef;
  background:#F7ECEC;
  z-index: 2;
`

export default (props) => {
  return (
    <ContactUsWrapper {...props}>
      <Typhography size="lg" font="bold" style={{ marginRight: 30 }}>
        문의 전화
      </Typhography>
      <div>
        <Typhography size="lg">
          032) 1234-1234 (웨딩, 연회) | 032) 1234-1234 (점심뷔페, 출장뷔페)
        </Typhography>
        <br />
        <Typhography size="sm">
          상담시간: 오전 9시 ~ 오후 7시 / 위치: 주안역 1번 출구, 352번 버스
        </Typhography>
      </div>
    </ContactUsWrapper>
  )
}
