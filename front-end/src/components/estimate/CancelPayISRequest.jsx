import axios from "axios";
import { useParams } from "react-router";


const imp_uid= "sex";
const tokenData={
  "imp_uid":imp_uid,
  // merchant_uid: "mid_1671503505895", // 주문번호
  // cancel_request_amount: 100, // 환불금액
  // reason: "테스트 결제 환불", // 환불사유
  // refund_holder: "공정배", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
  // refund_bank: "11", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
  // refund_account: "3560462085933" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
}
const getToken = () => {
  axios.post("/TokenRequest" ,  JSON.stringify(imp_uid), {params:{imp_uid:imp_uid}}
  ).then((res) => console.log(res));
}

// , {headers: {
//   "Content-Type": "application/json"}
// }


const formData={
  merchant_uid: "mid_1671503505895", // 주문번호
  cancel_request_amount: 100, // 환불금액
  reason: "테스트 결제 환불", // 환불사유
  refund_holder: "공정배", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
  refund_bank: "11", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
  refund_account: "3560462085933" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
}

const CancelPayISRequest = () => {
      axios.post("/CancelPayISRequest", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json"}, formData
    }
      ).then((res) => console.log(res));

      return (
        <>  
      <button onClick={() => CancelPayISRequest()}>환불하기</button>
      <button onClick={() => getToken()}>토큰받기</button>
      </>
      )
    }

    export default CancelPayISRequest;