import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';

const Userorderlist = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(
          'user_id, product_id, quantity, total_price, created_at, product_image, product_price, customer_name, product_name, product_description, status'
        );

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (userId,productId,orderTime,currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Delivered' : 'Pending';

    setOrders((prevOrders) =>
    prevOrders.map((order) =>
    order.user_id === userId && order.product_id === productId && order.created_at === orderTime
        ?{...order,status:newStatus}
        :order
      )
    );
    
    const {error} = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('created_at', orderTime);

    if (error) {
      console.error('Error updating status:', error);
    }
  };

  const orderLength = orders.length;
  console.log('Number of orders:', orderLength);

  return (
    <div style={{ backgroundColor: '#F1F8FF', minHeight: '100vh', padding: '20px', marginLeft: '150px' }}>
      <Header />
      <Slidebar />

      <div style={{ marginTop: '100px', marginBottom: '140px' }}>
        <TableContainer
          style={{
            width: '90%',
            border: '1px solid #ccc',
            borderRadius: '10px',
            margin: '0 auto',
            overflowX: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#007BFF', color: '#fff' }}>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  User ID
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Product ID
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Product Name
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Product Price
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Total Price
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Product Image
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Customer Name
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Created At
                </TableCell>
                <TableCell align="center" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="center">{order.user_id}</TableCell>
                    <TableCell align="center">{order.product_id}</TableCell>
                    <TableCell align="center">{order.product_name}</TableCell>
                    <TableCell align="center">{order.product_description}</TableCell>
                    <TableCell align="center">{order.quantity}</TableCell>
                    <TableCell align="center">${order.product_price}</TableCell>
                    <TableCell align="center">${order.total_price}</TableCell>
                    <TableCell align="center">
                      <img
                        src={order.product_image}
                        alt={order.product_name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </TableCell>
                    <TableCell align="center">{order.customer_name}</TableCell>
                    <TableCell align="center">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() =>
                          handleStatusChange(order.user_id, order.product_id, order.created_at, order.status)
                        }
                        style={{
                          backgroundColor: order.status === 'Pending' ? 'orange' : 'green',
                          color: '#fff',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        {order.status}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    No orders available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Adminfooter />
    </div>
  );
};

export default Userorderlist;
