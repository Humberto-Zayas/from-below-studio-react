import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, List, ListItem, ListItemText, Switch, TextField, Typography } from '@mui/material';
import './AdminDateHours.css';

const hourOptions = [
  { label: '2 Hours', price: '$70' },
  { label: '4 Hours', price: '$130' },
  { label: '8 Hours', price: '$270' },
  { label: '10 Hours', price: '$340' },
  { label: 'Full Day 14+ Hours', price: '$550' },
];

export default function AdminDateHours() {
  const [value, setValue] = useState(dayjs());
  const [maxDate, setMaxDate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:3001/api/days/${value.format("YYYY-MM-DD")}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDayData(data);
      })
      .catch((error) => {
        console.error("Error fetching day data:", error);
      });
  }, [value]);

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
    if (dayData && dayData.hours) {
      setSelectedOptions(
        hourOptions.map((opt) => ({
          ...opt,
          enabled: dayData.hours.some((hour) => hour.hour.includes(opt.label)),
        }))
      );
    } else {
      setSelectedOptions(hourOptions.map((opt) => ({ ...opt, enabled: false })));
    }
  }, [dayData]);

  const handleDatePick = (selectedDate) => {
    setValue(selectedDate);
  };

  const handleOptionToggle = (option) => {
    if (!dayData) return;

    const updatedOptions = selectedOptions.map((opt) =>
      opt.label === option.label ? { ...opt, enabled: !opt.enabled } : opt
    );

    setSelectedOptions(updatedOptions);

    const apiUrl = "http://localhost:3001/api/updateOrCreateDay";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.format("YYYY-MM-DD"),
        selectedHours: updatedOptions
          .filter((opt) => opt.enabled)
          .map((opt) => ({
            hour: `${opt.label}/${opt.price}`,
            enabled: true,
          })),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Day created or updated:", data);
      })
      .catch((error) => {
        console.error("Error creating or updating day:", error);
      });
  };

  const handleMaxDateChange = (newMaxDate) => {
    setMaxDate(newMaxDate);

    // Post the updated maxDate to the API
    const apiUrl = 'http://localhost:3001/api/updateMaxDate';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDate: newMaxDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Max date updated:', data);
      })
      .catch((error) => {
        console.error('Error updating max date:', error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={7} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <List style={{maxWidth: '310px', margin: '0 auto'}} component="nav">
            <ListItem>
              <ListItemText style={{ color: 'white' }} primary="Max Date" />
              <DatePicker
                disablePast={true}
                value={maxDate}
                renderInput={(params) => <TextField style={{border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', width: '148px'}} {...params} />}
                onChange={handleMaxDateChange}
              />
            </ListItem>
          </List>
          <StaticDatePicker
            maxDate={maxDate}
            disablePast={true}
            value={value}
            onChange={handleDatePick}
            showToolbar={false}
            style={{ backgroundColor: 'transparent' }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item sm={5} xs={12}>
        <List component="nav">
          <ListItem>
            <ListItemText style={{ color: 'white' }} primary="Disabled" />
            <Switch
              checked={dayData ? dayData.disabled : true}
              onChange={() => {
                if (!dayData) return;
                const apiUrl = "http://localhost:3001/api/editDay";
                const newDisabled = !dayData.disabled;

                fetch(apiUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    date: value.format("YYYY-MM-DD"),
                    disabled: newDisabled,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    const updatedSelectedOptions = selectedOptions.map(opt => ({
                      ...opt,
                      enabled: !newDisabled && opt.enabled, // Toggle off hours if day is disabled
                    }));
                    setSelectedOptions(updatedSelectedOptions);
                    setDayData(data);
                  })
                  .catch((error) => {
                    console.error("Error updating disabled:", error);
                  });
              }}
            />
          </ListItem>
          {selectedOptions.map((option, index) => (
            <ListItem
              key={index}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: index === 0 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                color: 'white',
              }}
            >
              <ListItemText style={{ color: 'white' }} primary={option.label} secondary={option.price} />
              <Switch
                size="small"
                checked={option.enabled}
                onChange={() => handleOptionToggle(option)}
                disabled={dayData && dayData.disabled} // Disable if the day is disabled
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
