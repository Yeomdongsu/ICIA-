import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MainCommu from '../../pages/MainCommu'
import Stack from '../common/Stack'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'
import EstimateBanner from '../estimate/EstimateBanner'
import Footer from '../footer/Footer'
import Header from '../header/Header'

/**
 * props.active가 있으면 (지금 메뉴가 활성화된 상태면) point 컬러를 사용 (theme) 아니면 black 컬러를 사용
 */
const MenuItems = styled.li`
  width: 100%;
  color: ${(props) => (props.active ? props.theme.colors.point : props.theme.colors.black)};

  &:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
  }
`

const MenuWrapper = styled(Stack)`
  width: 200px;
  height: 100%;
  margin-top: 30px;
  border-right: 1px solid #f2f2f2;
`

const SubPageB = (props) => (
  <div>
    <Header />
    <EstimateBanner text="community" />
    <Wrapper>
      <MenuWrapper division style={{ padding: '20px 0' }} gap={20}>
        {props.menus.map((menu, index) => (
          <MenuItems
            key={index}
            active={window.location.pathname === `${props.rootPath}${menu.path}`} // 활성화된 메뉴를 표기해주는 역할, url을 비교해서 active를 줌
          >
            <Link to={`${props.rootPath}${menu.path}`} style={{ color: 'inherit' }}>
              {menu.name}
            </Link>
          </MenuItems>
        ))}
      </MenuWrapper>
      <Stack style={{ flex: 1, padding: '25px 0 100px 40px' }}>
         <Typhography size="xl" font="medium">
          {props.currentMenu.name}
        </Typhography>
        {props.children}
      </Stack>
    </Wrapper>
    <Footer />
  </div>
)

export default SubPageB

/**
 * generateSubPage
 * @param {any} rootPath 
 * @param {any} menus 
 * @returns 서브페이지 형태를 가진 컴포넌트
 * rootPath 는 공통적으로 사용하는 path를 의미해
 */
export const generateSubPageBoard = (rootPath, menus) => {
  return menus.map((menu, index) => ({
    path: `${rootPath}${menu.path}`,
    element: (
      `${rootPath}${menu.path}` == "/community/maincommu" ? 
      <>
      <MainCommu />
      </> :
      <SubPageB
        rootPath={rootPath}
        menus={menus}
        currentMenu={menu}
        key={index}
        children={menu.element}
      />
    ),
  }))
}
