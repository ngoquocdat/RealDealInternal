import { Avatar, Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CallIcon from '@mui/icons-material/Call';
import { Room } from "Components/utils/datas";

interface ChatViewTopBarProps {
    room: Room | undefined;
}

export default function ChatViewTopBar({ room }: ChatViewTopBarProps)
{
    return(
        <Box 
            sx={{ 
                height: '60px', 
                display: 'grid',
                gridTemplateColumns: 'repeat(11, 1fr)', 
                alignItems: 'center', 
                borderBottom: 'solid 1px #d9d9d9',
                padding: '10px',
            }}>
            <Avatar sx={{ gridColumn: "1/2", alignSelf: "center" }}/>
            <Typography sx={{ gridColumn: "2/6", textAlign: 'left'}}>
                {room?.room}
            </Typography>
            <Button variant='contained'
                    type='button' 
                    sx={{ 
                        gridColumn: "8/9",
                        width: '1px',
                        height: '64px',
                        borderRadius: '50%', 
                        background: '#f2f2f2',
                        border: 'none', 
                        boxShadow: 'none',
                        padding: '0',
                    }}>
                    <SearchIcon sx={{color: '#3c4d58'}} />
                </Button>
                <Button variant='contained'
                        type='button' 
                        sx={{ 
                            gridColumn: "9/10",
                            width: '1px',
                            height: '64px',
                            borderRadius: '50%', 
                            background: '#f2f2f2',
                            border: 'none', 
                            boxShadow: 'none'
                        }}>
                    <CallIcon sx={{color: '#3c4d58'}}/>
                </Button>
                <Button variant='contained'
                        type='button' 
                        sx={{ 
                            gridColumn: "10/11",
                            width: '1px',
                            height: '64px',
                            borderRadius: '50%', 
                            background: '#f2f2f2',
                            border: 'none', 
                            boxShadow: 'none'
                        }}>
                    <PersonAddIcon sx={{color: '#3c4d58'}}/>
                </Button>
                <Button variant='contained'
                        type='button' 
                        sx={{ 
                            gridColumn: "11/12",
                            width: '1px',
                            height: '64px',
                            borderRadius: '50%', 
                            background: '#f2f2f2',
                            border: 'none', 
                            boxShadow: 'none'
                        }}>
                    <MoreVertIcon sx={{color: '#3c4d58'}}/>
                </Button>
        </Box>
    );
}