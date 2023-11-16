import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Room } from 'Components/utils/datas';

let connection: HubConnection | null = null;

export default class RealTimeSignalRService
{
    setupSignalRConnection(room: Room) {
        // connection = new HubConnectionBuilder()
        //     .withUrl(`http://your-api-url/chatHub?roomId=${roomId}`)
        //     .withAutomaticReconnect()
        //     .build();

        connection = new HubConnectionBuilder()
            .withUrl(`https://localhost:44339/`)
            .withAutomaticReconnect()
            .build();

        if (connection) {
            connection.start().then(() => {
                console.log('Connected to SignalR hub.');
            });
        }

        connection.on('ReceiveMessage', (user, message) => {
            console.log(user, message);
        });
    }

    closeConnection() {
        if (connection) {
            connection.stop().then(() => {
                console.log('Connection to SignalR hub stopped.');
            });
        }
    }
    
    onMessageReceived(callback: any) {
        if (connection) {
            connection.on('ReceiveMessage', callback);
        }
    }
    
    onSendMessage(message: any) {
        if (connection) {
            connection.invoke('SendMessage', message).catch((err) => {
                return console.error(err.toString());
            });
        }
    }
}
