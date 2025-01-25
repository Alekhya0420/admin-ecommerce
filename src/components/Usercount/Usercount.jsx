import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';  // React Router Link for routing
import Slidebar from '../../reusables/Sidebar/Sidebar';
import Header from '../../reusables/Header/Header';
import supabase from '../../config/superbaseClient';
import Adminfooter from '../../reusables/Adminfooter/Adminfooter';

const Usercount = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('users').select('id, name, email, country');

        if (error) {
          setError(`Error fetching users: ${error.message}`);
          console.error(error.message);
          return;
        }

        if (data) {
          setUsers(data);
        } else {
          setError('No users found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`Unexpected error: ${err.message}`);
          console.error(err.message);
        } else {
          setError('Unexpected error occurred');
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <Slidebar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px', padding: '20px' }}>
        <div style={{ width: '50%', maxWidth: '600px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: "blue" }}>User List</h2>
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
              <strong>{error}</strong>
            </div>
          )}
          <TableContainer component={Paper} style={{ border: '1px solid #ccc' }}>
            <Table size="small">
              <TableHead>
                <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Country</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ border: '1px solid #ccc' }}>{user.id}</TableCell>
                    <TableCell style={{ border: '1px solid #ccc', textDecoration: "underline", color: "blue" }}>
                      <Link to={`/total-user/${user.name}`} style={{ textDecoration: 'none', color: 'blue' }}>
                        {user.name}
                      </Link>
                    </TableCell>
                    <TableCell style={{ border: '1px solid #ccc' }}>{user.email}</TableCell>
                    <TableCell style={{ border: '1px solid #ccc' }}>{user.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Adminfooter />
    </div>
  );
};

export default Usercount;
