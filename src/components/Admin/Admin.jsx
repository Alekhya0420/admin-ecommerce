import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Replaced Next.js Link with React Router Link
import ProductQuantity from '../../reusables/ProductQuantity/ProductQuantity';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Countrychart from '../../reusables/Piechart/Countrychart';
import Orderlength from '../../reusables/Orderlength/Orderlength';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';

ChartJS.register(ArcElement, Tooltip, Legend);

const Admin = () => {
  const [userCount, setUserCount] = useState(0);

  const { productLength } = ProductQuantity();
  const { orderLength } = Orderlength();

  useEffect(()=>{
    async function userCount()
    {
      let{data,error}=await supabase.from('users').select('*');
      try
      {
        if(error)
        {
          console.log(error.message);
        }
        else
        {
          let userCount = data.length;
          setUserCount(userCount);
        }
      }
      catch(error)
      {
        console.log(error.length);
      }
    }
    userCount();
  },[])


  const [productPriceData, setProductPriceData] = useState({
    '1-1200': 0,
    '1201-1500': 0,
    moreThan1500: 0,
  });

  useEffect(() => {
    async function fetchProductPriceData() {
      try {
        const { data, error } = await supabase.from('orders').select('product_price');

        if (error) throw error;

        const priceRanges = {
          '1-1200': 0,
          '1201-1500': 0,
          moreThan1500: 0,
        };

        data.forEach((product) => {
          if (product.product_price >= 1 && product.product_price <= 1200) {
            priceRanges['1-1200']++;
          } else if (product.product_price >= 1201 && product.product_price <= 1500) {
            priceRanges['1201-1500']++;
          } else if (product.product_price > 1500) {
            priceRanges['moreThan1500']++;
          }
        });
        setProductPriceData(priceRanges);
      } catch (err) {
        console.error('Error fetching product price data:', err);
      }
    }
    fetchProductPriceData();
  }, []);

  const productPriceChartData = {
    labels: Object.keys(productPriceData),
    datasets: [
      {
        data: Object.values(productPriceData),
        backgroundColor: Array(Object.keys(productPriceData).length)
          .fill('#' + Math.floor(Math.random() * 16777215).toString(16)),
        hoverBackgroundColor: Array(Object.keys(productPriceData).length)
          .fill('#' + Math.floor(Math.random() * 16777215).toString(16)),
      },
    ],
  };

  return (
    <div style={{ display: 'flex', height: '100vh', marginTop: '50px', backgroundColor: '#F1F8FF', marginBottom: '20px' }}>
      <Slidebar />
      <Header />

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          padding: '20px',
          marginLeft: '240px',
          height: '100vh',
          marginTop: '60px',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={4}>
          {/* Users Stats */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: '#FFD54F' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                No. of Users
              </Typography>
              <Typography variant="h5">{userCount}</Typography>
            </Card>
          </Grid>

          {/* Orders Stats */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: '#81C784' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                No. of Orders
              </Typography>
              <Typography variant="h5">{orderLength}</Typography>
            </Card>
          </Grid>

          {/* Products Stats */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: '#64B5F6' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                No. of Products
              </Typography>
              <Typography variant="h5">{productLength}</Typography>
            </Card>
          </Grid>

          {/* Add Product */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: '#FF7043' } }}>
              <Typography variant="h6">Add Product</Typography>
              <Link to="/add">
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Add New Product
                </Button>
              </Link>
            </Card>
          </Grid>

          {/* Order History */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: '#BA68C8' } }}>
              <Link to="/checkorder-list">
                <Typography variant="h6">Order History</Typography>
              </Link>
            </Card>
          </Grid>

          {/* Pie charts in one row */}
          <Grid container item xs={12} spacing={4}>
            {/* Pie chart for Country data */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 1, boxShadow: 3, height: '300px', width: '250px', backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: 'white' } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Country visit
                </Typography>
                <Countrychart setUserCount={setUserCount} />
              </Card>
            </Grid>

            {/* Pie chart for Product price data */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 1, boxShadow: 3, height: '300px', width: '250px', backgroundColor: '#F0F8FF', border: '1px solid blue', '&:hover': { backgroundColor: 'white' } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Our sales
                </Typography>
                <Pie data={productPriceChartData} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Adminfooter />
    </div>
  );
};

export default Admin;
