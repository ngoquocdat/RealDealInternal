import { defaultLogin } from "Components/utils/datas";

export const roomInfo = [
    {
      label: "Tên dự án", //
      value: "Bất động sản dự án thành phố Thủ đức A",
      type: "text",
    },
    {
      label: "Nhân viên tư vấn",//
      value: "Nhân viên tư vấn N.H.A",
      type: "text",
    },
    {
      label: "Số lượng thành viên",//
      value: "10",
      type: "editText",
    },
    {
        label: "",//
        value: "( Số lượng thành viên tương ứng với số lượng bất động sản được chọn )",
        type: "text"
    },
    {
      label: "Địa chỉ bất động sản ",//
      value: "Số 218 Võ Văn Ngân, P. Bình Thọ, Q. Thủ Đức",
      type: "text",
    },
    {
      label: "Chủ đầu tư",//
      value: "Gia Khang",
      type: "text",
    },
    {
      label: "Quy mô",//
      value: "12.652 m2, 729 căn",
      type: "text",
    },
    {
      label: "Giá tham khảo",//
      value: "40 triệu/ m2",
      type: "text",
    },
    {
      label: "Diện tích căn hộ",//
      value: "50 m2",
      type: "text",
    },
    {
      label: "Tình trạng",//
      value: "Đang mở bán",
      type: "text",
    },
    {
      label: "Loại bất động sản",
      value: ["chung cư cao cấp", "căn hộ"],
      type: "chip",
    },
  ];

export const paymentInfo = [
    {
        label: 'Tên khách hàng:',
        value: defaultLogin.userName,
        position: "left",
        type: "text"
    },
    {   
        key: "memberCounter",
        label: 'Số lượng thành viên tối đa:',
        value: '10',
        position: "left",
        type: "text"
    },
    {
        label: 'Ngày bắt đầu:',
        value: '22/8/2023',
        position: "left",
        type: "text"
    },
    {
        label: 'Mã số phòng tư vấn: ',
        value: 'TDA_ConsultantNHA_2023',
        position: "right",
        type: "text"
    },
    {
        label: 'Số tiền phí tạo phòng tư vấn:',
        value: 5000000,
        position: "right",
        type: "currency"
    },
    {
        label: 'Ngày kết thúc:',
        value: "29/8/2023",
        position: "right",
        type: "text"
    }
]