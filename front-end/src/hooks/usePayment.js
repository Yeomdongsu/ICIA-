import { useEffect } from 'react'

const paymentSecretKey = 'imp18221811'

export default () => {
  useEffect(() => {
    const jquery = document.createElement('script')
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js'
    const iamport = document.createElement('script')
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js'
    document.head.appendChild(jquery)
    document.head.appendChild(iamport)
    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [])

  const callback = (response) => {
    console.log(response)
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = response
    if (success) {
      alert('결제 성공')
    } else {
      alert(`결제 실패 : ${error_msg}`)
    }
  }

  const doPayment = (name) => {
    // imp51345423
    const { IMP } = window
    IMP.init(paymentSecretKey) // 결제 데이터 정의
    const data = {
      pg: 'html5_inicis.INIpayTest', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
      name, // 주문명 (필수항목) / name: name과 동일
      amount: '100', // 금액 (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: '공정배', // 구매자 이름
      buyer_tel: '010-4063-1111', // 구매자 전화번호 (필수항목)
      buyer_email: 'asdasasd', // 구매자 이메일
      buyer_addr: '주소',
      buyer_postalcode: '우편번호',
    }
    IMP.request_pay(data, callback) //data에는 결제를 위한 정보들을 담은 객체를 전달해야 합니다. 예를 들어, buyer_name(주문자명), amoun(결제 금액), pg(사용할 PG사), pay_method(결제수단) 등이 존재합니다.
  }

  return doPayment
}
