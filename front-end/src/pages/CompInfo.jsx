import CompMap from '../components/company/CompMap'
import EstimateBanner from '../components/estimate/EstimateBanner'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import Section from '../components/main/Section'

const CompInfo = () => {
  return (
    <div>
      <Header />
      <EstimateBanner />
      <Section>
        <h1>회사소개</h1>
        <CompMap />
      </Section>
      <Footer />
    </div>
  )
}

export default CompInfo
