import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import BasicDatePicker from '../BasicDatePicker';
import dayjs from 'dayjs';

const EditBooking = ({ value, hours, id, onBookingUpdate, closeDrawer }) => {
  const [day, setDay] = useState(value)
  const [blackoutDays, setBlackoutDays] = useState([]);
  const [maxDate, setMaxDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(hours.split("/")[0].trim());
  const [enabledData, setEnabledData] = useState([]);
  const hourOptions = [
    { label: '2 Hours', price: '$70' },
    { label: '4 Hours', price: '$130' },
    { label: '8 Hours', price: '$270' },
    { label: '10 Hours', price: '$340' },
    { label: 'Full Day 14+ Hours', price: '$550' },
  ];

  useEffect(() => {
    // Fetch blackout days from your API
    fetch('/api/blackoutDays')
      .then(response => response.json())
      .then(data => {
        setBlackoutDays(data);
      })
      .catch(error => {
        console.error('Error fetching blackout days:', error);
      });
  }, []); // Run only once on component mount

  useEffect(() => {
    const maxDateUrl = 'http://localhost:3001/api/getMaxDate'; // API endpoint to fetch max date
    fetch(maxDateUrl)
      .then((response) => response.json())
      .then((data) => {
        setMaxDate(data.maxDate);
      })
      .catch((error) => {
        console.error('Error fetching max date:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    fetch(`/api/days/${day}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.date && data.hours) {
          setEnabledData(data.hours);
        } else {
          setEnabledData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching day data:', error);
      });
  }, [day]);

  const handleHourSelection = (hour) => {
    setSelectedHour((prevSelectedHour) => {
      const newSelectedHour = prevSelectedHour === hour ? prevSelectedHour : hour;
      return newSelectedHour;
    });
  };

  const handleSave = (hour) => {
    const selectedHourOption = hourOptions.find((hourOption) => hourOption.label === selectedHour);

    if (selectedHourOption) {
      const transformedHour = `${selectedHourOption.label}/${selectedHourOption.price}`;
      const transformedDay = dayjs(day).format('YYYY-MM-DD')

      fetch(`/api/bookings/datehour/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: transformedDay,
          hours: transformedHour,
        }),
      })
        .then((response) => response.json())
        .then((updatedBooking) => {
          console.log('Booking updated:', updatedBooking);
          onBookingUpdate(transformedHour, day);
        })
        .catch((error) => {
          console.error('Error updating booking:', error);
        });
    }
    closeDrawer();
  }


  return (
    <Container maxWidth="md" sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <Typography variant='h5' align='center' sx={{ pt: 3, pb: 3 }}>Edit Booking</Typography>
        <Button style={{ position: 'absolute', top: '23px', right: '0px' }} onClick={handleSave}>Save</Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>

          <BasicDatePicker value={day} maxDate={maxDate} days={blackoutDays}
            handleClick={(value) => {
              setDay(dayjs(value).format('M/D/YY'));
              setSelectedHour(null)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <List sx={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Available Hours:
            </Typography>
            {hourOptions.map((hourOption) => (
              <ListItem
                key={hourOption.label}
                button
                onClick={() => handleHourSelection(hourOption.label)}
                selected={hourOption.label === selectedHour}
              >
                <ListItemText
                  primary={hourOption.label}
                  secondary={
                    <>
                      {hourOption.price}
                      {hourOption.label === selectedHour}
                    </>
                  }
                >
                </ListItemText>
                {hourOption.label === selectedHour && (
                  <CheckIcon style={{ color: '#00ffa2' }} />
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditBooking;
