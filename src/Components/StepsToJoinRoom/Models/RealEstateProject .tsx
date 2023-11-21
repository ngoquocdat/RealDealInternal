export type IRealEstateProject = {
    id: number;
    realEstateId: number;
    counselor: string;
    numberOfRoom: number;
    rooms: string[];
    investor: string;
    scale: number;
    numberOfHouseroom: number;
    status: string;
    type: string[];
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