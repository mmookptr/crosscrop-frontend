import {React, useState} from 'react';
import { useDispatch } from 'react-redux';

import { 
  Box, 
  Select, 
  FormControl, 
  MenuItem, 
  Typography, 
  TextField, 
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio } from '@mui/material';

import { getProjectId, getMoveGermplasmAction } from '../slices/germplasmSlice';

const SelectProjectForm  = () => {
  const dispatch = useDispatch()
  const [buttonSelected, setButtonSelected] = useState('add-to-project');
  const handleButtonSelectChange = (event) => {
    setButtonSelected(event.target.value)
    setProjectId('')
    dispatch(getMoveGermplasmAction(event.target.value))
  }

  const [projectId, setProjectId] = useState('');
  const handleChange = (event) => {
    setProjectId(event.target.value)
    dispatch(getProjectId(event.target.value))
  }

  return (
    <Box sx={{margin: "36px"}}>
      <Typography variant="stepperTitle" display="block">Select Project</Typography>
      <RadioGroup
        value={buttonSelected}
        onChange={handleButtonSelectChange}>
        <FormControlLabel value="add-to-project" control={<Radio />} label="Add to existing project" />
        {buttonSelected === 'add-to-project' ? (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180, marginTop: "8px" }}>
          <InputLabel id="choose-exisiting-project">Choose Project</InputLabel>
          <Select
            labelId="choose-exisiting-project"
            value={projectId}
            onChange={handleChange}
          >
            <MenuItem value={"project1"}>project1</MenuItem>
            <MenuItem value={"project2"}>project2</MenuItem>
            <MenuItem value={"project3"}>project3</MenuItem>
            <MenuItem value={"project4"}>project4</MenuItem>
          </Select>
        </FormControl>
        ) : ''}
        <FormControlLabel value="create-new-project" control={<Radio />} label="Create new peoject" />
        {buttonSelected === "create-new-project" ? (
          <TextField id="standard-basic" label="Enter Project Name" variant="standard" onChange={handleChange} value={projectId}/>
        ): ''}
      </RadioGroup>
    </Box>
  )
}

export default SelectProjectForm