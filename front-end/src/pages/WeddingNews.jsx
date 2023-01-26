import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ServiceCenterInquiry from "../components/servicecenter/ServiceCenterInquiry";
import EstimateBanner from "../components/estimate/EstimateBanner"
import WedNews from "../components/weddingnews/WedNews";

export default () => {
    return (
        <div>
        <Header />
        <EstimateBanner text="Inquiry"/>
        <WedNews />
        <Footer />
        </div>
    );
}

 