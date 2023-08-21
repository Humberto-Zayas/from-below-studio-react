import React, { useState } from 'react';
import AdminStepper from '../components/adminStepper';
import AdminDateHours from '../components/AdminDateHours';
import { Typography, Container } from '@mui/material';

const Admin = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={{minHeight: '100vh', height: 'auto'}} className='about'>
      <Container>
        <Typography className='hero-h1 heading oswald' variant="h2" component="h1" style={{ padding: '1em 1em 0em', marginBottom: '1em', color: 'white' }}>Admin <span className='text-span-2'>Panel</span></Typography>
        <AdminDateHours />
      </Container>
    </div>

  )

}

export default Admin;