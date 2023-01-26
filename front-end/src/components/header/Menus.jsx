import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Stack from '../common/Stack'
import FlexBox from '../common/FlexBox'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'
import { useState } from 'react'
import { assertDeclareModuleExports } from '@babel/types'
import "./MenusStyle.scss";

const MenuItem = styled.p`
  transition: opacity 0.3s;
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`

const SubMenuItem = styled(MenuItem)`
  text-align: center;
`

const SubMenuWrapper = styled.div`
  opacity: 0.6;
  position: absolute;
  z-index: 1;
  top: 101px;
  left: 0;
  background: #fff;
  padding: 0 10px;
  width: 100%;
  height: 0;
  border-radius: 0 0 3px 3px;
  color: #000;
  overflow: hidden;
  ${(props) =>
    props.active &&
    `
    transition: padding 0.5s;
      padding-top: 25px;
      padding-bottom: 30px;
      height: fit-content;
    `}
`

const Menus =(props) => {
  const navigate = useNavigate()
  const menus = [
    { title: '소개', url: '/compInfo' },
    {
      title: '모아보기',
      url: '/collect',
      children: [
        { title: '허니문', url: '/collect/honeymoon' },
        { title: '웨딩홀', url: '/collect/wedding-hall' },
        { title: '플래너', url: '/collect/planner' },
        { title: '스드메', url: '/collect/sdm'},
      ],
    },
    { title: '상세견적', url: '/estimate' },
    { title: '소식보기', url: '/event', children: [{ title: '이벤트', url: '/event' }, { title : '웨딩뉴스', url: '/WeddingNews' }] },
    {
      title: '커뮤니티',
      url: '/mainCommu',
      children: [
        { title: '공지사항', url: '/community/commuBoardNoti' },
        { title: '추천할래요', url: '/community/commuBoardReco' },
        { title: '고민있어요', url: '/community/commuBoardWorry' },
        { title: '자랑할래요', url: '/community/commuBoardShow' },
        { title: '업체후기톡톡', url: '/community/commuBoardReview' },
      ],
    },
    {
      title: '고객센터',
      url: '/ServiceCenter',
      // children: [
      //   { title: '자주하는 질문', url: '/' },
      //   { title: '1:1 상담하기', url: '/ServiceCenter' },
      // ],
    },
  ]

  const onClickHandler = (data) => () => {
    navigate(data.url)
  }

  return (
    <nav>
      <FlexBox justify="center" align="center" style={{ gap: 50, margin: '0 auto' }}>
        {menus.map((menu, index) => (
          <div>
            <MenuItem
              key={index}
              onClick={onClickHandler(menu)}
              onMouseEnter={() => props.openSubmenu(index)}
            >
              {menu.title}
            </MenuItem>
            {menu.children && (
              <SubMenuWrapper active={props.activeSubmenu === index}>
                <Wrapper>
                <FlexBox id={"s"+index} style={{ gap: 40 , fontWeight:"bolder"}}>
                  {menu.children.map((content, index) => (
                    <SubMenuItem key={index} onClick={onClickHandler(content)}>
                      <Typhography size="sm">
                        {content.title}
                      </Typhography>
                    </SubMenuItem>
                  ))}
                </FlexBox>
                </Wrapper>
              </SubMenuWrapper>
            )}
          </div>
        ))}
      </FlexBox>
    </nav>
  )
}
export default Menus;
