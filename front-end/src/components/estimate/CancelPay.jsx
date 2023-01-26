// 허위로 결제를 만들거나 유저가 취소를 요청했을경우의 아임포트서비스 취소
async function CancelPay({ impUid, reason = '', currentUser }) {

// 1. 아임포트 토큰을 가져온다.
const token = await this.iamportService.createIamPortToken();

// 2. 결제정보를 찾는다
const iamPortResult = await this.iamportService.searchIamPort({ impUid });
if (iamPortResult.data.response.status === 'canclled') {
//   throw new UnprocessableEntityException('이미 취소가된 결제입니다..');
}

const currentOrder = await this.orderRepository.findOne({
  relations: [
    'userSubscribe',
    'userSubscribe.user',
    'userSubscribe.subscribe',
  ],
  where: { impUid: impUid },
});

const checkUser = await this.userRepository.findOne({
  where: { id: currentOrder.userSubscribe.user.id },
});

// 현재유저의 아이디와 현재주문정보의  유저 아이디를 체크한다.
if (currentUser.id != checkUser.id) {
//   throw new UnprocessableEntityException(
    // '취소하려는 결제의 유저정보와 현재 유저가 맞지 않습니다.',
//   );
}

const merchant_uid = currentOrder.merchantUid;
const checksum = currentOrder.userSubscribe.subscribe.price;

const cancelResult = await this.iamportService.cancelIamPort({
  reason,
  impUid,
  merchant_uid,
  checksum,
});
return cancelResult.data.message;
}

export default CancelPay;