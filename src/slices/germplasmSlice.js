import { createSlice } from "@reduxjs/toolkit";

const initialState = { ids: []}
const germplasmSlice = createSlice({
  name: 'germplasm', 
  initialState,
  reducers: {
    getSelectedGermplasm: (state, action) => {
      const selectedGermplasm = action.payload
      state.ids = selectedGermplasm
    }
  }
})

export const {getSelectedGermplasm} = germplasmSlice.actions

export default germplasmSlice.reducer