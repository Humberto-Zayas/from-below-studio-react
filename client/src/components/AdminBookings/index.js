import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Container, Grid, Button, Collapse, FormControl, Select, MenuItem, TextField } from '@mui/material';
import BookingCard from './BookingCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [openCardId, setOpenCardId] = useState(null); // Keep track of open card
  const [statusFilter, setStatusFilter] = useState(''); // Status filter value
  const [dateFilter, setDateFilter] = useState(''); // Date filter value

  useEffect(() => {
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
              label="Booking Status"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ color: 'white' }}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Bookings</MenuItem>
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
              if (
                (statusFilter === '' || booking.status === statusFilter) &&
                (dateFilter === '' || booking.date === dateFilter)
              ) {
                return (
                  <Grid item xs={12} md={6} key={booking._id}>
                    <BookingCard
                      booking={booking}
                      openCardId={openCardId}
                      toggleCard={toggleCard}
                      handleUpdateStatus={handleUpdateStatus}
                    />
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
