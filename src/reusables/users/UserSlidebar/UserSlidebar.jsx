import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Userlogout } from "../../Userlogout/Userlogout";

const UserSlidebar = () => {
  const [user, setUser] = useState({name:"",email:""});

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); 
      setUser({
        name: parsedUser.name || "Guest", 
        email: parsedUser.email || "Not available",
      });
    }
  }, []);

  return (
    <Box
      sx={{
        width: "240px",
        backgroundColor: "#e0e0e0", 
        paddingTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "20px",
        color: "#333",
        height: "100vh",
        position: "fixed",
        top: 10,
        left: 0,
      }}
    >
      <Typography
        sx={{
          marginBottom: "20px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
          color: "#333",
          "&:hover": {
            color: "#e91e63", // Pink color on hover
          },
        }}
      >
        {user.name}
      </Typography>

      <Typography
        sx={{
          marginBottom: "20px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
          color: "#333",
          "&:hover": {
            color: "#e91e63",
          },
        }}
      >
        {user.email}
      </Typography>

      <Box
        onClick={Userlogout}
        sx={{
          bottom: "120px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "#e91e63",
          borderRadius: "30px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
          fontSize: "14px",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#d81b60",
            color: "#fff",
          },
        }}
      >
        Logout
      </Box>
    </Box>
  );
};

export default UserSlidebar;

