import React, { useState } from 'react';
import supabase from '../../config/superbaseClient';
import {Box,TextField,Button,Typography,Card,CardContent} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const AdminAuthenticate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('username', username)
        .eq('password', password);

      if (error) {
        setError('An error occurred while authenticating.');
      } else if (data.length === 0) {
        setError('Invalid username or password.');
      } else {
        setSuccess('Login successful!');
        navigate('/admin')
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          padding: '20px',
        }}
      >
        <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold' }}>
              Admin Login
            </Typography>

            {error && (
              <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>
                {error}
              </Typography>
            )}

            {success && (
              <Typography color="success.main" sx={{ textAlign: 'center', marginBottom: 2 }}>
                {success}
              </Typography>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
   
    </div>
  );
};

export default AdminAuthenticate;
