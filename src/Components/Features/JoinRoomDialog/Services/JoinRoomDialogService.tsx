import { JoinRoomDialog, joinRoomDialogs } from "Components/utils/datas";

export default class JoinRoomDialogService {
    getDialog = (): JoinRoomDialog[] => {
      return joinRoomDialogs
    };
}