import { React, useState } from 'react';

import { 
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@mui/material';

import SelectWorkflowForm from "./SelectWorkflowForm";
import SelectProjectForm from './SelectProjectForm';
import SummaryForm from './SummaryForm';

const steps = ['Select workflow', 'Select project', 'Summary'];

const DialogStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formSteps = [<SelectWorkflowForm/>, <SelectProjectForm/>]

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = () => {
    console.log("All steps done")
  };

  return (
    <Box sx={{ width: '480px', height: "320px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {};
          return (
            <Step key={label}>
              <StepLabel 
              {...labelProps} 
              >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <Box>
          <SummaryForm/>
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
              <Button onClick={handleConfirm}>Confirm</Button>
            </Box>
        </Box>
      ) : (
        <Box>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {formSteps[activeStep]}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1  ? 'Continue' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default DialogStepper