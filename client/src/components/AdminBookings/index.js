import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Container, Grid, Button } from '@mui/material';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      <Container maxWidth="md">
        {bookings.length === 0 ? (
          <Typography variant="body1">No bookings available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid item xs={12} md={6} key={booking._id}>
                <Card>
                  <CardHeader title={`Booking ID: ${booking._id}`} />
                  <CardContent>
                    <Typography variant="body1">Name: {booking.name}</Typography>
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
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AdminBookings;
