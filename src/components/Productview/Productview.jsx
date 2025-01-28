

import React, { useState, useEffect } from 'react';
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';
import Button from '@mui/material/Button'; // Import MUI Button
import TextField from '@mui/material/TextField'; // Import MUI TextField for edit inputs
import Box from '@mui/material/Box'; // Import Box for layout

const Productview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState(''); // New state for search text

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.error('Error fetching products:', error.message);
        } else {
          const transformedProducts = (data || []).map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url || '',
          }));
          setProducts(transformedProducts);
        }
      } catch (err) {
        console.error('Unexpected error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search text
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Error deleting product:', error.message);
        return;
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Unexpected error deleting product:', err);
    }
  };

  const saveProduct = async (updatedProduct) => {
    try {
      const { id, name, description, price, image_url } = updatedProduct;
      const { error } = await supabase
        .from('products')
        .update({ name, description, price, image_url })
        .eq('id', id);

      if (error) {
        console.error('Error saving product:', error.message);
        return;
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, name, description, price, image_url } : product
        )
      );
      setEditProduct(null);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Unexpected error saving product:', err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F1F8FF', marginBottom: '200px' }}>
      <Header />
      <Slidebar />
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
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Product List</h2>

        {/* Search Bar */}
        <TextField
        label="Search by Product Name"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '20px' }}
        />

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              className="table table-striped table-bordered table-hover"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                borderRadius: '10px',
                backgroundColor: '#EAF6FF',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <thead className="thead-light" style={{ backgroundColor: '#A7D7F9', color: '#333' }}>
                <tr>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>ID</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Name</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Description</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Price</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Image</th>
                  <th style={{ padding: '15px', border: '1px solid #D4EAFD' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) =>
                  editProduct && editProduct.id === product.id ? (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <TextField
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          value={editProduct.description}
                          onChange={(e) =>
                            setEditProduct({ ...editProduct, description: e.target.value })
                          }
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          value={editProduct.price}
                          onChange={(e) =>
                            setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
                          }
                          size="small"
                          type="number"
                        />
                      </td>
                      <td>
                        <TextField
                          value={editProduct.image_url}
                          onChange={(e) =>
                            setEditProduct({ ...editProduct, image_url: e.target.value })
                          }
                          size="small"
                        />
                      </td>
                      <td>
                        <Box display="flex" gap={1}>
                          <Button variant="contained" color="success" onClick={() => saveProduct(editProduct)}>
                            Save
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={() => setEditProduct(null)}>
                            Cancel
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} width={50} height={50} />
                        ) : (
                          'No image'
                        )}
                      </td>
                      <td>
                        <Box display="flex" gap={1}>
                          <Button variant="contained" color="error" onClick={() => deleteProduct(product.id)}>
                            Delete
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => setEditProduct(product)}>
                            Edit
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <Adminfooter />
    </div>
  );
};

export default Productview;
