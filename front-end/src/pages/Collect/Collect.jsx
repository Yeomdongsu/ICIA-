import { Link } from 'react-router-dom'
import FlexBox from '../../components/common/FlexBox'
import Typhography from '../../components/common/Typhography'
import Wrapper from '../../components/common/Wrapper'
import EstimateBanner from '../../components/estimate/EstimateBanner'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import honeymoon from '../../data/honeymoon'
import planner from '../../data/planner'
import sdm from '../../data/sdm'
import weddinghall from '../../data/weddinghall'

const collects = [
  {
    title: '허니문',
    data: honeymoon,
    link: '/collect/honeymoon',
    fullWidth: true
  },
  {
    title: '웨딩홀',
    data: weddinghall,
    link: '/collect/wedding-hall',
    fullWidth: true
  },
  {
    title: '플래너',
    data: planner,
    link: '/collect/planner',
  },
  {
    title: '스드메',
    link: '/collect/sdm',
    data: sdm,
  },
]

export default () => (
  <div>
    <Header />
    <EstimateBanner text="collect" />
    <Wrapper style={{ padding: '50px 0 70px' }}>
      <FlexBox style={{ width: '100%', flexWrap: 'wrap' }} justify="space-between" gap={50}>
        {collects.map(v => (
          <Link style={{ display: 'block', width: v.fullWidth ? '100%' : '47%' }} to={v.link}>
            <Typhography
              color="white"
              style={{ display: 'block', width: '100%', background: '#DB8383', padding: 10 }}
            >
              {v.title}
            </Typhography>
            <FlexBox style={{ width: '100%' }}>
            {v.data.slice(0, v.fullWidth ? 1 : 2).map(d => (
                <div
                  style={{
                    flex: 1,
                    height: 300,
                    backgroundImage: `url(${d.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                />
              ))}
            </FlexBox>
          </Link>
        ))}
      </FlexBox>
    </Wrapper>
    <Footer />
  </div>
)
