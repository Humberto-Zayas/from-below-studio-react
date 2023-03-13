import React, { useState } from 'react';
import logo from '../logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';
import AdminStepper from '../components/adminStepper';
import { Typography, Container } from '@mui/material';


const Admin = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Container>
        <Typography variant="h2" component="h1" style={{ paddingTop: '2em' }}>Admin Pane</Typography>
        <AdminStepper></AdminStepper>
      </Container>
    </>

  )

}

export default Admin;