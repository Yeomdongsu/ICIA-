import Header from '../components/header/Header'
import MainBanner, { MainBannerWrapper } from '../components/main/MainBanner'
import Notice from '../components/main/Notice'
import Gallery from '../components/main/Gallery'
import Reviews from '../components/main/Reviews'
import Ranking from '../components/main/Ranking'
import News from '../components/main/News'
import ContactUs from '../components/main/ContactUs'
import Footer from '../components/footer/Footer'
import FlexBox from '../components/common/FlexBox'
import Wrapper from '../components/common/Wrapper'
import EventModalControll from '../components/eventpopup/EventModalControll'
import MainBannerImage from '../assets/images/main-banner2.jpg'
import MainBannerImage2 from '../assets/images/banner-hall.jpg'
import MainBannerImage3 from '../assets/images/banner-last.jpg'
import MainBannerImage4 from '../assets/images/banner-honeymoon.jpg'
// import EventPopup from '../components/main/EventPopup'

export default () => {
  return (
    <div style={{ background: '#fff' }}>
      <EventModalControll />
      {/* <EventPopup /> */}

      <MainBannerWrapper images={[MainBannerImage, MainBannerImage2, MainBannerImage3, MainBannerImage4]} duration={9000}>
        <Header white />
        <MainBanner text="community" />
      </MainBannerWrapper>
      <Notice />
      <Gallery />
      <Reviews />
      <Wrapper>
        <FlexBox gap={100} style={{ width: '100%' }}>
          <News style={{ flex: 1 }} />
          <Ranking style={{ width: 500 }} />
        </FlexBox>
      </Wrapper>
      <ContactUs style={{ marginTop: 40 }} />
      <Footer />
    </div>
  )
}