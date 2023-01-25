import * as React from 'react';
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

export default function ContactForm() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
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
        <InputLabel style={{ background: 'white' }} id="demo-simple-select-label">How did you hear about us?</InputLabel>
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
      <Box sx={{ mt: 3 }}>
        <Button variant="contained">Send</Button>
      </Box>
    </>
  )
}