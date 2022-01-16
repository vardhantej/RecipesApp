import React from 'react';
import {Box,AppBar,Toolbar,Typography,Button,IconButton} from '@material-ui/core';


export default function NavBar({isLoggedOut,setIsLoggedOut}) {
    
    const handleOnClick=()=>{
        setIsLoggedOut(!isLoggedOut);
        localStorage.clear();
    }
    
    const user=localStorage.getItem('profile');
    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Recipes App
                </Typography>
                {user!==null && <a href='/' style={{textDecoration: 'none',color:'white'}}><Button color="inherit" onClick={handleOnClick}>Logout</Button></a>}
                </Toolbar>
            </AppBar>
    </Box>
    )
}
