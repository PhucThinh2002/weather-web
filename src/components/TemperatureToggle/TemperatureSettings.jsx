import React from 'react';
import "./temperature.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureUnit, toggleShowBoth, setTemperatureDisplay } from '../../features/temperatureSlice';

const TemperatureSettings = () => {
  const dispatch = useDispatch();
  const { unit, showBoth } = useSelector(state => state.temperature);

  return (
    <div className="temperature-settings">
      <div className="settings-title">CÀI ĐẶT THỜI TIẾT</div>
      <div className="settings-group">
        <div className="settings-label">Nhiệt độ</div>
        <div className="settings-options">
          <label>
            <input 
              type="radio" 
              checked={!showBoth && unit === 'F'} 
              onChange={() => dispatch(setTemperatureDisplay({ unit: 'F', showBoth: false }))}
            />
            Độ F (°F)
          </label>
          <label>
            <input 
              type="radio" 
              checked={!showBoth && unit === 'C'} 
              onChange={() => dispatch(setTemperatureDisplay({ unit: 'C', showBoth: false }))}
            />
            Độ C (°C)
          </label>
          <label>
            <input 
              type="radio" 
              checked={showBoth} 
              onChange={() => dispatch(toggleShowBoth())}
            />
            Hiển thị cả hai
          </label>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSettings;