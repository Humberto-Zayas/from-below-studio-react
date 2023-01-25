import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function StaticDatePickerDemo(props) {
  const [value, setValue] = React.useState(props.value);

  const getDisabledDates = (date) => {
    let blackoutDates = [
      "2023-01-27",
      "2023-01-28",
      "2023-01-31",
      "2023-02-01"
    ]
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        disablePast
        displayStaticWrapperAs="desktop"
        shouldDisableDate={getDisabledDates}
        views={["day"]}
        // openTo="year"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          props.handleClick(newValue);
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}