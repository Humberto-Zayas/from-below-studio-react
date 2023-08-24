import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import BasicDatePicker from '../BasicDatePicker';

const EditBooking = ({ value }) => {
  const [blackoutDays, setBlackoutDays] = useState([]);
  const [maxDate, setMaxDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
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
    fetch(`/api/days/${value}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.date && data.hours) {
          const enabledHours = data.hours.filter(item => item.enabled);
          setEnabledData(enabledHours);
        } else {
          setEnabledData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching day data:', error);
      });
  }, [value]);

  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <BasicDatePicker value={value} maxDate={maxDate} days={blackoutDays} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <List sx={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Available Hours:
            </Typography>
            {enabledData.map((hour) => (
              <ListItem
                key={hour.hour}
                button
                onClick={() => handleHourSelection(hour.hour)}
                selected={hour.hour === selectedHour}
              >
                <ListItemText primary={hour.hour} secondary={hour.price} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditBooking;
