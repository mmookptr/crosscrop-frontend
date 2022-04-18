import { configureStore } from "@reduxjs/toolkit";

import germplasmReducer from "../Slice/GermplasmSlice";
import authenticationReducer from "../Slice/AuthenticationSlice";
import seasonReducer from "../Slice/SeasonSlice";

export const store = configureStore({
  reducer: {
    germplasm: germplasmReducer,
    authentication: authenticationReducer,
    season: seasonReducer
  },
});
