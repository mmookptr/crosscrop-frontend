import { React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, FormControl, Select, MenuItem } from '@mui/material';

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
    <Box sx={{marginLeft: "36px"}}>
      <h2>Move {selectedGermplasmCount} rows to:</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
          <Select value={selected}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
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