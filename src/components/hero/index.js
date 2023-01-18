import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Hero() {
  return (
    <div>
      <h1>FROM BELOW STUDIO</h1>
      <h2>New Jersey Recording Studio</h2>
      <p>(609)-469-4340</p>
      <Stack spacing={2} direction="row">
        <Button variant="contained"><CalendarMonthIcon />Book Your Session</Button>
      </Stack>
    </div>
  )

}

export default Hero;