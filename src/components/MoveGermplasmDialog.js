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
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value)
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      > 
      <DialogTitle>{"Move Germplasm"}</DialogTitle>
      <DialogContent>
        <DialogStepper/>
        {/* <Typography>
          moving selected rows to: 

        </Typography>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
          <Select value={selected}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{bgcolor: "#fffaf9", marginLeft: "36px"}}
          >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>                
            <MenuItem value={"cold-room-storage"}>Cold Room Storage</MenuItem>
            <MenuItem value={"breeding-nursery"}>Breeding Nursery</MenuItem>
            <MenuItem value={"crossing-block"}>Crossing Block</MenuItem>
            <MenuItem value={"yield-trial"}>Yield Trial</MenuItem>
          </Select>
        </FormControl> */}
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={onClose}>
          Continue
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default MoveGermplasmDialog