import { React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, FormControl, Select, MenuItem, Typography, InputLabel } from '@mui/material';

import { getSelectedWorkflow } from "../slices/germplasmSlice.js"

const SelectWorkflowForm = () => {
  const dispatch = useDispatch()
  const selectGermplasm  = useSelector(state => state.germplasm.ids)
  const selectedGermplasmCount  = selectGermplasm.length  
  const [selected, setSelected] = useState('');
  const handleChange = (event) => {
    setSelected(event.target.value)
    dispatch(getSelectedWorkflow(event.target.value))
  };

  return (
    <Box sx={{margin: "36px"}}>
      <Typography variant="stepperTitle" display="block">Move {selectedGermplasmCount} rows to:</Typography>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
      <InputLabel id="choose-workflow">Choose Workflow</InputLabel>
      <Select value={selected}
        onChange={handleChange}
        label="Destination Flow"
        sx={{bgcolor: "#fffaf9"}}
      >             
        <MenuItem value={"cold-room-storage"}>Cold Room Storage</MenuItem>
        <MenuItem value={"breeding-nursery"}>Breeding Nursery</MenuItem>
        <MenuItem value={"crossing-block"}>Crossing Block</MenuItem>
        <MenuItem value={"yield-trial"}>Yield Trial</MenuItem>
      </Select>
      </FormControl>
    </Box>
  )
}

export default SelectWorkflowForm