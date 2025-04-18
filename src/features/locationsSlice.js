import { createSelector, createSlice } from "@reduxjs/toolkit";

const loadLocationsFromLocalStorage = () => {
  try {
    const serializedLocations = localStorage.getItem('savedLocations');
    if (serializedLocations === null) {
      return [];
    }
    return JSON.parse(serializedLocations);
  } catch (err) {
    console.error("Error loading locations from localStorage:", err);
    return [];
  }
};

const saveLocationsToLocalStorage = (locations) => {
  try {
    const serializedLocations = JSON.stringify(locations);
    localStorage.setItem('savedLocations', serializedLocations);
  } catch (err) {
    console.error("Error saving locations to localStorage:", err);
  }
};

const initialState = loadLocationsFromLocalStorage();

const locationsSlice = createSlice({
  name: "locations",
  initialState: loadLocationsFromLocalStorage(),
  reducers: {
    addLocation: (state, action) => {
      const isDuplicate = state.some(
        (location) =>
          location.name === action.payload.name &&
          location.region === action.payload.region &&
          location.country === action.payload.country
      );
      
      if (!isDuplicate) {
        state.push(action.payload);
        saveLocationsToLocalStorage(state);
      }
    },
    removeLocation: (state, action) => {
      const newState = state.filter((location) => location.id !== action.payload);
      saveLocationsToLocalStorage(newState);
      return newState;
    },
    clearLocations: (state) => {
      localStorage.removeItem('savedLocations');
      return [];
    },
  },
});

export const { addLocation, removeLocation, clearLocations } = locationsSlice.actions;

export const selectUniqueLocations = createSelector(
  (state) => state.locations,
  (locations) => {
    const seen = new Set();
    return locations.filter((location) => {
      const key = `${location.name}-${location.region}-${location.country}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  }
);

export default locationsSlice.reducer;