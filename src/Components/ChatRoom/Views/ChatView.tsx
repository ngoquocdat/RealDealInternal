import React, { FormEvent, useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Message, chatAvatar } from 'Components/utils/datas';


interface ChatRoomListProps {
    roomId: string;
    roomMessages: Message[];
}

export default function ChatView({ roomId, roomMessages }: ChatRoomListProps) 
{
    const [messages, setMessages] = useState(roomMessages as Message[]);
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [isAgency, setAgency] = useState(true);
    const [avatar, setAvatar] = useState('');

    const onSendButtonClicked = (event: FormEvent) =>
    {
        handleSend(event)
    }

    const onEnterKeyPressed = (event: React.KeyboardEvent) =>
    {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend(event);
          }
    }

    const handleSend = (event: React.FormEvent) => 
    {
        event.preventDefault();

        const newMessage = {
            id: roomMessages.length.toString(),
            roomId: roomId,
            isAgency: isAgency,
            title: title,
            text: input,
            date: new Date().toLocaleString(),
            avatar: avatar
        };
        setTitle("")
        setAgency(true);
        setAvatar(chatAvatar);
        setMessages([...messages, newMessage]);
        setInput("");
    };

    return (
        <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                justifyContent: "space-between",
            }}>
            <Box sx={{
                        display: "flex",
                        flexDirection: "column-reverse", 
                        overflow: "auto",
                        flexGrow: 1,
                        height: "100%",
                    }}>
                <List sx={{ 
                            display: "grid", 
                            gridAutoFlow: "row dense", 
                            justifyContent: "end" 
                        }}>
                    {messages.slice(0).map((message, index) => (
                    <ListItem key={index} 
                            sx={{ 
                                display: "flex", 
                                flexDirection: message.isAgency === true ? "row-reverse" : "row", 
                                textAlign: message.isAgency === true ? "right" : "left",
                            }}>
                        <ListItemAvatar>
                            <Avatar alt="User Avatar" 
                                    src={message.avatar} 
                                    sx={{ margin: message.isAgency === true ? "10px 0px 10px 10px" :  "10px 10px 10px 0px"}}  />
                        </ListItemAvatar>
                        <Box sx=
                            {{ 
                                maxWidth: "50%",
                                minWidth: "min-content",
                                margin: "0px", 
                                border: "solid 1px #d9d9d9", 
                                borderRadius: "10px",
                                padding: "0px 10px"
                            }}>
                            <ListItemText primary={message.text}
                                        secondary={message.date}/>
                        </Box>
                    </ListItem>
                    ))}
                </List>
            </Box>
            <Box component="form"
                sx={{
                    borderTop: 'solid 1px #d9d9d9',
                    display: 'flex',
                    p: 1,
                }}
                onSubmit={(e) => e.preventDefault()}
                noValidate
                autoComplete="off">
                <TextField
                    label="Type a message"
                    variant="standard"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') 
                        {
                            e.preventDefault();
                            onEnterKeyPressed(e);
                        }
                    }}
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            fontWeight: 600,
                            fontSize: '1.5rem',
                            border: 'none',
                            outline: 'none',
                            '&::placeholder': { color: 'red', },
                        }
                    }}/>
                <Button variant="contained"
                    type="button" 
                    onClick={onSendButtonClicked} 
                    disabled={!input} >
                    Send
                </Button>
            </Box>
        </Box>
    );
}