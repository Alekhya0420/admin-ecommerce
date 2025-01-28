import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';

const StockAlert = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const { data, error } = await supabase
        .from('stock')
        .select('product_id, product_name, product_image, available_quantity');

      if (error) {
        console.error('Error fetching stock data:', error.message);
      } else {
        setStockData(data);
      }
    };

    fetchStockData();
  }, []);

  // Function to check stock status
  const getStockStatus = (quantity) => {
    if (quantity >= 90) {
      return 'Sufficient Product';
    } else if (quantity === 0 || quantity === null) {
      return 'Add in Stock';
    }
    return 'Low Stock';
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:"200px" }}>
      <Header />
      <Slidebar />
      <Typography variant="h4" gutterBottom style={{marginBottom:'20px'}}>
        Stock Alerts
      </Typography>
      <div style={{width:'90%',maxWidth:'1200px',overflowY:'auto',height:'400px'}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Product Image</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Available Quantity</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Stock Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.map((product, index) => (
                <TableRow key={product.product_id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                    />
                  </TableCell>
                  <TableCell>{product.available_quantity}</TableCell>
                  <TableCell>{getStockStatus(product.available_quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Adminfooter />
    </div>
  );
};

export default StockAlert;
