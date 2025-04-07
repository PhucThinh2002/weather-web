import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "../features/locationsSlice";

const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});

export default store;
