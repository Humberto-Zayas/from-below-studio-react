import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Modal from '@mui/material/Modal';

import img1 from '../../images/_JP_6436.jpg'
import img2 from '../../images/_JP_6420.jpg'
import img3 from '../../images/03-avalon-01.jpg'
import img4 from '../../images/06-outboard-01.jpg'
import img5 from '../../images/10-uad-01.jpg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 'auto',
  bgcolor: 'black',
  height: '80vh',
  overflow: 'scroll',
  boxShadow: 24,
  p: 4,
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: img1
  },
  {
    label: 'Bird',
    imgPath: img2
  },
  {
    label: 'Bali, Indonesia',
    imgPath: img3
  },
  {
    label: 'Goč, Serbia',
    imgPath: img4
  },
  {
    label: 'Goč, Serbia',
    imgPath: img5
  },
];

function SliderTwo() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (img) => {
    setOpen(true);
    setSelectedImage(img)

  }
  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  };
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          position: 'relative',
          top: '50px',
          textAlign: 'center',
          zIndex: 1,
          bgcolor: 'rgba(0,0,0,0.75)',
        }}
      >
        <Typography style={{width: '100%'}} className='heading-11'>OUTBOARD GEAR & PLUGINS</Typography>
      </Paper>
      <AutoPlaySwipeableViews
      style={{position: 'relative', height: 400, overflow: 'hidden'}}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div style={{position: 'relative', height: 400}}  key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                onClick={() => handleOpen(step.imgPath)}
                component="img"
                sx={{
                  height: 'auto',
                  display: 'block',
                  position: 'absolute',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       
          <img style={{width: '100%', display: 'block', margin: '0 auto'}} src={selectedImage} />
        </Box>
      </Modal>
      <MobileStepper
        sx={{'& .MuiMobileStepper-dotActive': {backgroundColor: 'white !important'}, '& .MuiMobileStepper-dot' : {boxShadow: '0px 1px 1px white'}}}
        style={{backgroundColor: 'transparent', position: 'relative', bottom: '100px'}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            style={{color: 'white'}}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button style={{color: 'white'}} size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            
          </Button>
        }
      />
    </Box>
  );
}

export default SliderTwo;