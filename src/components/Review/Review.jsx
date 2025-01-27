import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('id, product_id, product_name, review_image, user_id, review,reviewer_name');

        if (error) {
          throw error;
        }

        setReviews(data); 
      } catch (error) {
        setError(`Error fetching reviews: ${error.message}`);
        console.error('Error:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        throw error;
      }

      // Remove the deleted review from the local state
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      setError(`Error deleting review: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{display:'flex',marginLeft:'100px'}}>
      
    <Slidebar/>
    <Header/>

      <Box sx={{flexGrow:1,padding:'20px',overflowY:'auto'}}>       
        <Box
          sx={{
            marginTop: '20px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Paper sx={{ width: '90%', overflow: 'hidden', marginLeft: '50px', padding: '20px' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#3f51b5' }}>
              Product Reviews
            </Typography>

            {error ? (
              <Typography variant="h6" color="error" align="center">
                {error}
              </Typography>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="reviews table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#3f51b5' }}>
                      <TableCell sx={{ color: 'white' }}><strong>Image</strong></TableCell>
                      <TableCell sx={{ color: 'white' }}><strong>User Name</strong></TableCell>
                      <TableCell sx={{ color: 'white' }}><strong>Product Name</strong></TableCell>
                      <TableCell sx={{ color: 'white' }}><strong>Product ID</strong></TableCell>
                      <TableCell sx={{ color: 'white' }}><strong>User ID</strong></TableCell>
                      <TableCell sx={{ color: 'white' }}><strong>Review</strong></TableCell>
                      <TableCell sx={{ color: 'white' }} align="center"><strong>Actions</strong></TableCell>
                       
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <TableRow
                          key={review.id}
                          sx={{
                            '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                            '&:hover': { backgroundColor: '#e1e1e1' },
                          }}
                        >
                          <TableCell>
                            <Avatar
                              src={review.review_image || ''}
                              alt={review.product_name || 'No Image'}
                              variant="rounded"
                              sx={{ width: 50, height: 50 }}
                            />
                          </TableCell>
                          <TableCell>{review.reviewer_name}</TableCell>
                          <TableCell>{review.product_name}</TableCell>
                          <TableCell>{review.product_id}</TableCell>
                          <TableCell>{review.user_id}</TableCell>
                          <TableCell>{review.review}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(review.id)}
                              sx={{ marginLeft: '10px' }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No reviews available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>

        <Adminfooter/>
      </Box>
    </Box>
  );
};

export default Review;
