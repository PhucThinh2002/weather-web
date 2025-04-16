import React from 'react';
import { useSelector } from 'react-redux';

const TemperatureDisplay = ({ tempC }) => {
  const { unit, showBoth } = useSelector(state => state.temperature);
  
  if (!tempC && tempC !== 0) return <span>--</span>;
  
  const tempF = Math.round((tempC * 9/5) + 32);
  
  if (showBoth) {
    return <span>{tempC}°C / {tempF}°F</span>;
  }
  
  return <span>{unit === 'C' ? `${tempC}°C` : `${tempF}°F`}</span>;
};

export default TemperatureDisplay;