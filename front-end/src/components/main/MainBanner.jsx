import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import FlexBox from '../common/FlexBox'
import MainEstimateBar from '../estimate/MainEstimateBar'

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`

export const MainBannerSlideItem = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: ${props => `url(${props.image})`};

  ${props => props.active ? css`
    animation: ${slideIn} 5s;
    transform: translateX(0);
  ` : css`
    animation: ${slideOut} 5s;
    transform: translateX(-100%);
  `}
`

export const MainBannerWrapper = (props) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setActive((active + 1) % props.images.length)
    }, props.duration)
  }, [active])

  return (
    <section style={{ width: '100%', height: 885, position: 'relative', overflow: 'hidden' }}>
      {props.images.map((v, i) => <MainBannerSlideItem image={v} active={active === i} />)}
      {props.children}
    </section>
  )
}

const MainBannerTitle = styled.p`
  font-size: 90px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.white};
  text-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`

const MainBannerDescription = styled.p`
  font-size: 36px;
  font-family: ${(props) => props.theme.fonts.light};
  color: ${(props) => props.theme.colors.white};
  text-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
  margin-bottom: 130px;
`

export default () => (
  <FlexBox direction="column" align="center" style={{ height: '100%', paddingTop: '15%', position: 'relative', zIndex: 0.5 }}>
    <MainBannerTitle>최고의 순간을, 최고의 파트너와 함께</MainBannerTitle>
    <MainBannerDescription>
      당신의 옆에 있는 보물, 빛나는 무대와 함께 해야 더욱 빛납니다
    </MainBannerDescription>
    <MainEstimateBar />
  </FlexBox>
)