import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';
import { Card, CardMedia, CardContent, Typography, Grid, Box, Button } from '@mui/material';

const Userinvolve = () => {
  const {name} = useParams();
  const [userData, setUserData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false); 

  const decodedName = decodeURIComponent(name);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from('user_data_summary')
          .select('*')
          .ilike('user_name', `${decodedName}%`);

        if (userError) {
          setError(`Error fetching user data: ${userError.message}`);
          console.error('Error fetching user data:', userError);
        } else {
          setUserData(userData);
        }

        const { data: wishlist, error: wishlistError } = await supabase
          .from('wishlist')
          .select('wishlist_image, quantity, total_price')
          .ilike('person_name', `${decodedName}%`);

        if (wishlistError) {
          setError(`Error fetching wishlist: ${wishlistError.message}`);
          console.error('Error fetching wishlist:', wishlistError);
        } else {
          setWishlistData(wishlist);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
          console.error('Error:', error);
        }
      }
    };

    if (name) {
      fetchUserData();
    }
  }, [name]);

  const handleDeleteUser = async (userName) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('name', userName);

      if (error) {
        setError(`Error deleting user: ${error.message}`);
        console.error('Error deleting user:', error);
      } else {
        setUserData([]);
        setWishlistData([]);
        setIsDeleted(true); // Set isDeleted to true when user is deleted
        alert('User deleted successfully!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Header />
        <Slidebar />

        <Box sx={{
          width: '100%',
          margin: '10px 0',
          padding: '20px',
        }}>
          {isDeleted ? (
            // Show this when the user is deleted
            <Box sx={{ textAlign: 'center' }}>
              <h2 style={{ color: '#D32F2F' }}>User's account is deleted</h2>
            </Box>
          ) : (
            <>
              <h2 style={{ textAlign: 'center', color: '#0D47A1' }}>
                User is {decodedName}
              </h2>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteUser(name)}
              >
                Delete User
              </Button>
            </>
          )}

          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

          {userData.length > 0 && !isDeleted ? (
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}>
              {userData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '400px',
                    height: "auto",
                    border: '2px solid #0D47A1',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    backgroundColor: '#f4f4f9',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <img
                    src={item.product_image}
                    alt={item.user_order}
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                  />
                  <Box sx={{ padding: '20px' }}>
                    <p><strong>Order:</strong> {item.user_order}</p>
                    <p><strong>Price:</strong> ${item.product_price}</p>
                    <p><strong>Total Price:</strong> ${item.total_price}</p>
                    <p><strong>Review:</strong> {item.review}</p>
                    <p><strong>Description:</strong> {item.product_description}</p>
                    <p><strong>Country:</strong> {item.user_country}</p>
                    <p><strong>Email:</strong> {item.user_email}</p>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>No user data available</p>
          )}

          <h2 style={{ textAlign: 'center', color: '#D32F2F', marginTop: '40px' }}>
            Wishlist
          </h2>

          <Box id="wishlist-section" sx={{ width: "60%", marginLeft: "300px" }}>
            {wishlistData.length > 0 ? (
              <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {wishlistData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{
                      maxWidth: 250,
                      borderRadius: '15px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      border: '1px solid',
                      borderImage: 'linear-gradient(45deg, #FF4081, #3F51B5) 1',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                      },
                      backgroundColor: '#f9f9ff',
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.wishlist_image}
                        alt="Wishlist Item"
                        sx={{
                          objectFit: 'cover',
                          borderBottom: '3px solid #FF4081',
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ color: '#3F51B5', fontWeight: 'bold' }} gutterBottom>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Total Price: ${item.total_price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>No wishlist data available</p>
            )}
          </Box>
        </Box>
      </div>
      <div style={{ marginTop: "100px" }}>
        <Adminfooter />
      </div>
    </div>
  );
};

export default Userinvolve;
