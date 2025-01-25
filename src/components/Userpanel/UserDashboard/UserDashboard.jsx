"use client"
import React, {useEffect,useState} from "react";
import axios from "axios";
import {product_api} from "../../../../api/api";
import {Box,Card,CardContent,CardMedia,Typography,Grid,Button,TextField} from "@mui/material";
import UserHeader from "../../../../reusables/users/UserHeader/UserHeader";
import UserSlidebar from "../../../../reusables/users/UserSlidebar/UserSlidebar";
import UserFooter from "../../../../reusables/users/UserFooter/UserFooter";
import supabase from "../../../config/superbaseClient";
import ReviewModal from "../../../../reusables/review/ReviewModal";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);  // Added state for user
  const api_key = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  
  // Fetch user data after the component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") 
    {
      const userData = localStorage.getItem("user");
    if (userData) 
    {
      setUser(JSON.parse(userData));
    }
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(product_api, {
          headers: {
            apikey: api_key,
            Authorization: `Bearer ${api_key}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [api_key]);

  const handleOrder = async (product) => {
    const orderQuantity = quantity[product.id] || 1;
    const totalPrice = product.price * orderQuantity;

    if (user) {
      const { id: userId, name: userName } = user;

      try {
        const { data, error } = await supabase.from("orders").insert({
          user_id: userId,
          product_id: product.id,
          quantity: orderQuantity,
          total_price: totalPrice,
          product_image: product.image_url,
          product_price: product.price,
          customer_name: userName,
          product_name: product.name,
          product_description: product.description,
        });

        if (error) {
          console.error("Error inserting order:", error);
        } else {
          alert("Order added successfully");
          console.log("Order added successfully:", data);
        }
      } catch (err) {
        console.error("Error during Supabase insertion:", err);
      }
    } else {
      console.log("No user logged in");
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantity((prev) => ({ ...prev, [productId]: value }));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  const handleReviewSubmit = async (product, review) => {
    if (user) {
      const { id: userId } = user;

      try {
        const { data, error } = await supabase.from("reviews").insert({
          product_id: product.id,
          user_id: userId,
          review: review,
        });

        if (error) {
          console.error("Error submitting review:", error);
        } else {
          alert("Review submitted successfully");
          console.log("Review submitted:", data);
        }
      } catch (err) {
        console.error("Error during review submission:", err);
      }
    } else {
      console.log("No user logged in");
    }
  };
  //adding item to wishlist
  const handleAddToWishlist = async (product) => {
    if (user) {
      const { id: person_id } = user; 
      const person_name = JSON.parse(localStorage.getItem("user")).name; 
      const wishitem_id = product.id; 
      const wishlist_image = product.image_url;
      const quantity = 1; 
      const total_price = product.price * quantity; // Calculate total price
  
      try {
        // Insert data into the 'wishlist' table, including person_name
        const { data, error } = await supabase.from("wishlist").insert({
          person_id,
          person_name,
          wishitem_id,
          quantity,
          total_price,
          wishlist_image
        });
  
        if (error) {
          console.error("Error adding to wishlist:", error);
        } else {
          alert("Product added to wishlist!");
          console.log("Wishlist entry added:", data);
        }
      } catch (err) {
        console.error("Error during Supabase wishlist insertion:", err);
      }
    } else {
      console.log("No user logged in");
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <UserHeader />
      <UserSlidebar />
      <Box
        sx={{
          marginTop: "100px",
          marginLeft: "260px",
          padding: "20px",
          marginBottom: "150px",
          paddingBottom: "70px",
          flexGrow: 1,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px", color: "blue" }}>
          Available Products
        </Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginBottom: "20px", width: "300px" }}
        />

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 320,
                  border: "2px solid #80cbc4",
                  borderRadius: "12px",
                  backgroundColor: "#f1f8e9",
                  boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.image_url}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography variant="h6" component="div" sx={{ color: "#00796b", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ marginTop: "8px", fontWeight: "bold" }}>
                    ${product.price}
                  </Typography>
                  <p
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleOpenModal(product)}
                  >
                    Review
                  </p>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                    sx={{ marginTop: "8px", width: "100%" }}
                    inputProps={{
                      min: 1,
                    }}
                  />

                  <Button onClick={() => handleAddToWishlist(product)}>
                    Add to Wishlist
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "16px",
                      backgroundColor: "#00796b",
                      "&:hover": {
                        backgroundColor: "#004d40",
                      },
                    }}
                    onClick={() => handleOrder(product)}
                  >
                    Order
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Review Modal */}
      <ReviewModal
        open={open}
        onClose={handleCloseModal}
        product={selectedProduct}
        onReviewSubmit={handleReviewSubmit}
      />
      <UserFooter />
    </div>
  );
};

export default UserDashboard;




