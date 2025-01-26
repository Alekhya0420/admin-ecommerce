import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import supabase from '../../../config/superbaseClient'

const UserHeader = () => {
  const [cartNo, setCartNo] = useState(0);

  const user = localStorage.getItem("user");
  const cust_id = user ? JSON.parse(user).id : null;

  if (!cust_id) {
    console.log("No user found in localStorage");
  }

  useEffect(() => {
    if (cust_id) {
      const CartNumber = async () => {
        const { data, error, count } = await supabase
          .from('orders')
          .select('quantity', { count: 'exact' })
          .eq('user_id', cust_id);

        if (error) {
          console.log("There is an issue in it");
        } else {
          const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
          setCartNo(totalQuantity);
        }
      };
      CartNumber();
    }
  }, [cust_id]);

  console.log("quantity is", cartNo);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#e0e0e0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', gap: '20px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: '200',
            color: '#333',
          }}
        >
        <Link to="/userDashboard">
          User-Dashboard
        </Link>  
        </Typography>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/userDashboard/user-order">
            <Typography
              variant="h6"
              sx={{
                fontWeight: '200',
                marginTop:"5px",
                color: '#333',
                '&:hover': {
                color:'#e91e63', 
                }
              }}
            >
              Orders
            </Typography>
          </Link>

          <Typography
            variant="h6"
            sx={{
              fontWeight: '200',
              marginTop:"5px",
              color: '#333',
              '&:hover': {
                color: '#e91e63',
              }
            }}
          >
            Cart({cartNo})
          </Typography>

         
          <Link to="/wish-list">
            <IconButton color="inherit">
            <Link to="/wish-list">  
              wishlist<FavoriteIcon sx={{color:'#e91e63'}}/>
            </Link>  
           </IconButton>
          </Link>
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#e91e63', 
            color: '#fff',
            borderRadius: '50%', 
            padding: '8px 16px',
          }}
        >
          <AccountCircleIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
