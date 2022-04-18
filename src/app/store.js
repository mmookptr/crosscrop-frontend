import { configureStore } from "@reduxjs/toolkit";

import germplasmReducer from "../slices/germplasmSlice";
import authenticationReducer from "../slices/authenticationSlice";

export const store = configureStore({
	reducer: {
		germplasm: germplasmReducer,
		authentication: authenticationReducer
	},
});
