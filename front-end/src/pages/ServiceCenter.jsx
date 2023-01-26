import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ServiceCenterInquiry from "../components/servicecenter/ServiceCenterInquiry";
import EstimateBanner from "../components/estimate/EstimateBanner"

export default () => {
    return (
        <div>
        <Header />
        <EstimateBanner text="Inquiry"/>
        <ServiceCenterInquiry />
        <Footer />
        </div>
    );
}

 