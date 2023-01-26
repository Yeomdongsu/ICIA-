import { Link, useMatch, useMatches } from 'react-router-dom'
import styled from 'styled-components'
import Stack from '../common/Stack'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'
import EstimateBanner from '../estimate/EstimateBanner'
import Footer from '../footer/Footer'
import Header from '../header/Header'

/**
 * props.active가 있으면 (지금 메뉴가 활성화된 상태면) point 컬러를 사용 (theme) 아니면 black 컬러를 사용
 */
const StyledMenuItems = styled.li`
  width: 100%;
  color: ${(props) => (props.active ? props.theme.colors.point : props.theme.colors.black)};

  &:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
  }
`

const MenuWrapper = styled(Stack)`
  width: 200px;
  height: 100%;
  border-right: 1px solid #f2f2f2;
`

const MenuItems = (props) => {
   // 활성화된 메뉴를 표기해주는 역할, url을 비교해서 active를 줌
  const match = useMatch(props.to)

  return (
    <StyledMenuItems active={match !== null}>
      <Link to={props.to} style={{ color: 'inherit' }}>
        {props.children}
      </Link>
    </StyledMenuItems>
  )
}

const SubPage = (props) => {
  return (
    <div>
      <Header />
      <EstimateBanner />
      <Wrapper>
        <MenuWrapper division style={{ padding: '20px 0' }} gap={20}>
          {props.menus
            .filter((menu) => menu.visible !== false)
            .map((menu, index) => (
              <MenuItems
                key={index}
                active={true}
                to={`${props.rootPath}${menu.path}`}
              >
                {menu.name}
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
}

export default SubPage

/**
 * generateSubPage
 * @param {any} rootPath
 * @param {any} menus
 * @returns 서브페이지 형태를 가진 컴포넌트
 * rootPath 는 공통적으로 사용하는 path를 의미해
 */
export const generateSubPage = (rootPath, menus) => {
  return menus.map((menu, index) => ({
    path: `${rootPath}${menu.path}`,
    element: (
      <SubPage
        rootPath={rootPath}
        menus={menus}
        currentMenu={menu}
        key={index}
        children={menu.element}
      />
    ),
  }))
}
