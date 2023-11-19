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

const realEstateProjectTranslationMap = {
    id: 'ID',
    realEstateId: 'ID Bất động sản',
    counselor: 'Nhân viên tư vấn',
    numberOfRoom: 'Số phòng',
    rooms: 'Phòng',
    investor: 'Nhà đầu tư',
    scale: 'Quy mô',
    numberOfHouseroom: 'Tổng số căn',
    status: 'Trạng thái',
    type: 'Loại bất động sản',
  };
  
  export function translate(propertyName: keyof IRealEstateProject)
  {
      return realEstateProjectTranslationMap[propertyName];
  }