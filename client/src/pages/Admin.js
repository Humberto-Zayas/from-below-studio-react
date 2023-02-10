import React, { useState } from 'react';
import logo from '../logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';
import AdminStepper from '../components/adminStepper';


const Admin = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <h1 sx={{ mt: 5 }}>Admin Pane</h1>
      <AdminStepper></AdminStepper>
    </>

  )

}

export default Admin;