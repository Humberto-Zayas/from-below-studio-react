import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const hourOptions = [
  { label: '2 Hours', price: '$70' },
  { label: '4 Hours', price: '$130' },
  { label: '8 Hours', price: '$270' },
  { label: '10 Hours', price: '$340' },
  { label: 'Full Day 14+ Hours', price: '$550' },
];

export default function AdminDateHours() {
  const [value, setValue] = useState(dayjs());
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

  const handleDatePick = (selectedDate) => {
    setValue(selectedDate);
  };

  const handleOptionToggle = (option) => {
    if (!dayData) return;

    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);

    const apiUrl = "http://localhost:3001/api/updateOrCreateDay";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: value.format("YYYY-MM-DD"),
        selectedHours: updatedOptions.map((opt) => ({
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

  useEffect(() => {
    if (dayData && dayData.hours) {
      setSelectedOptions(
        hourOptions.filter((opt) =>
          dayData.hours.some((hour) => hour.hour.includes(opt.label))
        )
      );
    }
  }, [dayData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            disablePast={true}
            value={value}
            onChange={handleDatePick}
            showToolbar={false}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <List component="nav">
          {hourOptions.map((option, index) => (
            <ListItem key={index}>
              <ListItemText primary={option.label} secondary={option.price} />
              <Switch
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Selected Options: {selectedOptions.map((option) => option.label).join(', ')}
        </Typography>
      </Grid>
    </Grid>
  );
}
