'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '../../../config/superbaseClient'
import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box, Divider } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null); 
  const [reviews, setReviews] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);  
      fetchProductReviews(id);   
    }
  }, [id]);  

  const fetchProductDetails = async (productId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      setError('Error fetching product details');
      console.error('Error fetching product details:', error);
    } else {
      setProduct(data); 
    }
    setLoading(false);
  };

  const fetchProductReviews = async (productId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId);

    if (error) {
      setError('Error fetching product reviews');
      console.error('Error fetching product reviews:', error);
    } else {
      setReviews(data); 
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', paddingTop: 5 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: "#f1f8e9" }}>
      <UserHeader />  

      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={3}>
            <UserSlidebar />  
          </Grid>

          <Grid item xs={12} md={9}>
            <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 12, marginBottom: 3, borderRadius: 3, background: "#f1f8e9", maxWidth: 600, margin: 'auto', padding: '20px', height: 'auto', textAlign: 'center', position: 'relative' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom align="center" color="purple">Product Details</Typography>

                {product && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        image={product.image_url}
                        title={product.name}
                        sx={{ width: '100%', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" color="green" gutterBottom>{product.name}</Typography>
                      <Typography variant="body1" paragraph color="orange">{product.description}</Typography>
                      <Typography variant="h6" color="red" gutterBottom>Price: ${product.price}</Typography>
                    </Grid>
                  </Grid>
                )}

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" align="center" gutterBottom color="purple">Customer Reviews</Typography>
                {reviews.length > 0 ? (
                  <Grid container spacing={3}>
                    {reviews.map((review) => (
                      <Grid item xs={12} md={6} key={review.id}>
                        <Card sx={{ p: 2, backgroundColor: '#f5f5f5', boxShadow: 3, borderRadius: 2 }}>
                          <Typography variant="h6" color="blue">{review.user_id}</Typography>
                          <Typography variant="body1" color="brown">{review.review}</Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1" color="textSecondary" align="center">No reviews yet.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ marginTop: 'auto', paddingTop: "30px" }}>
        <UserFooter />
      </Box>
    </div>
  );
};

export default ProductDetails;
