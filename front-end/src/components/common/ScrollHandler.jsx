import styled from 'styled-components'
import Stack from './Stack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ChattingBot from '../servicecenter/ChattingBot'


const ScrollButton = styled.button`
  border: 0;
  border-radius: 100%;
  background: #000;
  color: #fff;
  opacity: 0.5;
  transition: 0.3s;
  width: 50px;
  height: 50px;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`

export default () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  // onClick으로 아래 방향 버튼에 할당이 되어 있으며
  // 해당 버튼을 눌러 실행을 시키면 window 자체의 스크롤을 제일 밑까지 내려주는 (scrollToBottom)함수
  // function scrollToBottom() {}
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight, // body의 전체 스크롤 가능한 높이를 의미
      left: 0,
      behavior: 'smooth',
    })
  }

  // FontAwesomeIcon - 아이콘 노출

  // 이미지 클릭시 챗봇 노출
  const [img, setImg] = useState(false);

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 155, width: 50, height: 110, zIndex:"999" }}>
      <Stack gap={10}>
        <ScrollButton onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </ScrollButton>
        <ScrollButton onClick={scrollToBottom}>
          <FontAwesomeIcon icon={faArrowDown} />
        </ScrollButton>
          <FontAwesomeIcon shake icon={faHeart} style={{width:"50px",height:"50px", color:'#DB8383',cursor:'pointer', animationDuration:"2.5s"}} onClick={() => setImg(!img)}/>
          {/* <img src={imga2} style={{width:"50px",height:"50px", cursor:'pointer' }} onClick={() => setImg(!img)} /> */}
          {img && <ChattingBot img={img} setImg={setImg}/>}
      </Stack>
    </div>
  )
}
