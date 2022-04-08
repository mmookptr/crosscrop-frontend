import {React, useState} from 'react';

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

const SelectProjectForm  = () => {
  const [buttonSelected, setButtonSelected] = useState('add-to-project');
  const handleButtonSelectChange = (event) => {
    setButtonSelected(event.target.value)
  }

  const [selected, setSelected] = useState('');
  const handleChange = (event) => {
    setSelected(event.target.value)
  }

  const [text, setText] = useState('')
  const handleTextChange = (event) => {
    setText(event.target.value)
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
            value={selected}
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
          <TextField id="standard-basic" label="Enter Project Name" variant="standard" onChange={handleTextChange} value={text}/>
        ): ''}
      </RadioGroup>
    </Box>
  )
}

export default SelectProjectForm