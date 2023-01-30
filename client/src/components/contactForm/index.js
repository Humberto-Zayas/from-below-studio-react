import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ContactForm(props) {

  const [formState, setFormState] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    message: null,
    date: props.date.toISOString().split('T')[0],
    hours: props.hours
  });

  const handleChange = (event) => {
    props.formCapture(event)
  }

  return (
    <>
      <form>
        <FormControl sx={{ mt: 3 }} fullWidth>
          <TextField
            name="name"
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="Enter Your Name"
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />
          
          <TextField
            name="email"
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="Enter Your Email"
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <TextField
            name="phoneNumber"
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="Enter Your Phone Number"
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <TextField
            name="message"
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <FormControl sx={{ mb: 5 }}>
            <InputLabel style={{ background: 'white' }} id="demo-simple-select-label">How did you hear about us?</InputLabel>
            <Select
              defaultValue=""
              name="referral"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="How did you hear about us"
              onChange={handleChange}
              required
            >
              <MenuItem value={'Instagram'}>Instagram</MenuItem>
              <MenuItem value={'Twitter'}>Twitter</MenuItem>
              <MenuItem value={'Facebook'}>Facebook</MenuItem>
              <MenuItem value={'Referred/Recommended'}>Referred/Recommended</MenuItem>
              <MenuItem value={'Google Search'}>Google Search</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="Date Chosen"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.date.toISOString().split('T')[0]}
          />
          
          <TextField
            sx={{ mb: 3 }}
            id="outlined-basic"
            label="hours"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.hours}
          />
          
        </FormControl>
        {/* <Box sx={{ mt: 3 }}>
        <Button variant="contained">Send</Button>
      </Box> */}
      </form>
    </>
  )
}