import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.value);
  // const [blackOutDates, setBlackOutDates] = React.useState(props.days.blackoutDays)

  const getDisabledDates = (date) => {

    const blackoutDates = props.days.blackoutDays.map((item) => item.date);

    // let blackoutDates = [
    //   "2023-01-27",
    //   "2023-01-28",
    //   "2023-01-31",
    //   "2023-02-01",
    //   "2023-03-02",
    //   "2023-03-05",
    //   "2023-03-18",
    //   "2023-03-19",
    // ]
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  React.useEffect(() => {
    // getBlackOutDates()
  }, [props])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        shouldDisableDate={getDisabledDates}
        label="Choose a date"
        value={value}
        maxDate={'2023-04-19'}
        onChange={(newValue) => {
          console.log('on change ran')
          props.handleClick(newValue);
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}