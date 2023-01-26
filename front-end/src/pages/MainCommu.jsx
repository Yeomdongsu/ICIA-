import CommuMain from "../components/community/CommuMain";
import EstimateBanner from "../components/estimate/EstimateBanner";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default ()=> {
    return(
        <>
            <Header />
            <EstimateBanner text='community' />
            <CommuMain />
            <Footer />

        </>
    );
}
