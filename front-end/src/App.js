import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Main from './pages/Main'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Event from './pages/Event'
import ScrollHandler from './components/common/ScrollHandler'
import MainCommu from './pages/MainCommu'
import { generateSubPage } from './components/layout/SubPage'
import Mypage from './pages/Member/Mypage'
import Likes from './pages/Member/Likes'
import Reservation from './pages/Member/Reservation'
import PageCorrection from './pages/Member/PageCorrection'
import CommuBoardNoti from './components/community/Board/CommuBoardNoti'
import CompInfo from './pages/CompInfo'
import Estimate from './pages/Estimate'
import EventDetail from './pages/Events/EventDetail'
import Honeymoon from './pages/Collect/Honeymoon'
import Planner from './pages/Collect/Planner'
import WeddingHall from './pages/Collect/WeddingHall'
import SDM from './pages/Collect/SDM'
import CommuBoardReview from './components/community/Board/CommuBoardReview'
import CommuBoardWr from './components/community/BoardEtc/CommuBoardWr'
import AdminMemberMag from './pages/Admin/AdminMemberMag'
import Collect from './pages/Collect/Collect'
import CollectDetail from './pages/Collect/CollectDetail'
import { generateSubPageBoard } from './components/layout/SubPageB'
// import CommuMain from './components/community/CommuMain'
//import CancelPayBSRequest from './components/estimate/CancelPayBSRequest'
import ServiceCenter from './pages/ServiceCenter'
import ServiceCenterWrite from './components/servicecenter/ServiceCenterWrite'
import AdminBrandMag from './pages/Admin/AdminBrandMag'
import AdminBrandWr from './pages/Admin/AdminBrandWr'
import CancelPayISRequest from './components/estimate/CancelPayISRequest'
import CancelPayBSRequest from './components/estimate/CancelPayBSRequest'
import ServiceCenterDetail from './components/servicecenter/ServiceCenterDetail'
import CommuBoardUp from './components/community/BoardEtc/CommnuBoardUp'
import CommuBoardReco from './components/community/Board/CommuBoardReco'
import CommuBoardWorry from './components/community/Board/CommuBoardWorry'
import CommuBoardShow from './components/community/Board/CommuBoardShow'
import CommuBoardDetail from './components/community/Board/CommuBoardDetail'
import WeddingNews from './pages/WeddingNews'
import WedNewsWrite from './components/weddingnews/WedNewsWrite'
import WedNewsDetail from './components/weddingnews/WedNewsDetail'
import AdminMemBoardMag from './pages/Admin/AdminMemBoardMag'
import AdminBrandBoardMag from './pages/Admin/AdminBrandBoardMag'
import AdminBrandBoardWr from './pages/Admin/AdminBrandBoardWr'
import AdminEventMag from './pages/Admin/AdminEventMag'
import AdminResMag from './pages/Admin/AdminResMag'
import AdminBbibMag from './pages/Admin/AdminBbibMag'
import AdminEventWr from './pages/Admin/AdminEventWr'

