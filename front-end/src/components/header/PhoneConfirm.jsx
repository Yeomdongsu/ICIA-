import { useState } from "react";
import "./JoinModalBasic.scss";

    const PhoneConfirm = (props) => {
        const [reset, setReset] = useState(false);
        
        function onClickCertification (){
            props.setBb(true);
            /* 1. 가맹점 식별하기 */
            const { IMP } = window;
            IMP.init("imp10391932");    
    
            /* 2. 본인인증 데이터 정의하기 */
            const data = {
            merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
            company: 'WeddingDive',                    // 회사명 또는 URL
            carrier: '',                               // 통신사
            //   id: `${value}`,
            name: props.account.mname,                                  // 이름
            phone: props.p1+props.p2+props.p3,                        // 전화번호
            popup: true
            };
    
            /* 4. 본인인증 창 호출하기 */
            IMP.certification(data, callback);
        }
    
        /* 3. 콜백 함수 정의하기 */
        function callback(response) {
            const {
            success,
            merchant_uid,
            error_msg,
            } = response;
    
            if (success) {
            alert('본인인증 성공');
            setReset(true);
            props.setB(true);
            } else {
            alert(`본인인증 실패: ${error_msg}`);
            }
            props.setBb(false);
        }
        return <button style={{background:`${props.background}`, opacity:`${props.opacity}`}} className="phone-btn" onClick={onClickCertification} disabled={props.disabled} type="button">인증<br/>번호</button>
    }

  export default PhoneConfirm