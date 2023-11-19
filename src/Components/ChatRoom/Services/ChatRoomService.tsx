import { Message, Room, getRooms } from "Components/utils/datas";

export default class ChatRoomService {
  getMessages = (roomId: string): Message[] => {
    return Array.from({ length: 30 }, (_, item) => {
      const id = `message${item + 1}`;
      const isAgency = item % 2 === 0;
      const date = new Date().toLocaleString();
      const title = `Message Title ${item + 1}`;
      const text = `This is a longer message number ${item + 1} from ${roomId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`;
      const avatar = `https://th.bing.com/th/id/R.588e9f4570ef5ddee0ef2f0c3eb4d237?rik=VDy%2fh%2ffN3XJm6Q&amp;pid=ImgRaw&amp;r=0`;

      return { id, roomId, isAgency, date, title, text, avatar };
    }).filter((message) => message.roomId === roomId);
  };

  getRooms = (): Room[] => {
    return getRooms;
  };

  getRoomById = (roomId: string): Room | undefined => {
    return getRooms.find((room) => room.id === roomId);
  };

  getRoomId(
    RealEstatesId: number,
    RealEstatesTitle: string,
    RealEstatesLocation: string,
    CreateTIme: string
  ) {
    return (
      RealEstatesId.toString() +
      RealEstatesTitle +
      RealEstatesLocation +
      CreateTIme
    );
  }

  getRoomName(RealEstatesTitle: string, CreateTIme: string) {
    return RealEstatesTitle + CreateTIme;
  }
}
