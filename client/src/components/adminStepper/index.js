import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Container from '@mui/material/Container';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import BasicDatePicker from '../BasicDatePicker';
import ContactForm from '../contactForm';
import AdminSelectableHours from '../adminSelectableHours';
import { useQuery } from '@apollo/client';
import { QUERY_BLACKOUT_DAYS } from '../../utils/queries';

const steps = ['Pick A Date', 'Pick Your Hours', 'Review'];

export default function AdminStepper() {
  const { loading, data } = useQuery(QUERY_BLACKOUT_DAYS);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  // const [value, setValue] = React.useState(dayjs(new Date())); // value to bind and update
  const [value, setValue] = React.useState(''); // recording date chosen
  const [hours, setHours] = React.useState(null); // recording hours chosen
  

  const handleDatePick = (value) => { // passable function to get date picked
    setValue(value); // event to pass
    setActiveStep(1)
  }

  const handleHoursPicked = (value) => { // passable function to hour select list
    setHours(value);
    setActiveStep(2)
  }

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
    <Container>
      <Box sx={{ width: '100%', mt: 1 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel className='text-block-13' {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
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
            {activeStep === 0 &&
              <>
                <Box sx={{ mt: 1 }}>
                  <BasicDatePicker
                    value={value}
                    days={data}
                    handleClick={handleDatePick}
                  />
                </Box>
              </>
            }
            {activeStep === 1 &&
              <Box sx={{ mt: 1 }}>
                <AdminSelectableHours recordingDate={value} selectHours={handleHoursPicked} />
              </Box>
            }
            {activeStep === 2 &&
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
                style={{ color: 'white' }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 &&
                <Button style={{ color: 'white' }} onClick={handleNext}>
                  Finish
                </Button>
              }
              {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}