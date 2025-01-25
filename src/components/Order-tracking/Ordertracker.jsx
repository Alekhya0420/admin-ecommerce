"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import Slidebar from '../../reusables/Sidebar/Sidebar'
import Header from '../../reusables/Header/Header'
import supabase from '../../config/superbaseClient'
import Adminfooter from '../../reusables/Adminfooter/Adminfooter'

const Ordertracker = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("UsersOrdersTable")
          .select(
            "user_id, user_name, user_email, user_country, order_id, product_id, product_name, product_price, quantity, total_price, order_created_at, product_image"
          );

        if (error) {
          throw error;
        }

        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <CircularProgress
        style={{ display: "block", margin: "auto", marginTop: "20vh" }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "100px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "250px",
      }}
    >
      <Header />
      <Slidebar />
      <Container
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1976d2" }}>
            Order Tracker
          </h2>
          <Table aria-label="order tracking table">
            <TableHead style={{ backgroundColor: "#0288d1", color: "#fff" }}>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>User Country</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Image</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Order Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.order_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.user_name}</TableCell>
                  <TableCell>{order.user_email}</TableCell>
                  <TableCell>{order.user_country}</TableCell>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.product_id}</TableCell>
                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>
                    {order.product_image ? (
                      <img
                        src={order.product_image}
                        alt={order.product_name}
                        style={{
                          width: "100px",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      "No Image Available"
                    )}
                  </TableCell>
                  <TableCell>{order.product_price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>
                    {new Date(order.order_created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Adminfooter />
    </div>
  );
};

export default Ordertracker;
