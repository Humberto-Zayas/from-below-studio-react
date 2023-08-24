import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
} from '@mui/material';
import {
  Email,
  Phone,
  Message,
  Hearing,
  AccessTime,
  Edit,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@mui/icons-material';
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
      ? 'green'
      : status === 'denied'
      ? 'red'
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
  handleDeleteBooking, // New prop for delete functionality
}) => {
  const formattedDate = dayjs(booking.date).format('M/D/YY');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Dot status={booking.status} />
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
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={booking.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary="Phone Number"
                secondary={booking.phoneNumber}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="Message" secondary={booking.message} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Hearing />
              </ListItemIcon>
              <ListItemText
                primary="How Did You Hear About Us"
                secondary={booking.howDidYouHear}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText
                primary="Date and Hours"
                secondary={`${formattedDate}, ${booking.hours}`}
              />
              <ListItemIcon>
                <Edit onClick={handleDrawerOpen} />
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Dot status={booking.status} />
              </ListItemIcon>
              <ListItemText primary="Status" secondary={booking.status} />
              <ButtonsWrapper>
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
              </ButtonsWrapper>
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
      <Drawer
        className='booking-drawer'
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <EditBooking value={booking.date} />
      </Drawer>
    </Card>
  );
};

export default BookingCard;
