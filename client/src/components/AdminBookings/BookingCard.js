import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Collapse, Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BookingCard = ({ booking, openCardId, toggleCard, handleUpdateStatus }) => {
  return (
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
  );
};

export default BookingCard;
