"use client";
import React, { useState } from 'react';
import Slidebar from '../../reusables/Sidebar/Sidebar'
import Header from '../../reusables/Header/Header'
import supabase from '../../config/superbaseClient'
import Adminfooter from '../../reusables/Adminfooter/Adminfooter'

const Addproduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('products').insert([
      {
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error('Error inserting product:', error);
      alert('There was an error adding the product.');
    } else {
      console.log('Product added successfully:', data);
      alert('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', marginBottom: '100px' }}>
      <Slidebar />
      <Header />

      <div
        style={{
          flexGrow: 1,
          backgroundColor: '#F1F8FF',
          padding: '20px',
          marginLeft: '240px',
          height: '100vh',
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #007BFF',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            width: '450px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#007BFF' }}>Add New Product</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <label
                htmlFor="name"
                style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', color: '#333' }}
              >
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #007BFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label
                htmlFor="description"
                style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', color: '#333' }}
              >
                Product Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter product description"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #007BFF',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label
                htmlFor="price"
                style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', color: '#333' }}
              >
                Product Price:
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Enter product price"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #007BFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label
                htmlFor="imageUrl"
                style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', color: '#333' }}
              >
                Product Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="Enter product image URL"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #007BFF',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
      <Adminfooter />
    </div>
  );
};

export default Addproduct;
