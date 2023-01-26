import { Link } from "react-router-dom"
import EstimateBanner from "../components/estimate/EstimateBanner"
import EstimateResult from "../components/estimate/EstimateResult"
import EstimateTable from "../components/estimate/EstimateTable"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"

export default ()=>{
    return (
        <>
        <Header />
        <EstimateBanner text="Estimate"/>
        <EstimateTable />
        <Footer />
        </>
    )
}