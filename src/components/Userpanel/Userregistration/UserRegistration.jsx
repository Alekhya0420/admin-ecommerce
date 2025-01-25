import React, { useState } from 'react';
import supabase from '../../../config/superbaseClient'
import bcrypt from 'bcryptjs'; 
import {Box,Button,TextField,Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const UserRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    const submitUser = async (e) => {
        e.preventDefault();
        setError('');
        const normalizedEmail = email.toLowerCase();

        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const { data, error } = await supabase.from('users').insert([
                { name, email: normalizedEmail, password: hashedPassword, country },
            ]);

            if (error) {
                setError(error.message);
                console.log("Error:", error);
            } else {
                console.log("User added successfully:", data);
                alert("User added successfully");
                setName('');
                setEmail('');
                setPassword('');
                setCountry('');
            }
        } catch (err) {
            setError(err.message);
            console.error('Unexpected error:', err);
        }
    };

    return (
        <Box 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Box 
                style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    width: '100%',
                    border: '0.5px solid blue',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    User Registration
                </Typography>
                <form onSubmit={submitUser}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Country"
                        variant="outlined"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        type="submit"
                        style={{ marginTop: '16px' }}
                    >
                        Submit
                    </Button>
                </form>

                {error && <Typography color="error" variant="body2" align="center" style={{ marginTop: '16px' }}>{error}</Typography>}

                <Box style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Typography variant="body2">
                        Have an account?
                        <Link to="/user-login" underline="hover" style={{ color: '#1976d2' }}>
                            Log in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserRegistration;
