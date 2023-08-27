import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, Collapse, Button, List, ListItem, ListItemText, ListItemIcon, Drawer } from '@mui/material';
import { Email, Phone, Message, Hearing, AccessTime, Edit, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/system';
import EditBooking from './EditBooking';

const Dot = styled('span')(({ theme, status }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: theme.spacing(1),
  backgroundColor:
    status === 'confirmed'
      ? '#00ffa2'
      : status === 'denied'
      ? '#d1203d'
      : '#ccc',
  border: status === 'unconfirmed' ? '1px solid #ccc' : 'none',
}));

const ButtonsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
});

const BookingCard = ({
  booking,
  openCardId,
  toggleCard,
  handleUpdateStatus,
  handleDeleteBooking,
}) => {
  const [formattedDate, setFormattedDate] = useState(dayjs(booking.date).format('M/D/YY'))
  const [hours, setHours] = useState(booking.hours);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleBookingUpdateAndFormat = (updatedHours, updatedFormattedDate) => {
    console.log('booking card day: ', updatedFormattedDate)
    setHours(updatedHours);
    setFormattedDate(updatedFormattedDate);
  };

  return (
    <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Dot className={booking.status === 'confirmed' ? 'confirmed-dot' : ''} status={booking.status} />
            {`${booking.name}`}&nbsp;
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
              &nbsp;{formattedDate}
            </span>
            <DeleteOutlinedIcon
              sx={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={() => handleDeleteBooking(booking._id)}
            />
          </span>
        }
        action={
          <Button size="small" onClick={() => toggleCard(booking._id)}>
            {openCardId === booking._id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Button>
        }
      />
      <Collapse in={openCardId === booking._id}>
        <CardContent style={{ padding: '0' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={booking.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Phone Number" secondary={booking.phoneNumber} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Message style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Message" secondary={booking.message} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Hearing style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="How Did You Hear About Us"
                secondary={booking.howDidYouHear}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTime style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="Date and Hours"
                secondary={`${formattedDate}, ${hours}`}
              />
              <ListItemIcon>
                <Edit
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={handleDrawerOpen}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Dot
                  className={booking.status === 'confirmed' ? 'confirmed-dot' : ''}
                  status={booking.status}
                />
              </ListItemIcon>
              <ListItemText primary="Status" secondary={booking.status} />
              <ButtonsWrapper>
                <Button
                  sx={{ mr: 2, color: '#00ffa2', borderColor: '#00ffa2' }}
                  variant="outlined"
                  onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: '#d1203d', borderColor: '#d1203d' }}
                  onClick={() => handleUpdateStatus(booking._id, 'denied')}
                >
                  Deny
                </Button>
              </ButtonsWrapper>
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
      <Drawer
        className='booking-drawer'
        anchor="bottom"
        open={isDrawerOpen}
       
      >
        <EditBooking
          id={booking._id}
          value={formattedDate}
          hours={booking.hours}
          onBookingUpdate={handleBookingUpdateAndFormat}
          closeDrawer={handleDrawerClose}
        />
      </Drawer>
    </Card>
  );
};

export default BookingCard;
