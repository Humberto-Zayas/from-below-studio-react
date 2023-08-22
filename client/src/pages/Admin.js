import React, { useState } from 'react';
import AdminDateHours from '../components/AdminDateHours';
import AdminBookings from '../components/AdminBookings'; // Import the bookings component
import { Typography, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { CalendarToday, ListAlt } from '@mui/icons-material';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('dateHours'); // Default component is dateHours
  const toggleComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f4f6f8' }} className='about'>
      <Container maxWidth="md" style={{ paddingTop: '1em' }}>
        <Typography className='hero-h1 heading oswald' variant="h2" component="h1" style={{ marginBottom: '1em', color: 'white' }}>
          Admin <span className='text-span-2'>Panel</span>
        </Typography>
        
        {/* Side drawer */}
        <Drawer anchor="left" open={true} variant="permanent" sx={{ width: 200 }}>
          <List>
            <ListItem button onClick={() => toggleComponent('dateHours')}>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItem>
            <ListItem button onClick={() => toggleComponent('bookings')}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        {/* Display selected component */}
        {selectedComponent === 'dateHours' && <AdminDateHours />}
        {selectedComponent === 'bookings' && <AdminBookings />}
      </Container>
    </div>
  );
};

export default Admin;
