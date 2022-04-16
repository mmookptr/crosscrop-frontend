import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  ids: [], 
  workflow: '',
  moveGermplasmAction: 'add-to-project',
  projectId: ''
}
const germplasmSlice = createSlice({
  name: 'germplasm', 
  initialState,
  reducers: {
    getSelectedGermplasm: (state, action) => {
      state.ids = action.payload
    },
    getSelectedWorkflow: (state, action) => {
      state.workflow = action.payload
    },
    getProjectId: (state, action) => {
      state.projectId = action.payload
    },
    getMoveGermplasmAction: (state, action) => {
      state.moveGermplasmAction = action.payload
    }
  }
})

export const {getSelectedGermplasm, getSelectedWorkflow, getProjectId, getMoveGermplasmAction} = germplasmSlice.actions

export default germplasmSlice.reducer