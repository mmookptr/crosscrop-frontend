import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@mui/material';

const SummaryForm  = () => {
  const selectedGermplasmCount = useSelector(state => state.germplasm.ids).length
  const projectId = useSelector(state => state.germplasm.projectId)
  return (
    <Box sx={{margin: "36px"}}>
      <Typography variant="stepperTitle" display="block">Summary</Typography>
      <Typography>You have selected {selectedGermplasmCount} germplasm</Typography>
      <Typography>Moving to project {projectId}</Typography>
    </Box>
  )
}

export default SummaryForm