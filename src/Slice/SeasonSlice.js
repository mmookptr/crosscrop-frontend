import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeason: null,
};

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    getSeason: (state, action) => {
      state.currentSeason = action.payload;
    },
  },
});

export const { getSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
