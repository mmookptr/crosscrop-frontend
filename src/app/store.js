import { configureStore } from "@reduxjs/toolkit";

import germplasmReducer from "../slices/germplasmSlice";

export const store = configureStore({
	reducer: {
		germplasm: germplasmReducer
	},
});
