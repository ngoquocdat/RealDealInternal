import { ICounselor, IInvestor, Room, ITypeOfRealEstate } from "Components/utils/datas";

export type IRealEstateProject = {
    id: number;
    realEstateId: number;
    counselor: ICounselor;
    numberOfRoom: number;
    rooms: Room[];
    investor: IInvestor;
    scale: number;
    numberOfHouseroom: number;
    status: string;
    type: ITypeOfRealEstate[];
}

export interface IRealEstates 
{
    id: number,
    title: string,
    image: string,
    rsType: string,
    location: string,
    address: string,
    description: string,
    floorArea: number,
    facilities: {
      bathroom: number,
      bedroom: number,
      others: string[],
    },
    pricePerSquare: number,
    price?: number,
    priceOnRoom: number;
    isPopular: boolean,
    propertyTotal: number,
    capacity: number,
    apartmentMap: string,
    propertyImages: string[],
    searchKey: string[]
}

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
  
  export function translate(propertyName: keyof IRealEstateProject | keyof IRealEstates)
  {
      return realEstateProjectTranslationMap[propertyName];
  }