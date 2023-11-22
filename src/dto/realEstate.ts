import { IDTO } from "./idto";

export interface RealEstate extends IDTO {
  title: string;
  description?: string;
  rsType: string;
  location: string;
  address: string;
  floorArea: number;
  pricePerSquare: number;
  price?: number;
  priceOnRoom: number;
  isPopular: boolean;
  propertyTotal: number;
  capacity: number;
  apartmentMap: string;
  propertyImages: string;
  searchKeys: string;

//   rooms: Room[];
//   facilities: Facility[];
}
