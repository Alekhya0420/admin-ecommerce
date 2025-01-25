import React, { useState } from 'react';
import supabase from '../../../config/superbaseClient'
import bcrypt from 'bcryptjs';  // Import bcryptjs for password comparison
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import {Link} from 'react-router-dom';

const Userlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginSubmit = async (e) => {
        e.preventDefault();
        setError('');  

        try {
            const {data,error} = await supabase.from('users').select('id,name,email,password')
            .eq('email',email).single(); 

            if (error || !data) 
            {
                setError("Invalid email or password");
                return;
            }
          
            // Compare entered password with hashed password
            const isMatch = await bcrypt.compare(password,data.password);

            if (isMatch) 
            {
                localStorage.setItem('user',JSON.stringify({
                    id:data.id,
                    name:data.name,
                    email:data.email,
                }));
            
                alert("Login successful");
                setEmail('');
                setPassword('');
                window.location.href = '/userDashboard'; 
            } 
            else 
            {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f7fa',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

                <form onSubmit={loginSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        Login
                    </Button>

                    <Typography variant="body2">
                        Are you new?
                        <Link to="/user-reg" underline="hover">
                            Register Then
                        </Link>
                    </Typography>
                </form>
            </Box>
        </Box>
    );
};

export default Userlogin;
