import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material"
import { Room } from "Components/utils/datas";
import { Link } from "react-router-dom";

interface ChatRoomListProps {
    rooms: Room[];
    onRoomClick: (roomId: string) => void;
}

export default function ChatRoomList( { rooms, onRoomClick }: ChatRoomListProps) 
{
    const [selectedRoomId, setSelectedRoomId] = useState('');
  
    const handleRoomClick = (roomId: string) => {
        setSelectedRoomId('');
        setSelectedRoomId(roomId);
        onRoomClick(roomId);
    };

    return (
        <Box className="chatroom-list">
            <Accordion sx={{ 
                            boxShadow: 'none', 
                            border: 'none',
                            '&.MuiAccordion-root:before': { display: 'none' }, 
                        }}>
                <AccordionSummary 
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{  minHeight: '10px' }}>
                    <Typography 
                        sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            color: "#a2a2a2"
                        }}>
                        PINNED MESSAGES
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                {rooms.map((room) => (
                    <Link key={room.id} 
                        to={`/chat/room/${room.id}`} 
                        className="room-container" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit', 
                        }}>
                        <Box className="room-container" 
                            sx={{ 
                                display: "grid",
                                gap: "10px",
                                margin: "10px 10px",
                                textAlign: "left",
                                justifyContent: "left",
                                alignItems: "center",
                                borderRadius: '10px',
                                backgroundColor: selectedRoomId === room.id ? '#fcb630' : 'inherit',
                                boxShadow: selectedRoomId === room.id ? '0 0 10px #fcb630' : 'none',
                                '&:hover': {
                                    backgroundColor: '#fcb630',
                                    boxShadow: '0 0 10px #fcb630',
                                },
                                padding: '10px'
                            }}
                            onClick={() => handleRoomClick(room.id)}>
                            <Avatar sx={{ gridColumn: "1/2", width: 24, height: 24 }}/>
                            <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
                                <Typography 
                                    sx={{ 
                                        fontWeight: 600, 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.85rem',
                                        color: selectedRoomId === room.id ? '#f7fbfb' : 'inherit'
                                    }}>
                                    Dự án {room.room}
                                </Typography>
                                <Typography
                                    sx={{ 
                                        fontWeight: 200, 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.75rem',
                                        color: selectedRoomId === room.id ? '#f7fbfb' : 'inherit'
                                    }}>
                                    {room.lastMessage}
                                </Typography>
                            </Box>
                            <Box sx={{ gridColumn: "4/5", 
                                color: selectedRoomId === room.id ? '#f7fbfb' : 'inherit' }}>
                                    {room.lastTimeChat}
                            </Box>
                        </Box>
                    </Link>
                ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ 
                            boxShadow: 'none', 
                            border: 'none',
                            '&.MuiAccordion-root:before': { display: 'none' }, 
                        }}>
                <AccordionSummary 
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{  minHeight: '10px' }}>
                    <Typography 
                        sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            color: "#a2a2a2"
                        }}>
                        GROUP MESSAGES
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>

                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ 
                            boxShadow: 'none', 
                            border: 'none',
                            '&.MuiAccordion-root:before': { display: 'none' }, 
                        }}>
                <AccordionSummary 
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{  minHeight: '10px' }}>
                    <Typography 
                        sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            color: "#a2a2a2"
                        }}>
                        ALL MESSAGES
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
