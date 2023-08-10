import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.value);

  const getDisabledDates = (date) => {
    const blackoutDates = props.days.map((item) => item.date);
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        shouldDisableDate={getDisabledDates}
        label="Choose a date"
        value={value}
        maxDate={'2023-04-19'}
        onChange={(newValue) => {
          props.handleClick(newValue);
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
