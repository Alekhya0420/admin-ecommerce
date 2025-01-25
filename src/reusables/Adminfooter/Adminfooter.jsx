import React from "react";
import { Box, Typography } from "@mui/material";

const Adminfooter = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#2196F3",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
        boxShadow: "2px 1px 5px rgba(3, 2, 2, 0.1)",
        position: "fixed",
        bottom: 0,
        left: 0, 
        zIndex: 10,
      }}
    >
      <Typography sx={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
        © 2025 Company Name. All Rights Reserved.
      </Typography>

      <Box sx={{ display: "flex", gap: "50px" }}>
        <p style={{ color: "#e91e63", fontSize: "14px", cursor: "pointer" }}>
          Privacy Policy
        </p>
        <p style={{ color: "#e91e63", fontSize: "14px", cursor: "pointer" }}>
          Terms & Conditions
        </p>
        <p style={{ color: "#e91e63", fontSize: "14px", cursor: "pointer" }}>
          Help
        </p>
      </Box>
    </Box>
  );
};

export default Adminfooter;