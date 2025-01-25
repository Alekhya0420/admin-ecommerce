"use client";
import React, {useState,useEffect} from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Container,
} from "@mui/material";
import supabase from "../../../src/config/superbaseClient";
import UserHeader from "../../../reusables/users/UserHeader/UserHeader";
import UserFooter from "../../../reusables/users/UserFooter/UserFooter";
import UserSlidebar from "../../../reusables/users/UserSlidebar/UserSlidebar";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = localStorage.getItem("user");
  const cust_id = user ? JSON.parse(user).id:null;

  useEffect(() => {
    if (cust_id) {
      const fetchWishlist = async () => {
        const {data,error} = await supabase.from("wishlist")
         .select(
            "id, wishitem_id, person_name, quantity, total_price, wishlist_image"
          )
          .eq("person_id", cust_id);

        if (error) {
          console.log("Error fetching wishlist:", error);
        } else {
          setWishlist(data);
        }
      };
      fetchWishlist();
    }
  },[cust_id]);

  const handleDeleteWishlistItem = async (wishlistId) => {
    try {
      const {data,error} = await supabase.from("wishlist").delete().eq("id", wishlistId);
      if (error) 
      {
        console.log("Error deleting wishlist item:", error);
      } 
      else 
      {
        setWishlist(wishlist.filter((item) => item.id !== wishlistId));
      }
    } 
    catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div 
    style={{
    display:'flex',
    flexDirection:'column', 
    minHeight: "100vh"
    }}>

      <UserHeader/>
      <UserSlidebar/>

        <Box
        sx={{
        marginTop: "100px",
        marginLeft: "260px",
        padding: "20px",
        marginBottom: "150px",
        paddingBottom: "70px", 
        }}
        >

          {wishlist.length === 0 ? (
            <Typography 
            variant="h4"
            sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "blue",
            }}            
            >
              My wishlist is empty 😭😢😭😢😢😭.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {wishlist.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      backgroundColor: "#fff8e1",
                      borderRadius: "12px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      padding: "20px",
                      border: "4px solid #ffcc80",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        item.wishlist_image || "/placeholder-image.png"
                      }
                      alt={`Wishlist Item ${item.wishitem_id}`}
                      sx={{
                        height: "120px",
                        width: "320px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #1e88e5",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Product ID: {item.wishitem_id}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#555", mb: 1 }}
                      >
                        <strong>Quantity:</strong> {item.quantity}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#555", mb: 2 }}
                      >
                        <strong>Total Price:</strong> ${item.total_price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteWishlistItem(item.id)}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          backgroundColor: "#d32f2f",
                          "&:hover": { backgroundColor: "#b71c1c" },
                        }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      
      <UserFooter />
    </div>
  );
};

export default Wishlist;


