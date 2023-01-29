import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import StaticDatePickerDemo from '../staticDateTimePicker';
import BasicDatePicker from '../BasicDatePicker';
import ContactForm from '../contactForm';
import SelectableHours from '../SelectableHours';

const steps = ['Pick A Date', 'Pick Your Hours', 'Enter Your Information', 'Review and Submit'];

export default function HorizontalLinearStepper() {



  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handlePageChange = (value) => setValue(value); // event to pass
  // const [value, setValue] = React.useState(dayjs(new Date())); // value to bind and update
  const [value, setValue] = React.useState(''); // value to bind and update



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', mt: 11 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 &&
            <Box>
              <BasicDatePicker
                value={value}
                handleClick={handlePageChange}
              />
              {/* The current date chosen is: {value.toISOString().split('T')[0]} */}
              The current date chosen is: {value!== '' && value.toISOString().split('T')[0]}
            </Box>
          }
          {activeStep === 1 &&
            <Box>
              <SelectableHours/>
            </Box>
          }
          {activeStep === 2 &&
            <Box>
              
              <ContactForm />
            </Box>
          }
          {activeStep === 3 &&
            <Box>
              <h3>Review</h3>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            </Box>
          }
        
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}