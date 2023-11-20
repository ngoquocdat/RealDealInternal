import { IPayment, defaultPayment } from "Components/utils/datas";

const paymentTranslationMap = {
    id: 'ID',
    user: 'Tên khách hàng',
    memberCounter: 'Số lượng thành viên tối đa',
    room: 'Mã số phòng tư vấn',
    roomCreatePrice: 'Số tiền phí tạo phòng tư vấn',
    createDate: 'Ngày bắt đầu',
    expiredDate: 'Ngày kết thúc',
  };

export function PaymentTranslate(propertyName: keyof IPayment)
{
    return paymentTranslationMap[propertyName];
}

export default function MapPaymentToInfo(payment: IPayment)  {
    return [
      {
        key: "user",
        label: PaymentTranslate('user' as keyof IPayment) + ":",
        value: payment.user.userName,
        type: "text"
      },
      {   
        key: "memberCounter",
        label: PaymentTranslate('memberCounter' as keyof IPayment) + ":",
        value: payment.memberCounter.toString(),
        type: "text"
      },
      {
        key: "room",
        label: PaymentTranslate('room' as keyof IPayment) + ":",
        value: payment.room.room,
        type: "text"
      },
      {
        key: "roomCreatePrice",
        label: PaymentTranslate('roomCreatePrice' as keyof IPayment) + ":",
        value: payment.roomCreatePrice,
        type: "currency"
      },
      {
        key: "createDate",
        label: PaymentTranslate('createDate' as keyof IPayment) + ":",
        value: payment.createDate,
        type: "text"
      },
      {
        key: "expiredDate",
        label: PaymentTranslate('expiredDate' as keyof IPayment) + ":",
        value: payment.expiredDate,
        type: "text"
      }
    ];
  }