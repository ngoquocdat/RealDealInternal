import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ChatRoomService from "./Services/ChatRoomService"
import ChatRoomList from "./Views/ChatRoomList";
import ChatRoomListTopBar from "./Views/ChatRoomListTopBar"
import ChatViewTopBar from "./Views/ChatViewTopBar";
import ChatView from "./Views/ChatView";
import { Message, RealEstates, Room } from "Components/utils/datas";
import RealTimeSignalRService from "./Services/RealTimeSignalRService";

export default function ChatRoomContainer() 
{
  const chatRoomService = new ChatRoomService();
  const signalRService = new RealTimeSignalRService();
  const [rooms] = useState(chatRoomService.getRooms());
  const realEstates = RealEstates
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [randomRealEstate] = useState(() => realEstates[Math.floor(Math.random() * realEstates.length)]);
  const [roomConfigurationed, setRoomConfigurationed] = useState<Room[]>([]);
  
  const handleRoomClick = (roomId: string) => {
    if (roomId !== selectedRoomId) {
      setSelectedRoomId(selectedRoomId);
      const room = roomConfigurationed.find((room) => room.id === roomId)
      setSelectedRoom(room)
      setMessages(chatRoomService.getMessages(roomId));
    }
  };
  
  useEffect(() => {
    if (selectedRoom) {
      signalRService.setupSignalRConnection(selectedRoom);
      signalRService.onMessageReceived((message: Message) => {
        console.log('Received message:', message);
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
    return () => {
      signalRService.closeConnection();
    };
  }, [selectedRoom]);

  useEffect(() => {
    setRoomConfigurationed(rooms.map((room, index) => {
      return {
        ...room,
        RealEstateId: randomRealEstate.id.toString(),
        id: chatRoomService.getRoomId(randomRealEstate.id, 
                                      randomRealEstate.title, 
                                      randomRealEstate.location, 
                                      new Date().toLocaleString()) + index,
        room: chatRoomService.getRoomName(randomRealEstate.title, 
                                          `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`)
      };
    }));
  }, []);

  return (
    <Box className="chat-room-container"
        sx={{
            width: "100%",
            height: "1000px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "4fr 12fr",
            gridGap: "0px",
        }}>
      <Box className="list-rooms"
          sx={{
              gridColumn: "1/2",
              backgroundColor: "#fff",
              border: "solid 1px #d9d9d9",
          }}>
          <ChatRoomListTopBar />
          <ChatRoomList rooms={roomConfigurationed} onRoomClick={handleRoomClick} />
      </Box>

      <Box className="chat-zone"
          sx={{ 
              gridColumn: "2/3",
              backgroundColor: "#fff",
              border: "solid 1px #d9d9d9",
          }}>
          <ChatViewTopBar room={selectedRoom}/>
          <Routes>
            {roomConfigurationed.map((room) => (
              <Route key={room.id} 
                path={`/chat/room/${room.id}`} 
                element={
                  <ChatView key={room.id} 
                    roomId={room.id} 
                    roomMessages={messages}/>
                }/>
            ))}
        </Routes>
      </Box>
    </Box>
  );
}