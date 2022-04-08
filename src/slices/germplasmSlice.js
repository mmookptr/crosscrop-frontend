import { createSlice } from "@reduxjs/toolkit";

const initialState = { ids: [], destination: 'to where'}
const germplasmSlice = createSlice({
  name: 'germplasm', 
  initialState,
  reducers: {
    getSelectedGermplasm: (state, action) => {
      const selectedGermplasm = action.payload
      state.ids = selectedGermplasm
    },
    getSelectedDestination: (state, action) => {
      const selectedDestination = action.payload
      state.destination = selectedDestination
    }
  }
})

export const {getSelectedGermplasm, getSelectedDestination} = germplasmSlice.actions

export default germplasmSlice.reducer