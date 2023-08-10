import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import BasicDatePicker from '../BasicDatePicker';
import ContactForm from '../contactForm';
import SelectableHours from '../SelectableHours';

const steps = ['Pick A Date', 'Pick Your Hours', 'Enter Your Information'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [value, setValue] = React.useState('');
  const [hours, setHours] = React.useState(null);
  const [formState, setFormState] = React.useState({
    name: null,
    email: null,
    phoneNumber: null,
    message: null,
    referral: null,
    date: null,
    hours: null
  });
  const [blackoutDays, setBlackoutDays] = React.useState([]);

  React.useEffect(() => {
    // Fetch blackout days from your API
    fetch('/api/blackoutDays')
      .then(response => response.json())
      .then(data => {
        setBlackoutDays(data);
      })
      .catch(error => {
        console.error('Error fetching blackout days:', error);
      });
  }, []); // Run only once on component mount

  const handleDatePick = (value) => {
    setValue(value);
    setFormState({ ...formState, date: value.toISOString().split('T')[0] });
    setActiveStep(1);
  };

  const handleHoursPicked = (value) => {
    setHours(value);
    setFormState({ ...formState, hours: value });
    setActiveStep(2);
  };

  const handleFormFinished = (value) => {
    // Handle form input
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (formState.name && formState.email && formState.phoneNumber && formState.message && formState.referral) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);
      setFormState({
        name: null,
        email: null,
        phoneNumber: null,
        message: null,
        referral: null,
        date: null,
        hours: null
      });
    } else {
      alert('Please fill out all fields before submitting the form.');
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel className='text-block-13'>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <Box sx={{ mt: 1 }}>
              <BasicDatePicker value={value} days={blackoutDays} handleClick={handleDatePick} />
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ mt: 1 }}>
              <SelectableHours recordingDate={value} selectHours={handleHoursPicked} />
            </Box>
          )}
          {activeStep === 2 && (
            <Box className='shtest' sx={{ mt: 1}}>
              <ContactForm formCapture={handleFormFinished} date={value} hours={hours} />
            </Box>
          )}
          {activeStep === 3 && (
            <Box>
              <h3>Review</h3>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              style={{ color: 'white' }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 && (
              <Button style={{ color: 'white' }} onClick={handleNext}>
                Finish
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
