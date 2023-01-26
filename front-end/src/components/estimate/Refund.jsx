import axios from "axios";
import Button from "../form/Button";


const Refund = ( imp_uid ) => {
    const rClick=()=>{
        // axios.post(("/TokenRequest", null, {params:{imp_uid:imp_uid}})  //환불전에 토큰받고 환불로이어짐
        // .then((res)=>{
        //     console.log(res.data);
        // }).catch((err)=>{console.log(err)}))
    }

    return(
        <button>예약취소</button>
    )
}

export default Refund;