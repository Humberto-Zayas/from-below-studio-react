import React from 'react';
import AdminDateHours from '../components/AdminDateHours';
import { Typography, Container } from '@mui/material';

const Admin = () => {
  return (
    <div style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f4f6f8' }} className='about'>
      <Container maxWidth="md" style={{ paddingTop: '1em' }}>
        <Typography className='hero-h1 heading oswald' variant="h2" component="h1" style={{ marginBottom: '1em', color: 'white' }}>Admin <span className='text-span-2'>Panel</span></Typography>
        <AdminDateHours />
      </Container>
    </div>
  );
};

export default Admin;
