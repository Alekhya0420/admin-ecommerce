import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '190px',
        backgroundColor: '#2196F3',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: '20px',
        color: '#fff',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/admin" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Admin Dashboard
        </Link>
      </Typography>
      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/checkorder-list" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Orders
        </Link>
      </Typography>
      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/total-user" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Users
        </Link>
      </Typography>
      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/productview" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Product View
        </Link>
      </Typography>
      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/order-tracking" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Order Tracking
        </Link>
      </Typography>

      <Typography
        sx={{
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '20px',
          textDecoration: 'underline',
          color: 'blue',
        }}
      >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          Logout
        </Link>
      </Typography>



    </Box>
  );
};

export default Sidebar;
