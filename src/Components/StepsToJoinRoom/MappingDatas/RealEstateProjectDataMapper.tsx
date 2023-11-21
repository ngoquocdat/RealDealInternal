import { IRealEstateProject, IRealEstates, formatter } from "Components/utils/datas";
import StepsToJoinRoomService from "../Services/StepsToJoinRoomService";

const realEstateProjectTranslationMap = {
    id: 'ID',
    realEstateId: 'ID Bất động sản',
    counselor: 'Nhân viên tư vấn',
    numberOfRoom: 'Số lượng thành viên',
    rooms: 'Phòng',
    investor: 'Nhà đầu tư',
    scale: 'Quy mô',
    numberOfHouseroom: 'Tổng số căn',
    status: 'Trạng thái',
    type: 'Loại bất động sản',
    title: 'Tên dự án',
    image: 'Hình ảnh',
    rsType: 'Loại RS',
    location: 'Vị trí',
    address: 'Địa chỉ',
    description: 'Mô tả',
    floorArea: 'Diện tích Căn hộ',
    facilities: 'Cơ sở vật chất',
    pricePerSquare: 'Giá tham khảo',
    price: 'Giá',
    priceOnRoom: 'Giá mỗi phòng',
    isPopular: 'Phổ biến',
    propertyTotal: 'Tổng số tài sản',
    capacity: 'Sức chứa',
    apartmentMap: 'Bản đồ căn hộ',
    propertyImages: 'Hình ảnh tài sản',
    searchKey: 'Từ khóa tìm kiếm'
  };

  export function RealEstateTranslate(propertyName: keyof IRealEstateProject | keyof IRealEstates)
  {
      return realEstateProjectTranslationMap[propertyName];
  }

  export default function MapRealEstateToInfo(realEstate: IRealEstates)  
  {
    const stepsToJoinRoomService = new StepsToJoinRoomService();
    const realEstateProject = stepsToJoinRoomService.getRealEstateProjects()[realEstate.id -1];
    return [
        {
            label: RealEstateTranslate('title' as keyof IRealEstates),
            value: realEstate.title,
            type: "text",
        },
        {
            label: RealEstateTranslate('counselor' as keyof IRealEstateProject),
            value: realEstateProject.counselor.name,
            type: "text",
        },
        {
            label: RealEstateTranslate('numberOfRoom' as keyof IRealEstateProject),
            value: realEstateProject.numberOfRoom,
            type: "editText",
        },
        {
            label: "",
            value: "( Số lượng thành viên tương ứng với số lượng bất động sản được chọn )",
            type: "text"
        },
        {
            label: RealEstateTranslate('location' as keyof IRealEstates),
            value: realEstate.location,
            type: "text",
        },
        {
            label: RealEstateTranslate('investor' as keyof IRealEstateProject),
            value: realEstateProject.investor.name,
            type: "text",
        },
        {
            label: RealEstateTranslate('scale' as keyof IRealEstateProject),
            value: realEstateProject.scale + " m2, " + realEstateProject.numberOfHouseroom + " căn",
            type: "text",
        },
        {
            label: RealEstateTranslate('pricePerSquare' as keyof IRealEstates),
            value: formatter.format(realEstate.pricePerSquare) + " VND / m2",
            type: "text",
        },
        {
            label: RealEstateTranslate('floorArea' as keyof IRealEstates),
            value: realEstate.floorArea + " m2",
            type: "text",
        },
        {
            label: RealEstateTranslate('status' as keyof IRealEstateProject),
            value: realEstateProject.status,
            type: "text",
        },
        {
            label: RealEstateTranslate('type' as keyof IRealEstateProject),
            value: [] = realEstateProject.type,
            type: "chip",
        },        
        {
            label: RealEstateTranslate('rooms' as keyof IRealEstateProject),
            value: [] = realEstateProject.rooms.map((room) => room.room),
            type: "chip",
        },
      ];
  }