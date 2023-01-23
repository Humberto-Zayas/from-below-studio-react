import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Hero() {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <h1>FROM BELOW STUDIO</h1>
      <h2>New Jersey Recording Studio</h2>
      <p>(609)-469-4340</p>
      <Stack spacing={2} direction="row">
        <Button onClick={handleOpen} variant="contained"><CalendarMonthIcon />Book Your Session</Button>
      </Stack>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h3>CONTACT</h3>
            <p>Give me a call/text: 609-469-4340</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TextField
                sx={{ mb: 3 }}
                id="outlined-basic"
                label="Enter Your Name"
                variant="outlined"
              />
              <br></br>
              <TextField
                sx={{ mb: 3 }}
                id="outlined-basic"
                label="Enter Your Email"
                variant="outlined"
              />
              <br></br>
              <TextField
                sx={{ mb: 3 }}
                id="outlined-basic"
                label="Enter Your Email"
                variant="outlined"
              />
              <br></br>
              <TextField
                sx={{ mb: 3 }}
                id="outlined-basic"
                label="Enter Your Phone Number"
                variant="outlined"
              />
              <FormControl fullWidth>
                <FormLabel id="demo-row-radio-buttons-group-label">What service are you interested in?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Recording" control={<Radio />} label="Recording" />
                  <FormControlLabel value="Mixing" control={<Radio />} label="Mixing" />
                  <FormControlLabel value="Studio Use" control={<Radio />} label="Studio Use" />
                </RadioGroup>
              </FormControl>
              
              <FormControl sx={{ mt: 1 }} fullWidth>
                <InputLabel style={{background: 'white'}} id="demo-simple-select-label">How did you hear about us?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <br></br>
              <DatePicker
                sx={{ mb: 3 }}
                disablePast="true"
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained">Send</Button>
            </Box>

          </Box>
        </Fade>
      </Modal>
    </div>
  )

}

export default Hero;