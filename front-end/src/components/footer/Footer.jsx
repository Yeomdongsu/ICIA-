import styled from 'styled-components'
import FlexBox from '../common/FlexBox'
import Stack from '../common/Stack'
import Typhography from '../common/Typhography'
import Logo from '../header/Logo'

const FooterWrapper = styled.footer`
  background: #fff;
  padding: 30px 0;
`

const Copyright = () => {
  return (
    <Typhography size="sm" font="medium">
      © all rights reserved Wedding Dive
    </Typhography>
  )
}

const FooterInfo = (props) => {
  return (
    <li>
      <Typhography size="sm" font="bold" color="black10" style={{ marginRight: 5 }}>
        {props.label}
      </Typhography>
      <Typhography size="sm" color="black10">
        {props.children}
      </Typhography>
    </li>
  )
}

const FooterInfos = styled.ul`
  width: 100%;
  display: flex;
  margin: 30px 0 10px;
  border-top: 1px solid #f3f3f3;
  padding-top: 30px;
  justify-content: center;

  > :not(:last-child)::after {
    content: '';
    display: inline-block;
    vertical-align: top;
    width: 1px;
    height: 80%;
    margin: 0 10px;
    // background: #f3f3f3;
  }
`

export default (props) => {
  return (
    <FooterWrapper {...props}>
      <Stack align="center" style={{ gap: 0 }}>
        <FooterInfos>
        <Logo style={{marginRight:"100px"}}>Wedding Dive</Logo>
          <FooterInfo label="사업자번호">241-26-14235</FooterInfo>
          <FooterInfo label="주소">인천광역시 미추홀구 학익동 663-1 태승빌딩 5층</FooterInfo>
          <FooterInfo label="연락처">0507-1491-3360</FooterInfo>
          {/* <FooterInfo label="팩스">032-4520-113</FooterInfo> */}
        </FooterInfos>
        <Copyright />
      </Stack>
    </FooterWrapper>
  )
}
