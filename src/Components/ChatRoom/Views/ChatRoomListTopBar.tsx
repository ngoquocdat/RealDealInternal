import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from '@mui/icons-material/Chat';

export default function ChatRoomListTopBar()
{
    return(
        <Box 
            sx={{ 
              height: '60px', 
              display: 'flex', 
              alignItems: 'center', 
              borderBottom: 'solid 1px #d9d9d9',
              padding: '10px'
            }}>
            <ChatIcon sx={{ marginRight: 1 }} />
            <TextField
                fullWidth
                placeholder="Messenger"
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        fontWeight: 600,
                        fontSize: '1.5rem',
                        border: 'none',
                        outline: 'none',
                        '&::placeholder': { color: 'red', },
                    }
                }}
                variant="standard"/>
            <SearchIcon sx={{ marginRight: 1 }} />
          </Box>
    );
}