/**
 * Router - 링크 주소에 따른 컴포넌트를 불러오는 기능
 * / - 메인페이지는 Main 컴포넌트 노출
 *
 * generateSubPage - 함수는 서브 페이지 틀을 만들어서 같이 노출 시켜주는 함수
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/compInfo',
    element: <CompInfo />,
  },
  {
    path: '/event',
    element: <Event />,
  },
  {
    path: '/event/:id',
    element: <EventDetail />,
  },
  {
    path: '/mainCommu',
    element: <MainCommu />,
  },
  {
    path: '/estimate',
    element: <Estimate />,
  },
  {
    path: '/commuBoardNoti',
    element: <CommuBoardNoti />,
  },
  {
    path: '/commuBoardReco',
    element: <CommuBoardReco />,
  },
  {
    path: '/commuBoardReview',
    element: <CommuBoardReview />,
  },
  {
    path: '/commuBoardWorry',
    element: <CommuBoardWorry />,
  },
  {
    path: '/commuBoardShow',
    element: <CommuBoardShow />,
  },
  {
    path: '/commuBoardWr',
    element: <CommuBoardWr />,
  },
  {
    path: '/commuBoardDetail',
    element: <CommuBoardDetail />,
  },
  {
    path: '/commuBoardUp',
    element: <CommuBoardUp />,
  },
  {
    path: '/adminBrandWr',
    element: <AdminBrandWr />,
  },
  {
    path: '/adminBrandBoardWr',
    element: <AdminBrandBoardWr />,
  },
  {
    path: '/adminEventWr',
    element: <AdminEventWr />,
  },
  {
    name: '모아보기',
    path: '/collect',
    element: <Collect />,
  },
  {
    name: '고객센터',
    path: '/ServiceCenter',
    element: <ServiceCenter />,
  },
  {
    name: '고객센터',
    path: '/ServiceCenterWrite',
    element: <ServiceCenterWrite />,
  },
  {
    name: '게시글',
    path: '/community/commuBoardNoti/detail',
    element: <CommuBoardDetail />,
  },
  {
    path: '/CancelPayISRequest',
    element: <CancelPayISRequest />,
  },
  {
    path: '/ServiceCenterDetail',
    element: <ServiceCenterDetail />,
  },
  {
    path: '/WeddingNews',
    element: <WeddingNews />,
  },
  {
    path: '/WedNewsWrite',
    element: <WedNewsWrite />,
  },
  {
    path: '/WedNewsDetail',
    element: <WedNewsDetail />,
  },
  // 충돌난부분
  {
    path: '/CancelPayBSRequest',
    element: <CancelPayBSRequest />,
  },
  ...generateSubPage('/collect', [
    // member를 공통적으로 사용하고 그 안에 메뉴들을 넣을거에요!
    {
      name: '허니문',
      path: '/honeymoon',
      element: <Honeymoon />,
    },
    {
      name: '웨딩홀',
      path: '/wedding-hall',
      element: <WeddingHall />,
    },
    {
      name: '플레너',
      path: '/planner',
      element: <Planner />,
    },
    {
      name: '스드메',
      path: '/sdm',
      element: <SDM />,
    },
    {
      name: '상세보기',
      path: '/:category/:id',
      element: <CollectDetail />,
      visible: false,
      title: 'Its a Detail Page!',
    },
  ]),

  ...generateSubPage('/member', [
    // member를 공통적으로 사용하고 그 안에 메뉴들을 넣을거에요!
    {
      name: '내정보 보기',
      path: '/mypage',
      element: <Mypage />,
    },
    {
      name: '정보 수정',
      path: '/edit',
      element: <PageCorrection />,
    },
    {
      name: '찜 목록',
      path: '/like',
      element: <Likes />,
    },
    {
      name: '예약 확인',
      path: '/reservation',
      element: <Reservation />,
    },
  ]),

  ...generateSubPageBoard('/community', [
    {
      name: '메인',
      path: '/maincommu',
      element: <MainCommu />,
    },
    {
      name: '공지사항',
      path: '/commuBoardNoti',
      element: <CommuBoardNoti />,
    },
    {
      name: '추천할래요',
      path: '/commuBoardReco',
      element: <CommuBoardReco />,
    },
    {
      name: '고민있어요',
      path: '/commuBoardWorry',
      element: <CommuBoardWorry />,
    },
    {
      name: '자랑할래요',
      path: '/commuBoardShow',
      element: <CommuBoardShow />,
    },
    {
      name: '업체후기톡톡',
      path: '/commuBoardReview',
      element: <CommuBoardReview />,
    },
  ]),

  ...generateSubPage('/admin', [
    // admin의 서브페이지 생성
    {
      name: '회원 정보 관리 ',
      path: '/memberMag',
      element: <AdminMemberMag />,
    },
    {
      name: '업체 관리',
      path: '/brandMag',
      element: <AdminBrandMag />,
    },
    {
      name: '회원 게시글 관리',
      path: '/memBoardMag',
      element: <AdminMemBoardMag />,
    },
    {
      name: '업체 게시글 관리',
      path: '/brandBoardMag',
      element: <AdminBrandBoardMag />,
    },
    {
      name: '이벤트 관리',
      path: '/eventMag',
      element: <AdminEventMag />,
    },
    {
      name: '예약 관리',
      path: '/resMag',
      element: <AdminResMag />,
    },
    {
      name: '신고글 관리',
      path: '/bbibMag',
      element: <AdminBbibMag />,
    },
  ]),
])

function App() {
  useEffect(() => {
    AOS.init()
  })

  return (
    <div>
      <RouterProvider router={router} />
      <ScrollHandler />
    </div>
  )
}

export default App
