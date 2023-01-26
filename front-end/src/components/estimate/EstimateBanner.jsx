import styled, { keyframes } from 'styled-components'
import FlexBox from '../common/FlexBox'
import EstiBannerImage from '../../assets/images/banner-commu.jpg'
import Logo from '../header/Logo'


const mainBannerKeyframe = keyframes`
  0% {
    background-size: 100vw;
  }

  100% {
    background-size: 100vw;
  }
`

export const MainBannerWrapper = styled.section`
  width: 100vw;
  height: 300px;
  background-image: url(${EstiBannerImage});
  background-size: 100vw;
  background-position: center center;
  margin-top: 15px;

  animation: ${mainBannerKeyframe} 20s;
`

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

export default ( props ) => (
  <FlexBox direction="column" align="center" style={{ height: '100%', paddingTop: '3%' }}>
    <MainBannerWrapper>
    <MainBannerTitle></MainBannerTitle>
    <MainBannerDescription>
      <div style={{marginLeft:"-20%"}}>
      <div style={{textAlign:"center", color:"rgb(171,0, 138)", fontSize:"60px", marginTop:"2.5%", fontFamily:"Georgia, 'Times New Roman', Times, serif"}}>Wedding Story</div>
      <div style={{textAlign:"center", color:"rgb(133,132, 130)", fontSize:"20px", marginTop:"0.5%"}}>Wedding Dive {props.text}</div>
      <div style={{textAlign:"center", color:"black", fontSize:"30px", marginTop:"1%"}}>웨딩다이브와 함께 나누는 웨딩 스토리</div>
      </div>
    </MainBannerDescription>
    </MainBannerWrapper>
  </FlexBox>
)