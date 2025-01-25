"use client";
import React, { useState, useEffect } from 'react';
import UserHeader from '../../../../reusables/users/UserHeader/UserHeader';
import UserFooter from '../../../../reusables/users/UserFooter/UserFooter';
import UserSlidebar from '../../../../reusables/users/UserSlidebar/UserSlidebar';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import supabase from '../../../config/superbaseClient'

const Userordered = () => {
  const [orderedProducts, setOrdered] = useState([]);
  const customer_id = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*').eq('user_id', customer_id);

        if (error) {
          console.error("Error fetching orders:", error);
        } else {
          setOrdered(data); 
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    fetchOrders(); 
  }, [customer_id]); 

  // Function to handle order deletion
  const handleDeleteOrder = async (orderId) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId); // Deleting the order by ID

      if (error) {
        console.error("Error deleting order:", error);
      } else {
        // Update the state to remove the deleted order from the list
        setOrdered((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      }
    } catch (err) {
      console.error("An error occurred while deleting the order:", err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginBottom: "150px" }}>
      <UserHeader />
      <Box sx={{ display: 'flex' }}>
        <UserSlidebar />
        <Box sx={{ marginTop: "100px", marginLeft: "260px", padding: "20px", flex: 1 }}>
          {/* Render ordered products */}
          <Grid container spacing={3}>
            {orderedProducts.map((order, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "#f1f8e9",
                    border: "2px solid #80cbc4",
                    "&:hover": {
                      transform: "scale(1.05)", // Card hover effect
                      boxShadow: 8
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={order.product_image} // Assuming there's a product image URL in the order
                    alt={order.product_name} // Assuming there's a product name in the order
                    sx={{
                      objectFit: 'cover',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f3f3f' }}>
                      {order.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                      Price: ${order.product_price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {order.quantity}
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: 2, color: '#e91e63', fontWeight: 'bold' }}>
                      Total: ${order.total_price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/userDashboard/user-order/${order.product_id}`}
                      sx={{ borderRadius: 5 }}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteOrder(order.id)} // Call handleDeleteOrder on button click
                      sx={{ borderRadius: 5 }}
                    >
                      Delete Order
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer positioned at the bottom */}
      <Box sx={{ marginTop: 'auto' }}>
        <UserFooter />
      </Box>
    </Box>
  );
}

export default Userordered;
