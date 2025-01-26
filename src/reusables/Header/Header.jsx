import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';


const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2196F3' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#2196F3',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 1,
            }}
          >
            A.Roy
            <AccountCircleIcon sx={{ marginLeft: '5px' }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
