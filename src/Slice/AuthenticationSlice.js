import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: true,
  username: "",
};

const authenticationSlice = createSlice({
  name: "authentcation",
  initialState,
  reducers: {
    getUsername: (state, action) => {
      state.username = action.payload;
    },
    userLogin: (state) => {
      state.isLogin = true;
    },
  },
});

export const { getUsername, userLogin } = authenticationSlice.actions;

export default authenticationSlice.reducer;
