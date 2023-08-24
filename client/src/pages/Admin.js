import React, { useState } from 'react';
import AdminDateHours from '../components/AdminDateHours';
import AdminBookings from '../components/AdminBookings';
import { Typography, Container, Drawer, List, ListItem, Divider } from '@mui/material';
import { CalendarToday, ListAlt } from '@mui/icons-material';
import './Admin.css';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('dateHours');
  const toggleComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f4f6f8' }} className='about'>
      <Container maxWidth="md" style={{ paddingTop: '1em' }}>
        <Typography className='hero-h1 heading oswald' variant="h2" component="h1" style={{ marginBottom: '1em', color: 'white' }}>
          Admin <span className='text-span-2'>Panel</span>
        </Typography>
        <Drawer 
          className='side-drawer'
          anchor="left" 
          open={true} 
          variant="permanent" 
          sx={{ width: 64, flexShrink: 0 }}>
          <List>
            <ListItem style={{ cursor: 'pointer' }} onClick={() => toggleComponent('dateHours')}>
              <CalendarToday style={{ color: 'white' }} />
            </ListItem>
            <ListItem style={{ cursor: 'pointer' }} onClick={() => toggleComponent('bookings')}>
              <ListAlt style={{ color: 'white' }} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        {selectedComponent === 'dateHours' && <AdminDateHours />}
        {selectedComponent === 'bookings' && <AdminBookings />}
      </Container>
    </div>
  );
};

export default Admin;
