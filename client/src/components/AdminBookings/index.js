import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Button,
  Collapse,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [openCardId, setOpenCardId] = useState(null); // Keep track of open card
  const [statusFilter, setStatusFilter] = useState(''); // Status filter value
  const [dateFilter, setDateFilter] = useState(''); // Date filter value

  useEffect(() => {
    // Fetch bookings from the API
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Update the local state with the updated booking
        const updatedBookings = bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
      } else {
        console.error('Error updating booking status:', response.statusText);
        alert('An error occurred while updating the booking status.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('An error occurred while updating the booking status.');
    }
  };

  const toggleCard = (bookingId) => {
    if (openCardId === bookingId) {
      setOpenCardId(null);
    } else {
      setOpenCardId(bookingId);
    }
  };

  const resetFilters = () => {
    setStatusFilter('');
    setDateFilter('');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      <Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          {/* Filter toolbar */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Status' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="unconfirmed">Unconfirmed</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="denied">Denied</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date Filter"
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="outlined" color="primary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
        {bookings.length === 0 ? (
          <Typography variant="body1">No bookings available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking) => {
              // Apply filters
              if (
                (statusFilter === '' || booking.status === statusFilter) &&
                (dateFilter === '' || booking.date === dateFilter)
              ) {
                return (
                  <Grid item xs={12} md={6} key={booking._id}>
                    <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7' }}>
                      <CardHeader
                        title={`Name: ${booking.name}`}
                        action={
                          <Button size="small" onClick={() => toggleCard(booking._id)}>
                            {openCardId === booking._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                        }
                      />
                      <Collapse in={openCardId === booking._id}>
                        <CardContent>
                          <Typography variant="body1">Booking ID: {booking._id}</Typography>
                          <Typography variant="body1">Email: {booking.email}</Typography>
                          <Typography variant="body1">Phone Number: {booking.phoneNumber}</Typography>
                          <Typography variant="body1">Message: {booking.message}</Typography>
                          <Typography variant="body1">How Did You Hear About Us: {booking.howDidYouHear}</Typography>
                          <Typography variant="body1">Date: {booking.date}</Typography>
                          <Typography variant="body1">Hours: {booking.hours}</Typography>
                          <Typography variant="body1">Status: {booking.status}</Typography>
                          {/* Buttons to update status */}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleUpdateStatus(booking._id, 'denied')}
                          >
                            Deny
                          </Button>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AdminBookings;
