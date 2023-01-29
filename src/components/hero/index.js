import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import HorizontalLinearStepper from '../stepper'

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
  const [open, setOpen] = React.useState(false);
  
  // Modal functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <HorizontalLinearStepper></HorizontalLinearStepper>
          </Box>
        </Fade>
      </Modal>
    </div>
  )

}

export default Hero;