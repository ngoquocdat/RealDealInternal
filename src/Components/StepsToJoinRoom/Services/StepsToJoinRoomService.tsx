import { IRealEstateProject, IPayment, 
         Counselors, Investors, RealEstates, TypeOfRealEstates, IRealEstates, 
         RealEstateProjects, defaultPayment, getRooms } from "Components/utils/datas";

export default class StepsToJoinRoomService 
{
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
                let newRoom = {...room};
                let timestamp = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                newRoom.RealEstateId = realEstate.id.toString();
                newRoom.id = item.realEstateId.toString() + realEstate.title + realEstate.location + timestamp;
                newRoom.room = realEstate.title + new Date().getHours().toString() + new Date().getMinutes().toString();

                return newRoom;
            })

            return item;
        });
    }
    getDefaultPaymentByRoomCreate = (realEstate: IRealEstates) : IPayment =>
    {   
        const timestamp = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        const payment = defaultPayment
        const newRoom = payment.room
        newRoom.RealEstateId = realEstate.id.toString();
        newRoom.id = realEstate.id.toString() + realEstate.title + realEstate.location + timestamp;
        newRoom.room = realEstate.title + new Date().getHours().toString() + new Date().getMinutes().toString();
        return payment
    }
    getDefaultPaymentByRoomJoin = (realEstateId: number, roomId: string) : IPayment =>
    {
        const payment = defaultPayment;
        const realEstateProject = this.getRealEstateProjects().find((project) => project.realEstateId === realEstateId);
    
        const room = realEstateProject?.rooms.find((room) => room.id === roomId);
        if (room) {
            payment.room = room;
        }
        return payment;
    }
}