import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "../features/locationsSlice";
import temperatureReducer from '../features/temperatureSlice';

const store = configureStore({
  reducer: {
    locations: locationsReducer,
    temperature: temperatureReducer
  },
});

export default store;
