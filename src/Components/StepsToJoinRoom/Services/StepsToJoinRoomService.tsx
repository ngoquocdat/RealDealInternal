import { IRealEstateProject } from "../Models/RealEstateProject ";
import { Counselors, Investors, RealEstateProjects, RealEstates, TypeOfRealEstates, getRooms } from "Components/utils/datas";

export default class StepsToJoinRoomService {
    getRealEstateProjects = () : IRealEstateProject[] =>
    {   
        const filteredTypes =TypeOfRealEstates.filter(type => type.id >= 1 && type.id <= 5);
        const index1 = Math.floor(Math.random() * filteredTypes.length);
        let index2: number;
        do {
            index2 = Math.floor(Math.random() * filteredTypes.length);
        } while(index2 === index1); 

        const ChatRooms = getRooms

        return RealEstateProjects.map((item) =>
        {
            const realEstate = RealEstates[item.id - 1]
            item.realEstateId = item.id;
            item.counselor = Counselors[item.id -1];
            item.investor = Investors[item.id - 1];
            item.type = 
            [
                filteredTypes[index1], filteredTypes[index2]
            ] 
            item.rooms = ChatRooms.map((room) => 
            {
                room.RealEstateId = realEstate.id.toString()
                room.id = item.realEstateId.toString() + realEstate.title + realEstate.location + new Date().toLocaleString()
                room.room = realEstate.title + new Date().getHours().toString() + new Date().getMinutes().toString()
                return room
            })

            return item;
        });
    }
}