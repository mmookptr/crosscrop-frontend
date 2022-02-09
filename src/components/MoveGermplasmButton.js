import { React, useState } from 'react';

import { Box } from '@mui/system'
import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography, 
  DialogActions } from '@mui/material'

import MoveGermplasmDialog from './MoveGermplasmDialog';

const MoveGermplasmButton =  () => { 
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // const [selected, setSelected] = useState('');

  // const handleChange = (event) => {
  //   setSelected(event.target.value)
  // };

  return (
    <Box sx={{ padding: "16px", display: "flex", justifyContent: "end"  }}>
				<Button 
					sx={{color: "#eabbc5", bgcolor: "#fffaf9", fontWeight: "bold", boxShadow: 10, borderRadius: "8px", 
            "&:hover": { bgcolor: "#f0b9c7", color: "white"}}}
          onClick = {handleClickOpen}
				>Move Germplasm
				</Button>
        <MoveGermplasmDialog 
          open={open}
          onClose={handleClose}
        />
			</Box>
  )
}

export default MoveGermplasmButton