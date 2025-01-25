import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ReviewModal = ({ open, onClose, product, onReviewSubmit }) => {
  const [review, setReview] = useState("");

  const handleReviewSubmit = () => {
    if (review.trim()) {
      onReviewSubmit(product, review);
      setReview(""); 
      onClose(); 
    } else {
      alert("Please enter a review.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid rgb(40, 212, 195)",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add Your Review for {product?.name}
        </Typography>
        <TextField
          label="Your Review"
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ marginTop: "16px", width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "16px",
            backgroundColor: "#00796b",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
          onClick={handleReviewSubmit}
        >
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
