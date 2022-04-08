import { React, useState } from 'react';

import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography, 
  DialogActions 
} from '@mui/material'

import DialogStepper from './DialogStepper';

const MoveGermplasmDialog = ({open, onClose}) => {
  const diaLogSteps = ["Select destination", "Name new file", "Summary"]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      > 
      <DialogTitle>{"Move Germplasm"}</DialogTitle>
      <DialogContent>
        <DialogStepper/>
      </DialogContent>
    </Dialog>
  )
}

export default MoveGermplasmDialog