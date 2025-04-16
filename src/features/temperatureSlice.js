import { createSlice } from '@reduxjs/toolkit';

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    unit: 'C', // Mặc định là Celsius
    showBoth: false // Mặc định chỉ hiển thị một đơn vị
  },
  reducers: {
    toggleTemperatureUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
    },
    toggleShowBoth: (state) => {
      state.showBoth = !state.showBoth;
    },
    setTemperatureDisplay: (state, action) => {
      state.unit = action.payload.unit;
      state.showBoth = action.payload.showBoth;
    }
  }
});

export const { toggleTemperatureUnit, toggleShowBoth, setTemperatureDisplay } = temperatureSlice.actions;
export default temperatureSlice.reducer;