import axios from "axios";
import Button from "../form/Button";

const data = {
    imp_uid: "sex",
    merchant_uid: "{결제건의 주문번호}", // 주문번호
    cancel_request_amount: 2000, // 환불금액
    reason: "테스트 결제 환불", // 환불사유
    refund_holder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
    refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
    refund_account: "56211105948400" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
}

const CancelPayBSRequest = () => {
    axios.post("/refund", 
            null,
            {params:{imp_uid:"sex"}}, data)

    return (
        <span onClick={CancelPayBSRequest}><Button>환불하기</Button></span>
    );
}

export default CancelPayBSRequest;