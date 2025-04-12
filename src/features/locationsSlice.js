import { createSlice } from "@reduxjs/toolkit";

const locationsSlice = createSlice({
  name: "locations",
  initialState: [],
  reducers: {
    addLocation: (state, action) => {
      state.push(action.payload);
    },
    removeLocation: (state, action) => {
      return state.filter((location) => location.id !== action.payload);
    },
  },
});

export const { addLocation, removeLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
